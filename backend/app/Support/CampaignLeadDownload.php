<?php

namespace App\Support;

use App\Models\CampaignLead;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use OpenSpout\Common\Entity\Cell\StringCell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Writer\XLSX\Options;
use OpenSpout\Writer\XLSX\Writer;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CampaignLeadDownload
{
    public const COLUMNS = [
        'id' => 'Lead ID', 'campaign_id' => 'Campaign ID', 'campaign_title' => 'Campaign name (at signup)',
        'campaign.slug' => 'Campaign URL slug', 'source_url' => 'Source URL',
        'first_name' => 'First name', 'last_name' => 'Surname', 'zip_code' => 'ZIP code',
        'city' => 'City', 'email' => 'Email', 'mobile' => 'Mobile number', 'birth_year' => 'Birth year',
        'status' => 'Status', 'consented_at' => 'Consent accepted at', 'consent_text' => 'Contact consent text',
        'terms_snapshot' => 'Accepted terms and conditions', 'created_at' => 'Created at', 'updated_at' => 'Updated at',
    ];

    public static function response(Builder $query, string $format, ?array $selectedColumns = null): StreamedResponse
    {
        Gate::authorize('viewAny', CampaignLead::class);
        abort_unless(in_array($format, ['csv', 'xlsx'], true), 422);
        $selectedColumns ??= array_keys(self::COLUMNS);
        validator(['columns' => $selectedColumns], ['columns' => ['required', 'array', 'min:1'], 'columns.*' => ['required', 'string', Rule::in(array_keys(self::COLUMNS))]])->validate();
        $columns = array_intersect_key(self::COLUMNS, array_flip($selectedColumns));
        $query = (clone $query)->with('campaign');

        return response()->streamDownload(function () use ($query, $format, $columns): void {
            if ($format === 'csv') {
                $output = fopen('php://output', 'wb');
                fwrite($output, "\xEF\xBB\xBF");
                fputcsv($output, array_values($columns), ',', '"', '');
                foreach ($query->lazy(500) as $lead) {
                    fputcsv($output, array_map(self::csvText(...), self::values($lead, $columns)), ',', '"', '');
                }
                fclose($output);

                return;
            }

            $path = tempnam(sys_get_temp_dir(), 'veonis-leads-');
            try {
                $options = new Options;
                $options->setColumnWidthForRange(24, 1, count($columns));
                foreach (array_keys($columns) as $index => $field) {
                    if (in_array($field, ['source_url', 'consent_text', 'terms_snapshot'], true)) {
                        $options->setColumnWidth(55, $index + 1);
                    }
                }
                $writer = new Writer($options);
                $writer->openToFile($path);
                $writer->getCurrentSheet()->setName('Campaign leads');
                $writer->addRow(Row::fromValues(array_values($columns), (new Style)->setFontBold()));
                foreach ($query->lazy(500) as $lead) {
                    // Explicit text cells preserve phone/ZIP formatting and prevent formulas.
                    $writer->addRow(new Row(array_map(fn (string $value) => new StringCell($value, null), self::values($lead, $columns))));
                }
                $writer->close();
                readfile($path);
            } finally {
                if (is_string($path) && is_file($path)) {
                    unlink($path);
                }
            }
        }, 'campaign-leads-'.now()->format('Y-m-d-His').'.'.$format, [
            'Content-Type' => $format === 'csv' ? 'text/csv; charset=UTF-8' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Cache-Control' => 'private, no-store',
        ]);
    }

    private static function values(CampaignLead $lead, array $columns): array
    {
        return array_map(function (string $field) use ($lead): string {
            $value = data_get($lead, $field);

            return $value instanceof \DateTimeInterface ? $value->format(DATE_ATOM) : (string) ($value ?? '');
        }, array_keys($columns));
    }

    private static function csvText(string $value): string
    {
        return preg_match('/^[\s\x00-\x1F]*[=+@-]/u', $value) ? "'".$value : $value;
    }
}
