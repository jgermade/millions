<?
	require(getcwd()."/tools.php");
	
	$base_url = "/".$this->config->base_url();
	
	// just draw welcome view in common layout
    	print template("layout",[
    	    "base-url" => $base_url,
    	    "view-name" => "welcome",
    	    "view" => template("welcome",[ "base-url" => $base_url ]),
    	    "shop-items" => count($shop_items)
        ]);
?>