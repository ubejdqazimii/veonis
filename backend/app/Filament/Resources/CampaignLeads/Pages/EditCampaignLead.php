<?php

namespace App\Filament\Resources\CampaignLeads\Pages;

use App\Filament\Resources\CampaignLeads\CampaignLeadResource;
use Filament\Resources\Pages\EditRecord;

class EditCampaignLead extends EditRecord
{
    protected static string $resource = CampaignLeadResource::class;

    public function getBreadcrumbs(): array
    {
        return [
            CampaignLeadResource::getUrl('index') => 'Campaign leads',
            CampaignLeadResource::getUrl('campaign', ['campaign' => $this->getRecord()->campaign_id]) => $this->getRecord()->campaign_title,
            'View / manage lead',
        ];
    }

    protected function getRedirectUrl(): ?string
    {
        return CampaignLeadResource::getUrl('campaign', ['campaign' => $this->getRecord()->campaign_id]);
    }
}
