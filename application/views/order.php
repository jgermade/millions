<?php
	require(getcwd()."/tools.php");
	
	// template for each item
    	$item_tmpl = template("order/item");
    
    // template for each bet in item
	    $bet_tmpl = template("order/item-bet");
	    
	// html for items
	    $item_rows = "";
	    
	   
    $total_price = 0;
    $items_num = 0;
	foreach( $items as &$item ) {
        
        // creating html for each bet in item
            $item_bets = "";
            $bets = 0;
            foreach( $item['bets'] as &$bet ) {
                $item_bets .= replaceKeys($bet_tmpl,[ "num" => $bet['nums'], "star" => $bet['stars'] ]);
                $bets++;
            }
        
        // adding costs
            $item_price = $bets*2;
            $total_price += $item_price;
        
        // creating html for each item
            $item_rows .= replaceKeys($item_tmpl,[ "item" => $item, "item-bets" => $item_bets, "item-price" => $item_price ]);
        
        $items_num++;
	}
	
	// draw order view in common layout
    	print template("layout",[
    	    "base-url" => "/".$this->config->base_url(),
            "view-name" => "shopping-cart", // the same style like shopping cart
            "view" => (
                ( $items_num > 0 ) ? // if items in order
                template("order",[
                    "items-rows" => $item_rows, "total-price" => $total_price
                ]) : template("order/none") ),
            "shop-items" => count($shop_items)
        ]);
?>