<?php
require './app/models/Home_Model.php';

class HomeHandler
{

    public function render()
    {
        require '../frontend/build/index.html';
    }


}
