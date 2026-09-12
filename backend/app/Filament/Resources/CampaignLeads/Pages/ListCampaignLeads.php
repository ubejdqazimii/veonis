<?php

namespace App\Filament\Resources\CampaignLeads\Pages;

use App\Filament\Resources\CampaignLeads\CampaignLeadResource;
use App\Models\Campaign;
use App\Models\CampaignLead;
use App\Support\CampaignLeadDownload;
use Filament\Actions\Action;
use Filament\Forms\Components\CheckboxList;
use Filament\Resources\Pages\ListRecords;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;
use Livewire\Attributes\Locked;

class ListCampaignLeads extends ListRecords
{
    protected static string $resource = CampaignLeadResource::class;

    #[Locked]
    public int $campaignId;

    public function mount(int|string $campaign = 0): void
    {
        Gate::authorize('viewAny', CampaignLead::class);
        $this->campaignId = Campaign::findOrFail($campaign)->id;
        parent::mount();
    }

    public function table(Table $table): Table
    {
        return $table->modifyQueryUsing(fn ($query) => $query->where('campaign_id', $this->campaignId));
    }

    public function getTitle(): string
    {
        return Campaign::findOrFail($this->campaignId)->title.' · Leads';
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('backToCampaigns')->label('All campaigns')->url(CampaignLeadResource::getUrl('index'))->color('gray'),
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
                    ->helperText('Choose at least one column. Only leads from this campaign are exported. Status and search filters apply.'),
            ])
            ->action(fn (array $data) => CampaignLeadDownload::response($this->getFilteredSortedTableQuery(), $format, $data['columns']));
    }

    public function getSubheading(): ?string
    {
        return 'Leads for this campaign only. Choose columns when exporting Excel or CSV; status and search filters apply across all pages.';
    }
}
