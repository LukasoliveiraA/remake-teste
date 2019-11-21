import $ from 'jquery';
window.jQuery = $;
window.$ = $;
// import css
import './sass/appStyle.scss';
import './css/pygments.css';
import './css/plugin.css';

// import JS
import * as _ from 'lodash';
import './js/config.js';

// import images

import logo from './images/logo.jpg'; //logo Principal
import logoFooter from './images/logo_footer.jpg'; //logo Footer
import paymentImg from './images/payment.jpg'; //payment
import foto_01 from './images/foto-01.jpg';
import foto_02 from './images/foto-02.jpg';
import foto_03 from './images/foto-03.jpg';

import thumb_01 from './images/thumb-01.jpg';
import thumb_02 from './images/thumb-02.jpg';
import thumb_03 from './images/thumb-03.jpg';

import prateleira_01 from './images/prateleira-01.jpg';
import prateleira_02 from './images/prateleira-02.jpg';
import prateleira_03 from './images/prateleira-03.jpg';
import prateleira_04 from './images/prateleira-04.jpg';



function passImages(){
	var srcLogo = document.getElementById('srcLogo');//logo principal
	var imageStandard = document.getElementById('imageStandard'); //image zoom principal

	var thumb_1 = document.getElementById('thumb-v1'); //thumbs
	var thumb_2 = document.getElementById('thumb-v2'); //thumbs
	var thumb_3 = document.getElementById('thumb-v3'); //thumbs

	var prateleira_v1 = document.getElementById('prateleira-v1'); //prateleiras
	var prateleira_v2 = document.getElementById('prateleira-v2'); //prateleiras
	var prateleira_v3 = document.getElementById('prateleira-v3'); //prateleiras
	var prateleira_v4 = document.getElementById('prateleira-v4'); //prateleiras
	var prateleira_v5 = document.getElementById('prateleira-v5'); //prateleiras
	var prateleira_v6 = document.getElementById('prateleira-v6'); //prateleiras
	var prateleira_v7 = document.getElementById('prateleira-v7'); //prateleiras
	var prateleira_v8 = document.getElementById('prateleira-v8'); //prateleiras

	var logo_footer = document.getElementById('logoFooter');

	var payment = document.getElementById('payment');

    srcLogo.src = logo;
    imageStandard.src = foto_01;
    thumb_1.src = thumb_01;
	thumb_2.src = thumb_02;
	thumb_3.src = thumb_03;

	prateleira_v1.src = prateleira_01;
	prateleira_v2.src = prateleira_02;
	prateleira_v3.src = prateleira_03;
	prateleira_v4.src = prateleira_04;
	prateleira_v5.src = prateleira_01;
	prateleira_v6.src = prateleira_02;
	prateleira_v7.src = prateleira_03;
	prateleira_v8.src = prateleira_04;

	logo_footer.src = logoFooter;
	payment.src = paymentImg;

}
passImages();

/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function ($) {
	var defaults = {
		url: false,
		callback: false,
		target: false,
		duration: 120,
		on: 'mouseover', // other options: grab, click, toggle
		touch: true, // enables a touch fallback
		onZoomIn: false,
		onZoomOut: false,
		magnify: 1
	};

	// Core Zoom Logic, independent of event listeners.
	$.zoom = function(target, source, img, magnify) {
		var targetHeight,
			targetWidth,
			sourceHeight,
			sourceWidth,
			xRatio,
			yRatio,
			offset,
			$target = $(target),
			position = $target.css('position'),
			$source = $(source);

		// The parent element needs positioning so that the zoomed element can be correctly positioned within.
		target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
		target.style.overflow = 'hidden';
		img.style.width = img.style.height = '';

		$(img)
			.addClass('zoomImg')
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0,
				width: img.width * magnify,
				height: img.height * magnify,
				border: 'none',
				maxWidth: 'none',
				maxHeight: 'none'
			})
			.appendTo(target);

		return {
			init: function() {
				targetWidth = $target.outerWidth();
				targetHeight = $target.outerHeight();

				if (source === target) {
					sourceWidth = targetWidth;
					sourceHeight = targetHeight;
				} else {
					sourceWidth = $source.outerWidth();
					sourceHeight = $source.outerHeight();
				}

				xRatio = (img.width - targetWidth) / sourceWidth;
				yRatio = (img.height - targetHeight) / sourceHeight;

				offset = $source.offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);

				top = Math.max(Math.min(top, sourceHeight), 0);
				left = Math.max(Math.min(left, sourceWidth), 0);

				img.style.left = (left * -xRatio) + 'px';
				img.style.top = (top * -yRatio) + 'px';
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			//target will display the zoomed image
			target = settings.target && $(settings.target)[0] || this,
			//source will provide zoom location info (thumbnail)
			source = this,
			$source = $(source),
			img = document.createElement('img'),
			$img = $(img),
			mousemove = 'mousemove.zoom',
			clicked = false,
			touched = false;

			// If a url wasn't specified, look for an image element.
			if (!settings.url) {
				var srcElement = source.querySelector('img');
				if (srcElement) {
					settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
				}
				if (!settings.url) {
					return;
				}
			}

			$source.one('zoom.destroy', function(position, overflow){
				$source.off(".zoom");
				target.style.position = position;
				target.style.overflow = overflow;
				img.onload = null;
				$img.remove();
			}.bind(this, target.style.position, target.style.overflow));

			img.onload = function () {
				var zoom = $.zoom(target, source, img, settings.magnify);

				function start(e) {
					zoom.init();
					zoom.move(e);

					// Skip the fade-in for IE8 and lower since it chokes on fading-in
					// and changing position based on mousemovement at the same time.
					$img.stop()
					.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
				}

				function stop() {
					$img.stop()
					.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
				}

				// Mouse events
				if (settings.on === 'grab') {
					$source
						.on('mousedown.zoom',
							function (e) {
								if (e.which === 1) {
									$(document).one('mouseup.zoom',
										function () {
											stop();

											$(document).off(mousemove, zoom.move);
										}
									);

									start(e);

									$(document).on(mousemove, zoom.move);

									e.preventDefault();
								}
							}
						);
				} else if (settings.on === 'click') {
					$source.on('click.zoom',
						function (e) {
							if (clicked) {
								// bubble the event up to the document to trigger the unbind.
								return;
							} else {
								clicked = true;
								start(e);
								$(document).on(mousemove, zoom.move);
								$(document).one('click.zoom',
									function () {
										stop();
										clicked = false;
										$(document).off(mousemove, zoom.move);
									}
								);
								return false;
							}
						}
					);
				} else if (settings.on === 'toggle') {
					$source.on('click.zoom',
						function (e) {
							if (clicked) {
								stop();
							} else {
								start(e);
							}
							clicked = !clicked;
						}
					);
				} else if (settings.on === 'mouseover') {
					zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

					$source
						.on('mouseenter.zoom', start)
						.on('mouseleave.zoom', stop)
						.on(mousemove, zoom.move);
				}

				// Touch fallback
				if (settings.touch) {
					$source
						.on('touchstart.zoom', function (e) {
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							} else {
								touched = true;
								start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
							}
						})
						.on('touchmove.zoom', function (e) {
							e.preventDefault();
							zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
						})
						.on('touchend.zoom', function (e) {
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							}
						});
				}
				
				if ($.isFunction(settings.callback)) {
					settings.callback.call(img);
				}
			};

			img.setAttribute('role', 'presentation');
			img.setAttribute('id', 'zm85');
			img.alt = '';
			img.src = settings.url;
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));


