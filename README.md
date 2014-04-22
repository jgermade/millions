## Little implementation of an Euromillions page

#### Using codeIgniter

  

#### List of modified / added files:

- application 
    - config 
        - config.php 

$config['base_url']	= 'millions';
        - database.php 

$db['default']['username'] = 'millions';  
$db['default']['password'] = 'millions';  
$db['default']['database'] = 'millions';
        - routes.php 

$route['default_controller'] = "welcome";  
$route['euromillions'] = "euromillions";  
$route['shopping-cart'] = "shopping_cart";  
$route['shopping-cart.json'] = "shopping_cart_json";  
$route['order/:num'] = "order";  
$route['order.json'] = "order_json";

    - controllers 
        - welcome.php  

{base-url}/ ([this view](http://demo.germade.es/millions/templates/$%7Bbase-url%7D))
        - euromillions.php  

{base-url}[/euromillions](http://demo.germade.es/millions/templates/$%7Bbase-url%7Deuromillions)
        - order.php  

{base-url}[/order/:num](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dorder/1)
        - order_json.php  

{base-url}/order.json (ajax)
        - shopping_cart.php  

{base-url}[/shopping-cart](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dshopping-cart)
        - shopping_cart_json.php  

{base-url}/shopping-cart.json (ajax)

    - model 
        - orders_model.php 

methods:  
 -&gt;create_table()  
 -&gt;insert()  
 -&gt;get()

    - views 
        - welcome.php  

{base-url}/ ([this view](http://demo.germade.es/millions/templates/$%7Bbase-url%7D))
        - euromillions.php  

{base-url}[/euromillions](http://demo.germade.es/millions/templates/$%7Bbase-url%7Deuromillions)
        - order.php  

{base-url}[/order/:num](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dorder/1)
        - shopping_cart.php  

{base-url}[/shopping-cart](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dshopping-cart)

- assets 
    - img 
        - [bin.png](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dassets/img/bin.png)
        - [loading32.gif](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dassets/img/loading32.gif)

- lib 

common libs
    - [millions.css](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/millions.css)
    - [millions.js](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/millions.js)  

euromillions view libs
    - [euromillions.css](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/euromillions.css)
    - [euromillions.js](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/euromillions.js)  

shopping-cart view libs
    - [shopping-cart.css](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/shopping-cart.css)
    - [shopping-cart.js](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/shopping-cart.js)  

    - [welcome.css](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dlib/welcome.css)

- templates 
    - [layout.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/layout.html) 

common layout for all views
    - [welcome.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/welcome.html) 

this text
    - [euromillions.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/euromillions.html) 

layout for euromillions
        - euromillions/[card.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/euromillions/card.html) 

template for each card in euromillions

    - [shopping-cart.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/shopping-cart.html) 

layout for shopping-cart
        - shopping-cart/[empty.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/shopping-cart/empty.html) 

layout for empty shopping cart
        - shopping-cart/[item.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/shopping-cart/item.html) 

template for each item in shopping cart
        - shopping-cart/[item-bet.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/shopping-cart/item-bet.html) 

template for each bet in item

    - [order.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/order.html) 

layout for order
        - order/[none.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/order/none.html) 

layout for incorrect order
        - order/[item.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/order/item.html) 

template for each item in order
        - order/[item-bet.html](http://demo.germade.es/millions/templates/$%7Bbase-url%7Dtemplates/order/item-bet.html) 

template for each bet in item

- tools.php 

this php files provides functions template() and replaceKeys() developed for handle templates
