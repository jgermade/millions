<?php
    function replaceKeys($str,$keys){
        return preg_replace_callback("/\\\${([\\-\\w\\.]+)}/",function($coincidencias) use ($keys) {
            if( isset($coincidencias[1]) ) {
                $key = $coincidencias[1];
                if( preg_match("/\./",$key) ) {
                    $path = explode(".",$key);
                    $in_keys = $keys;
                    
                    for( $k = 0; $k < count($path) ; $k++ ) {
                        if( !isset($in_keys[$path[$k]]) ) return $coincidencias[0];
                        $in_keys = $in_keys[$path[$k]];
                    }
                    return "$in_keys";
                    
                } else if( isset($keys[$key]) ) return "".$keys[$key];
                return $coincidencias[0];
            } else return $coincidencias[0];
        },$str);
    }
    
    function template($name,$keys = false){
        if( is_array($keys) ) return replaceKeys(file_get_contents(getcwd()."/templates/$name.html"),$keys);
        else return file_get_contents(getcwd()."/templates/$name.html");
    }