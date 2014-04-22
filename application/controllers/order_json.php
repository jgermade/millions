<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order_json extends CI_Controller {
	
	public function index() {
	    
	    // retrieving items in shopping cart
    	    session_start();
    	    
            if( !isset($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
            else if( !is_array($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
    	    
    	    $shop_items = $_SESSION['shop-items'];
	    
	    // assume error as default
	        $error = true;
	    
	    // accesing to the model Orders
    	    $dbconnect = $this->load->database();
    	    $this->load->model('Orders_model');
	    
	    // create `Orders` table if not exists
	        $this->Orders_model->create_table();
	    
	    
	    // accepting only POST (create) request, in order to allow implementing CRUD methods in future
	    if( $this->input->server('REQUEST_METHOD') == "POST" ) {
	        if( $inserted_id = @$this->Orders_model->insert($shop_items) ) {
	            $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode([ "success" => true, "order" => $inserted_id ]));
                
                $_SESSION['shop-items'] = [];
                
	            $error = false;
	        }
	    }
	    
	    if( $error != false ){  // if eny error
    		$this->output
    		    ->set_status_header('400')
                ->set_content_type('application/json')
                ->set_output(json_encode([ "error" => ( is_string($error) ? $error : "unknown" ) ]));
		}
	}
}