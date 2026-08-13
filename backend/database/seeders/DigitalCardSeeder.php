<?php

namespace Database\Seeders;

use App\Models\DigitalCard;
use Illuminate\Database\Seeder;

class DigitalCardSeeder extends Seeder
{
    public function run(): void
    {
        DigitalCard::query()->firstOrCreate(
            ['slug' => 'edison-istrefi'],
            [
                'first_name' => 'Edison',
                'last_name' => 'Istrefi',
                'position' => 'Geschäftsführer',
                'company' => 'Veonis GmbH',
                'phone' => '+41 79 812 81 88',
                'email' => 'info@veonissuisse.ch',
                'street' => 'Im Dreispitz 39',
                'zip_code' => '8105',
                'city' => 'Regensdorf',
                'country' => 'Schweiz',
                'photo' => 'digital-cards/edison-istrefi.jpg',
                'is_active' => true,
            ],
        );

        DigitalCard::query()->firstOrCreate(
            ['slug' => 'visar-ademi'],
            [
                'first_name' => 'Visar',
                'last_name' => 'Ademi',
                'company' => 'Veonis GmbH',
                'street' => 'Im Dreispitz 39',
                'zip_code' => '8105',
                'city' => 'Regensdorf',
                'country' => 'Schweiz',
                'is_active' => true,
            ],
        );
    }
}
