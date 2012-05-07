/*
 *
 *  Print a https://www.pivotaltracker.com view as index cards
 *
 *  depends on jQuery and Underscore and the Pivotal code ..
 *
 *  released under the WTFPL licence
 *
 *  https://github.com/psd/pivotal-cards
 *
 */
(function ($) {

	/*
	 *  overlay with printable pages
	 *
	 *  TBD: really should make a dismissable overlay
	 */
	$('body > *').hide();
	var page = $('<div class="page"></div>');
	$('body').append(page);

	/*
	 *  Find visible items
	 *
	 *  TBD: screen-scraping possibly fragile ..
	 */
	var ids = [];
	$('.item').each(function() {
		var id = this.id || "";
		var matches = id.match(/_(story|epic)([0-9]+)/);
		console.log(id, "matches:", matches);
		if (matches) {
			ids.push(matches[1] + ":" + matches[2]);
		}
	});

	/*
	 *  build cards
	 *
	 *  TBD: use underscore.template
	 */
	 ids = _.uniq(ids);
	 _.each(ids, function (id) {
		console.log(id);
		var matches = id.split(":");
		var story = app.project.getStoryById(matches[1]);
		console.log(id, story);
		if (story) {
			var item = {
				_type: matches[0],
				_id: matches[1],
				_name: story._name,
				_description: story._description,
				_epic_name: story._epic_name,
				_project_name: app.project.getName(),
				_points: story._points || 0
			};

			var card = '<div class="feature card">' +
			'	<div class="front side">' +
			'		<div class="header">' +
			'			<span class="labels">' +
			'				<span class="label">redirection</span>' +
			'			<span>' +
			'		</div>' +
			'		<div class="middle">' +
			'			<div class="story-title">' + item._name + '</div>' +
			'			<div class="story-type">' + item._type + '</div>' +
			'		</div>' +
			'		<div class="footer">' +
			'			<span class="epic_name">' + item._epic_name + '</span>' +
			'			<span class="points points' + item._points + '"><span>' + item._points + '</span></span>' +
			'		</div>' +
			'	</div>' +
			'	<div class="back side">' +
			'		<div class="header">' +
			'			<span class="project">' + item._project_name + '</span>' +
			'			<span class="id">' + item._id + '</span>' +
			'		</div>' +
			'		<div class="middle">' +
			'			<div class="story-title">' + item._name + '</div>' +
			'			<div class="description">' + item._description + '</div>' +
			'			<table class="tasks">' +
			'				<tr><td class="check checked">☑</td><td class="task">This is the first task</td></tr>' +
			'				<tr><td class="check">☐</td><td class="task">This is the second task</td></tr>' +
			'				<tr><td class="check checked">☑</td><td class="task">This is the thrid task</td></tr>' +
			'			</table>' +
			'		</div>' +
			'		<div class="footer">' +
			'		</div>' +
			'	</div>' +
			'</div>'
			$(page).append($(card));
		}
	});
	//});

}(jQuery));
