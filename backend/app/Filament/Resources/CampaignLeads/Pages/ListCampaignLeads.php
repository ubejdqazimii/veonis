<?php

namespace App\Filament\Resources\CampaignLeads\Pages;

use App\Filament\Resources\CampaignLeads\CampaignLeadResource;
use App\Support\CampaignLeadDownload;
use Filament\Actions\Action;
use Filament\Forms\Components\CheckboxList;
use Filament\Resources\Pages\ListRecords;

class ListCampaignLeads extends ListRecords
{
    protected static string $resource = CampaignLeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            $this->exportAction('exportExcel', 'Export Excel', 'xlsx'),
            $this->exportAction('exportCsv', 'Export CSV', 'csv')->color('gray'),
        ];
    }

    private function exportAction(string $name, string $label, string $format): Action
    {
        return Action::make($name)->label($label)->icon('heroicon-o-arrow-down-tray')
            ->modalHeading($label)->modalSubmitActionLabel('Download')
            ->schema([
                CheckboxList::make('columns')->label('Columns to export')
                    ->options(CampaignLeadDownload::COLUMNS)
                    ->default(array_keys(CampaignLeadDownload::COLUMNS))
                    ->bulkToggleable()->columns(2)->required()->minItems(1)
                    ->helperText('Choose at least one column. Your current campaign, status and search filters apply.'),
            ])
            ->action(fn (array $data) => CampaignLeadDownload::response($this->getFilteredSortedTableQuery(), $format, $data['columns']));
    }

    public function getSubheading(): ?string
    {
        return 'Choose which columns to export. Downloads include all matching leads across all pages. Campaign, status and search filters also apply to exports.';
    }
}
