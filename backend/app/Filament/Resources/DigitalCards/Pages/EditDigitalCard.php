<?php

namespace App\Filament\Resources\DigitalCards\Pages;

use App\Filament\Resources\DigitalCards\DigitalCardResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDigitalCard extends EditRecord
{
    protected static string $resource = DigitalCardResource::class;

    protected function getHeaderActions(): array
    {
        return [DeleteAction::make()];
    }
}
