
window.onload = function(){

    // settings
	var max = {
		num: 5,
		star: 2
	}

    // this function enables the events that changes nums/stars in a card
    function activeCells(name,onMax) {
        // when a num/star clicked
        $doc.click('.'+name,function(e){
            var card = e.target;
            
            while( card ) {
                // look up for the card
                if( card.data('card') ) {
                    // and toggle 'active' class
                    if( this.hasClass('active') ) {
                        this.removeClass('active');
                        
                        // update changes
                            cardChanged.apply(card,[this]);
                    } else {
                        if( card.getElementsByClassName(name+' active').length >= max[name] ) {
                            if( isFunction(onMax) ) onMax.apply();
                        } else {
                            this.addClass('active');
                            // update changes
                                cardChanged.apply(card,[this]);
                        }
                    }
                    break;
                }
                
                card = card.parent();
            }
        });
    }
    
    // enabling nums changes in all cards
        activeCells('num', function(){ alert('max '+max.num+' nums'); });
        
    // enabling stars changes in all cards
        activeCells('star', function(){ alert('max '+max.star+' stars'); });
    
    // index for cards filled successfully
        var cards_ready = {};

    // check if a card is complete
	function cardComplete(){
		var nums = this.getElementsByClassName('num active');
        var stars = this.getElementsByClassName('star active');
        
        return ( nums.length == max.num && stars.length == max.star );
	}

    // fired when a card has changes
    function cardChanged(){
        
        if( cardComplete.apply(this) ) {
            cards_ready[this.data('card')] = this;
            this.addClass('filled');
        } else {
            delete cards_ready[this.data('card')];
            this.removeClass('filled');
        }
        
        elm('#price')[0].getElementsByClassName('value').item(0).textContent = ''+(2*Object.keys(cards_ready).length);
    }
    
    // removes 'active' class in all nums/stars in a card
    function clearCard(){
        var i, active, items;
        
        active = [], items;
        
        // collecting card bets
		items = this.getElementsByClassName('num active');
        for( i = 0; i < items.length ; i++ ) active.push(items.item(i));
        
        // collecting card stars
        items = this.getElementsByClassName('star active');
        for( i = 0; i < items.length ; i++ ) active.push(items.item(i));
        
        active.forEach(function(item){ item.removeClass('active'); });
    }
    
    // fill 'active' class in all nums/stars in a card
    function randomCard(className,nums){
		var items = this.getElementsByClassName(className), items_length = items.length,
			cell = {}, cells = 0, loops = 0, max_loops = (nums || 1)*100;
		
		if( items_length ) {
			for( i = 0; i < items_length ; i++ ) {
				if( items.item(i).data('value') ) cell[items.item(i).data('value')] = items.item(i);
			}

			while( this.getElementsByClassName(className+' active').length < nums && loops < max_loops ) {
				num = Math.ceil(Math.random()*(items_length-1));
				
				if( cell[num] ) {
                    if( !cell[num].hasClass('active') ) {
                        cell[num].addClass('active');
                        cells++;
                    }
                }
				
				loops++;    // just a security break to avoid infinite loops
			}
        }
    }
    
    // when 'auto-fill/clear' button clicked
    $doc.click('.auto-fill',function(e){
        var card = e.target;
        
        while( card ) {
            if( card.data('card') ) {
				if( card.hasClass('filled') ) {
                    // if card complete clear this
                        clearCard.apply(card);
                        
                    // and update environment
                        cardChanged.apply(card);
				} else {
                    // if card not complete fill to complete nums and stars
                        randomCard.apply(card,['num',max.num]);
                        randomCard.apply(card,['star',max.star]);
                    // and update environment
                        cardChanged.apply(card);
				}
                break;
            }
            
            card = card.parent();
        }
    });
    
    // when euromillions form is submitted
    listen('#euromillions','submit',function(e){
        stopEvent(e);

        // bets in each card        
        var bets = [];
        
        if( Object.keys(cards_ready).length ) {
            
            // collecting selected nums and stars in each card
            elm('.card').forEach(function(card){
                
                var nums = card.getElementsByClassName('num active');
                var stars = card.getElementsByClassName('star active');
                
                if( nums.length == max.num && stars.length == max.star ){
                    var bet_nums = [], bet_stars = [], i, loops;
                    
                    loops = nums.length;
                    for( i = 0; i<loops; i++ ) bet_nums.push(nums.item(i).data('value'));
                    
                    loops = stars.length;
                    for( i = 0; i<loops; i++ ) bet_stars.push(stars.item(i).data('value'));
                    
                    bets.push({ nums: bet_nums.sort(), stars: bet_stars.sort() });
                }
            });
            
            document.documentElement.addClass('shopping');
            ajax.post('shopping-cart.json',{ mode: 'json', data: { product: 'euromillones', bets: bets } })
                .done(function(xhr){
                    cards_ready = {};
                    elm('.card').forEach(function(card){ clearCard.apply(card); cardChanged.apply(card); });
                    elm('#shopping-cart-num')[0].textContent = ''+JSON.parse(this.responseText).length;
                })
                .always(function(xhr){
                    document.documentElement.removeClass('shopping');
                });
            
        } else {
            alert('nothing to do!');
        }
    });
};