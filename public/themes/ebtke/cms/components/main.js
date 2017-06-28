$(document).ready(function(){
    datePicker();
    cardAccordion();
});

/* BUTTON SHOW CARD PHOTO UPLOADER */
$(document).on('click', '.upload__img__show__preview', function(){
    var id = $(this).attr('id');
    // add class di container saat popup
    $('.main_container').addClass('popupContainer');
    $('body').addClass('popup__upload__preview__container');
    $('#'+ id + '-popup').fadeIn(200);
});

/* BUTTON CLOSE PREVIEW CARD PHOTO UPLOADER */
$(document).on('click', '.img__preview__big__close', function(){
    $(this).parents('.img__preview__overlay').fadeOut(200);

    // remove class di container saat close popup
    setTimeout(function() {
        $('.main_container').removeClass('popupContainer');
        $('body').removeClass('popup__upload__preview__container');
    }, 200);
});

function datePicker(){
    /* DATE TIME PICKER SOTR*/
    $('#sotrdatepicker').datepicker({
        language: 'en',
        dateFormat: 'dd MM yyyy',
        navTitles: {days: 'MM <i>yyyy</i>'},
        autoClose: true,
        toggleSelected: false
    });
    $(document).on('click',".datepick", function(){
        $(this).datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false
        });
    });
    $(document).on('click', '.date-icon', function(){
        $(this).parent('.input-icon').find('.datepick').datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false
        }).focus();
    });
    /* DATE PICKER DISABLE BEFORE TODAY*/
    $(document).on('click',".datepick-disable-before-today", function(){
        $(this).datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false,
            minDate: new Date
        });
    });
    $(document).on('click', '.date-disabled-icon', function(){
        $(this).parent('.input-icon').find('.datepick-disable-before-today').datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false,
            minDate: new Date
        }).focus();
    });

    /* HIDE DATEPICKER WHEN CONTAINER SCORLLING */
    $(".main_container").scroll(function() {
        $(this).find('.datepick').datepicker('hide');
        $(this).find('.datepick').blur();  
    });
    $(".main_container").scroll(function() {
        $(this).find('.datepick-disable-before-today').datepicker('hide');
        $(this).find('.datepick-disable-before-today').blur();  
    });

}

/* =================== ACCORDION ========================== */
function cardAccordion(){
  	$(document).on('click', '.style__accordion', function(){
    	var id = $(this).data('accordion');

    	if($(this).hasClass('clicked')){
      		$('#'+ id).slideDown(400);
      		$(this).removeClass('clicked');
    	}
	    else{
	      	$('#'+ id).slideUp(400);
	      	$(this).addClass('clicked');
	    }
  	});

  // $('.accordion-inner-handle').css('visibility','hidden');

  	$(document).on('click', '.accordion-inner-toggle-button', function(){
    	if($('.accordion-inner-toggle-button').hasClass('clicked')){
      		$('.accordion-inner').slideDown(400);
      		$('.accordion-inner-toggle-button').removeClass('clicked');
      		$('.accordion-inner-handle').css('visibility','hidden');
    	}
    	else{
      		$('.accordion-inner').slideUp(400);
      		$('.accordion-inner-toggle-button').addClass('clicked');
      		$('.accordion-inner-handle').css('visibility','visible');
    	}
  	});
}
/* =================== END ACCORDION ========================== */

/*========================== ACCORDION JS =================================*/
// Accordion
$(function()
{
  	var Accordion = function(el, multiple) {
    	this.el = el || {};
    	this.multiple = multiple || false;

    	// Variables privadas
    	var links = this.el.find('.link');
    	// Evento
    	links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  	}

  	Accordion.prototype.dropdown = function(e) {
    	var $el = e.data.el;
    	$this = $(this),
    	$next = $this.next();

    	$next.slideToggle();
    	$this.parent().toggleClass('open');

    	if (!e.data.multiple) {
      		$el.find('.sidebar__accordion__submenu').not($next).slideUp().parent().removeClass('open');
    	};
  	} 

  	var accordion = new Accordion($('#accordion'), false);
});


