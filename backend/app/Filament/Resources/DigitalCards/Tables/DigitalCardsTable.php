<?php

namespace App\Filament\Resources\DigitalCards\Tables;

use App\Models\DigitalCard;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DigitalCardsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo')->label('Photo')->disk('public')->circular(),
                TextColumn::make('full_name')->label('Name')->searchable(['first_name', 'last_name']),
                TextColumn::make('position')->placeholder('Not set')->searchable(),
                TextColumn::make('slug')
                    ->label('Direct card URL')
                    ->formatStateUsing(fn (string $state): string => 'https://www.veonissuisse.ch/team/'.$state)
                    ->url(fn (DigitalCard $record): string => 'https://www.veonissuisse.ch/team/'.$record->slug)
                    ->openUrlInNewTab()
                    ->copyable(),
                IconColumn::make('is_active')->label('Active')->boolean(),
                TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->defaultSort('last_name')
            ->recordActions([EditAction::make()])
            ->toolbarActions([
                BulkActionGroup::make([DeleteBulkAction::make()]),
            ]);
    }
}
