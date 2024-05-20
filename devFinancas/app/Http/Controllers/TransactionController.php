<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::all();
        return view('transaction.index', compact('transactions'));
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => '',
            'user_id' => 'required',
            'type' => 'required',
            'date' => 'required',
            'created_at' => 'required',
            'value' => 'required',
          ]);
          Transaction::create($request->all());
          return redirect()->route('transaction.index')
            ->with('success','Transaction created successfully.');
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'category_id' => '',
            'user_id' => 'required',
            'type' => 'required',
            'date' => 'required',
            'created_at' => 'required',
            'value' => 'required',
          ]);
          $transaction = Transaction::find($id);
          $transaction->update($request->all());
          return redirect()->route('transaction.index')
            ->with('success', 'Transaction updated successfully.');
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);
        $transaction->delete();
        return redirect()->route('transaction.index')
          ->with('success', 'Transaction deleted successfully');
        //
    }

    // routes functions
    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return view('transaction.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transaction = Transaction::find($id);
        return view('transaction.show', compact('Transaction'));
        //
    }

    /**
    * Show the form for editing the specified post.
    */
    public function edit($id)
    {
        $transaction = Transaction::find($id);
        return view('transaction.edit', compact('transaction'));
    }

    /**
     *  Show the form for deleting the specified post.
     */
    public function delete($id)
    {
        $transaction = Transaction::find($id);
        return view('transaction.delete', compact('transaction'));
    }
}
