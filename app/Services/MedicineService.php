<?php

namespace App\Services;

use App\Models\Medicine;

class MedicineService
{
    public function getAll()
    {
        return Medicine::latest()->get();
    }

    public function create(array $data)
    {
        return Medicine::create($data);
    }

    public function update($id, array $data)
    {
        $medicine = Medicine::findOrFail($id);

        $medicine->update($data);

        return $medicine;
    }

    public function delete($id)
    {
        return Medicine::findOrFail($id)->delete();
    }
}
