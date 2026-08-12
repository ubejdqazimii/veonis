<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;

class BlogPostPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->canManageBlog();
    }

    public function view(User $user, BlogPost $blogPost): bool
    {
        return $user->canManageBlog();
    }

    public function create(User $user): bool
    {
        return $user->canManageBlog();
    }

    public function update(User $user, BlogPost $blogPost): bool
    {
        return $user->canManageBlog();
    }

    public function delete(User $user, BlogPost $blogPost): bool
    {
        return $user->isSuperAdmin();
    }

    public function deleteAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }
}
