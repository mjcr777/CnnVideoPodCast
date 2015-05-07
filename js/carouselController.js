/*
 * @author mau777 05/2015
 *  Carousel Controller
 */
function carouselController(){
	
	var   TEMPLATES_PATH = 'carousel_templates/'
		, TEMPLATES = {
			CAROUSEL_ITEM: {
				  NAME: 'carousel-item-template'
				, PATH: TEMPLATES_PATH + 'carousel-item.html'
			}
		}
		, NUM_ITEMS = 3
	;
	
	
	var $carousel
	  ,	$list
	  , $upBtn
	  , $downBtn
	  , selected = null
	  , last = 0
	  , lastVisible
	  , firstVisible
	;
	
	function init(){
		
		$carousel = $('#carousel');
		$list = $('#carousel-list');
		$upBtn = $('#prev-btn');
		$downBtn = $('#next-btn');
	}
	
	/*
	 * Create carousel with jCarousel plugin
	 */
	function createCarousel(){
		
		var carouselHeight = $list.find('li').outerHeight(true) * NUM_ITEMS;
		
		$carousel.height(carouselHeight);

		$carousel.jcarousel({
		    'vertical': true,
		    scroll: 1,
		    size: carouselHeight
		});
	    
	    //Set number of items and visible elements
	    last = $list.find('li').length -1;
	    firstVisible = 0;
	    lastVisible = NUM_ITEMS - 1;
	    
	    //Select first item
	    select(0);
	}

	
	function select(pos){
		
		if (selected != null){
			getSelectedItem().removeClass('selected');	
		}
		selected = pos;
		getSelectedItem().addClass('selected');
	}
	
	function getSelectedItem(){
		
		if (selected == 'up'){
			return $upBtn;
		}
		else if (selected == 'down'){
			return $downBtn;
		}
		else{
			return $list.find('li').eq(selected);
		} 
		
	}
	
	function inflate(data){
		
		$.get(TEMPLATES.CAROUSEL_ITEM.PATH, function(templates) { 

		    var template = $(templates).filter('#' + TEMPLATES.CAROUSEL_ITEM.NAME).html();
		    $.each(data, function(i,e){
		    	
		    	$list.append(Mustache.render(template, e));
		    	
		    	var item = $list.children().last();
		    	item.data('description', e.contentSnippet);
		    	item.data('link', e.link);
		    })
		    
		    createCarousel();
		});
	}
	
	function play(){

		var link = getSelectedItem().data('link');
		var description = getSelectedItem().data('description');
		
		player.video.inflate(link, description);
		player.video.play();
	}
	
	
	function enter(){
		
		if (selected == 'up'){
			if (firstVisible != 0){
				--firstVisible;
				--lastVisible;
			}
			$carousel.jcarousel('scroll', '-=1');
		}
		else if (selected == 'down'){
			if (lastVisible != last){
				++firstVisible;
				++lastVisible;
			}
			$carousel.jcarousel('scroll', '+=1');
		}
		else {
			play();
		}
	}
	
	function up(){
		switch (selected){
			
			case 'up': break;
			case 'down': select(lastVisible); break;
			case firstVisible: select('up'); break;
			default: select(selected-1); break;
		}
	}
	
	function down(){
		switch (selected){
			
			case 'up': select(firstVisible); break;
			case 'down': break;
			case lastVisible: select('down'); break;
			default: select(selected+1); break;
		}
	}
	
	this.init = init;
	this.inflate = inflate;
	this.up = up;
	this.down = down;
	this.enter = enter;
	
	return this;
}