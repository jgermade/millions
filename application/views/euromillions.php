<?php
	require(getcwd()."/tools.php");
	
	// each card drawn with the same template
    	$card_tmpl = template('euromillions/card');
    
    // replace secuantial card number
    	$cards = "";
    	for( $i = 1; $i <= 5; $i++ ) {
    		$cards .= replaceKeys($card_tmpl,[ "card-num" => $i ]);
    	}
	
	// and insert cards in template view
	    $view = template("euromillions",[ "cards" => $cards ]);
	
	// draw euromillions view in common layout
    	print template("layout",[
    	    "base-url" => "/".$this->config->base_url(),
    	    "view-name" => "euromillions",
    	    "view" => $view,
    	    "shop-items" => count($shop_items)
        ]);