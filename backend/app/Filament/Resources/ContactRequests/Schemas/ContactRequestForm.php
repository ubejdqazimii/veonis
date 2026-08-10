<?php

namespace App\Filament\Resources\ContactRequests\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('CRM workflow')
                ->columns(2)
                ->schema([
                    Select::make('status')
                        ->options([
                            'new' => 'New',
                            'in_progress' => 'In progress',
                            'waiting' => 'Waiting for client',
                            'qualified' => 'Qualified',
                            'won' => 'Won',
                            'closed' => 'Closed',
                            'spam' => 'Spam',
                        ])
                        ->required(),
                    Select::make('priority')
                        ->options(['low' => 'Low', 'normal' => 'Normal', 'high' => 'High', 'urgent' => 'Urgent'])
                        ->required(),
                    Select::make('assigned_to')
                        ->relationship('assignee', 'name')
                        ->searchable()
                        ->preload()
                        ->label('Assigned to'),
                    DateTimePicker::make('last_contacted_at')->seconds(false),
                ]),
            Section::make('Contact')
                ->columns(2)
                ->schema([
                    TextInput::make('first_name')->required(),
                    TextInput::make('last_name')->required(),
                    TextInput::make('email')->email()->required(),
                    TextInput::make('phone')->tel()->required(),
                    TextInput::make('client_type')->required(),
                    TextInput::make('contact_method')->required(),
                    TextInput::make('interest')->required()->columnSpanFull(),
                    Textarea::make('message')->required()->rows(7)->columnSpanFull(),
                ]),
            Section::make('Request metadata')
                ->collapsed()
                ->columns(2)
                ->schema([
                    TextInput::make('public_id')->disabled()->dehydrated(false),
                    Select::make('locale')->options(['de' => 'Deutsch', 'en' => 'English'])->required(),
                    TextInput::make('source_url')->url()->columnSpanFull(),
                    DateTimePicker::make('privacy_accepted_at')->disabled()->dehydrated(false),
                    TextInput::make('ip_hash')->disabled()->dehydrated(false),
                    Textarea::make('user_agent')->disabled()->dehydrated(false)->columnSpanFull(),
                ]),
        ]);
    }
}
