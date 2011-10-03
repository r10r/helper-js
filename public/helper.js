/** @namespace */
var helper = {
  /**
  * If a console is defined (e.g: firebug, chrome developer tools) it
  * logs out the given message to the console.
  * @param {String} message the message
  */
  log: function(message) {
    if (window.console) {
      window.console.log(message);
    }
  },
  
  /**
  * Format the given string. The remaining arguments replace the format specifies in the given string.
  * The format specifiers are of the form '{0}', '{1}' ... '{xxxx}' 
  * The first remaining argument replaces all occurences of the format specifier '{0}' and so on ...
  * @param {String} the format string
  * @param {String[]} first value is the format string, remaining arguments are the format values
  * @returns the formated string
  * @example >helper.toFormat('{0} {1}', 'Hello', 'World');
  * 'Hello World'
  */
  format: function(toFormat) {
    var formatted = toFormat;
    for (var i = 1; i < arguments.length; i++) {
      var arg = i-1;
      var regexp = new RegExp('\\{' + arg + '\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
  },
  
  /**
  * Binds a single event listener for the given event type
  * to the window object. The given callback function is
  * executed if the event source element class 
  * attribute matches the given CSS class.
  * The first parameter of the callback function is the source element,
  * the second parameter the event.

  * @param {String} eventType the event to bind to e.g 'click'
  * @param {String} cssClass the CSS class of the source elements to handle
  * @param {Function} callback function to execute for the event
  * @example helper.bind('click', 'foo', function(src, event){alert(src.innerHTML;)});
  */
  bind: function(eventType, cssClass, callback) {
    window.addEventListener('click', function(event) {
      var src = event.srcElement;
      if (src.getAttribute) {
        var value = src.getAttribute('class');
        if (value) {
          var classes = value.split(/ +/);
          if (classes.indexOf(cssClass) > -1) {
            callback(src, event);
          }
        }
      }
    }, true);
  }
}