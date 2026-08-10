<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['locale', 'label', 'href', 'group', 'sort_order', 'is_published'])]
class NavigationItem extends Model
{
    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }
}