function dragOrderTable() {
	
	//Make diagnosis table sortable
	$(".sortable").sortable({
		axis: 'y',
        opacity: 0.7,
        handle: '.handle',
        placeholder: 'plcehldr',
        start: function(ev, ui){
          	isMoved = false;
          	init_X = cX = ev.pageX;
          	init_Y = cY = ev.pageY;
          	sortingEl = ui.item;
          	placeholderEl = ui.placeholder;
          	sortingEl.addClass("sort-el").siblings().addClass("sort-items sort-trans");
          	sortingItems = $(this).find('.sort-items');
          	$(this).addClass("sort-active");
          	sort_items_length = sortingItems.length;
          	
          	if (!isMoved) {
	          	minTop = sortingEl[0].offsetTop;
	            maxTop = sortingEl.parent().outerHeight() - minTop - sortingEl.outerHeight();
	           	sortingElHeight = sortingEl.outerHeight()+5; // 3 is[margin(top+bottom)/2]
          	}
        },
        sort: function(ev,ui){
          isMoved = true;
          cX = ev.pageX;
          cY = ev.pageY;
          new_Y =  cY - init_Y;

          if (new_Y < -minTop){
            	new_Y = -minTop;
          }
          if (new_Y > maxTop){
            	new_Y = maxTop;
          }
          sortingEl.css({"transform":"translateY("+new_Y+"px)"});

          sortingItems.each(function () {
            	var currentEl = $(this);
            	if (currentEl[0] === sortingEl[0]) return;
            	var currentElOffset = currentEl[0].offsetTop;
            	var currentElHeight = currentEl.outerHeight();
            	var sortingElOffset = sortingEl[0].offsetTop + new_Y;

            	if ((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()) {
              		currentEl.css({"transform":"translateY(-"+sortingElHeight+"px)"});
              		placeholderEl.insertAfter(currentEl);
            	}
            	else if ((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()) {
            		currentEl.css({"transform":"translateY("+sortingElHeight+"px)"});
              		placeholderEl.insertBefore(currentEl);
              		return false;
            	}
            	else {
              		$(this).css({"transform":"translateY(0px)"});
            	}
          });
        },
        stop: function(ev,ui){
          	$(this).removeClass("sort-active");
          	isMoved = false;
          	sortingEl.removeAttr("style").removeClass("sort-el");
          	sortingItems.removeClass("sort-trans sort-items").removeAttr("style");
        }
	});
}

function dragPhoto() {
  
/* SORTABLE CARD PHOTO UPLOADER */
  $(".photo-sortable").sortable({
        axis: 'x',
        opacity: 0.7,
        handle: '.handle',
        placeholder: 'plcehldr',
        start: function(ev, ui){
          	isMoved = false;
          	init_X = cX = ev.pageX;
          	init_Y = cY = ev.pageY;
          	sortingEl = ui.item;
          	placeholderEl = ui.placeholder;
          	sortingEl.addClass("sort-el").siblings().addClass("sort-items sort-trans");
          	sortingItems = $(this).find('.sort-items');
          	$(this).addClass("sort-active");
          	sort_items_length = sortingItems.length;
          	
          	if (!isMoved) {
          		minTop = sortingEl[0].offsetLeft;
            	maxTop = sortingEl.parent().outerWidth() - minTop - sortingEl.outerWidth();
            	sortingElHeight = sortingEl.outerWidth()+5; // 3 is[margin(top+bottom)/2]
          	}
        },
        sort: function(ev,ui){
          	isMoved = true;
          	cX = ev.pageX;
          	cY = ev.pageY;
          	new_Y =  cY - init_Y;

          	if (new_Y < -minTop){
            	new_Y = -minTop;
          	}
          	if (new_Y > maxTop){
            	new_Y = maxTop;
          	}
          	sortingEl.css({"transform":"translateX("+new_Y+"px)"});

          	sortingItems.each(function () {
            	var currentEl = $(this);

	            if (currentEl[0] === sortingEl[0]) return;

	            var currentElOffset = currentEl[0].offsetLeft;
	            var currentElHeight = currentEl.outerWidth();
	            var sortingElOffset = sortingEl[0].offsetLeft + new_Y;

            	if ((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()) {
              		currentEl.css({"transform":"translateX(-"+sortingElHeight+"px)"});
              		placeholderEl.insertAfter(currentEl);
            	}
            	else if ((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()) {
            		currentEl.css({"transform":"translateX("+sortingElHeight+"px)"});
              		placeholderEl.insertBefore(currentEl);
              		return false;
            	}
            	else {
              		$(this).css({"transform":"translateX(0px)"});
            	}
          	});
        },
        stop: function(ev,ui){
          	$(this).removeClass("sort-active");
          	isMoved = false;
          	sortingEl.removeAttr("style").removeClass("sort-el");
          	sortingItems.removeClass("sort-trans sort-items").removeAttr("style");
        }
  	});
}

$(document).ready(function() {
  	var cnt = 10;

  	TabbedNotification = function(options) {
    	var message = "<div id='ntf" + cnt + "' class='text alert-" + options.type + "' style='display:none'><h2> " + options.title + "</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" + options.text + "</p></div>";

    	if (!document.getElementById('custom_notifications')) {
      		alert('doesnt exists');
    	} else {
      		$('#custom_notifications #notif-group').append(message);
      		cnt++;
      		CustomTabs(options);
    	}
  	};

  	CustomTabs = function(options) {
    	$('.tabbed_notifications > div').hide();
    	$('.tabbed_notifications > div:first-of-type').show();
    	$('#custom_notifications').removeClass('dsp_none');
    	$('.notifications a').click(function(e) {
      		e.preventDefault();
      		var $this = $(this),
        	tabbed_notifications = '#' + $this.parents('.notifications').data('tabbed_notifications'),
        	others = $this.closest('li').siblings().children('a'),
        	target = $this.attr('href');
      		others.removeClass('active');
      		$this.addClass('active');
      		$(tabbed_notifications).children('div').hide();
      		$(target).show();
    	});
  	};

  	CustomTabs();

  	var tabid = idname = '';

  	$(document).on('click', '.notification_close', function(e) {
    	idname = $(this).parent().parent().attr("id");
    	tabid = idname.substr(-2);
    	$('#ntf' + tabid).remove();
    	$('.notifications a').first().addClass('active');
    	$('#notif-group div').first().css('display', 'block');
  	});
});
