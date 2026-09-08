<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class CampaignPolicy
{
    use RequiresSuperAdmin;
}
