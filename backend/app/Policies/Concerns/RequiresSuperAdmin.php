<?php

namespace App\Policies\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

trait RequiresSuperAdmin
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function view(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function delete(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function deleteAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function restore(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function restoreAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function forceDelete(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function forceDeleteAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function replicate(User $user, Model $model): bool
    {
        return $user->isSuperAdmin();
    }

    public function reorder(User $user): bool
    {
        return $user->isSuperAdmin();
    }
}
