#!/bin/sh

git checkout master bookmarklet pivotal-cards.css pivotal-cards.js

(
cat <<-!
<html>
<head><title>Pivotal Cards</title></head>
<body>
<h1>Pivotal Cards</h1>
<p>Printable index cards for your <a href="https://www.pivotaltracker.com">Pivotal Tracker</a> project.</p>
<ol>
!
echo "<li>Drag the <a href='"$(cat bookmarklet)"'>pivotal-cards</a> bookmarklet to your bookmarks bar,"

cat <<-!
<p><a href="http://www.flickr.com/photos/psd/7005894946/" title="Pivotal Index Cards Bookmarklet by psd, on Flickr"><img src="http://farm6.staticflickr.com/5276/7005894946_3489f1377f.jpg" width="500" height="418" alt="Pivotal Index Cards Bookmarklet"></a></p>
<li>Run the bookmark from within  <a href="https://www.pivotaltracker.com/public_projects">a pivotal project</a> page.
<p><a href="http://www.flickr.com/photos/psd/7152746089/" title="Pivotal Index Cards by psd, on Flickr"><img src="http://farm8.staticflickr.com/7177/7152746089_ed27153ffe.jpg" width="500" height="354" alt="Pivotal Index Cards"></a></p>
<li>Print on A4 in landscape mode, cut and and fold in half:
<p><a href="http://www.flickr.com/photos/psd/7160723862/" title="Pivotal Cards by psd, on Flickr"><img src="http://farm8.staticflickr.com/7223/7160723862_ef5d8e59a7.jpg" width="500" height="442" alt="Pivotal Cards"></a></p>
<li><a id="github" href="https://github.com/psd/pivotal-cards">Fork me on github</a>!</p>
</ol>
<p>Made by <a href="http://whatfettle.com">psd</a> for <a href="http://www.gov.uk">Gov.UK</a> and inspired by <a href="http://davidheath.org/">David</a>.</p>
</body>
</html>
!
) > index.html
