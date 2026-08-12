<?php

namespace App\Policies;

use App\Models\User;
use App\Policies\Concerns\RequiresSuperAdmin;

class UserPolicy
{
    use RequiresSuperAdmin;

    public function delete(User $user, User $model): bool
    {
        return false;
    }

    public function deleteAny(User $user): bool
    {
        return false;
    }
}
