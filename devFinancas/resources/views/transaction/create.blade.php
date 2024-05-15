<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">

    <title>Create Post</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container-fluid">
            <a class="navbar-brand h1" href={{ route('transaction.index') }}>CRUDtransaction</a>
            <div class="justify-end ">
                <div class="col ">
                    <a class="btn btn-sm btn-success" href={{ route('transaction.create') }}>Add transaction</a>
                </div>
            </div>
    </nav>
            'value' => 'required',
    <div class="container h-100 mt-5">
        <div class="row h-100 justify-content-center align-items-center">
            <div class="col-10 col-md-8 col-lg-6">
                <h3>Add a transaction</h3>
                <form action="{{ route('transaction.store') }}" method="post">
                    @csrf
                    <div class="form-group">
                        <label for="category_id">Category id</label>
                        <input type="text" class="form-control" id="category_id" name="category_id" required>

                        <label for="user_id">User id</label>
                        <input type="text" class="form-control" id="user_id" name="user_id" required>

                        <label for="type">Type</label>
                        <select class="form-control" id="type" name="type" required>
                            <option value="credit">Crédito</option>
                            <option value="debit">Débito</option>
                        </select>
                        
                        <label for="date">Date</label>
                        <input type="date" class="form-control" id="date" name="date" required>
                        
                        <label for="created_at">created_at</label>
                        <input type="date" class="form-control" id="created_at" name="created_at" required>
       
                        <!-- <label for="created_at">Created At - Default</label>
                        <input type="created_at" class="form-control" id="created_at" name="created_at" required> -->

                        <label for="value">Value</label>
                        <input type="number" class="form-control" id="value" name="value" required>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Create transaction</button>
                </form>
            </div>
        </div>
    </div>
</body>

</html>