<?php

namespace App\Filament\Resources\DigitalCards;

use App\Filament\Resources\DigitalCards\Pages\CreateDigitalCard;
use App\Filament\Resources\DigitalCards\Pages\EditDigitalCard;
use App\Filament\Resources\DigitalCards\Pages\ListDigitalCards;
use App\Filament\Resources\DigitalCards\Schemas\DigitalCardForm;
use App\Filament\Resources\DigitalCards\Tables\DigitalCardsTable;
use App\Models\DigitalCard;
use App\Support\PageVisitMetrics;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class DigitalCardResource extends Resource
{
    protected static ?string $model = DigitalCard::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedIdentification;

    protected static ?string $navigationLabel = 'Digital business cards';

    protected static ?string $modelLabel = 'digital business card';

    protected static ?string $pluralModelLabel = 'digital business cards';

    public static function getEloquentQuery(): Builder
    {
        return PageVisitMetrics::apply(parent::getEloquentQuery(), '/team/');
    }

    public static function form(Schema $schema): Schema
    {
        return DigitalCardForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DigitalCardsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDigitalCards::route('/'),
            'create' => CreateDigitalCard::route('/create'),
            'edit' => EditDigitalCard::route('/{record}/edit'),
        ];
    }
}
