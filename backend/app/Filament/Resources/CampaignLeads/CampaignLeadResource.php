<?php

namespace App\Filament\Resources\CampaignLeads;

use App\Models\CampaignLead;
use BackedEnum;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Grouping\Group;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CampaignLeadResource extends Resource
{
    protected static ?string $model = CampaignLead::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserPlus;

    protected static ?string $navigationLabel = 'Campaign leads';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        $fields = [];
        foreach (['campaign_title', 'source_url', 'first_name', 'last_name', 'zip_code', 'city', 'email', 'mobile', 'birth_year', 'consented_at'] as $field) {
            $fields[] = TextInput::make($field)->disabled();
        }

        return $schema->components([...$fields, Textarea::make('terms_snapshot')->disabled()->columnSpanFull(), Textarea::make('consent_text')->disabled()->columnSpanFull(), Select::make('status')->options(['new' => 'New', 'contacted' => 'Contacted', 'closed' => 'Closed'])->required()]);
    }

    public static function table(Table $table): Table
    {
        return $table->modifyQueryUsing(fn (Builder $query) => $query->with(['campaign' => fn ($campaign) => $campaign->withCount([
            'leads',
            'leads as new_leads_count' => fn (Builder $leads) => $leads->where('status', 'new'),
            'leads as contacted_leads_count' => fn (Builder $leads) => $leads->where('status', 'contacted'),
            'leads as closed_leads_count' => fn (Builder $leads) => $leads->where('status', 'closed'),
        ])]))
            ->defaultGroup(Group::make('campaign_id')->label('Campaign')->collapsible()
                ->getTitleFromRecordUsing(fn (CampaignLead $record): string => ($record->campaign?->title ?? $record->campaign_title).' · /'.($record->campaign?->slug ?? ''))
                ->getDescriptionFromRecordUsing(fn (CampaignLead $record): string => sprintf(
                    'Campaign totals: %d leads · %d new · %d contacted · %d closed (all leads, regardless of filters)',
                    $record->campaign?->leads_count ?? 0,
                    $record->campaign?->new_leads_count ?? 0,
                    $record->campaign?->contacted_leads_count ?? 0,
                    $record->campaign?->closed_leads_count ?? 0,
                )))
            ->columns([
                TextColumn::make('campaign_title')->label('Campaign')->searchable()->sortable(),
                TextColumn::make('campaign.leads_count')->label('Campaign leads')->numeric()->badge()->tooltip('Total leads in this campaign, across all pages and statuses'),
                TextColumn::make('campaign.new_leads_count')->label('New')->numeric()->toggleable(),
                TextColumn::make('campaign.contacted_leads_count')->label('Contacted')->numeric()->toggleable(),
                TextColumn::make('campaign.closed_leads_count')->label('Closed')->numeric()->toggleable(),
                TextColumn::make('first_name')->searchable(), TextColumn::make('last_name')->searchable(),
                TextColumn::make('email')->searchable()->copyable(), TextColumn::make('mobile')->copyable(),
                TextColumn::make('zip_code'), TextColumn::make('city')->searchable(), TextColumn::make('birth_year'),
                TextColumn::make('source_url')->copyable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')->badge(), TextColumn::make('consented_at')->dateTime()->sortable(),
            ])->defaultSort('created_at', 'desc')->filters([SelectFilter::make('campaign')->relationship('campaign', 'title'), SelectFilter::make('status')->options(['new' => 'New', 'contacted' => 'Contacted', 'closed' => 'Closed'])])->recordActions([EditAction::make()->label('View / manage')]);
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListCampaignLeads::route('/'), 'edit' => Pages\EditCampaignLead::route('/{record}/edit')];
    }
}
