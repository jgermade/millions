<?php

class Orders_model extends CI_Model {
  
  function __construct()  { parent::__construct(); }
  
  function create_table() {
    
    // creating `Orders` table
        $this->db->query("CREATE TABLE IF NOT EXISTS `Orders` (
    		  `id` int(11) NOT NULL AUTO_INCREMENT,
    		  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    		  `deleted` timestamp NULL DEFAULT NULL,
    		  PRIMARY KEY (`id`)
    		) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    
    // creating `Items` table   (allowing several items in each order)
    	$this->db->query("CREATE TABLE IF NOT EXISTS `Items` (
    		  `id` int(11) NOT NULL AUTO_INCREMENT,
    		  `order` int(11) NOT NULL,
    		  `product` varchar(45) NOT NULL,
    		  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    		  `deleted` timestamp NULL DEFAULT NULL,
    		  PRIMARY KEY (`id`),
    		  FOREIGN KEY (`order`) REFERENCES Orders(id)
    		) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    
    // creating `Bets` table   (allowing several bets in each item)
    	$this->db->query("CREATE TABLE IF NOT EXISTS `Bets` (
    		  `id` int(11) NOT NULL AUTO_INCREMENT,
    		  `item` int(11) NOT NULL,
    		  `nums` varchar(128) NOT NULL,
    		  `stars` varchar(128) NOT NULL,
    		  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    		  `deleted` timestamp NULL DEFAULT NULL,
    		  PRIMARY KEY (`id`),
    		  FOREIGN KEY (`item`) REFERENCES Items(id)
    		) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
  }
  
  function insert($items) {
  		if( count($items) ) {
  			// creating new order in db
          		$this->db->query("INSERT INTO `Orders` (`id`, `time`, `deleted`) VALUES (NULL, NULL, NULL);");
          		
          	// the new order id
          		$order_id = $this->db->insert_id();
	  		
	  		foreach( $items as &$item ) {
	  		    
	  		    // adding each and every item in order
    	  			$this->db->query("INSERT INTO `Items` (`id`, `order`, `product`) VALUES (NULL, '$order_id', 'euromillions');");
    	  			$item_id = $this->db->insert_id();
    	  			
    	  			foreach( $item['bets'] as &$bet ) {
    	  			    // adding each and every bet in item
    	  				$nums = implode(",",$bet['nums']);
    	  				$stars = implode(",",$bet['stars']);
    	  				
    	  				$this->db->query("INSERT INTO `Bets` (`id`, `item`, `nums`, `stars`) VALUES (NULL, '$item_id', '$nums', '$stars');");
    	  			}
	  		}
	  		return $order_id;
  		}
  		return false;
  }
  
  function get($order_id) {
        // retrieving items in order with required id
            $query = $this->db->query("SELECT * FROM `Items` WHERE `order` = $order_id;");
        
        // empty by default
            $items = [];
        foreach ($query->result() as $row) {
            // for each item in order
            $item = [ "product" => $row->product, "bets" => [], "time" => $row->time ];
            $item_id = $row->id;
            
            // retrieving bets in each item
                $query = $this->db->query("SELECT * FROM `Bets` WHERE `item` = $item_id;");
                foreach ($query->result() as $row) {
                    // for each bet in item
                    $bet = [ "nums" => explode(",",$row->nums), "stars" => explode(",",$row->stars) ];
                    array_push($item['bets'],$bet);
                }
            
            array_push($items,$item);
        }
      
  		return $items;
  }
  
}

?>