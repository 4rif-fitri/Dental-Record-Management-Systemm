<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'uploaded_by_user_id',
        'source_name',
        'source_id',
        'media_type',
        'file_name',
        'title',
        'description',
    ];

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by_user_id');
    }
}
