/*
 * @author mau777 05/2015
 *  Player Controller
 */
function playerController(){
	
	var _this = this;
	
	_this.rss = null;
	_this.key = null;
	_this.carousel = null;
	_this.video = null;
	_this.$title = null;
	_this.$description = null;

	
	
	function init(){
		
		_this.rss = new rssController();
		_this.key = new keyController();
		_this.carousel = new carouselController();
		_this.video = new videoController();
		_this.$title = $('#player-title');
		_this.$description = $('#player-description');

		_this.key.init();
		_this.carousel.init();
		_this.video.init();
		
		//Inflate player content with RSS data
		_this.rss.init( inflate );
	}
	
	function inflate(p_data){
		
		if (!p_data){
			
			window.console.error('No data.');
			return false;
		}
		
		var title = p_data.feed.title || 'No title';
		var description = p_data.feed.description || '';
		var items = p_data.feed.entries;
		
		//Inflate heading
		_this.$title.text( title );
		_this.$description.text( description );
		
		//Inflate carousel
		_this.carousel.inflate( items );
	}
	
	
	this.init = init;
	
	return this;
}