//true devtools and config vue js

Vue.config.devtools = true;
Vue.config.debug = true;
//end true devtools and config vue js

Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

//vue custome directive sortable js https://github.com/RubaXa/Sortable

Vue.directive("sort", {
    bind: function(){
        $(this.el).sortable({
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
        }) // fin sortable
    },
    update: function (value) {
            $(this.el).val(value).trigger('drop')
        },
    unbind: function () {
        $(this.el).off().sortable('destroy')
    }
});

//end vue custome directive sortable js

function setSelectedFolder()
{
    var CURRENT_SLUG = window.location.href.split("#")[1]
    var $SIDEBAR_MENU = $('.folder--nav')

    $SIDEBAR_MENU.find('a.folder--selected').removeClass("folder--selected")
    var addingClass = $SIDEBAR_MENU.find('a[href="#' + CURRENT_SLUG + '"]').addClass("folder--selected")

}

function property() {
    $('.btn__add').click(function()
    {
        var btn = $(this);
        var text = $(this).html();
        
        btn.removeClass('btn__add').addClass('btn__add btn__disable');
        //$('.new__form__input__field').val("");
        btn.parent().closest('.main__wrapper__content').find('.main__content__form__layer').slideDown(400);
    });

    $('.btn__add__cancel').click(function()
    {
        var btn = $(this);
        var text = $(this).html();
        
        btn.removeClass('btn__add__cancel').addClass('btn__add__cancel');
        $('.btn__disable').removeClass('btn__disable');
        $('.new__form__input__field').val("");
        btn.parent().closest('.main__wrapper__content').find('.main__content__form__layer').slideUp(400);
    });

    notify();

}
$(document).ready(function() {

    //vue component modal
    Vue.component('modal', {
        template: '#modal-template',
        props: ['show']
    });
    //end vue component modal

    //for url
    var url      = window.location.href; 
    var split_url = lintas.href_url.split('#');

    if(split_url[1])
    {
        var vue_action = split_url[1].split('_');
        if(vue_action[0])        
        { 
            //set sidebar active and open toggle
            $("#" + vue_action[0]).parent().parent().parent().addClass("open");
            $("#" + vue_action[0]).parent().addClass("active__accordion__item");
            //end set sidebar active
            window[vue_action[1]]();
        }
    }
    //end url
    
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
    //end select dropdown custom directive
    
    //ckeditor custom directive
    Vue.directive('rich-editor', {
        twoWay: true,
        /*bind: function () {
            Vue.nextTick(this.setupEditor.bind(this));
        },*/
        bind: function () {
            var self = this;
            CKEDITOR.replace(this.el.id);
            CKEDITOR.instances[this.el.id].setData(this);
            CKEDITOR.instances[this.el.id].on('change', function () {
                self.set(CKEDITOR.instances[self.el.id].getData());
            });
        },
        setupEditor: function () {
            // if (!document.contains(this.el))
            //    return Vue.nextTick(this.bind.bind(this));
            var vm = this;
            CKEDITOR.replace(this.el.id);
            CKEDITOR.instances[this.el.id].on('change', function () {
                vm.set(CKEDITOR.instances[vm.el.id].getData());
            });
        },
        update: function (value) {
            if (!CKEDITOR.instances[this.el.id])
                return Vue.nextTick(this.update.bind(this, value));
            CKEDITOR.instances[this.el.id].setData(value);
        },
        unbind: function () {
            CKEDITOR.instances[this.el.id].destroy();
        }
    })
//end ckeditor custom directive
})

function pushNotifValidation(status, title, message, autoHide, position)
{
    if (typeof autoHide == 'undefined') {
        autoHide = true
    }

    if (typeof title == 'undefined' || title == '' || title == 'default') {
        title = 'Sorry, there are few missing contents detected, please complete all the required fields.'
    }

    if (typeof position == 'undefined') {
        position = 'bottom left'
    }

    var className = '';
    if (status == false) {
        var className = 'error';
    }

    $.notify({
        title: title,
        message: message,
    }, {
        style: 'notif-msg',
        autoHide: autoHide,
        clickToHide: false,
        position: position,
        className: className
    });
}

function pushNotif(status, message)
{
    var time = '6000';
    if(status == true)
    {
        new TabbedNotification({
            title: 'Success !!',
            text: message,
            type: 'info',
            sound: false
        });
    }
    else{
        new TabbedNotification({
            title: 'Failed !!',
            text: message,
            type: 'error',
            sound: false
        });
    }

    function hideNotif()
    {
        var tabid = idname = '';

        $('.notification_close', function(e) {
            idname = $(this).parent().parent().attr("id");
            tabid = '10';
            $('#ntf' + tabid).remove();
            $('.notifications a').first().addClass('active');
            $('#notif-group div').first().css('display', 'block');
        });
    }

    var timer =  setInterval(hideNotif, time);
}

function showLoading()
{
    HoldOn.open({
      theme:"sk-rect"
    });
    
}

function hideLoading()
{
    HoldOn.close();
}

function replaceToCkEditor()
{
	$(".ckeditor").each(function(){
        CKEDITOR.replace( $(this).attr('id') );
    });

}

function destroyInstanceCkEditor()
{
    for (instance in CKEDITOR.instances) {
        if (CKEDITOR.instances[instance]) {
            CKEDITOR.instances[instance].destroy(true);
        }
    }
}

function buttonClickOpen() {
    $('.content__btn a').click(function(){
        var id = $(this).attr('id');
        $('#'+ id + '-content').slideDown('swing');
        $('.content__btn a').removeClass('btn__disable');
        $(this).addClass('btn__disable');
        $('.main__content__form__layer').not($('#'+ id + '-content')).slideUp('swing');

        $('.folder--nav').addClass('folder--hidden');

        var filter = $('#filter-function');
        filter.fadeOut('swing');
    });
}

