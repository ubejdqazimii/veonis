<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class CampaignLeadPolicy
{
    use RequiresSuperAdmin;
}
