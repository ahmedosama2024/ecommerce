<?php
require 'conn.php'; //connect the connection
require 'product.php'; //connect with the Products

$products=new Product($conn); //inhert object from class Product

$method= $_SERVER['REQUEST_METHOD']; // get the method which you use

$endpoint = $_SERVER['PATH_INFO']; //get information from url


header('Content-Type: application/json');
header('Accept: application/json');
header("Access-Control-Allow-Origin: *"); // Allow all origins, or specify the allowed origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Specify allowed HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Specify allowed headers


switch($method){
    case 'GET':
        $products= $products->getAllProducts(); // get data from getAllProducts methods

        if($endpoint==='/product/'){
            echo json_encode($products); //turn data to json
        }
    break;
    case 'POST':
        if($endpoint==='/product/'){

            $data=json_decode(file_get_contents('php://input'),true); //get the data from APi
            $product=$products->store($data); //Pass the data to store method
            echo (json_encode($product)); //turn data to json
        }

    break;
    case 'DELETE':
        
    if (preg_match('#^/product/(\d+)$#', $endpoint, $match)) {
        $id = $match[1]; // Capture the ID from the URL
        $product = $products->destroy($id); // Pass the ID to destroy method
        echo json_encode($product);  //turn data to json
    }
    break;
}