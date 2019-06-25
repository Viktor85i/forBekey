(function($) {
	$(document).ready(function() {
		$(document).click(function (e) {
			if ($('.menu-button').is(e.target)) {
				$('.list').toggleClass('open');
				$('.menu-button').toggleClass('active');
			}
			if (!$('.menu-button').is(e.target) && $('.list').has(e.target).length === 0) {
				$('.list').removeClass('open');
				$('.menu-button').removeClass('active');
			}


		})

		$('.grid').masonry({
			columnWidth: '.item',
			itemSelector: '.item',
		});

	});
}) (jQuery);