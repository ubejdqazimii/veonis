<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class DigitalCardPolicy
{
    use RequiresSuperAdmin;
}
