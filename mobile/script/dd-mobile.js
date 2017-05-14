var map;
var menuSponsorCarouselLinks = [];
	
function ie()
{ 
    if(navigator.userAgent.indexOf('MSIE')!==-1
	|| navigator.appVersion.indexOf('Trident/') > 0){
	   return true;
	}
	return false;
};
function LoadSlideShow()
{
    // Load images for slideshow:
	var dir="mobile/images/favorites/m_home/800",
	fileextension = ".jpg",
	carouselLinks = [];
	
    $.ajax({
        url: dir,
		success:(function (data) {
			$(data).find("a[href *='" + fileextension + "']").each(function () {
				var filename = this.href.replace(window.location.host, "").replace("http://", "");	
				
				carouselLinks.push({
				href: dir + filename
				});
			});
			// Initialize the Gallery as image carousel:
			blueimp.Gallery(carouselLinks, {
				container: '#blueimp-gallery-dialog',
				carousel: true,
				stretchImages: 'cover',
				slideshowTransitionSpeed:500,
				slideshowInterval:10000,
				onslideend: function (index, slide) {
					$('#bannerimg').fadeIn('fast').delay(6000).fadeOut('fast');
					$('#tagline').fadeIn('fast').delay(6000).fadeOut('fast');
				},
				});
		})
	});
}

$(function () {
    'use strict';

	LoadSlideShow();
	var $spacer = $('<span>').addClass('photospacer');
   	updatePhoto('mobile/images/sponsors/2017', 'div[id^="blueimp-image-sponsors"]', true, $spacer);
});

var directionsService;
var directionsDisplay;

  function initMap() {
		$('#map').hide();
		$('#map').show();
		$('#map').css("display", "block");
		$('.gm-style').hide();
		$('.gm-style').show();
        directionsService = new google.maps.DirectionsService;
		var latlng = new google.maps.LatLng(42.3535068, -71.0569478);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: latlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
        });
		
        directionsDisplay = new google.maps.DirectionsRenderer( {
          panel: document.getElementById('directionsPanel'),
          draggable: true,
		  map:map
        });
		
		$(".adp-placemark").hide();
      }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	var travelMode = $("input:radio[name='travelMode']:checked").val();
	directionsService.route({
	  origin: document.getElementById('mapStart').value,
	  destination: "10 High St. Boston, MA 02110",
	  travelMode: travelMode == 'drive' ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING
	}, function(response, status) {
	  if (status === google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(response);		
		
		//resize map directions to max direction size
		//setTimeout(function(){
			//var maxDirectionWidth = 0;
		//	$(".adp-directions, .adp-placemark").each(function()
			//{
		//		var currentDirectionWidth = $(this).outerWidth(true);
		//		if (parseInt(currentDirectionWidth) > parseInt(maxDirectionWidth, 10))
		//		{
		//			maxDirectionWidth = currentDirectionWidth;
		//		}
	//		});
		//	var mapWidth = $("#map").outerWidth(true);
		//	var finalWidth = String(parseInt(mapWidth) + parseInt(maxDirectionWidth, 10)) + 'px';
	//		$("#mapParent").css("width", finalWidth);	
	//	}, 100);
		
	  } else {
	   // window.alert('Directions request failed due to ' + status);
	  }
	});
	
  }
  var mapIsInitialized = false;

  var video;
  // Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}
  function initVideo()
  {
	  var options = {
			title: 'Down & Derby',
			href: 'videos/downandderby.mp4',
			type: 'video/mp4',
			startSlideshow: true
	  }
	  video = blueimp.Gallery([options], {
				container: '#blueimp-video',
				carousel: false,
				onclose: function(){$("#continueToWebsite").animate({ opacity: 0 });}
			  });
  }
  function open(hash)
  {
	  window.location.hash=hash;
  }

  function updatePhoto(path, container, useTn, $spacer)
  {
	var $linksContainer = $(container).next(".links");
	fileextension = ".jpg",
	 $.ajax({
        url: path,
		success:(function (data) {
		$linksContainer.html("");
		$(data).find("a[href *='" + fileextension + "']").each(function () {
				var filename = this.href.replace(window.location.host, "").replace("http://", "");
				var $link;
				if (useTn)
				{
					if (filename.indexOf("_tn") == -1)
					{
						$link = $('<a>')
						.append($('<img>').prop('src',  path + filename.replace(fileextension, ("_tn" + fileextension))))
						.prop('href', path + filename);			
						$link.appendTo($linksContainer);								
						if ($spacer)
						{
							$spacer.clone().appendTo($linksContainer);
						}		
					}
				}
				else
				{
					if (filename.indexOf("_tn") == -1)
					{
						$link = $('<a>')
						.append($('<img>').css('height', '100px').css("width", "100px").prop('src',  path + filename))
						.prop('href', path + filename);						
						$link.appendTo($linksContainer);					
						if ($spacer)
						{
							$spacer.clone().appendTo($linksContainer);
						}		
					}
				}			
			});
		})
	});
	
	//wire up lightbox click
	$linksContainer.click(function (event) {
		event = event || window.event;
		var target = event.target || event.srcElement,
			link = target.src ? target.parentNode : target,
			options = {index: link, event: event, container: container, carousel: true},
			links = this.getElementsByTagName('a');
			blueimp.Gallery(links, options);
		
	});
  }

