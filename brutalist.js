// NAME: brutalist.js
// AUTHOR: Hallam Smith
// DATE: June  6, 2019
// VERSION 1.0
// DESCRIPTION: This is a theme for a brutalist website, it works by exposing
// all of the tags on the page in a readable stlye thereby exposing the
// structure of the page.


// declare functions
function createCSSSelector (selector, style) {
  if (!document.styleSheets) return;
  if (document.getElementsByTagName('head').length == 0) return;

  var styleSheet,mediaType;

  if (document.styleSheets.length > 0) {
    for (var i = 0, l = document.styleSheets.length; i < l; i++) {
      if (document.styleSheets[i].disabled) 
        continue;
      var media = document.styleSheets[i].media;
      mediaType = typeof media;

      if (mediaType === 'string') {
        if (media === '' || (media.indexOf('screen') !== -1)) {
          styleSheet = document.styleSheets[i];
        }
      }
      else if (mediaType=='object') {
        if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
          styleSheet = document.styleSheets[i];
        }
      }

      if (typeof styleSheet !== 'undefined') 
        break;
    }
  }

  if (typeof styleSheet === 'undefined') {
    var styleSheetElement = document.createElement('style');
    styleSheetElement.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

    for (i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].disabled) {
        continue;
      }
      styleSheet = document.styleSheets[i];
    }

    mediaType = typeof styleSheet.media;
  }

  if (mediaType === 'string') {
    for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
      if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
        styleSheet.rules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.addRule(selector,style);
  }
  else if (mediaType === 'object') {
    var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
    for (var i = 0; i < styleSheetLength; i++) {
      if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
        styleSheet.cssRules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
  }
}


// Do everything after the html is loaded
document.addEventListener('DOMContentLoaded', function() {
    createCSSSelector("*", "display:block; font-family:Monospace; margin:1.5em 0; padding:0; text-decoration:none");
    createCSSSelector("html", "max-width:70ch; padding:2ch; margin:auto; color:#333; font-size:1.2em;");
    createCSSSelector("*::before", "color:rgb(136, 18, 128, 0.5); font-weight:100; font-size:1em")
    createCSSSelector("*::after", "color:rgb(136, 18, 128, 0.5); font-weight:100; font-size:1em")
    createCSSSelector("a", "display:inline");
    createCSSSelector("code", "display:inline");
    createCSSSelector("em", "display:inline");
    createCSSSelector("strong", "display:inline");

    // Put HTML tags onto page
    var elementsOnPage = document.getElementsByTagName("*");
    for (var e=0, max=elementsOnPage.length; e < max; e++) {
	//element
	var elem  = elementsOnPage.item(e);
	if (elem.hasAttributes()) {
	    var content = "content:'<" + elem.tagName.toLowerCase();
	    var tag = elem.tagName
	    for (var i = elem.attributes.length -1; i>=0; i--) {
		content += " " + elem.attributes[i].name + "=\"" + elem.attributes[i].value + "\"";
		tag += "[" + elem.attribute[i].name + "+";
	    }
	    content += ">'";
	    createCSSSelector(tag + "::before", content);
	} else {
	//create tags
            createCSSSelector(elem.tagName + "::before", "content:'<" + elem.tagName.toLowerCase() + ">'");
	}
	createCSSSelector(elem.tagName + "::after", "content:'<\/" + elem.tagName.toLowerCase() + ">'");
}
}, false);
