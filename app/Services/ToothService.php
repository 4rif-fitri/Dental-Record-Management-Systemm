<?php

namespace App\Services;

use App\Models\Tooth;

class ToothService
{
    public function getAll()
    {
        return Tooth::orderBy('tooth_number')->get();
    }

    public function getById($id)
    {
        return Tooth::with('findings')->findOrFail($id);
    }

    public function getByQuadrant($quadrant)
    {
        return Tooth::where('quadrant', $quadrant)
            ->orderBy('tooth_number')
            ->get();
    }
}
