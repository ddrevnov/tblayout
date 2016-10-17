$(document).ready(function() {
  var $clientCarousel = $('#clientCarousel');
  var $nextArrow = $('.client-carousel__next');
  var $prevArrow = $('.client-carousel__prev');

  $clientCarousel.slick({
    nextArrow : $nextArrow,
    prevArrow : $prevArrow
  });


  $( "#bookingTabs" ).tabs();
  $( "#kontaktTabs" ).tabs();
  $( "#bookingAccordion" ).accordion();


  $('#bookingDatepicker').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true
  });

  //select init
  $('.newsletter-table__checkbox, .login-form__checkbox').styler();

  //Google maps api
  if ($('#googleMap').length) {
    console.log('asdf');
    var myCenter = new google.maps.LatLng(51.508742,-0.120850);

    function initialize() {

      var style = [
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            { color: '#bababa' }
          ]
        }, {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            { invert_lightness: true }
          ]
        }, {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            { hue: '#e8e7e3' },
            { color: '#e8e7e3' },
            { saturation: 0 },
            { lightness: 10 }
          ]
        }, {
          featureType: 'poi.school',
          elementType: 'geometry',
          stylers: [
            { hue: '#e8e7e3' },
            { lightness: 1 },
            { saturation: 1 }
          ]
        }
      ];

      var mapProp = {
        center:myCenter,
        zoom: 15,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        styles: style
      };

      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

      var marker = new google.maps.Marker({
        position:myCenter,
        icon:'../images/marker.png'
      });

      marker.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
  }

});