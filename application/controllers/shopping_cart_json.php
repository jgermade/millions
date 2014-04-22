<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Shopping_cart_json extends CI_Controller {
	
	public function index() {
	    
	    // retrieving items in shopping cart
    	    session_start();
    	    
            if( !isset($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
            else if( !is_array($_SESSION['shop-items']) ) $_SESSION['shop-items'] = [];
    	    
    	    $shop_items = $_SESSION['shop-items'];
	    
	    // assume error as default
	        $error = true;
	    
	    // accepting only POST (create) and DELETE request, in order to allow implementing CRUD methods in future
	    switch( $this->input->server('REQUEST_METHOD') ){
	        case "POST":
	                $request = json_decode(file_get_contents("php://input"),true);
            	    
            	    // minimal data validation
            	    if( is_string($request['product']) && is_array($request['bets']) ) {
            		    
                        // adding cards to shopping cart
                            array_push($shop_items,$request);
                            
                        // updating shopping cart
                            $_SESSION['shop-items'] = $shop_items;
                        
                        // returning current shopping cart items
                            $this->output
                                ->set_content_type('application/json')
                                ->set_output(json_encode($_SESSION['shop-items'])); // return updated shopping cart
                            
                        $error = false;
                        
            		} else $error = "wrong-data";
            		
            		if( $error != false ){  // if any error
                		$this->output
                		    ->set_status_header('400')
                            ->set_content_type('application/json')
                            ->set_output(json_encode([ "error" => ( is_string($error) ? $error : "unknown" ) ]));
            		}
	            break;
	        case "DELETE":
                    // retrieving payload json
	                    $request = json_decode(file_get_contents("php://input"),true);
	                
	                $item = intval($request['item']);
	                if( $item >= 0 ) { // if item to be removed from shopping cart
	                    
                        // removing from shopping cart
                            array_splice($shop_items,$item,1);
                        
                        // updating shopping cart
                            $_SESSION['shop-items'] = $shop_items;
	                    
	                    // returning current shopping cart items
                            $this->output
                                ->set_content_type('application/json')
                                ->set_output(json_encode($_SESSION['shop-items'])); // return updated shopping cart
	                    
	                } else {    // there was an error
	                    $this->output
                		    ->set_status_header('400')
                            ->set_content_type('application/json')
                            ->set_output(json_encode([ "error" => ( is_string($error) ? $error : "unknown" ) ]));
	                }
	            break;
	    }
	}
}