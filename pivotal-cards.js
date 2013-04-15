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

	var options = {
		"filing-colours": true,
		"rubber-stamp": true,
		"double-sided": true,
		"white-backs": true
	};

	var make_front = _.template(
		'<div class="<%= story_type %> card" id="front-<%= cardno %>">' +
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
		'</div>');

	var make_back = _.template(
		'<div class="<%= story_type %> card" id="back-<%= cardno %>">' +
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
	var main = $('<div id="pivotal-cards-pages"></div>');
	_.each(options, function(value, option) {
		if (value) {
			main.addClass(option);
		}
	});
	$('body').append(main);

	/*
	 *  Find visible items
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
	var cardno = 0;
	var fronts = [];
	var backs = [];

	 ids = _.uniq(ids);

	 _.each(ids, function (id) {
		var matches = id.split(":");
		var item;
		var card;

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
			var name = story.getName() || "";
			name = name.replace(/\band\b|&/g, '<span class="amp">&amp;</span>');

			item = {
				cardno: cardno,
				story_type: story._storyType ? story._storyType._name : matches[0],
				id: matches[1],
				name: name,
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

			/*
			 *  make cards using templates
			 */
			card = make_front(item);
			fronts.push($(card));

			card = make_back(item);
			backs.push($(card));

			cardno++;
		}
	});

	/*
	 *  layout cards 
	 */
	function double_sided() {
		var cardno;
		var front_page;
		var back_page;

		for (cardno = 0; cardno < fronts.length; cardno++) {
			if ((cardno % 4) === 0) {
				front_page = $('<div class="page fronts"></div>');
				main.append(front_page);

				back_page = $('<div class="page backs"></div>');
				main.append(back_page);
			}
			front_page.append(fronts[cardno]);
			back_page.append(backs[cardno]);

			/*
			if (!(cardno % 2)) {
			} else {
				$(back_page).children().last().before(backs[cardno]);
			}
			*/
		}
	}

	function single_sided() {
		var cardno;
		var page;

		for (cardno = 0; cardno < fronts.length; cardno++) {
			if ((cardno % 2) === 0) {
				page = $('<div class="page"></div>');
				main.append(page);
			}
			page.append(fronts[cardno]);
			page.append(backs[cardno]);
		}
	}

	if (options['double-sided']) {
		double_sided();
	} else {
		single_sided();
	}

}(jQuery));
