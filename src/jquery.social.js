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
      linkedIn   : true
    };

    options = jQuery.extend({}, defaultOptions, options);

    return this.each(function () {
      var process = {

        all: {
          /**
           * The main API to get the counts of all the Social Sites
           */
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('https://count.donreach.com/?url=' + encodeURIComponent(opts.url) + '&callback=?',
              function (data) {
                deferred.resolve(data);
              });
            return deferred.promise();
          }
        },


        twitter: {

          /**
           * Get The count of twitter shares.
           * Used only when the main API has some issues.
           * @param opts
           * @returns {*} promise when the data is resolved
           */

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

          /**
           * Get The count of facebook shares.
           * Used only when the main API has some issues.
           * @param opts
           * @returns {*} promise when the data is resolved
           */

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

          /**
           * Get The count of pinterest shares.
           * Used only when the main API has some issues.
           * @param opts
           * @returns {*} promise when the data is resolved
           */

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

        linkedIn: {

          /**
           * Get The count of linkedin shares.
           * Used only when the main API has some issues.
           * @param opts
           * @returns {*} promise when the data is resolved
           */

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

        gPlus: {

          /**
           * Get The count of G+ shares.
           * Used only when the main API has some issues.
           * This is a workaround as default api doesn't work without Authentication key.
           * @param opts
           * @returns {*} promise when the data is resolved
           */

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

      process.all.getCount(options).then(function (d) {
        console.log(d);
      });
    });
  };
}(jQuery));
