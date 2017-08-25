$(document).ready(function(){
    datePicker();
    timePicker();
    datetimePicker();
    cardAccordion();
    wizardSlide();
    vue();
    dragPhoto();
    checkAllLanguage();
    masonry();
    masonryAdminNavigation();
    selectorDropdownHeader();
});
/* =============================== MASONRY ================================*/
function masonry(delay)
{
  if(delay==0) {
    $('.grid').masonry({
      "itemSelector": ".grid--item",
      percentPosition: true
    });
  }
  else {
    setTimeout(function() {
      $('.grid').masonry({
        "itemSelector": ".grid--item",
        percentPosition: true
      });
    }, delay);
  }

  /* masonry for admin account */
  // var masonryUpdate = function() {
  //   setTimeout(function() {
  //     $('.grid').masonry({
  //       "itemSelector": ".navigation_access",
  //       percentPosition: true
  //     });
  //   }, delay);
  // }
  // $(document).on('click', masonryUpdate);
  // // $(document).mousemove(masonryUpdate);
  // $(document).ajaxComplete(masonryUpdate);
  /*--------------------------*/
}
function masonryAdminNavigation(delays){

  setTimeout(function() {
    $('.grid-check').masonry({
      "itemSelector": ".grid--item-check",
      percentPosition: true
    });
  }, delays);

  /* masonry for admin account */
  var masonryUpdate = function() {
    setTimeout(function() {
      $('.grid-check').masonry({
        "itemSelector": ".grid--item-check",
        percentPosition: true
      });
    }, delays);
  }
  $(document).on('click', masonryUpdate);
  // $(document).mousemove(masonryUpdate);
  $(document).ajaxComplete(masonryUpdate);
  /*--------------------------*/
}
/* ================================== END =====================================*/
function selectorDropdownHeader(){
  $('#selector-dropdown').on('click', function(){
    console.log("masuk")
    $(this).toggleClass('open');
  });

  $('#selector-dropdown').focusout(function() {
    // all dropdowns
    $('.dropdown__select__list').removeClass('open');
  });
}
function uploadFile(){
    $(document).on('change', '.upload__file__input', function () {
        var fileName = $(this).val().replace('C:\\fakepath\\', '');
        // $(this).parents('.custom-file-upload').find('.upload__file__placeholder').val(fileName);
        $(this).parents('.custom__file__upload').find('.upload__file__placeholder').val(fileName);
    });
}
function resetUploadFile(){
    $('input[type="file"]').val('');
    $('.upload__file__placeholder').val('');
}

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
    /*$('.datepicker').datepicker({
        language: 'en',
        dateFormat: 'dd MM yyyy',
        navTitles: {days: 'MM <i>yyyy</i>'},
        autoClose: true,
        toggleSelected: false,
        minDate: new Date
    }).focus();*/
    $(document).on('click',".datepick", function(){
        $(this).datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false,
            minDate: new Date
        }).focus();
    });
    $(document).on('click', '.date-icon', function(){
        $(this).parent('.input-icon').find('.datepick').datepicker({
            language: 'en',
            dateFormat: 'dd-mm-yyyy',
            navTitles: {days: 'MM <i>yyyy</i>'},
            autoClose: true,
            toggleSelected: false,
            minDate: new Date
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
        }).focus();
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
    $(".main__content__layer").scroll(function() {
        $(this).find('.datepick').datepicker('hide');
        $(this).find('.datepick').blur();  
    });

}


function timePicker(){

    $('.timepick').clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });

    /* HIDE DATEPICKER WHEN CONTAINER SCORLLING */
    var tmPckr = $('.timepick')
    $(".container__main").scroll(function() {
        tmPckr.clockpicker('hide');
        tmPckr.blur();  
    });
}

