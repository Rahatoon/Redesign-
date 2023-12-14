(function($) {	
	
	// add Jquery to check if element exists
	$.fn.exists = function () {
		return this.length !== 0;
	}
    function isiPhone(){
        return (
            (navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)
        );
    }

    // Variables
	var $document = $(document);
    var $window = $(window);
    var $body = $('body');
    var $nav = $('header nav');
	var $hero = $('.hero');
	var heroHeightPerc = $hero.height() * 0.8; // if 80% of the hero has scrolled
    var z_portfolio_item_open = false;	
	
	
	

	// change header nav color
	function scrollChangeHeaderNav() {
		var navOffsetTop = $nav.offset().top;

        if( navOffsetTop > heroHeightPerc ) {
            $body.addClass('has-default-nav');
        }
        if( navOffsetTop < heroHeightPerc ) {
            $body.removeClass('has-default-nav');
        }
	}
	window.addEventListener('scroll',function(){
        scrollChangeHeaderNav();                                                                                        
    });
	
	
	
	

	$.ajax({
		url: 'https://zodan.nl/branding/logo/random.php?c=1&w=130',
		dataType: 'text',
		type: 'GET',
		async: true,
		statusCode: {
			404: function (response) {
				console.log('404 - error retrieving random logo');
				$('#header .logo').html('<img src="https://zodan.nl/wp/wp-content/themes/zodan_v6/img/logo-white.svg" alt="zodan logo" title="Zodan" />');
			},
			200: function (response) {
				$('#header .logo').html(response);
			}
		},
		error: function (jqXHR, status, errorThrown) {
			// console.log(status + ':' + errorThrown);
			// $('#header .logo').html('<span>Zodan</span>');\
		}
	});

	/* Initialize the menu overlay
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$('#btn-open-menu').click(function(e){
		e.preventDefault();
		$('.app-menu').addClass('menu--animatable');
		$('.main-menu-box').attr('aria-hidden', 'false');
	});
	$('.close-menu').click(function(){
		$('.main-menu-box').attr('aria-hidden', 'true');
		$('body').removeClass('noscroll');
	});
	function menuOnTransitionEnd() {
		$('.app-menu').removeClass('menu--animatable');
	}
	$('.app-menu').on('transitionend', menuOnTransitionEnd);
    
		
	/* Initialize the search overlay
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$('.search-btn').click(function(e){
		e.preventDefault();
		$('.top-search-area').addClass('menu--animatable');
		$('.top-search-form-bar').attr('aria-hidden', 'false');
		$('#global-search').focus();
	});
	$('.close-search').click(function(){
		$('.top-search-form-bar').attr('aria-hidden', 'true');
		$('body').removeClass('noscroll');
	});
	function searchOnTransitionEnd() {
		$('.top-search-area').removeClass('menu--animatable');
	}
	$('.top-search-area').on('transitionend', searchOnTransitionEnd);

     
		
	/* Initialize the klikdan overlay
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$('.klikdan-btn').click(function(e){
		e.preventDefault();
		$('.klikdan-menu').addClass('menu--animatable');
		$('.klikdan-box').attr('aria-hidden', 'false');
		// $('body').addClass('noscroll');
	});
	$('.close-klikdan').click(function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		$('#mini_play, .ieniemienie').trigger('click');
		setTimeout(function(){ 
			$('.klikdan-box').attr('aria-hidden', 'true');
			$('body').removeClass('noscroll');
		}, 1600); 
	});
	function klikdanOnTransitionEnd() {
		$('.klikdan-menu').removeClass('menu--animatable');
	}
	$('.klikdan-menu').on('transitionend', klikdanOnTransitionEnd);
		
		
		
   /* simplified version of js video controls
     * for Zodan Quote video only
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
	var zvideo;
    var playBaseClass;
    var playbutton_url = "https://zodan.nl/wp/wp-content/themes/zodan_v6/img/z-tv-button.webp";
    var pausebutton_url = "https://zodan.nl/wp/wp-content/themes/zodan_v6/img/z-tv-button-pause.webp";
    var vholder = document.getElementById('z-tv-holder');
    var btnPlay;

	initZVideoPlayer();

	function initZVideoPlayer() {
		if (zvideo = document.getElementById('z-video')) {
			playVid();  	
		}
	}
	function playVid() {
		btnPlay = document.getElementById('btnZplay');
        playBaseClass = btnPlay.className;
		var t; // This is for the timer

		function startCount() {
			t = window.setInterval(function() {
				if (video.ended !== true) {
				} else {
					btnPlay.firstChild.nodeValue = 'Play';
					btnPlay.setAttribute("class", playBaseClass + " paused");
                    $('.z-video-play-button img').attr('src',playbutton_url);
					window.clearInterval(t);
				}
			},1000);		
		}
		// Pausing the timer
		function pauseCount() {
			window.clearInterval(t);
		}
		// Play & pause when the control is clicked
		// play.addEventListener('click',playControl,false);
		zvideo.addEventListener('click',playControl,false);
        vholder.addEventListener('click',playControl,false);

		function playControl() {
			if (zvideo.paused === false) {
				zvideo.pause();
				btnPlay.firstChild.nodeValue = 'Play';
                btnPlay.setAttribute("class", playBaseClass + " paused");
                $('.z-video-play-button img').attr('src',playbutton_url);
				pauseCount();
			} else {
				zvideo.play();
				btnPlay.firstChild.nodeValue = 'Pause';
                btnPlay.setAttribute("class", playBaseClass + " playing");
                $('.z-video-play-button img').attr('src',pausebutton_url);
				startCount();
			}
		}
	}
		
    /* simplified version of js video controls
     * for Zodan ieniemienie video only
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
	var ieniemienie_vid;
	function startMiniPlayer() {
		if (ieniemienie_vid = document.getElementById('z-video-ieniemienie')) {
			if(isiPhone()) {
				// replace ieniemienie vid with an animated gif
				// var templateRoot = document.body.getAttribute("data-template-root");
				ieniemienie_vid.parentNode.removeChild(ieniemienie_vid);
				$('#z-img-ieniemienie').addClass('active off');
				$('.ieniemienie').click(function() {
					$('#z-img-ieniemienie').removeClass('off');
					var ieniemienieSound = document.getElementById('ieniemienieSound');
					ieniemienieSound.volume = 1;
					ieniemienieSound.play();
					ieniemienieSound.onended = function() {
						$('#z-img-ieniemienie').addClass('off');
					};
				});
			} else {
				prepareMiniVid();
			}
		}
	}
	function prepareMiniVid() {
		var miniPlay = document.getElementById('mini_play');
		miniPlay.addEventListener('click',playMiniControl,false);
		ieniemienie_vid.addEventListener('click',playMiniControl,false);
	}
	function playMiniControl() {
		ieniemienie_vid.play();
	}
	window.onload = startMiniPlayer;		
		


	
})(jQuery);






