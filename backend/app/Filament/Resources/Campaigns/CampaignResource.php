<?php

namespace App\Filament\Resources\Campaigns;

use App\Models\Campaign;
use App\Support\PageVisitMetrics;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ReplicateAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;

class CampaignResource extends Resource
{
    protected static ?string $model = Campaign::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGift;

    protected static ?string $navigationLabel = 'Lead campaigns';

    public static function getEloquentQuery(): Builder
    {
        return PageVisitMetrics::apply(parent::getEloquentQuery(), '/', '/campaign/');
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Campaign title')->required()->maxLength(255),
            TextInput::make('slug')->label('URL slug')->helperText('Public URL: https://www.veonissuisse.ch/your-slug. The URL is fixed after creation.')->required()->maxLength(120)->rules([Rule::notIn(Campaign::RESERVED_SLUGS)])->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')->unique(ignoreRecord: true)->disabledOn('edit'),
            Textarea::make('description')->label('Main campaign description')->required()->rows(5)->columnSpanFull(),
            Repeater::make('giveaways')->schema([
                TextInput::make('title')->required()->maxLength(255),
                Textarea::make('description')->required()->rows(3),
                FileUpload::make('image')->label('Giveaway picture')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->disk('public')->directory('campaign-giveaways')->visibility('public')->maxSize(5120)->helperText('Optional. Giveaways can be published without a picture.'),
                TextInput::make('image_alt')->label('Picture description')->maxLength(255)->helperText('Describe the picture for accessibility. Defaults to the giveaway title.'),
            ])->cloneable()->minItems(1)->defaultItems(1)->required()->columnSpanFull(),
            Textarea::make('terms')->label('Participation terms')->helperText('Enter the applicable campaign conditions, eligibility, closing date and giveaway rules. These are shown before consent.')->required()->rows(8)->columnSpanFull(),
            Toggle::make('is_published')->label('Published')->default(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable(),
            TextColumn::make('visits_count')->label('Visits')->numeric()->sortable()->tooltip('Total recorded page views for this URL'),
            TextColumn::make('visitors_count')->label('Visitors')->numeric()->sortable()->tooltip('Distinct browser sessions for this URL'), TextColumn::make('public_url')->label('Campaign link')->copyable(),
            IconColumn::make('is_published')->boolean(), TextColumn::make('leads_count')->counts('leads')->label('Leads'),
        ])->recordActions([EditAction::make(), static::duplicateAction(), Action::make('open')->label('Open page')->url(fn (Campaign $record) => $record->public_url)->openUrlInNewTab()]);
    }

    public static function duplicateAction(): ReplicateAction
    {
        return ReplicateAction::make('duplicate')
            ->label('Duplicate')->excludeAttributes(['visits_count', 'visitors_count', 'leads_count'])
            ->authorize(fn (Campaign $record): bool => auth()->user()?->can('replicate', $record) && static::canCreate())
            ->modalHeading('Duplicate campaign')
            ->modalDescription('Copies descriptions, giveaways, pictures and terms into a new unpublished draft. Leads stay with the original campaign.')
            ->schema([
                TextInput::make('title')->label('New campaign title')->required()->maxLength(255),
                TextInput::make('slug')->label('New URL slug')->required()->maxLength(120)->rules([Rule::notIn(Campaign::RESERVED_SLUGS)])->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')->unique(table: Campaign::class, column: 'slug'),
            ])
            ->mutateRecordDataUsing(fn (array $data): array => [...$data, 'title' => mb_substr($data['title'].' – Copy', 0, 255), 'slug' => ''])
            ->beforeReplicaSaved(function (Campaign $replica): void {
                $replica->is_published = false;
            })
            ->successRedirectUrl(fn (Campaign $replica): string => static::getUrl('edit', ['record' => $replica]));
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListCampaigns::route('/'), 'create' => Pages\CreateCampaign::route('/create'), 'edit' => Pages\EditCampaign::route('/{record}/edit')];
    }
}
