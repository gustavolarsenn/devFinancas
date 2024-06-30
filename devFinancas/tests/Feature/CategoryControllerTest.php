<?php

namespace Tests\Feature;

use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    /** @test */
    public function index_displays_categories()
    {
        // Start a session and set the user's ID in the session to simulate login
        $response = $this->withSession(['username' => 'gustavo'])->get('/category');

        $response->assertStatus(200);
        // Add more assertions here based on your requirements
    }
    
    /** @test */
    public function store_creates_category()
    {
        // Start a session and set the user's ID in the session to simulate login
        $response = $this->withSession(['username' => 'gustavo'])->post('/category', [
            'category_name' => 'Food_test',
            'user_id' => 0
        ]);

        if ($response->status() == 200) { // If the category already exists
            $response->assertStatus(200);
        } else {
            $response->assertStatus(201);
        }
        // Add more assertions here based on your requirements
    }
}