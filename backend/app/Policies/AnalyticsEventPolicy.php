<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class AnalyticsEventPolicy
{
    use RequiresSuperAdmin;
}
