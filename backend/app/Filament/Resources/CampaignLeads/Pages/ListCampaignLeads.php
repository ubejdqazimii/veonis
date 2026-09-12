<?php

namespace App\Filament\Resources\CampaignLeads\Pages;

use App\Filament\Resources\CampaignLeads\CampaignLeadResource;
use App\Support\CampaignLeadDownload;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;

class ListCampaignLeads extends ListRecords
{
    protected static string $resource = CampaignLeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('exportExcel')->label('Export Excel')->icon('heroicon-o-arrow-down-tray')
                ->action(fn () => CampaignLeadDownload::response($this->getFilteredSortedTableQuery(), 'xlsx')),
            Action::make('exportCsv')->label('Export CSV')->icon('heroicon-o-arrow-down-tray')->color('gray')
                ->action(fn () => CampaignLeadDownload::response($this->getFilteredSortedTableQuery(), 'csv')),
        ];
    }

    public function getSubheading(): ?string
    {
        return 'Exports include every field and all matching leads across all pages. Campaign, status and search filters also apply to exports.';
    }
}
