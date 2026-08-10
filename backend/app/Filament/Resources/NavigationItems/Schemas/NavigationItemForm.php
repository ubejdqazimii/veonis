<?php

namespace App\Filament\Resources\NavigationItems\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NavigationItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('locale')->options(['de' => 'Deutsch', 'en' => 'English'])->required(),
            TextInput::make('label')->required()->maxLength(150),
            TextInput::make('href')->required()->maxLength(500),
            Select::make('group')
                ->options(['primary' => 'Primary navigation', 'utility' => 'Utility navigation', 'footer' => 'Footer'])
                ->required()
                ->default('primary'),
            TextInput::make('sort_order')->numeric()->minValue(0)->required()->default(0),
            Toggle::make('is_published')->label('Visible')->default(true),
        ]);
    }
}
