/** @namespace */
var helper = {
  /**
  * If a console object is defined (e.g: when using firebug, chrome developer tools),
  * this function uses it to display the given message. If no console object is defined
  * them message is just put away.
  *
  * @param {String} message the message
  */
  log: function(message) {
    if (window.console) {
      window.console.log(message);
    }
  },
  
  /**
  * Format the given string. The remaining arguments replace the format specifies in the given string.
  * The format specifiers are of the form '{0}', '{1}' ... '{xxxx}'.
  * The first remaining argument replaces all occurences of the format specifier '{0}' and so on ...
  *
  * @param {String} format the format string
  * @param {String...} values the format values
  * @returns the formated string
  * @example >helper.format('{0} {1} {0}', 'Hello', 'World');
  * 'Hello World Hello'
  */
  format: function(format) {
    var formatted = format;
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
  *
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
  },
  
  /**
  * Creates an XML HTTP Request (cross-browser)
  * @see <a href="http://www.w3.org/TR/XMLHttpRequest/">W3C XMLHttpRequest</a>
  */
  createXHR: function() {
    var ids = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
    var xhr;
    if (typeof window.XMLHttpRequest === 'function') {
      xhr = new XMLHttpRequest();
    } else {
      for (var i = 0; i < ids.length; i++) {
        try {
          xhr = new ActiveXObject(ids[i]);
          break;
        } catch (e) {
          alert(e);
        }
      }
    }
    return xhr;
  },
  
  /**
  * Creates and executes an XMLHttpRequest with the given request parameters.
  * If the request successfully returns the onsuccess callback function is
  * executed. Otherwise if the request returns with an error the onerror function
  * is executed.
  * 
  * @param {Object} request the request object literal
  * @param {String} request.method one of ['GET','PUT','POST','DELETE','HEAD']
  * @param {String} request.url the request url
  * @param {String} [request.headers] the request headers
  * @param {String} [request.body] the request body
  * @param {Function} [request.onsuccess] the callback function 
  * for a response indicating success (response code < 400)
  * @param {Function} [request.onerror] the callback function 
  * for a response indicating an error (response code >= 400)
  * @param {Boolean} [sync] if true the request is made synchronous
  * @example helper.fireXHR({method: 'POST', url: 'http://foo.bar'});
  */
  fireXHR: function(request, sync) {
    var xhr = this.createXHR();
    var async = (sync == undefined) ? true : !sync;
    xhr.open(request.method, request.url, async);
    // set headers
    if (request.headers != undefined) {
      for (var propertyName in request.headers) {
        xhr.setRequestHeader(propertyName, request.headers[propertyName]);
      }
    }
    // callback handling
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var callback;
        if (xhr.status < 400) {
          callback = request.onsuccess;
        } else {
          callback = request.onerror;
        }   
        if (callback != undefined) {
          callback(xhr);
        }
      }
    }
    xhr.send(request.body || '');
  }
}