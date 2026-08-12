<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\UserRole;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('User account')
                ->description('Create administrators and control exactly which part of the dashboard they can access.')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('email')
                        ->email()
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),
                    Select::make('role')
                        ->options([
                            UserRole::BlogEditor->value => UserRole::BlogEditor->label(),
                            UserRole::SuperAdmin->value => UserRole::SuperAdmin->label(),
                        ])
                        ->helperText('Blog editors can only create, edit and publish blog articles. Super admins have full access.')
                        ->default(UserRole::BlogEditor->value)
                        ->disabled(fn (?User $record): bool => $record?->is(auth()->user()) ?? false)
                        ->required(),
                    Toggle::make('is_active')
                        ->label('Account active')
                        ->helperText('Disable this to immediately block dashboard access.')
                        ->default(true)
                        ->disabled(fn (?User $record): bool => $record?->is(auth()->user()) ?? false),
                ]),
            Section::make('Password')
                ->description('Leave these fields empty when editing to keep the current password.')
                ->columns(2)
                ->schema([
                    TextInput::make('password')
                        ->password()
                        ->revealable()
                        ->confirmed()
                        ->required(fn (string $operation): bool => $operation === 'create')
                        ->dehydrated(fn (?string $state): bool => filled($state))
                        ->minLength(10),
                    TextInput::make('password_confirmation')
                        ->label('Confirm password')
                        ->password()
                        ->revealable()
                        ->dehydrated(false),
                ]),
        ]);
    }
}
