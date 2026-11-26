<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetPin extends Model
{
    protected $table = 'password_reset_pins';

    protected $fillable = [
        'email',
        'pin_hash',
        'expires_at',
        'attempts',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
