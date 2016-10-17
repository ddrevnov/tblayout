$(document).ready(function() {

  var $sidebar = $('.sidebar');
  var $sidebarItem = $sidebar.find('.sidebar__item');
  $('.sidebar__submenu').hide();

  $sidebarItem.on({
    'mouseenter':function(){
      $(this).addClass('is-hover');
      $(this).find('.sidebar__submenu').show();
    },'mouseleave':function(){
      $(this).removeClass('is-hover');
      $(this).find('.sidebar__submenu').hide();
    }
  });

  //select init
  $('.select, .checkbox, .input').styler();


  //TABS ------------------------------------------------------------------------

  var $blockItem = $('.block__item');
  $blockItem.click(function(){
    var $this = $(this);
    var $block = $this.closest('.block');
    var tab_id = $this.attr('data-tab');

    $block.find('.block__item').removeClass('is-active');
    $this.addClass('is-active');

    $block.children('.tab-content').removeClass('is-active');
    $("#"+tab_id).addClass('is-active');

    $this
      .closest('.block').find('.block')
      .find('.block__item:first').addClass('is-active');
  });


  //SETTINGS ------------------------------------------------------------------
  var $settings = $('.settings');

  $('.settings__list').hide();
  $('.settings__ico').removeClass('is-hover');

  $settings.on({
    'mouseenter': function() {
        var $this = $(this);
        var $settingsIco = $this.find('.settings__ico');
      $settingsIco.addClass('is-hover').closest('.settings').find('.settings__list').show();
    },

    'mouseleave': function() {
      var $this = $(this);
      var $settingsIco = $this.find('.settings__ico');
      $settingsIco.removeClass('is-hover').closest('.settings').find('.settings__list').hide();
    }
  });

  //STICKY INIT ---------------------------------------------------------------

  $(".sidebar__list").sticky();

  //FLAG SELECT --------------------------------------------------------------------

  //$('.jq-selectbox.admin-footer__select')
  //  .find('.jq-selectbox__dropdown')
  //  .find('li').css({
  //  'background': 'url(images/flag-de.png) no-repeat',
  //  'text-indent': '-9999px'
  //});

  //SLICK ----------------------------------------------------------------------------

  if ($('.kalendar-carousel').length) {
    $('.kalendar-carousel').slick({
      slidesToShow: 11,
      prevArrow: '<div class="kalendar-carousel__prev"><i></i></div>',
      nextArrow: '<div class="kalendar-carousel__next"><i></i></div>'
    });
  }

  //PICKERS ----------------------------------------------------------------------------

  $( ".kalendar-form__datepicker" ).datepicker(
    {
      inline: true,
      showOtherMonths: true,
      dateFormat: 'dd/mm/yy'
    }
  );

  var currentDate = new Date();
  $(".kalendar-form__datepicker").datepicker("setDate", currentDate);

  $('.kalendar-form__timepicker').timepicker();

  $(".kalendar-form__colorpicker").spectrum({
    color: "#f00"
  });


  //CHART ---------------------------------------------------------------------------
  var grafic = c3.generate({
    bindto: '#grafic',
    data: {
      columns: [
        ['data1', 300, 350, 300, 0, 0, 120],
        ['data2', 130, 100, 140, 200, 150, 50]
      ],
      types: {
        data1: 'area-spline',
        data2: 'area-spline'
        // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
      },
      colors: {
        data1: 'red',
        data2: 'green'
      },
      groups: [['data1', 'data2']]
    },
    tooltip: {
      show: true,
      grouped: false,
      format: {
        title: function (d) { return null; }
      },
      position: function (data, width, height, element) {
        var chartOffsetX = document.querySelector("#grafic").getBoundingClientRect().left,
          graphOffsetX = document.querySelector("#grafic g.c3-axis-y").getBoundingClientRect().right,
          tooltipWidth = document.getElementById('tooltip').parentNode.clientWidth,
          x = (parseInt(element.getAttribute('cx')) ) + graphOffsetX - chartOffsetX + 10,
          y = element.getAttribute('cy');

        y = y - height + 21;

        return {top: y, left: x}
      },
      contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
        var $$ = this, config = $$.config,
          titleFormat = config.tooltip_format_title || defaultTitleFormat,
          nameFormat = config.tooltip_format_name || function (name) { return name; },
          valueFormat = config.tooltip_format_value || defaultValueFormat,
          text, i, title, value;

        for (i = 0; i < data.length; i++) {
          if (! (data[i] && (data[i].value || data[i].value === 0))) { continue; }

          if (! text) {
            text = "<div id='tooltip' class='d3-tip'>";
          }
          value = valueFormat(data[i].value, data[i].ratio, data[i].id, data[i].index);

          text += "<span class='value'> " + value + " Neue Terminen</span>";
        }

        return text;
      }
    }
  });
});