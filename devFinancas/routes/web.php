<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type, X-CSRF-TOKEN');
header('Access-Control-Allow-Credentials: true');
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

use Illuminate\Support\Facades\Log;

use App\Http\Middleware\CheckSession;

Route::get('/', function () {
    return view('welcome');
});

// Group routes that require an active session

Route::group(['middleware' => [CheckSession::class]], function () {
    // returns the home page with all Users
    Route::get('/users', UserController::class .'@index')->name('users.index');
    // returns the form for adding a User
    
    // returns a page that shows a full User
    Route::get('/users/{user}', UserController::class .'@show')->name('users.show');
    // returns the form for editing a User
    Route::get('/users/{user}/edit', UserController::class .'@edit')->name('users.edit');
    // updates a User
    Route::put('/users/{user}', UserController::class .'@update')->name('users.update');
    // deletes a User
    Route::delete('/users/{user}', UserController::class .'@destroy')->name('users.destroy');

    // returns the home page with all Users
    Route::get('/category', [CategoryController::class, 'index']);
    // returns the form for adding a User
    Route::get('/category/create', CategoryController::class . '@create')->name('category.create');
    // adds a User to the database
    Route::post('/category', CategoryController::class .'@store')->name('category.store');
    // returns a page that shows a full User
    Route::get('/category/{category}', CategoryController::class .'@show')->name('category.show');
    // returns the form for editing a User
    Route::get('/category/{category}/edit', CategoryController::class .'@edit')->name('category.edit');
    // updates a User
    Route::put('/category/{category}', CategoryController::class .'@update')->name('category.update');
    // deletes a User
    Route::delete('/category/{category}', CategoryController::class .'@destroy')->name('category.destroy');

    // returns the home page with all Users
    Route::get('/transaction', TransactionController::class .'@index')->name('transaction.index');
    // returns the form for adding a User
    Route::get('/transaction/create', TransactionController::class . '@create')->name('transaction.create');
    // adds a User to the database
    Route::post('/transaction', TransactionController::class .'@store')->name('transaction.store');
    // returns a page that shows a full User
    Route::get('/transaction/{transaction}', TransactionController::class .'@show')->name('transaction.show');
    // returns the form for editing a User
    Route::get('/transaction/{transaction}/edit', TransactionController::class .'@edit')->name('transaction.edit');
    // updates a User
    Route::put('/transaction/{transaction}', TransactionController::class .'@update')->name('transaction.update');
    // deletes a User
    Route::delete('/transaction/{transaction}', TransactionController::class .'@destroy')->name('transaction.destroy');

    Route::get('/logout', UserController::class .'@logout')->name('logout.index');
    Route::post('/logout', UserController::class .'@logout')->name('logout.logout');
});

Route::get('/register', UserController::class . '@create')->name('users.create');

// adds a User to the database
Route::post('/register', UserController::class .'@store')->name('users.store');
Route::get('/csrf-token', function() {
    return csrf_token();
});

Route::get('/auth', CheckSession::class .'@checkSession')->name('auth.checkSession');

// Login routes
Route::get('/login', UserController::class .'@loginView')->name('login.index');
Route::post('/login', UserController::class .'@login')->name('login.login');

Route::fallback(function () {
    return redirect('/transaction');
});