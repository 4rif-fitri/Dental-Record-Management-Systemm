<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ToothSeeder::class,
            SurfaceConditions::class,
            ConditionSeeder::class,
            ProcedureSeeder::class,
            SurfaceSeeder::class,
            MedicineSeeder::class,
            AppointmentSeeder::class,
            AppointmentBookingSeeder::class,
            QueueSeeder::class,
            ExaminationMedicineSeeder::class,

        ]);
    }
}
