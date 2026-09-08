<?php

namespace App\Filament\Resources\Campaigns;

use App\Models\Campaign;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CampaignResource extends Resource
{
    protected static ?string $model = Campaign::class;

    protected static ?string $navigationLabel = 'Lead campaigns';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Campaign title')->required()->maxLength(255),
            TextInput::make('slug')->label('URL slug')->helperText('Public URL: https://www.veonissuisse.ch/campaign/your-slug. The URL is fixed after creation.')->required()->maxLength(120)->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')->unique(ignoreRecord: true)->disabledOn('edit'),
            Textarea::make('description')->label('Main campaign description')->required()->rows(5)->columnSpanFull(),
            Repeater::make('giveaways')->schema([
                TextInput::make('title')->required()->maxLength(255),
                Textarea::make('description')->required()->rows(3),
                FileUpload::make('image')->label('Giveaway picture')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->disk('public')->directory('campaign-giveaways')->visibility('public')->maxSize(5120)->required(),
                TextInput::make('image_alt')->label('Picture description')->maxLength(255)->helperText('Describe the picture for accessibility. Defaults to the giveaway title.'),
            ])->minItems(1)->defaultItems(1)->required()->columnSpanFull(),
            Textarea::make('terms')->label('Participation terms')->helperText('Enter the applicable campaign conditions, eligibility, closing date and giveaway rules. These are shown before consent.')->required()->rows(8)->columnSpanFull(),
            Toggle::make('is_published')->label('Published')->default(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable(), TextColumn::make('public_url')->label('Campaign link')->copyable(),
            IconColumn::make('is_published')->boolean(), TextColumn::make('leads_count')->counts('leads')->label('Leads'),
        ])->recordActions([EditAction::make(), Action::make('open')->label('Open page')->url(fn (Campaign $record) => $record->public_url)->openUrlInNewTab()]);
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListCampaigns::route('/'), 'create' => Pages\CreateCampaign::route('/create'), 'edit' => Pages\EditCampaign::route('/{record}/edit')];
    }
}
