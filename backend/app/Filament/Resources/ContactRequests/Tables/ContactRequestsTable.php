<?php

namespace App\Filament\Resources\ContactRequests\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ContactRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('full_name')->label('Contact')->searchable(['first_name', 'last_name'])->sortable(['last_name']),
                TextColumn::make('email')->searchable()->copyable(),
                TextColumn::make('interest')->searchable()->limit(32),
                TextColumn::make('status')->badge()->color(fn (string $state): string => match ($state) {
                    'new' => 'danger',
                    'in_progress' => 'warning',
                    'qualified', 'won' => 'success',
                    'spam', 'closed' => 'gray',
                    default => 'info',
                }),
                TextColumn::make('priority')->badge()->color(fn (string $state): string => match ($state) {
                    'urgent' => 'danger',
                    'high' => 'warning',
                    'low' => 'gray',
                    default => 'info',
                }),
                TextColumn::make('assignee.name')->label('Owner')->placeholder('Unassigned'),
                TextColumn::make('created_at')->label('Received')->since()->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'new' => 'New', 'in_progress' => 'In progress', 'waiting' => 'Waiting',
                    'qualified' => 'Qualified', 'won' => 'Won', 'closed' => 'Closed', 'spam' => 'Spam',
                ]),
                SelectFilter::make('priority')->options(['low' => 'Low', 'normal' => 'Normal', 'high' => 'High', 'urgent' => 'Urgent']),
                SelectFilter::make('assigned_to')->relationship('assignee', 'name')->label('Owner'),
            ])
            ->recordActions([ViewAction::make(), EditAction::make()])
            ->toolbarActions([
                BulkActionGroup::make([DeleteBulkAction::make()]),
            ]);
    }
}
