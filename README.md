# Brutalist.js

This is a theme for a static website that exposes all of the html tags and
their attributes. In order to add this to a page either put brutalist.js
on your server and import or import through jsdelivr using:
https://cdn.jsdelivr.net/gh/hallamsmith/brutalist.js/brutalist.js

The initial idea for this came from https://secretgeek.github.io/html_wysiwyg/html.html
which I considered to be one of the most attractive looking websites that
I have come accross so I set out to recreate it for my personal website.

The first problem that I came accross was that it did not handle every
element and every attribute of the elements. Given that there are a great
deal of attributes combinations possible reaching into the thousands for
some tags it would be both an exceptionally large css file and would take
an awful long time to create. So I decided to dynamically create the css
file using javascript. First it gets a list of all the tags in the page,
then it checks whether or not the tag has any attributes and then generates
the tag for those attributes.

The next problem I found was that it would generate tags based on the last
version of the tag found. In order to fix this I ...