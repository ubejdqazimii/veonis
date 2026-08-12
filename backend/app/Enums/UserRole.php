<?php

namespace App\Enums;

enum UserRole: string
{
    case BlogEditor = 'blog_editor';
    case SuperAdmin = 'super_admin';

    public function label(): string
    {
        return match ($this) {
            self::BlogEditor => 'Blog editor',
            self::SuperAdmin => 'Super admin',
        };
    }
}
