/*
 * @author mau777 05/2015
 * Video Controller
 */
function videoController(){
	
	var   $video
		, $description
	;
	
	function init(){
		
		$video = $('#video');
		$description = $('#current-clip');
	}
	
	function inflate(link, description){
		
		$description.text(description);
		$video.attr("src", link);		
	}
	
	function play(){
		
		$video.get(0).play();
	}
	
	this.init = init;
	this.inflate = inflate;
	this.play = play;
	
	return this;
}