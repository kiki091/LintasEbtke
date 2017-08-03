$(window).load(function() {

	var date = new Date(),
	d = date.getDate(),
	m = date.getMonth(),
    y = date.getFullYear(),
    started,
    categoryClass;

    var calendar = $('#calendar').fullCalendar({

    	header: {
      		left: 'prev,next',
      		center: 'title',
      		right: 'month,agendaWeek,agendaDay,today'
    	},

    	selectable: true,
    	selectHelper: true,

    	
    	eventClick: function(calEvent, jsEvent, view) {

    		$('#fc_detail').click();
    		$('#description__event').fadeIn()
    		var title__event = $('#description__event').find('#title__event')
      		title__event.text(calEvent.title);

      		var introduction = $('#description__event').find('#introduction__event')
      		introduction.html(calEvent.introduction)

      		var event_url = $('#description__event').find('#link_url')
      		event_url.attr('href',calEvent.event_url)


    	},

    	editable: true,
	    events: lintas.event_url
    });
});