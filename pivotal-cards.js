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
		'<% _.each(labels, function(label) { %> <span class="label"><%= label %></span> <% }); %>' +
		'			<span>' +
		'		</div>' +
		'		<div class="middle">' +
		'			<div class="story-title"><%= name %></div>' +
		'			<div class="story-type"><%= story_type %></div>' +
		'		</div>' +
		'		<div class="footer">' +
		'			<span class="epic_name"><%= epic_name %></span>' +
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
		'<% _.each(tasks, function(task) { %><tr>' +
		'			<td class="check <%= task._complete ? "complete" : "incomplete" %>"><%= task._complete ? "☑" : "☐" %></td>' +
		'			<td class="task"><%= task._description %></td>' +
		'</tr><% }); %>' +
		'			</table>' +
		'		</div>' +
		'		<div class="footer">' +
		'			<% if (requester) { %><span class="requester"><%= requester %></span><% } %>' +
		'			<% if (owner) { %><span class="owner"><%= owner %></span><% } %>' +
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
	var items = $('.item > .selected'); // use the selected items
  	if (items.length == 0) { // if there are no selected items ...
		items = $('.item'); // ... then use all items
	}
	items.each(function() {
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
			var labels = [];
			var epic_name = "";
			_.each(story.getLabels(), function(label) {
				if (app.project.getEpicByLabel(label)) {
					epic_name = label;
				} else {
					labels.push(label);
				}
			});
			var points = story.getEstimate && story.getEstimate();
			item = {
				story_type: story._storyType ? story._storyType._name : matches[0],
				id: matches[1],
				name: story.getName(),
				description: story._description || "",
				epic_name: epic_name,
				project_name: app.project.getName(),
				labels: labels,
				tasks: story.getTasks && story.getTasks(),
				requester: story.getRequestedBy && story.getRequestedBy().displayName,
				owner: story.getOwnedBy && story.getOwnedBy() && story.getOwnedBy().displayName,
				points: points > 0 ? points : ""
			};
			if (item.story_type === "chore" && item.name.match(/\?\s*$/)) {
				item.story_type = "spike";
			}
			card = make_card(item);
			$(page).append($(card));
		}
	});
	//});

}(jQuery));
