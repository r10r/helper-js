var helper = {
  /**
  * If a console is defined (e.g: firebug, chrome developer tools) it
  * logs out the given message to the console
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
  * @toFormat {String} the string to format 
  */
  format: function(toFormat) {
  	var formatted = toFormat;
    for (var i = 1; i < arguments.length; i++) {
  			var arg = i-1;
  			var regexp = new RegExp('\\{' + arg + '\\}', 'gi');
  			formatted = formatted.replace(regexp, arguments[i]);
    }
  	return formatted;
  }
}