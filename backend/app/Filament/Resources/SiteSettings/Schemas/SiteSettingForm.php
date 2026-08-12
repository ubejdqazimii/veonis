<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Top contact bar')
                ->description('Manage the email, telephone and any additional contact links shown above the main navigation.')
                ->schema([
                    Toggle::make('preheader_enabled')
                        ->label('Show top contact bar')
                        ->default(true),
                    Repeater::make('contact_items')
                        ->label('Contact links')
                        ->columns(2)
                        ->schema([
                            Select::make('type')
                                ->options([
                                    'email' => 'Email',
                                    'phone' => 'Phone',
                                    'link' => 'Other link',
                                ])
                                ->required()
                                ->default('email'),
                            TextInput::make('label')
                                ->helperText('Visible text, e.g. info@veonissuisse.ch or +41 79 812 81 88.')
                                ->required(),
                            TextInput::make('href')
                                ->label('Link')
                                ->helperText('Use mailto:, tel:, or a complete https:// URL.')
                                ->required(),
                            Toggle::make('is_visible')->label('Visible')->default(true),
                        ])
                        ->reorderable()
                        ->collapsible()
                        ->addActionLabel('Add contact link'),
                ]),
            Section::make('Social media')
                ->description('Add and reorder LinkedIn, Instagram, Facebook or any other social profile.')
                ->schema([
                    Repeater::make('social_links')
                        ->label('Social profiles')
                        ->columns(2)
                        ->schema([
                            TextInput::make('label')
                                ->helperText('Accessible name, e.g. LinkedIn.')
                                ->required(),
                            TextInput::make('short_label')
                                ->label('Short label')
                                ->helperText('Text inside the circle, e.g. in, ig, fb, yt or x.')
                                ->required()
                                ->maxLength(4),
                            TextInput::make('url')
                                ->label('Profile URL')
                                ->url()
                                ->required(),
                            Toggle::make('open_new_tab')->label('Open in new tab')->default(true),
                            Toggle::make('is_visible')->label('Visible')->default(true),
                        ])
                        ->reorderable()
                        ->collapsible()
                        ->addActionLabel('Add social profile'),
                ]),
            TextInput::make('key')->default('global')->hidden(),
            TextInput::make('name')->default('Global website settings')->hidden(),
        ]);
    }
}
