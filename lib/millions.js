
// some useful functions I usually use

    // a minimal dom query seletor
    function elm(selector){
        var found = ( selector.match(/\#([\-\_\w]+)/) || [])[1];
        if(found) return [document.getElementById(found)];
        
        found = ( selector.match(/\.([\-\_\w]+)/) || [])[1];
        if(found) {
            var items = document.getElementsByClassName(found),
                arr = [], arr_length = items.length;
            
            for(var i = 0; i < arr_length; i++ ) arr.push(items[i]);
            
            return arr;
        }
        
        return [];
    }
    
    function stopEvent(e) {
        if(e) e.stopped = true;
        if (e &&e.preventDefault) e.preventDefault();
        else if (window.event && window.event.returnValue) window.eventReturnValue = false;
    }
    
    function triggerEvent(element,event_name) {
        var event;
        
        element = element || document;

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(event_name, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = event_name;
        }
        
        event.eventName = event_name;
        
        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent("on" + event.eventType, event);
        }
    }
    
    // returns the type of an object (number, string, etc), all in javascript is an oject
    function varType(obj){
        if( obj === undefined || obj === null ) return 'undefined';
        if( typeof(obj) == 'object' ) {
            var match;
            if( match = (''+obj.constructor).match(/^\s*function\s*(.*)\(/) ) return match[1].toLowerCase();
            if( match = (''+obj.constructor).match(/^\[object\s(.*)\]$/) ) return match[1].toLowerCase();
            alert('unknown object '+obj.constructor);
        } else return typeof(obj);
    }
    
    function isObject(myVar,type){ if( typeof(myVar) == 'object' ) return varType(myVar) == (type || 'object'); else return false; }
    function isString(myVar){ return varType(myVar) == 'string'; }
    function isFunction(myVar){ return varType(myVar) == 'function'; }
    function isArray(myVar){ return varType(myVar) == 'array'; }
    function isNumber(myVar){ return varType(myVar) == 'number'; }
    
    
    // custom DOMElement methods
    HTMLElement.prototype.addClass = function(className) {
        if(!this.className) this.className = '';
        var patt = new RegExp('\\b'+className+'\\b','');
        if(!patt.test(this.className)) this.className += ' '+className;
        return this;
    }
    
    HTMLElement.prototype.removeClass = function(className) {
        if(this.className) {
            var patt = new RegExp('(\\b|\\s+)'+className+'\\b','g');
            this.className = this.className.replace(patt,'');
        }
        return this;
    }
    
    HTMLElement.prototype.hasClass = function(className) {
        if(!this.className) return false;
        patt = new RegExp('\\b'+className+'\\b','');
        return patt.test(this.className);
    }
    
    HTMLElement.prototype.data = function(name,value) {
        if( isString(name) ) {
            if( value !== undefined ) {
                this.setAttribute('data-'+name,value);
            }
            return this.getAttribute('data-'+name);
        }
    }
    
    HTMLElement.prototype.parent = function() {
        if( this == document.body ) return false;
        return this.parentElement || this.parentNode;
    }
    
    
    function listen(elem, type, action) {
        if( isString(elem) ) elm(elem).forEach(function(elem){ listen(elem, type, action); });
        
        if( elem === document || /^html\w+element/.test(varType(elem)) ) {
            
            if( isFunction(action) ) {
                if (elem.addEventListener)  { // W3C DOM
                    elem.addEventListener(type,action,false);
                } else if (elem.attachEvent) { // IE DOM
                    elem.attachEvent("on"+type, action);
                } else throw 'No es posible añadir evento';
            }
        }
    }
    
    function ajax(url,args){
        if( !args ) args = {};
        
        var on = { done: [], fail: [], always: [] };
        
        if( isFunction(args.done) ) on.done.push(args.done);
        if( isFunction(args.fail) ) on.fail.push(args.fail);
        if( isFunction(args.always) ) on.always.push(args.always);
        
        
        if( !args.method ) args.method = 'GET';
        
        if( !args.contentType ) {
            if( args.mode == 'json' ) args.contentType = 'application/json';
            else args.contentType = 'application/x-www-form-urlencoded';
        }
        
        if( args.mode == 'json' && isObject(args.data) ) args.data = JSON.stringify(args.data);
        
		var xhr=null;
		try	{ // Firefox, Opera 8.0+, Safari
			xhr=new XMLHttpRequest();
		} catch (e) { // Internet Explorer
			try { xhr=new ActiveXObject("Msxml2.XMLHTTP"); }
			catch (e) { xhr=new ActiveXObject("Microsoft.XMLHTTP"); }
		}
		if (xhr===null) { alert ("Browser does not support HTTP Request"); }
		
		xhr.open(args.method,url,(args.async === undefined) ? true : args.async);
		xhr.onreadystatechange=function(){
            if( xhr.readyState == 'complete' || xhr.readyState == 4 ) {
                if( xhr.status == 200 ) {
                    on.done.forEach(function(action){ action.apply(xhr) });
                } else {
                    on.fail.forEach(function(action){ action.apply(xhr) });
                }
                on.always.forEach(function(action){ action.apply(xhr) });
            }
		}
		
		xhr.done = function(action){ if( isFunction(action) ) on.done.push(action); return xhr; };
		xhr.fail = function(action){ if( isFunction(action) ) on.fail.push(action); return xhr; };
		xhr.always = function(action){ if( isFunction(action) ) on.always.push(action); return xhr; };
		
		
		xhr.setRequestHeader('Content-Type',args.contentType);
		xhr.send(args.data);
		
		return xhr;
	}
	
	ajax.get = function(url,args){ args = args || {}; args.method = 'GET'; return ajax.apply(ajax,[url,args]); }
	ajax.post = function(url,args){ args = args || {}; args.method = 'POST'; return ajax.apply(ajax,[url,args]); }
    
    function docHandler(){
        var clickHandlers = {};
        
        this.click = function(selector,action){
            if( isString(selector) && isFunction(action) ) clickHandlers[selector] = action;
        }
        
        listen(document,'click',function(e){
            var clicked = e.target;
            
            while( clicked ) {
                Object.keys(clickHandlers).forEach(function(selector){
                    var id = ( selector.match(/\#(\w+)/) || [])[1];
                    var className = ( selector.match(/\.(\w+)/) || [])[1];
                    
                    if( clicked.id == id || clicked.hasClass(className) )  {
                        clickHandlers[selector].apply(clicked,[e]);
                    }
                });
                clicked = clicked.parent();
            }
        });
    }

    window.$doc = new docHandler();
