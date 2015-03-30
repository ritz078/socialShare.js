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

    var defaultOptions={
      twitter:true,
      facebook:true
    };

    options = $.extend({}, defaultOptions, options);

    console.log(options);

    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('socialJs' + i);
    });
  };
}(jQuery));
