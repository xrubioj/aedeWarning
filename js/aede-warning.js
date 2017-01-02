/**
 * Small script that checks if you're visiting the page from Spain and warns you about the new "Google tax" that
 * is beign approved in the country.
 * 
 * Author: Xavier Rubio Jansana
 * URL: http://xrubio.com
 *
 * Lightbox is based on the script by Paul Underwood URL: http://www.paulund.co.uk
 */

jQuery(function($){

	var options = {
		height : "250",
		width : "500",
		title:"Parece que estás navegando desde España...",
		description:
			'Puede que no lo sepas, pero esta y otras webs pueden verse amenazadas por el reciente proyecto de ley aprobado por el ' +
			'Congreso, conocido como la "tasa Google". Puedes obtener más información <a href="https://www.google.es/search?q=aede+ley" ' +
			'target="blank">aquí</a> o bien <a href="http://www.microsiervos.com/archivo/internet/reforma-ley-propiedad-intelectual-tasa-aede-incluida-aprobada-congreso.html" ' +
			'target="blank">aquí</a>.',
	};

	function add_styles(){			
		$('.aedewarning_modal_box').css({ 
			'position': 'relative', 
			'top': '20%',
			'margin': 'auto',
			'display': 'none',
			'height': options.height + 'px',
			'width': options.width + 'px',
			'border': '1px solid #fff',
			'box-shadow': '0px 2px 7px #292929',
			'-moz-box-shadow': '0px 2px 7px #292929',
			'-webkit-box-shadow': '0px 2px 7px #292929',
			'border-radius': '10px',
			'-moz-border-radius': '10px',
			'-webkit-border-radius': '10px',
			'background': '#f2f2f2', 
			'z-index': '50',
		});
		$('.aedewarning_modal_close').css({
			'position': 'relative',
			'float': 'right',
			'display': 'block',
			'height': '30px',
			'width': '30px',
			'color': '#fff',
			'border': '1px solid #AEAEAE',
			'border-radius': '30px',
			'background': '#605F61',
			'font-size': '35px',
			'font-weight': 'bold',
			'font-family': 'sans-serif',
			'text-align': 'center',
			'display': 'inline-block',
			'line-height': '25px',
			'margin-top': '-10px',
			'margin-right': '-10px',
			'text-decoration': 'none',
			'padding': '3px 3px',
		});
		$('.aedewarning_block_page').css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'background-color': 'rgba(0,0,0,0.6)',
			'height': '100%',
			'width': '100%',
			'z-index': '10',
			'font-family': 'Verdana, Geneva, Arial, "Helvetica Neue", Helvetica, sans-serif'
		});
		$('.aedewarning_inner_modal_box').css({
			'background-color': '#fff',
			'height': (options.height - 50) + 'px',
			'width': (options.width - 50) + 'px',
			'padding': '10px',
			'margin': '15px',
			'border-radius': '10px',
			'-moz-border-radius': '10px',
			'-webkit-border-radius': '10px'
		});
	}

	function add_block_page(){
		var block_page = $('<div class="aedewarning_block_page"></div>');
		$(block_page).appendTo('body');
	}

	function add_popup_box(){
		var pop_up = $('<div class="aedewarning_modal_box"><a href="#" class="aedewarning_modal_close">x</a>' +
						'<div class="aedewarning_inner_modal_box"><h2 style="margin-top: 0.5em">' + options.title + '</h2><p>' + options.description + '</p></div></div>');
		$(pop_up).appendTo('.aedewarning_block_page');

		var close = function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			$('.aedewarning_block_page').fadeOut('slow', function() { $(this).remove(); });
		}

		$('.aedewarning_block_page').click(close);
		$('.aedewarning_modal_close').click(close);
	}

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name,"",-1);
	}

	if (readCookie('aedeWarningShown'))
		return;
	
	$.get("http://ipinfo.io", function (response) {

		if (response.country == "ES") {

			createCookie('aedeWarningShown', '1', 365);

			add_block_page();
			add_popup_box();
			add_styles();

			$('.aedewarning_modal_box').fadeIn();
		}
	}, "jsonp");

});
