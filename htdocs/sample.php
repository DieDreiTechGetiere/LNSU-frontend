<?php


class Animals
{
    private $id = 1;

    public $legs;

    public $name = "niklas";

    public function __construct()
    {
        echo "constructor of Animals";
        echo "<br/>";
    }

    public function getFell()
    {
        echo "<br>";
        echo "getFell() has been called";
        echo "<br>";
    }


    public function setId($id)
    {
        if($id < 0 || $id > 10)
        {
            echo "<br/>";
            echo "error";
            echo "<br/>";
        }
        else
        {
            $this->id = $id;
        }
    }
    
    
    public function getId()
    {
        return $this->id;
    }
}

class Cow extends Animals
{

    public function __construct()
    {
        echo "constructor of Cow";
    }
}

class Spider extends Animals
{

    public function __construct()
    {
        echo "constructor of Spider";
        echo "<br/>";
        //echo "initial legs: " . $this->legs;
        //$this->legs = 8;
    }
}


$animal = new Animals();
$spider = new Spider();
$cow = new Cow();

$animal->setId(11);
echo "<br>";
echo "new animal id: " . $animal->getId();
echo "<br>";


$cow->legs = 4;
echo "<br>";
echo "legs of a cow: " . $cow->legs;
echo "<br/>";
echo "<br/>";

echo "Username: " . $animal->name;

echo "<br/>";
echo "Spider-legs: " . $spider->legs;
echo "<br/>";

$spider->legs = 9;
echo "new Spider-legs: " . $spider->legs;

echo "<br/>";
echo "animals id: " . $animal->id;

$variable = "carolin";



?>