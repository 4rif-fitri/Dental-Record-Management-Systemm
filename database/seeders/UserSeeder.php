<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'student/staff_id' => 'DNT001',
                'ic/passport' => '010101-01-1234',
                'name' => 'Dr. Ahmad',
                'gender' => 'Male',
                'phone_number' => '0123456789',
                'role' => 'dentist',
                'email' => 'ahmad@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student/staff_id' => 'DNT002',
                'ic/passport' => '020202-02-1234',
                'name' => 'Dr. Siti',
                'gender' => 'Female',
                'phone_number' => '0134567890',
                'role' => 'dentist',
                'email' => 'siti@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student/staff_id' => 'P001',
                'ic/passport' => '030303-03-1234',
                'name' => 'Lorem',
                'gender' => 'Male',
                'phone_number' => '0145678901',
                'role' => 'patient',
                'email' => 'lorem@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student/staff_id' => 'P002',
                'ic/passport' => '040404-04-1234',
                'name' => 'Dopy',
                'gender' => 'Female',
                'phone_number' => '0156789012',
                'role' => 'patient',
                'email' => 'dopy@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
