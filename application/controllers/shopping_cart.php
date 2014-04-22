<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Shopping_cart extends CI_Controller {
	
	public function index() {
	    // retrieving items in shopping cart
    	    session_start();
    	    
            if( !isset($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
            else if( !is_array($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
    	    
    	    $shop_items = $_SESSION['shop-items'];
    	    
    	    $data['shop_items'] = $shop_items;
    	    
		$this->load->view('shopping_cart',$data);
	}
}