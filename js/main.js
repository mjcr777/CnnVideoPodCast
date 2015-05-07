/*
 * @author mau777 05/2015
 * Main public object
 */
var player;

$(document).ready(function(){
	
	player = new playerController();
	player.init();
	
});