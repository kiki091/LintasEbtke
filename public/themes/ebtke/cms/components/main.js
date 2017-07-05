$(document).ready(function(){
    datePicker();
    cardAccordion();
    wizardSlide();
    vue();
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

/* NOTIFICATION MESSAGE */
function notify(){
  $('.test-notif').on('click', function(){
    $.notify({
      title: 'Sorry, there are few missing contents detected, please complete all the required fields.',
      message: '<li class="notif__content__li"><span class="text" >Offers Title.jp is missing</span></li>'
    }, { 
      style: 'notif-msg',
      autoHide: false,
      clickToHide: false,
      position: 'bottom left',
      className: 'error'
    });

    $('.notifyjs-wrapper').on('load', '.notif__content__ul', function(){
    console.log('aefaa');
    $(this).mCustomScrollbar({
      theme:"dark-thin",
      axis:"y"
    });
  });
  });


    /* FORM ERROR STYLE */
  var img = 'http://'+ lintas.app_domain +'/themes/ebtke/cms/svg/ico-important.svg';
  var count = $( '.notif__content__li' ).size();
  $.notify.addStyle('notif-msg', {
    html:
    '<div>' +
      '<div class="notif__form__error">' +
          '<div class="notif__icon">' +
              '<img src="' + img + '" alt="">' +
          '</div>' +
          '<div class="notif__msg">' +
              '<button class="notif__close no">&times;</button>' +
              '<p class="notif__content">' +
                  '<span data-notify-html="title"></span>' +
                  '<ul class="notif__content__ul" data-notify-html="message"></ul>' +
              '</p>' +
          '</div>' +
      '</div>' +
    '</div>'
  });
  
  // $('.notif__content__ul').mCustomScrollbar({
  //   theme:"dark-thin",
  //   axis:"y"
  // });
  $(document).on('click', '.notifyjs-notif-msg-base .no', function() {
    $(this).trigger('notify-hide');
  });



  /* GLOBAL NOTIF STYLE */
  $.notify.addStyle('foo', {
    html:
    '<div>' +
      '<div class="notification__wrapper">' +
        '<div class="notification__style">' +
            '<div class="notification__messages">' +
                '<span data-notify-html="title"></span>' +
            '</div>' +
            '<div class="notification__button">' +
                '<button class="btn__notif__close no" id="close-notif">&times;</button>' +
            '</div>' +
        '</div>' +
      '<div class="notification__shadow"></div>' +
      '</div>' +
    '<div>'
  });
  $(document).on('click', '.notifyjs-foo-base .no', function() {
    $(this).trigger('notify-hide');
  });
}

function wizardSlide(){

    $('#menu').append('<li class="slide-line"></li>');

    $(document).on('click', '#menu li a', function () {
        /* slide tab wizard */
        var $this = $(this).parent('.wizard--tab--li'),
        offset = $this.offset(),
        offsetBody = $('#box').offset();

        TweenMax.to($('#menu .slide-line'), 0.35, {
            css:{
                width: $this.outerWidth()+'px',
                left: (offset.left-offsetBody.left)+'px'
            },
            ease:Power2.easeInOut,

        });

        /* tab wizard */
        $(this).parent().addClass("active__tab");
        $(this).parent().siblings().removeClass("active__tab");
        $('#menu li a').parent().addClass('inactive__tab');

        var tab = $(this).attr("href");
        $('.active__tab').removeClass('inactive__tab');
        $(".content__tab").not(tab).removeClass('active__content');
        $(tab).addClass('active__content');

        /* hide next & prev button when on last and first element */
        if($('.firstTab').is(':not(.inactive__tab)')) {
          $('#prev-button').hide();
          $('#next-button').show();
        } else if($('.lastTab').is(':not(.inactive__tab)')) {
          $('#next-button').hide();
          $('#prev-button').show();
        } else {
          $('#next-button').show();
          $('#prev-button').show();
        }

        return false;
    });

    var items = $('#menu li a');
    var currentItem = items.filter('.active__tab');
    items.first().trigger("click");
  
    $(document).on('click', '#next-button', function() {
        items.parent('.active__tab').next().find('a').trigger("click");
    });

    $(document).on('click', '#prev-button', function() {
        items.parent('.active__tab').prev().find('a').trigger("click");
    });
}

 function vue(){


    //select dropdown custom directive
    Vue.directive('select', {
        twoWay: true,
        priority: 1000,

        params: ['options'],

        bind: function () {
            var self = this
            $(this.el)
            .select2({
                data: this.params.options,
                minimumResultsForSearch: -1
            })
            .on('change', function () {
                self.set(this.value)
            })
        },
        update: function (value) {
            $(this.el).val(value).trigger('change')
        },
        unbind: function () {
            $(this.el).off().select2('destroy')
        }
    })

 }