function buttonClickClose() {
    $('.form--top__btn a').click(function(){

        $('.content__btn a').removeClass('btn__disable');
        $(this).closest('.main__content__form__layer').slideUp('swing');

        $('.folder--nav').removeClass('folder--hidden');

        var filter = $('#filter-function');
        filter.fadeIn('swing');
    });
}

function checkBooxCustom()
{
  $('input').iCheck({
      checkboxClass: 'icheckbox_flat',
      radioClass: 'iradio_flat'
  });
}


function scrollTop()
{
    $('.main__content__layer').scrollTop(0);
}

function mainGeneral(){
    scrollTop();
    datePicker();
    datetimePicker();
    setSelectedFolder();
    notify();
}

// INIT FUNCTION MENU GROUP ACCOUNT MANAGEMENT CMS
function initMenuGroup()
{
    mainGeneral();
    crudMenuGroup();
}

// INIT FUNCTION MENU NAVIGATION ACCOUNT MANAGEMENT CMS
function initMenuNavigation()
{
    mainGeneral();
    crudMenuNavigation();
}

// INIT FUNCTION SUB MENU NAVIGATION ACCOUNT MANAGEMENT CMS
function initSubMenuNavigation()
{
    mainGeneral();
    crudSubMenuNavigation();
}

// INIT FUNCTION USER ACCOUNT MANAGEMENT CMS
function initUserAccount()
{
    mainGeneral();
    crudUserAccount();
    buttonClickOpen();
    buttonClickClose();
    masonry(2500);
    masonryAdminNavigation(200);
}

// INIT FUNCTION NEWS CONTENT MANAGER CMS
function initNewsContent()
{
    mainGeneral();
    wizardSlide();
    crudNewsContent();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
}

// INIT FUNCTION EVENT CONTENT MANAGER CMS
function initEventContent()
{
    mainGeneral();
    wizardSlide();
    crudEventContent();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
}

// INIT FUNCTION COMPANY HISTORY CONTENT MANAGER CMS
function initCompanyHistory()
{
    mainGeneral();
    wizardSlide();
    crudCompanyHistory();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
    checkAllLanguage();
    uploadFile();
}

// INIT FUNCTION GREEN PAGES CONTENT MANAGER CMS
function initGreenPagesCategory()
{
    mainGeneral();
    wizardSlide();
    crudGreenPagesCategory();
    buttonClickOpen();
    buttonClickClose();
    checkAllLanguage();
}

// INIT FUNCTION GREEN PAGES CONTENT MANAGER CMS
function initGreenPages()
{
    mainGeneral();
    wizardSlide();
    crudGreenPages();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
}

// INIT FUNCTION INVESTMENT SERVICES CONTENT MANAGER CMS
function initInvestmentServices()
{
    mainGeneral();
    wizardSlide();
    crudInvestmentServices();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
}

// INIT FUNCTION WHITE PAPERS CONTENT MANAGER CMS
function initWhitePapers()
{
    mainGeneral();
    wizardSlide();
    crudWhitePapers();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
    dragPhoto();
    uploadFile();
}


// INIT FUNCTION TOOLS CONTENT MANAGER CMS
function initResourceTools()
{
    mainGeneral();
    wizardSlide();
    crudResourceTools();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION SEO HOME PAGES CONTENT MANAGER CMS
function initSeoHomePages()
{
    mainGeneral();
    wizardSlide();
    crudSeoHomePages();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION SEO VISION MISSION PAGES CONTENT MANAGER CMS
function initSeoVisionMission()
{
    mainGeneral();
    wizardSlide();
    crudSeoVisionMission();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION LINTAS OF SCOPE PAGES CONTENT MANAGER CMS
function initSeoLintasOfScope()
{
    mainGeneral();
    wizardSlide();
    crudSeoLintasOfScope();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION INVESTMENT SERVICES PROCEDURE CONTENT MANAGER CMS
function initSeoServicesProcedure()
{
    mainGeneral();
    wizardSlide();
    crudSeoServicesProcedure();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION GREEN PAGES CONTENT MANAGER CMS
function initSeoGreenPages()
{
    mainGeneral();
    wizardSlide();
    crudSeoGreenPages();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION EVENTS LANDING CONTENT MANAGER CMS
function initSeoNewsPages()
{
    mainGeneral();
    wizardSlide();
    crudSeoNewsPages();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION EVENTS LANDING CONTENT MANAGER CMS
function initSeoEventPages()
{
    mainGeneral();
    wizardSlide();
    crudSeoEventPages();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION RENEWABLE INDUSTRI CONTENT MANAGER CMS
function initSeoRenewableIndustri()
{
    mainGeneral();
    wizardSlide();
    crudSeoRenewableIndustri();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION TOOLS CONTENT MANAGER CMS
function initSeoTools()
{
    mainGeneral();
    wizardSlide();
    crudSeoTools();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION WHITE PAPERS CONTENT MANAGER CMS
function initSeoWhitePaper()
{
    mainGeneral();
    wizardSlide();
    crudSeoWhitePaper();
    buttonClickOpen();
    buttonClickClose();
    replaceToCkEditor();
}

// INIT FUNCTION MAIN BANNER CONTENT MANAGER CMS
function initMainBanner()
{
    mainGeneral();
    wizardSlide();
    crudMainBanner();
    buttonClickOpen();
    buttonClickClose();
}