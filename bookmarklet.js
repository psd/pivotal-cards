(function() {

	/* location of scripts */
	var location = '';
	var nocache = '';

	/* inject stylesheet into page */
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = location + 'pivotal-cards.css' + nocache;
	css.media = 'screen,print';
	css.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(css);

	/* inject JavaScript into page */
	var js = document.createElement('script');
	js.src = location + 'pivotal-cards.js' + nocache;
	document.body.appendChild(js);

})();
