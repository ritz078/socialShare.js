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
      description: $('meta[name=description]').attr("content"),
      title      : $('title').text(),
      twitter    : true,
      facebook   : true,
      pinterest  : true,
      linkedIn   : true,
      gPlus      : true
    };

    var that=this;

    options = jQuery.extend({}, defaultOptions, options);

    return this.each(function () {
      var process = {

        all: {
          /**
           * The main API to get the counts of all the Social Sites
           */
          getCount: function (opts) {
            var deferred = jQuery.Deferred();
            var counts = {};
            jQuery.getJSON('https://count.donreach.com/?url=' + encodeURIComponent(opts.url) + '&callback=?',
              function (data) {
                counts.url = data.url;
                counts.facebook = data.shares.facebook;
                counts.twitter = data.shares.twitter;
                counts.linkedIn = data.shares.linkedin;
                counts.pinterest = data.shares.pinterest;
                counts.gPlus = data.shares.google;
                counts.success = true;
                deferred.resolve(counts);
              })
              .fail(function (jqxhr, textStatus, error) {
                alert(error);
                counts.success = false;
                deferred.resolve(counts);
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

          getCount: function (opts, counts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://cdn.api.twitter.com/1/urls/count.json?url=' + opts.url + '&callback=?',
              function (data) {
                counts.twitter = data.count;
                deferred.resolve(counts);
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

          getCount: function (opts, counts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('https://api.facebook.com/method/links.getStats?format=json&urls=' + opts.url + '&callback=?',
              function (data) {
                counts.facebook = data[0].total_count;
                deferred.resolve(counts);
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

          getCount: function (opts, counts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://api.pinterest.com/v1/urls/count.json?callback=?&url=' + opts.url,
              function (data) {
                counts.pinterest = data.count;
                deferred.resolve(counts);
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

          getCount: function (opts, counts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('https://www.linkedin.com/countserv/count/share?format=jsonp&url=' + opts.url + '&callback=?',
              function (data) {
                counts.linkedIn = data.count;
                deferred.resolve(counts);
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

          getCount: function (opts, counts) {
            var deferred = jQuery.Deferred();
            jQuery.getJSON('http://anyorigin.com/get?callback=?&url=' + encodeURIComponent('https://plusone.google.com/_/+1/fastbutton?url=' + opts.url),
              function (data) {
                counts.gPlus = parseFloat(data.contents.match(/\{c: [0-9A-Z.]+/)[0].split(' ')[1]);
                deferred.resolve(counts);
              });
            return deferred.promise();
          }
        }
      };

      var counts = {};

      process.all.getCount(options).then(function (d) {
        counts = d;

        if (!d.success) {
          $.when(
            (options.facebook ? process.facebook.getCount(options, counts) : null),
            (options.twitter ? process.twitter.getCount(options, counts) : null),
            (options.pinterest ? process.pinterest.getCount(options, counts) : null),
            (options.linkedIn ? process.linkedIn.getCount(options, counts) : null),
            (options.gPlus ? process.gPlus.getCount(options, counts) : null)
          )
            .then(function () {
              render(counts);
            });
        }
        else{
          render(counts);
        }

      });

      function render(c){
        if(options.facebook){
          that.find('.facebook-count').each(function(){
            $(this).html(c.facebook);
          });
        }
        if(options.twitter){
          that.find('.twitter-count').each(function(){
            $(this).html(c.twitter);
          });
        }
        if(options.pinterest){
          that.find('.pinterest-count').each(function(){
            $(this).html(c.pinterest);
          });
        }
        if(options.linkedIn){
          that.find('.linkedin-count').each(function(){
            $(this).html(c.linkedIn);
          });
        }
        if(options.gPlus){
          that.find('.google-plus-count').each(function(){
            $(this).html(c.gPlus);
          });
        }
      }


    });
  };
}(jQuery));
