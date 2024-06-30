<?php

namespace Tests\Feature;

use Tests\TestCase;

class TransactionControllerTest extends TestCase
{
    // use RefreshDatabase;

    /** @test */
    public function index_displays_transactions()
    {
        // Start a session and set the user's ID in the session to simulate login
        $response = $this->withSession(['username' => 'gustavo'])->get('/transaction');

        $response->assertStatus(200);
        // Add more assertions here based on your requirements
    }

    /** @test */
    public function store_creates_transaction()
    {
        // Start a session and set the user's ID in the session to simulate login
        $response = $this->withSession(['username' => 'gustavo'])->post('/transaction', [
            'descricao' => 'Salary',
            'value' => 1000.00,
            'category_id' => 8,
            'type' => 'Entrada',
            'date' => '2021-10-01',
            'created_at' => '2021-10-01',
            'user_id' => 6
        ]);

        $response->assertStatus(201);
        // Add more assertions here based on your requirements
    }
    // Add more tests for other methods like store, update, etc.
}