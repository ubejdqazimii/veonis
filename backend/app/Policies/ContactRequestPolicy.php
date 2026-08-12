<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class ContactRequestPolicy
{
    use RequiresSuperAdmin;
}
