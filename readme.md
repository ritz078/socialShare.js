# socialShare.js

> A jquery plugin to provide more control on social sharing buttons.
> Do the styling without worrying about the javascript implementation.

Demo is available at [http://rkritesh.in/socialShare.js](http://rkritesh.in/socialShare.js)


![screen](demo/demo.gif)

Features
--------

* Full control over the design of the buttons.
* No separate widget js loading for separate services.
* Share counts of all supported services.
* Easy to configure.


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/ritz078/jquery-social-js/master/dist/jquery.socialshare.min.js
[max]: https://raw.githubusercontent.com/ritz078/jquery-social-js/master/dist/jquery.socialshare.js

Install from **npm**
```
npm install --save social-share-js
```

Install from **bower**
```
bower install --save social-share-js
```

Manual injection in your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.socialshare.min.js"></script>
```

##Simple Usage

This is the minimal configuration required to use the plugin

```javascript
$(element).socialShare({
	image 			: 'image-url',
	twitterVia		: 'ritz078',
	twitterHashTags : 'javascript,jquery'
});
```

##Advanced Options
property|default value|Description
--------|-------------|-----------
url|current page url|The url that will be shared
description|current page meta tag description|Can be set to be shared as description on twitter
title|current page title|Title that will be shared
counts|true|set to false to bypass http request to get the counts
twitter|true|set to false to disable 
pinterest|true|set to false to disable
facebook|true|set to false to disable
linkedin|true|set to false to disable
gPlus|true|set to false to disable
image|null|url of the image that will be shared with the links
toWord|true|to convert count numbers into words eg: 12000 to 12K
twitterVia|null|string containing the via value for twitter sharing eg: 'ritz078'.Mandatory if twitter is set to true
twitterHashTags|null|comma separated values to be shared as hashtags in a single string.Mandatory if twitter is set to true.

##How to use ?
You can use these 2 classes to make a class clickable(open share dialogue) and show the share counts.
* **[service]-share** and 
* **[service]-count**

where **[service] = twitter/facebook/pinterest/linkedin/gPlus**

Just add them wherever you want to use them

Class|Description|example
------|----------|-------
**[service]-share**|This is the class that becomes a link after clicking on which the sharing dialogue appears| ```<div class="twitter-share"></div>```
**[service]-count**|Class in which the share count appears|```<span class="twitter-count"></span>```


##Example Usage

* **HTML can comprise of any structure and tags**
* **Just use the 2 types of class provided**

```html
<div class="element">
<!--===== this block will become clickable (shows the twitter share dialogue on click) 
because of the class 'twitter-share'====-->
	<div class="twitter-share">
		<span>Share on twitter</span>
		<span class="twitter-count"></span> <!--====shows twitter share count==-->
	</div>
	<!--=======================================-->

	<!--===== this block will become clickable (shows the facebook share dialogue on click) 
because of the class 'facebook-share'====-->
	<div class="facebook-share">
		<span>Share on Facebook</span>
		<span class="facebook-count"></span><!--=== shows facebook share count==-->
	</div>
	<!--======================================-->
</div>

<script>
	$('.element').socialShare({
		image 			: 'image-url',
		twitterVia		: 'ritz078',
		twitterHashTags : 'javascript,jquery'
	})
</script>


```

Demo is available at [http://rkritesh.in/socialShare.js](http://rkritesh.in/socialShare.js)

## License

MIT © Ritesh Kumar
