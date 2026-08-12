<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class SiteSettingPolicy
{
    use RequiresSuperAdmin;
}
