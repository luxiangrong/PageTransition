/*!
 * Page Transition v0.1
 * by HanShanSnow
 * http://hanshansnow.sinaapp.com
 */
/*jshint browser:true, jquery:true */

;(function($) {
	$.fn.drags = function(opt) {
		var opt = $.extend({
			cursor : "move"
		}, opt);

		var $el = this;
		
		var parseToMatrix = function(str) {
			var reg = /^matrix\((-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\)$/;
			var matches = str.match(reg);
			if($.isArray( matches) && matches.length == 7) {
				matches.splice(0,1);
				return matches;
			}
			return [0,0,0,0,0,0];
		};

		return $el.css('cursor', opt.cursor).on("mousedown touchstart", function(e) {
			var $drag = $(this).addClass('draggable');
			var z_idx = $drag.css('z-index'); 
			var	drg_h = $drag.outerHeight();
			var	drg_w = $drag.outerWidth();
			
			
			if(Modernizr.csstransforms) {
				var transformMatrix = parseToMatrix($drag.css('transform'));
				var	pos_y = transformMatrix[5] + drg_h;
				var	pos_x = transformMatrix[4] + drg_w;
			} else {
				var	pos_y = $drag.offset().top + drg_h - e.pageY;
				var	pos_x = $drag.offset().left + drg_w - e.pageX;
			}
			
			console.log();
			
			$drag.css('z-index', 1000).on("mousemove touchmove", function(e) {
				// $('.draggable').offset({
					// top : e.pageY + pos_y - drg_h,
					// left : e.pageX + pos_x - drg_w
				// }).on("mouseup", function() {
					// $(this).removeClass('draggable').css('z-index', z_idx);
				// });
				
				if(Modernizr.touch) {
					var _x = e.originalEvent.touches[0].clientX + pos_x;
					var _y = e.originalEvent.touches[0].clientY + pos_y;
				} else {
					var _x = e.pageX + pos_x - drg_w;
					var _y = e.pageY + pos_y - drg_h;
				}
				
				console.log(_y);
				$('.draggable').css({
					'transform': 'translate3d(' + _x +  'px, '+ _y + 'px, ' + '0px)'
				}).on("mouseup touchend", function() {
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
			});
			e.preventDefault();
			// disable selection
		}).on("mouseup touchend", function() {
			if (opt.handle === "") {
				$(this).removeClass('draggable');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});
	};
})(jQuery);

;(function($) {
	"use strict";
	$.fn.pageTransition = function(options) {
		var _stage = $(this);
		var winWidth = $(window).width();
		var winHeight = $(window).height();

		var _acts = _stage.find('.act');
	};
})(jQuery); 

$(".stage").drags();
console.log(Modernizr);