// datetimepicker
function datetimePicker() {
    $(document).on('click',".datetimepicker.datetime.start", function() {
        jQuery(this).datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'en',
            minDate: new Date,
            allowTimes:[
                '8:30', '9:00', '9:30', '10:00', '10:30','11:00', '11:30', '12:00', '12:30', 
                '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
            ],
            onShow:function(ct){
                this.setOptions({
                    maxDate:jQuery('.datetimepicker.datetime.end').val()?jQuery('.datetimepicker.datetime.end').val():false
                });
            }
        });
    });

    // $(document).on('click', '#date-icon-start', function(){

    //     var data = $(this).siblings('#input-icon-start').find('#date_start')
    //     console.log(data)
    //     jQuery(data).datetimepicker({
    //         format:'d/m/Y H:i',
    //         lang:'en',
    //         minDate: new Date,
    //         allowTimes:[
    //             '8:30', '9:00', '9:30', '10:00', '10:30','11:00', '11:30', '12:00', '12:30', 
    //             '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    //         ],
    //         onShow:function(ct){
    //             this.setOptions({
    //                 maxDate:jQuery('.datetimepicker.datetime.end').val()?jQuery('.datetimepicker.datetime.end').val():false
    //             });
    //         }
    //     });
    // });

    var logic = function( currentDateTime ){    
        var fromStartTime = jQuery('.datetimepicker.datetime.start').val()?jQuery('.datetimepicker.datetime.start').val():false
        this.setOptions({
            minDate:jQuery('.datetimepicker.datetime.start').val()?jQuery('.datetimepicker.datetime.start').val():false
        });

        if(fromStartTime.length > 0){

            var dateTimeStart = jQuery('.datetimepicker.datetime.start').val();
            dateTimeStart = dateTimeStart.substr(0, 10);
            var dateTimeEnd = jQuery('.datetimepicker.datetime.end').val();
            dateTimeEnd = dateTimeEnd.substr(0, 10);
            // console.log(dateTimeStart+"  "+dateTimeEnd);

            if( dateTimeStart == dateTimeEnd ){
                var timeFront = fromStartTime.substr(fromStartTime.lastIndexOf(':') - 2);
                timeFront = timeFront.substr(0, 2);
                var timeBack = fromStartTime.substr(fromStartTime.lastIndexOf(':') + 1);
                timeBack = timeBack.substr(0, 1)+2;
                // console.log(timeFront+":"+timeBack);
                this.setOptions({
                    minTime:timeFront+":"+timeBack
                });
            }else{
                this.setOptions({
                    minTime:'0'
                });
            }

        }    
    };

    $(document).on('click',".datetimepicker.datetime.end", function() {
        jQuery(this).datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'en',
            minDate: new Date,
            allowTimes:[
                '8:30', '9:00', '9:30', '10:00', '10:30','11:00', '11:30', '12:00', '12:30', 
                '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
            ],
            onChangeDateTime:logic,
            onShow:logic
        });
    });

    $(".input--date").click(function(){
        if($(this).hasClass("green")){
            $(".xdsoft_datetimepicker").addClass("green"); }
        if($(this).hasClass("red")){
            $(".xdsoft_datetimepicker").addClass("red"); }
        if($(this).hasClass("purple")){
            $(".xdsoft_datetimepicker").addClass("purple"); }
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

  $('.wizard--tab ul').append('<li class="slide-line"></li>');

  $(document).on('click', '.wizard--tab li a', function () {
    /* slide tab wizard */
    var $this = $(this).parent('li'),
    offset = $this.offset(),
    offsetBody = $('.wizard--tab').offset();

    TweenMax.to($(this).parents('ul').find('.slide-line'), 0.35, {
      css:{
        width: $this.outerWidth()+'px',
        left: (offset.left-offsetBody.left)+'px'
      },
      ease:Power2.easeInOut,

    });

    /* tab wizard */
    $(this).parent().addClass("active__tab");
    $(this).parent().siblings().removeClass("active__tab");
    $('.wizard--tab li a').parent().addClass('inactive__tab');

    var tab = $(this).attr("href");
    $('.active__tab').removeClass('inactive__tab');
    $(".content__tab").not(tab).removeClass('active__content');
    $(tab).addClass('active__content');

    /* hide next & prev button when on last and first element */
    if($('.firstTab').is(':not(.inactive__tab)')) {
      $(this).parents('.form').find('.prev-button').addClass('disabled');
      $(this).parents('.form').find('.next-button').removeClass('disabled');
    } else if($('.lastTab').is(':not(.inactive__tab)')) {
      $(this).parents('.form').find('.next-button').addClass('disabled');
      $(this).parents('.form').find('.prev-button').removeClass('disabled');
    } else {
      $(this).parents('.form').find('.next-button').removeClass('disabled');
      $(this).parents('.form').find('.prev-button').removeClass('disabled');
    }

    return false;
  });

  setTimeout(function() {
    $('#menu li').first().find('a').trigger('click');
  }, 500);
  
  $(document).on('click', '.next-button', function() {
    $(this).parents('.form').find('.active__tab').next().find('a').trigger("click");
    // $(this).toggle($('.content__tab:last').is(':not(.active__content)'));
  });
  $(document).on('click', '.prev-button', function() {
    $(this).parents('.form').find('.active__tab').prev().find('a').trigger("click");
    // $(this).toggle($('.content__tab:first').is(':not(.active__content)'));
  });
}
/* ====== END WIZARD TAB ====== */

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

function checkAllLanguage(){
  $('.check-item-all').change(function () {
    $(this).parents('.check-item-wrapper').find('.check-item').prop('checked', $(this).prop("checked"));
  });
}