function adjustDivHeight(target)
{
	//remove heights to reset
	$(target).find("p.navDesc").height("");
	$(target).find("p.caption").height("");
	
	//if this is anything other than mobile portrait view, resise.
	if ($(window).width() < 667)
	{
		return;
	}
	
	var heights1 = $(target).find("p.navDesc").map(function() {
		return $(this).actual('height');
	});
	var heights2 = $(target).find("p.caption").map(function() {
		return $(this).actual('height');
	});
	var maxHeight1 = Math.max.apply(this, heights1);
	$(target).find("p.navDesc").height(maxHeight1);

	var maxHeight2 = Math.max.apply(this, heights2);
	$(target).find("p.caption").height(maxHeight2);

}
  $(document).ready(function()
  {	  	

	setTimeout(function(){$("img[delayedsrc]").each(function(){$(this).attr('src', $(this).attr('delayedsrc'))})}, 200);
	 
	$( "#wrapper" ).pagecontainer({
  		defaults: true
	});

	$(window).on("orientationchange", function(event){
		adjustDivHeight("#" + $.mobile.activePage.attr("id"));
	});
	
	$( window ).resize(
		function(event){
			adjustDivHeight("#" + $.mobile.activePage.attr("id"));
		});

	$( ":mobile-pagecontainer" ).on( "pagecontainershow", function(event, ui) { 
		adjustDivHeight("#" + ui.toPage.attr("id"));
		if(window.location.hash=='#one' || !window.location.hash) {
			LoadSlideShow();
	}
	});
		
		$('#wrapper').css('height', $(window).height() + 'px'); 
		//Refresh page whenever going to home or map, to let slideshow and map plugins refresh.
		$(".horse").click(function(){open("#one");});
		$(".event-details-map").click(function(){open("#directions");});
		$(".addeventatc").css("overflow", "visible");
		$(".facebookTwitter").css("height", "28px");
		$(".facebookTwitter").css("width", "28px");		
		updatePhoto("images/2016", '#blueimp-image-photos');
		$(".photoYear").css("background-color", "white");
		$(".photoYear.2016").css("background-color", "yellow");			
		$(".photoYear").click(function(){
			updatePhoto("images/" + $(this).text(), '#blueimp-image-photos');
			$(".photoYear").css("background-color", "white");
			$(this).css("background-color", "yellow");
		});
		/*$("#ticketsID").click(function(){
			open("#tickets");
		});
		$("#eventdetailsID").click(function(){
			open("#eventdetails");
		});
		$("#entertainmentID").click(function(){
			open("#entertainment");
		});
		$("#foodID").click(function(){
			open("#food");
		});
		$("#celebrityID").click(function(){
			open("#celebrity");
		});
		$("#respondID").click(function(){
			open("#respond");
		});*/

	/*
		//initVideo();
		//video.play();
		//$("video").attr("webkit-playsinline", "");
		//$(".video-content a").click();
	*/
		/*
	$("#playVideo").click(function(){
		initVideo();
		//$("#continueToWebsite").animate({ opacity: 0 });
		$("#continueToWebsite").css("visibility", "visible");
		$("#continueToWebsite").animate({ opacity: 100 });
		$("#continueToWebsite").text("Return To Website");
		
		$("video").attr("webkit-playsinline", "");
		video.play();
		
		var $container = video.container;
		
		$container[0].onclose=function(){$("#continueToWebsite").animate({ opacity: 0 })};
		
		$("video").attr("webkit-playsinline", "");
		$(".video-content a").click();
	});*/
	/*
	$("#creditsText").dialog({
			position: { my: "right bottom", at: "right bottom", of: ".credits" },
			autoOpen: false,
			width:400
            });
	$(".credits").click(function() {
	   $("#creditsText").dialog( "open" );
	});*/

	
	//map start point change handler
	var onChangeHandler = function(e) {
		if (e.target.id == "goDirections")
		{
			//stop propagation to change event of map input
			e.stopPropagation();
		}
		calculateAndDisplayRoute(directionsService, directionsDisplay);
		$(".adp-placemark").hide();
		$(".adp-placemark").show();
    };
	
    $('#mapStart').change(onChangeHandler);	
    $('input[name="travelMode"]').change(onChangeHandler);
    $('#goDirections').click(onChangeHandler);
	
	/*
	$("#bannerMapMusic").click(function(){
		$('#tabentertainment > a').click();
		clickTabMenuItem('#tabs-4', '#tab4menu-music');
	});*/
		
  });
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function zoomOutMobile(){
	var viewport = document.querySelector('meta[name="viewport"]');
	if (viewport){
		viewport.content = "initial-scale=0.6";
	}
}