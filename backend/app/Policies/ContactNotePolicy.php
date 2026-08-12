<?php

namespace App\Policies;

use App\Policies\Concerns\RequiresSuperAdmin;

class ContactNotePolicy
{
    use RequiresSuperAdmin;
}
