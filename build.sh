#!/bin/sh

git checkout master bookmarklet pivotal-cards.css pivotal-cards.js

(

echo "Drag the <a href='"$(cat bookmarklet)"'>pivotal-cards</a> bookmarklet to your bookmarks bar."

) > index.html
