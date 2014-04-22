
window.onload = function(){
    
    $doc.click('.remove',function(e){
        // when a remove button is clicked
        var item = this;
        
        while( item ) {
            if( item.hasClass('item') ) {
                item.style.opacity = 0.5;
                
                ajax('shopping-cart.json',{ method: 'delete', mode: 'json', data: { item: ''+elm('.item').indexOf(item) } })
                    .done(function(){
                        item.style.opacity = 0;
                        setTimeout(function(){
                            var parent = item.parent();
                            parent.removeChild(item);
                            elm('#shopping-cart-num')[0].textContent = ''+elm('.item').length;
                            
                            var total_price = 0;
                            elm('.item').forEach(function(item){ total_price += Number(item.data('price')); });
                            
                            elm('#total-price')[0].textContent = total_price+'€';
                        },250);
                    })
                    .fail(function(){
                        item.style.opacity = 1;
                    });
                break;
            }
            item = item.parent();
        }
    });
    
    listen('#shopping-cart','submit',function(e){
        stopEvent(e);
        
        ajax.post('order.json').done(function(){
            
            var response = JSON.parse(this.responseText);
            location.href = elm('#view')[0].data('base-url')+'order/'+response.order;
            
        }).fail(function(){
            alert('wtf!');
        });
    });
    
};