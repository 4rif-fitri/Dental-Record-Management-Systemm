<?php

namespace App\Http\PageController;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PageController extends Controller{

    public function pageMedicine()
    {
        return Inertia::render('dentist/Medicine');
    }

}
