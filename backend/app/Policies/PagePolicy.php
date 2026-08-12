<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class PagePolicy
{
    use RequiresSuperAdmin;
}
