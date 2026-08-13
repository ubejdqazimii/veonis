<?php

namespace App\Filament\Resources\DigitalCards\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DigitalCardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Profile')
                ->description('The card is hidden from website navigation and available only through its direct URL.')
                ->columns(2)
                ->schema([
                    FileUpload::make('photo')
                        ->label('Portrait photo')
                        ->image()
                        ->imageEditor()
                        ->imageEditorAspectRatios(['1:1'])
                        ->disk('public')
                        ->directory('digital-cards')
                        ->visibility('public')
                        ->columnSpanFull(),
                    TextInput::make('first_name')->label('First name')->required()->maxLength(255),
                    TextInput::make('last_name')->label('Last name')->required()->maxLength(255),
                    TextInput::make('position')->maxLength(255),
                    TextInput::make('company')->default('Veonis GmbH')->required()->maxLength(255),
                    TextInput::make('slug')
                        ->label('Direct URL name')
                        ->unique(ignoreRecord: true)
                        ->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
                        ->helperText('Leave empty to generate it from the name, e.g. edison-istrefi.'),
                    Toggle::make('is_active')->label('Card active')->default(true),
                ]),
            Section::make('Contact details')
                ->columns(2)
                ->schema([
                    TextInput::make('phone')->tel()->maxLength(255),
                    TextInput::make('email')->email()->maxLength(255),
                ]),
            Section::make('Office address')
                ->columns(2)
                ->schema([
                    TextInput::make('street')->label('Street and number')->columnSpanFull()->maxLength(255),
                    TextInput::make('zip_code')->label('ZIP code')->maxLength(24),
                    TextInput::make('city')->maxLength(255),
                    TextInput::make('country')->default('Schweiz')->maxLength(255)->columnSpanFull(),
                ]),
        ]);
    }
}
