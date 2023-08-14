<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
  /**
   * Generate Users.
   *
   * @return void
   */
  public function run()
  {
    // Create primary user account for testing.
    // 1
    User::create([
      'name' => 'Admin',
      'email' => 'admin@test.com',
      'password' => bcrypt('admin123!@#'),
    ]);

    $this->command->info('Users table seeded.');
  }
}
