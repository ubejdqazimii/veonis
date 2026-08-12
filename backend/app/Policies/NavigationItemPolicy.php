<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class NavigationItemPolicy
{
    use RequiresSuperAdmin;
}
