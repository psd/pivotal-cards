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
	var make_card = _.template(
		'<div class="<%= story_type %> card">' +
		'	<div class="front side">' +
		'		<div class="header">' +
		'			<span class="labels">' +
		'				<span class="label">redirection</span>' +
		'			<span>' +
		'		</div>' +
		'		<div class="middle">' +
		'			<div class="story-title"><%= name %></div>' +
		'			<div class="story-type"><%= story_type %></div>' +
		'		</div>' +
		'		<div class="footer">' +
		'			<span class="epic_name"><%= epic_name || "" %></span>' +
		'			<span class="points points<%= points %>"><span><%= points %></span></span>' +
		'		</div>' +
		'	</div>' +
		'	<div class="back side">' +
		'		<div class="header">' +
		'			<span class="project"><%= project_name %></span>' +
		'			<span class="id"><%= id %></span>' +
		'		</div>' +
		'		<div class="middle">' +
		'			<div class="story-title"><%= name %></div>' +
		'			<div class="description"><%= description %></div>' +
		'			<table class="tasks">' +
		'				<tr><td class="check checked">☑</td><td class="task">This is the first task</td></tr>' +
		'				<tr><td class="check">☐</td><td class="task">This is the second task</td></tr>' +
		'				<tr><td class="check checked">☑</td><td class="task">This is the thrid task</td></tr>' +
		'			</table>' +
		'		</div>' +
		'		<div class="footer">' +
		'		</div>' +
		'	</div>' +
		'</div>');


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
		if (matches) {
			ids.push(matches[1] + ":" + matches[2]);
		}
	});

	/*
	 *  build cards
	 */
	 ids = _.uniq(ids);
	 _.each(ids, function (id) {
		var matches = id.split(":");
		var item, card;

		var story = (matches[0] === "epic")
			? app.project.getEpicById(matches[1])
			: app.project.getStoryById(matches[1]);

		if (story) {
			item = {
				story_type: story._storyType ? story._storyType._name : matches[0],
				id: matches[1],
				name: story._name,
				description: story._description,
				epic_name: story._epic_name,
				project_name: app.project.getName(),
				points: story._points || 0
			};
			console.log(item);
			if (item.story_type === "chore" && item.name.match(/\?\s*$/)) {
				item.story_type = "spike";
			}
			card = make_card(item);
			$(page).append($(card));
		}
	});
	//});

}(jQuery));
