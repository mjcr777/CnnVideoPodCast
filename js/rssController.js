/*
 * @author mau777 05/2015
 * RSS Feed Controller
 */
function rssController(){
	
	var ORIGIN = 'http://rss.cnn.com/services/podcasting/ac360/rss'
	  , NUM_ENTRIES = 25
	;
	
	
	var data = false
	;
	
	
	function init(p_callback){
		
		//Google Feed API on load event
	    google.setOnLoadCallback(function(){readRSS(p_callback);});
	}
	
	function readRSS(p_callback){
		
		var feed = new google.feeds.Feed( ORIGIN );
		feed.setNumEntries( NUM_ENTRIES );
		
      	feed.load(function(result) {
	    	  
	        if (!result.error) {
	        	
	        	window.console.log(result);
	        	
	        	data = result;
	        	
	        	if (p_callback && typeof p_callback === 'function'){
	        		
	        		p_callback(data);
	        	}
	        }
	        else {
	        	window.console.error('Error getting RSS data');
	        }
      	}); 	
	}
	
	function get(){
		
		return data;
	}
	
	this.get = get;
	this.init = init;
	
	return this;
}