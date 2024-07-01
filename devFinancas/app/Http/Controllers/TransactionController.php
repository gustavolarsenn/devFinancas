<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Http\Middleware\CheckSession;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Pega a sessão
        $checkSession = new CheckSession();
        $checkSession->checkSession($request);

        // Pega o id do usuário logado 
        $user_id = $request->session()->get("user_id");
        
        $transactions = Transaction::where('user_id', $user_id)->orderBy("created_at", "asc")->get();
        return response()->json($transactions);        
    }

    public function get (Request $request, $transaction_id) 
    {
        // Pega a sessão
        $checkSession = new CheckSession();
        $checkSession->checkSession($request);

        // Pega o id do usuário logado 
        $user_id = $request->session()->get("user_id");
        
        $transactions = Transaction::where('user_id', $user_id)->where('transaction_id', $transaction_id)->get();
        return response()->json($transactions);        
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
            'descricao' => 'required',
            'date' => 'required',
            'created_at' => 'required', 
            'value' => 'required',
          ]);
          Transaction::create($request->all());
          return response()->json(['message' => 'Transaction created successfully'], 201);
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
            'descricao' => 'required',
            'date' => 'required',
            'created_at' => 'required', 
            'value' => 'required',
          ]);
          $transaction = Transaction::find($id);
          $transaction->update($request->all());
          return response()->json(['message' => 'Transaction updated successfully']);
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully']);
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
