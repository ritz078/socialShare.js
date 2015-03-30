/*
 *
 *
 *
 * Copyright (c) 2015 Ritesh Kumar
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.socialJS = function (options) {
    console.log(options);

    var defaultOptions = {
      url        : window.location.href,
      description: jQuery('meta[name=description]').attr("content"),
      title      : jQuery('title').text(),
      twitter    : true,
      facebook   : true,
      pinterest  : true,
      linkedin   : true
    };

    options = jQuery.extend({}, defaultOptions, options);

    return this.each(function () {
      var process = {

        twitter: {
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://cdn.api.twitter.com/1/urls/count.json?url=' + opts.url + '&callback=?',
              function (data) {
                data.service = "twitter";
                deferred.resolve(data);
              });
            return deferred.promise();
          }

        },

        facebook: {
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://graph.facebook.com/?id=' + opts.url + '&callback=?',
              function (data) {
                data.service = "facebook";
                deferred.resolve(data);
              });
            return deferred.promise();
          }
        },

        pinterest: {
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://api.pinterest.com/v1/urls/count.json?callback=?&url=' + opts.url,
              function (data) {
                data.service = "pinterest";
                deferred.resolve(data);
              });
            return deferred.promise();
          }
        },

        linkedin: {
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://www.linkedin.com/countserv/count/share?url=' + opts.url + '&format=jsonp&callback=?',
              function (data) {
                data.service = "linkedin";
                deferred.resolve(data);
              });
            return deferred.promise();
          }
        },

        googleplus: {
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://anyorigin.com/get?callback=?&url=' + encodeURIComponent('https://plusone.google.com/_/+1/fastbutton?url=' + opts.url),
              function (data) {
                data.service = "googleplus";
                data.count = data.contents.match(/\{c: (\d+)/)[1];
                deferred.resolve(data);
              });
            return deferred.promise();
          }
        }
      };

      process.googleplus.getCount(options).then(function (d) {
        console.log(d);
      });
    });
  };
}(jQuery));
