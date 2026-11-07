<?php

namespace App\Helpers;

use App\Models\User;

class CheckRoleHelper
{
    public static function userHasRoles(int $userId, array $roles): bool
    {
        return User::where('id', $userId)
            ->whereIn('role', $roles)
            ->exists();
    }
}
