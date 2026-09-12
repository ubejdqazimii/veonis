<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Filament\Resources\CampaignLeads\Pages\ListCampaignLeads;
use App\Models\Campaign;
use App\Models\CampaignLead;
use App\Models\User;
use App\Support\CampaignLeadDownload;
use Filament\Facades\Filament;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class CampaignLeadExportTest extends TestCase
{
    use RefreshDatabase;

    private function lead(): CampaignLead
    {
        $campaign = Campaign::create(['title' => 'Summer', 'slug' => 'summer', 'description' => 'Description', 'giveaways' => [], 'terms' => 'Terms', 'is_published' => true]);

        return CampaignLead::create([
            'campaign_id' => $campaign->id, 'campaign_title' => 'Summer at signup', 'source_url' => 'https://www.veonissuisse.ch/summer',
            'first_name' => '=1+1', 'last_name' => 'Müller', 'zip_code' => '0123', 'city' => 'Zürich', 'email' => 'test@example.com',
            'mobile' => '+41 79 123 45 67', 'birth_year' => 1990, 'status' => 'new', 'consented_at' => now(),
            'terms_snapshot' => "Full terms, with commas\nand new lines", 'consent_text' => 'Contact by email or phone accepted',
        ]);
    }

    public function test_csv_contains_every_field_all_rows_and_safe_text(): void
    {
        $this->actingAs(User::factory()->create());
        $lead = $this->lead();
        for ($i = 0; $i < 30; $i++) {
            $copy = $lead->replicate();
            $copy->email = "test{$i}@example.com";
            $copy->save();
        }
        $response = CampaignLeadDownload::response(CampaignLead::query()->orderBy('id'), 'csv');
        ob_start();
        $response->sendContent();
        $csv = substr(ob_get_clean(), 3);
        $file = fopen('php://memory', 'r+');
        fwrite($file, $csv);
        rewind($file);
        $rows = [];
        while (($row = fgetcsv($file, escape: '')) !== false) {
            $rows[] = $row;
        }
        fclose($file);
        $this->assertCount(32, $rows);
        $this->assertSame(array_values(CampaignLeadDownload::COLUMNS), $rows[0]);
        $this->assertSame("'=1+1", $rows[1][5]);
        $this->assertSame('0123', $rows[1][7]);
        $this->assertSame("'+41 79 123 45 67", $rows[1][10]);
        $this->assertSame($lead->terms_snapshot, $rows[1][15]);
        $this->assertSame('summer', $rows[1][3]);
    }

    public function test_excel_is_a_valid_workbook_with_literal_phone_zip_and_formula_like_text(): void
    {
        $this->actingAs(User::factory()->create());
        $this->lead();
        $response = CampaignLeadDownload::response(CampaignLead::query(), 'xlsx');
        ob_start();
        $response->sendContent();
        $content = ob_get_clean();
        $path = tempnam(sys_get_temp_dir(), 'test-leads-');
        try {
            file_put_contents($path, $content);
            $zip = new \ZipArchive;
            $this->assertTrue($zip->open($path));
            $xml = $zip->getFromName('xl/worksheets/sheet1.xml');
            $this->assertStringContainsString('0123', $xml);
            $this->assertStringContainsString('+41 79 123 45 67', $xml);
            $this->assertStringContainsString('=1+1', $xml);
            $this->assertStringNotContainsString('<f>', $xml);
            $this->assertStringContainsString('Accepted terms and conditions', $xml);
            $zip->close();
        } finally {
            unlink($path);
        }
    }

    public function test_admin_buttons_download_and_use_table_search(): void
    {
        $this->actingAs(User::factory()->create());
        Filament::setCurrentPanel(Filament::getPanel('admin'));
        $this->lead();
        $component = Livewire::test(ListCampaignLeads::class)->searchTable('no-match');
        $this->assertSame(0, $component->instance()->getFilteredSortedTableQuery()->count());
        $component->callAction('exportCsv')->assertFileDownloaded();
        Livewire::test(ListCampaignLeads::class)->callAction('exportExcel')->assertFileDownloaded();
    }

    public function test_non_admin_cannot_export(): void
    {
        $this->actingAs(User::factory()->create(['role' => UserRole::BlogEditor]));
        $this->expectException(AuthorizationException::class);
        CampaignLeadDownload::response(CampaignLead::query(), 'csv');
    }
}
