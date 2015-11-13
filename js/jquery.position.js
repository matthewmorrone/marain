(function ($) {
  $.each({
    bottom: "bottom",
    left: "left",
    right: "right",
    top: "top"
  }, function (name, type) {
    elem = this[0]
    $.fn[name] = function (value) {
      return $.access(this, function (elem, type, value) {
        if (value === undefined) {
          orig = $.css(elem, type);
          if (orig === "auto") {
            if (type === "left") {return $(elem).offset().left}
            if (type === "top")  {return $(elem).offset().top}
          }
          ret = parseFloat(orig);
          return ($.isNumeric(ret) ? ret : orig);
        }
        $(elem).css(type, value);
      }, type, value, arguments.length, null)
    }
  });
})
(jQuery);