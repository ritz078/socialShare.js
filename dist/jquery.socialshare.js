/*
 *
 *
 *
 * Copyright (c) 2015 Ritesh Kumar
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.socialShare = function (options) {

    var defaultOptions = {
      url            : window.location.href,
      description    : $('meta[name=description]').attr("content"),
      title          : $('title').text(),
      counts         : true,
      twitter        : true,
      facebook       : true,
      pinterest      : true,
      linkedIn       : true,
      gPlus          : true,
      image          : null,
      toWord         : true,
      twitterVia     : null,
      twitterHashTags: $('meta[name=keywords]').attr("content")
    };

    var that = this;

    options = jQuery.extend({}, defaultOptions, options);

    function toWord(num) {
      if (options.toWord) {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1) + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'K';
        }
      }
      return num;
    }

    return this.each(function () {

      var process = {

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
                counts.gPlus = data.contents.match(/\{c: [0-9A-Z.]+/)?parseFloat(data.contents.match(/\{c: [0-9A-Z.]+/)[0].split(' ')[1]):0;
                deferred.resolve(counts);
              });
            return deferred.promise();
          }
        }
      };

      var counts = {};

      function render(c) {
        if (options.facebook) {
          if (options.counts) {
            that.find('.facebook-count').each(function () {
              $(this).html(toWord(c.facebook));
            });
          }

          that.find('.facebook-share').each(function () {
            var url = 'https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(options.url);
            $(this).click(function () {
              openDialog(url, 'facebook');
            });
          });

        }
        if (options.twitter) {
          if (options.counts) {
            that.find('.twitter-count').each(function () {
              $(this).html(toWord(c.twitter));
            });
          }
          that.find('.twitter-share').each(function () {
            var url = 'https://twitter.com/share?url=' + options.url + '&text=' + options.description + '&via=' + options.twitterVia + '&hashtags=' + options.twitterHashTags + '';
            $(this).click(function () {
              openDialog(url, 'twitter');
            });
          });
        }
        if (options.pinterest) {
          if (options.counts) {
            that.find('.pinterest-count').each(function () {
              $(this).html(toWord(c.pinterest));
            });
          }
          that.find('.pinterest-share').each(function () {
            var url = 'https://pinterest.com/pin/create/bookmarklet/?media=' + options.image + '&url=' + options.url + '&description=' + options.description;
            $(this).click(function () {
              openDialog(url, 'pinterest');
            });
          });
        }
        if (options.linkedIn) {
          if (options.counts) {
            that.find('.linkedin-count').each(function () {
              $(this).html(toWord(c.linkedIn));
            });
          }
          that.find('.linkedin-share').each(function () {
            var url = 'http://www.linkedin.com/shareArticle?url=' + options.url;
            $(this).click(function () {
              openDialog(url, 'linkedin');
            });
          });
        }
        if (options.gPlus) {
          if (options.counts) {
            that.find('.gplus-count').each(function () {
              $(this).html(toWord(c.gPlus));
            });
          }
          that.find('.gplus-share').each(function () {
            var url = 'https://plus.google.com/share?url=' + options.url;
            $(this).click(function () {
              openDialog(url, 'gplus');
            });
          });
        }
      }

      if (options.counts) {

            $.when(
              (options.facebook ? process.facebook.getCount(options, counts) : null), (options.twitter ? process.twitter.getCount(options, counts) : null), (options.pinterest ? process.pinterest.getCount(options, counts) : null), (options.linkedIn ? process.linkedIn.getCount(options, counts) : null), (options.gPlus ? process.gPlus.getCount(options, counts) : null)
            )
              .then(function () {
                render(counts);
              });

      }
      else {
        render();
      }

      var winPosition = {
        width : 626,
        height: 336,
        left  : ($(window).width() / 2) - 313,
        top   : ($(window).height() / 3) - 168
      };

      function openDialog(url, service) {
        window.open(
          url,
          service + '-share-dialogue',
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + winPosition.width + ',height=' + winPosition.height + ',top=' + winPosition.top + ',left=' + winPosition.left + ''
        );
        return false;
      }



    });
  };
}(jQuery));
