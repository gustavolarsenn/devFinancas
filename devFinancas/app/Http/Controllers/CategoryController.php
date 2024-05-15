<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return view('category.index', compact('categories'));
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|max:255',
          ]);
          Category::create($request->all());
          return redirect()->route('category.index')
            ->with('success','Category created successfully.');
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'category_name' => 'required|max:255',
          ]);
          $category = Category::find($id);
          $category->update($request->all());
          return redirect()->route('category.index')
            ->with('success', 'Category updated successfully.');
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        $category->delete();
        return redirect()->route('category.index')
          ->with('success', 'Category deleted successfully');
        //
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
