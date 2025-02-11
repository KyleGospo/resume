jQuery(document).ready(function () {
	//Bazzite Numbers
	jQuery.ajax({
		url : "https://kylegospodneti.ch/ghp-stats.json",
		dataType: "json",
		success : function (data) {
			var totalPulls = 0;
			var lastData = data[Object.keys(data)[Object.keys(data).length - 1]];

			jQuery.each(lastData, function(key, value) {
				if (key.indexOf("bazzite") !== -1) {
					totalPulls += value;
				}
			});

			var pullCount = Intl.NumberFormat('en-US', {
				notation: "compact",
				maximumFractionDigits: 1
			}).format(totalPulls);

			jQuery('.bazzite-pull-count').text(pullCount);
		}
	});

	jQuery.ajax({
		url : "https://kylegospodneti.ch/bazzite-repo-data.json",
		dataType: "json",
		success : function (data) {
			var stargazersCount = Intl.NumberFormat('en-US', {
				notation: "compact",
				maximumFractionDigits: 1
			}).format(data['stargazers_count']);

			jQuery('.bazzite-star-count').text(stargazersCount);
		}
	});

	//Initialize Wave Effects
	Waves.attach('.button-float .vc_btn3-style-flat', ['waves-light', 'waves-float']);
	Waves.attach('.email-btn', ['waves-button', 'waves-float']);
	Waves.attach('.pgp-btn', ['waves-button', 'waves-float']);
	Waves.attach('.vc_btn3-style-flat', 'waves-light');
	Waves.attach('.bottom-link', 'waves-button');
	Waves.attach('ul#social li a', 'waves-circle');
	Waves.attach('ul#header-social li a', 'waves-circle');
	Waves.init();
	
	// Header Sizing
	function ResizeToSlider() {
		jQuery('.auto-height-block').height(jQuery('.auto-height-slider').height());
	}
	
	var timer_id;
    	jQuery(window).resize(function() {
    	    clearTimeout(timer_id);
    	    timer_id = setTimeout(function() {
    	        ResizeToSlider();
    	    }, 300);
    	});
	
	ResizeToSlider();
	
	function HandleScrolledHeader() {
		var value = jQuery(window).scrollTop();
		if ( value > 120 )	{
			jQuery(".hide-scrolled").addClass("hidden-scrolled");
		} else {
			jQuery(".hide-scrolled").removeClass("hidden-scrolled");
		}
		
		if(jQuery(document).height() > jQuery(window).height() + 175 && value + jQuery(window).height() > jQuery(document).height() - 175) {
			jQuery('.totop').addClass('show-fab');
		} else {
			jQuery('.totop').removeClass('show-fab');
		}
	}
	
	jQuery(window).scroll( function() {
		HandleScrolledHeader();
	});
	
	HandleScrolledHeader();

	// GitHub Art
	/*GitHubCalendar(
		".github-calendar-art",
		"KyleGospo",
		{
			summary_text: '',
			responsive: true,
			global_stats: false,
			tooltips: false,
			cache: 604800
		}
	);*/

	// URL References
	jQuery('a.index').each(function(index) {
		jQuery('.referenced-urls-list').append('<li><a href="' + jQuery(this).attr('href') + '">' + jQuery(this).text() + ' - ' + jQuery(this).attr('href') + '</a></li>');
		jQuery(this).append('<sup class="index-marker">[' + (index + 1) + ']</sup>');
	});

	// PGP Button
	function copyToClipboard(element) {
		var temp = jQuery("<input>");
		jQuery("body").append(temp);

		temp.val(jQuery(element).html()).select();
		document.execCommand("copy");

		temp.remove();
	}

	jQuery('.pgp-btn').on('click', function() {
		Toastify({
			text: 'PGP pubkey copied to clipboard.',
			duration: 3000,
			close: false,
			position: 'center',
			style: {
				background: "#000",
				color: "#fff"
			}
		}).showToast();
	});

	new ClipboardJS('.pgp-btn');
});
