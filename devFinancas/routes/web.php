<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/teste', function () {
    return view('teste');
});

// returns the home page with all Users
Route::get('/', UserController::class .'@index')->name('users.index');
// returns the form for adding a User
Route::post('/users/create', UserController::class . '@create')->name('users.create');
// adds a User to the database
Route::post('/users', UserController::class .'@store')->name('users.store');
// // returns a page that shows a full User
// Route::get('/users/{user}', UserController::class .'@show')->name('users.show');
// returns the form for editing a User
Route::get('/users/{user}/edit', UserController::class .'@edit')->name('users.edit');
// updates a User
Route::put('/users/{user}', UserController::class .'@update')->name('users.update');
// deletes a User
Route::delete('/users/{user}', UserController::class .'@destroy')->name('users.destroy');
