<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required',
            'password' => 'required'
          ]);
          User::create($request->all());
          return response()->json(['message' => 'User created successfully', 'access' => true]);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required',
            'password' => 'required'
          ]);
          $user = User::find($id);
          $user->update($request->all());
          return redirect()->route('users.index')
            ->with('success', 'User updated successfully.');
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('users.index')
          ->with('success', 'User deleted successfully');
        //
    }

    public function login(Request $request)
    {
        // Retrieve the input data from the request
        $username = $request->input('username');
        $password = $request->input('password');
        
        // Perform your authentication logic here
        // For example, check if the username and password are valid
        $user = User::where('name', $username)->first();

        if ($user && password_verify($password, $user->password)) {
            // Authentication successful
            // Store the user's information in the session
            $request->session()->put('username', $username);
            $request->session()->put('user_id', $user->id);

            return response()->json(['message' => 'Authentication successful', 'access' => true]);
            // Redirect the user to the dashboard or any other page
            // return redirect()->route('users.index');
        } else {
            // Authentication failed
            // Redirect the user back to the login page with an error message
            return response()->json(['message' => 'Authentication failed', 'access' => false]);

            // return false;
            // return redirect()->route('login.login')->with('error', 'Invalid username or password');
        }
    }

    public function logout(Request $request)
    {
        // Clear the user's session data
        $request->session()->forget('username');

        // Redirect the user to the login page
        return redirect()->route('login.index');
    }

    // routes functions
    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        return view('users.show', compact('user'));
        //
    }

    /**
    * Show the form for editing the specified post.
    */
    public function edit($id)
    {
        $user = User::find($id);
        return view('users.edit', compact('user'));
    }

    /**
     *  Show the form for deleting the specified post.
     */
    public function delete($id)
    {
        $user = User::find($id);
        return view('users.delete', compact('user'));
    }

    public function loginView()
    {
        // Show the login form
        return view('users.login');
    }
    public function logoutView()
    {
        // Show the logout form
        return view('users.logout');
    }

}
