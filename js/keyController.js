/*
 * @author mau777 05/2015
 * Keypad Vontroller
 */
function keyController(){
	
	function init(){
		
		$(document).on('keydown', function(e){
			move(e);
		});
	}
	
	function getKeyCode(e){
		
		var keycode = null;
		
	    if(window.event) {
	        keycode = window.event.keyCode;
	    }
	    else if(e) {
	        keycode = e.which;
	    }
	    
	    return keycode;
	}
	
	function move(e){
		
		var keyCode = getKeyCode(e);
		keyMap(keyCode);
	}
	
	function keyMap(keyCode){
		
		if (keyCode == 38){
			player.carousel.up();
		}
		else if (keyCode == 40){
			player.carousel.down();
		}
		else if (keyCode == 13){
			player.carousel.enter();
		}
	}
	
	this.init = init;
	
	return this;
}