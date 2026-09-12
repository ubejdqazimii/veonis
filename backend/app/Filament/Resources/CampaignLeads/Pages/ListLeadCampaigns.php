<?php

namespace App\Filament\Resources\CampaignLeads\Pages;

use App\Filament\Resources\CampaignLeads\CampaignLeadResource;
use App\Models\Campaign;
use App\Models\CampaignLead;
use Filament\Resources\Pages\ListRecords;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;

class ListLeadCampaigns extends ListRecords
{
    protected static string $resource = CampaignLeadResource::class;

    public function mount(): void
    {
        Gate::authorize('viewAny', CampaignLead::class);
        parent::mount();
    }

    public function table(Table $table): Table
    {
        return $table->query(Campaign::query()->withCount([
            'leads',
            'leads as new_leads_count' => fn ($query) => $query->where('status', 'new'),
            'leads as contacted_leads_count' => fn ($query) => $query->where('status', 'contacted'),
            'leads as closed_leads_count' => fn ($query) => $query->where('status', 'closed'),
        ]))->columns([
            TextColumn::make('title')->label('Campaign')->searchable()->sortable()->color('primary')
                ->url(fn (Campaign $record) => CampaignLeadResource::getUrl('campaign', ['campaign' => $record->id])),
            TextColumn::make('slug')->label('Campaign URL')->formatStateUsing(fn (string $state): string => '/'.$state)->searchable(),
            TextColumn::make('leads_count')->label('Total leads')->numeric()->sortable()->badge(),
            TextColumn::make('new_leads_count')->label('New')->numeric()->sortable(),
            TextColumn::make('contacted_leads_count')->label('Contacted')->numeric()->sortable(),
            TextColumn::make('closed_leads_count')->label('Closed')->numeric()->sortable(),
        ])->filters([])->recordActions([])
            ->recordUrl(fn (Campaign $record) => CampaignLeadResource::getUrl('campaign', ['campaign' => $record->id]))
            ->emptyStateHeading('No campaigns yet');
    }

    public function getSubheading(): ?string
    {
        return 'Select a campaign to view its leads and export the columns you need.';
    }
}
