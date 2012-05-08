#!/bin/sh

git checkout master bookmarklet pivotal-cards.css pivotal-cards.js

(
cat <<-!
<html>
<head><title>Pivotal Cards</title></head>
<body>
<h1>Pivotal Cards</h1>
<p>Printable index cards for your <a href="https://pivotaltracker.com">Pivotal Tracker</a> project.</p>
<ol>
!
echo "<li>Drag the <a href='"$(cat bookmarklet)"'>pivotal-cards</a> bookmarklet to your bookmarks bar,"

cat <<-!
<li>Run the bookmark from within  <a href="https://www.pivotaltracker.com/public_projects">a pivotal project</a> page.
<p><a href="http://www.flickr.com/photos/psd/7152746089/" title="Pivotal Index Cards by psd, on Flickr"><img src="http://farm8.staticflickr.com/7177/7152746089_ed27153ffe.jpg" width="500" height="354" alt="Pivotal Index Cards"></a></p>
<li><a id="github" href="https://github.com/psd/pivotal-cards">Fork me on github</a>!</p>
</ol>
</body>
</html>
!
) > index.html
