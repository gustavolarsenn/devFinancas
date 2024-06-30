<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Middleware\CheckSession;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        // Pega a sessão 
        $checkSession = new CheckSession();
        $checkSession->checkSession($request);

        // Pega o id do usuário logado 
        $user_id = $request->session()->get("user_id");

        $categories = Category::where('active', 1)->where(function ($query) use ($user_id) {
            $query->where('user_id', $user_id)->orWhere('user_id', 0);
        })->get();
        return response()->json($categories);
    }

    public function allCategories(Request $request){
         // Pega a sessão 
         $checkSession = new CheckSession();
         $checkSession->checkSession($request);
 
         // Pega o id do usuário logado 
         $user_id = $request->session()->get("user_id");
 
         $categories = Category::where('user_id', $user_id)->orWhere('user_id', 0)->get();
         return response()->json($categories);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|max:255',
            'user_id' => 'required'
        ]);
    
        $category = Category::where('user_id', $request->user_id)
                            ->where('category_name', $request->category_name)
                            ->first();
    
        if ($category) {
            $category->update(['active' => 1] + $request->all());
            return response()->json(['message' => 'Category updated successfully']);
        } else {
            Category::create($request->all());
            return response()->json(['message' => 'Category created successfully'], 201);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'category_name',
            'user_id',
            'active'
          ]);
          $category = Category::find($id);
          $category->update($request->all());
        return response()->json(['message' => 'Category updated successfully']);
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    // routes functions
    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return view('category.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return view('category.show', compact('category'));
        //
    }

    /**
    * Show the form for editing the specified post.
    */
    public function edit($id)
    {
        $category = Category::find($id);
        return view('category.edit', compact('category'));
    }

    /**
     *  Show the form for deleting the specified post.
     */
    public function delete($id)
    {
        $category = Category::find($id);
        return view('category.delete', compact('category'));
    }
}
