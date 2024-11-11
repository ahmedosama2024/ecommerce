<?php
class Product{
    private $conn;
    public function __construct($conn){ //construct method which connect with DataBase
        $this->conn=$conn;
    }
    public function getAllProducts() {
        
        $sql="SELECT            
    id,
    code,
    name,
    price,
    CASE WHEN weight = 0 THEN NULL ELSE weight END AS weight,
    CASE WHEN size = 0 THEN NULL ELSE size END AS size,
    CASE WHEN length = 0 THEN NULL ELSE length END AS length,
    CASE WHEN width = 0 THEN NULL ELSE width END AS width,
    CASE WHEN height = 0 THEN NULL ELSE height END AS height
FROM
    products";//Sql Code to select data
        $run = $this->conn->query($sql);//run sql
        $Products = []; 
        
        while ($row = $run->fetch_assoc()) { //fetch all rows from table
            
                $Products[] = $row;
        }
        return $Products;
        
    }
    public function store($data){
        $code= $data['code'];//input data
        $name= $data['name'];
        $price= $data['price'];
        $weight= $data['weight'];
        $size= $data['size'];
        $width= $data['width'];
        $length= $data['length'];
        $height= $data['height'];

        $check="SELECT * FROM products WHERE `code`='$code'"; // sql code to check unique attribute
        $runCheck=$this->conn->query($check)->row_num;
        if($runCheck>=1){
            return ["Error"=>"Duplicated Data"];
        }else{
            $sql="INSERT INTO products (`code`,`name`,`price`,`weight`,`size`,`length`,`width`,`height`)
            Values
            ('$code','$name','$price','$weight','$size','$length','$width','$height')";
            $run=$this->conn->query($sql);//sql code to insert data
            
            return "['success'=>'Data inserted successfully']";
        }

    }
    public function destroy($id){
        $sql="DELETE FROM products WHERE `id`=$id ;";//sql code to delete 
        $run=$this->conn->query($sql);
        return "['success'=>'Data deleted successfully']";
    }
    
}
