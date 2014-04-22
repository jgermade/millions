<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order extends CI_Controller {

    public function index() {
	    
	    // retrieving items in shopping cart
    	    session_start();
    	    
            if( !isset($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
            else if( !is_array($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
    	    
    	    $shop_items = $_SESSION['shop-items'];
    	    
    	    $data['shop_items'] = $shop_items;
	    
	    // accesing to the model Orders
    	    $dbconnect = $this->load->database();
    	    $this->load->model('Orders_model');
	    
	    // create `Orders` table if not exists
	        $this->Orders_model->create_table();
	    
	    // and load the required order
    	    $order_id = $this->uri->segment(2);
    	    $data['items'] = $this->Orders_model->get($order_id);
	    
		$this->load->view('order',$data);
	}
}