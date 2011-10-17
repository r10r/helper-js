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
  * Set the innerHTML of the element with the given id
  * @param {String} id the element id
  * @param {String} html the content to set
  */
  setHTML: function(id, html) {
    document.getElementById(id).innerHTML = html;
  },
  
  /**
  * Bind the given callback function to a class of elements
  * for the given event.
  * @param {String} eventType eventType the event to bind to e.g 'click'
  * @param {String} cssClass the class attribute of the target elements
  * @param {Function} callback function to execute for the event
  * @see helper#bind
  */
  bindToClass: function(eventType, cssClass, callback) {
    window.addEventListener(eventType, function(event) {
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
  * Bind the given callback function to a single element 
  * identified by the given id.
  *
  * @param {String} eventType eventType the event to bind to e.g 'click'
  * @param {String} id the id attribute of the target element
  * @param {Function} callback function to execute for the event
  * @see helper#bind
  */
  bindToId: function(eventType, id, callback) {
    var target = document.getElementById(id);
    if (target) {
      target.addEventListener(eventType, function(event) {
        var src = event.srcElement;
        callback(src, event);
      }, true);
    } else {
      this.log(this.format('bindToId() element with id[{0}] does not exist!', id));
    }
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
  * @param {String} selector the CSS selector for target, either a CSS class or an Id
  * @param {Function} callback function to execute for the event
  * @param {Node} callback.src the event source element
  * @param {Event} callback.event the event object
  * @example helper.bind('click', '#foo', function(src, event){alert(src.innerHTML;)}); // by id
  * helper.bind('click', '.foo', function(src, event){alert(src.innerHTML;)}); // by class
  */
  bind: function(eventType, selector, callback) {
    var selector_first = selector.charAt(0);
    var is_id_selector = (selector_first == '#');
    var is_class_selector = (selector_first == '.');
    var selector_name = selector.substring(1);
    
    if (is_id_selector) {
      this.bindToId(eventType,selector_name, callback);
    } else if (is_class_selector) {
      this.bindToClass(eventType, selector_name, callback);
    } else {
      this.log('bind() invalid selector: ' + selector);
    }
  },
  
  /**
  * Creates an XML HTTP Request (cross-browser)
  * @see <a href="http://www.w3.org/TR/XMLHttpRequest/">W3C XMLHttpRequest</a>
  * @return {XMLHttpRequest|ActiveXObject} the request object
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
  * @param {String} request.method a valid HTTP request method (one of ['GET','PUT','POST','DELETE','HEAD'])
  * @param {String} request.url the request url
  * @param {String} [request.headers] the request headers
  * @param {String} [request.body] the request body
  * @param {Function} [request.onsuccess] the callback function 
  * executed on success (response code < 400)
  * @param {XMLHttpRequest} request.onsuccess.xhr the XHR request
  * @param {XMLHttpRequest} request.onsuccess.xhr.response the response body
  * @param {Function} [request.onerror] the callback function 
  * executed on error (response code >= 400)
  * @param {XMLHttpRequest} request.onerror.xhr the XHR request
  * @param {XMLHttpRequest} request.onerror.xhr.response the response body
  * @param {Boolean} [sync] if true the request is made synchronous
  * @example helper.fireXHR({method: 'POST', url: 'http://foo.bar'});
  */
  doXHR: function(request, sync) {
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
  },

  /**
  * @param params the parameter hash
  */
  _encodeParameterHash: function(params) {
    var parameterString = '';
    for (var name in params) {
      if (parameterString.length > 0) {
        parameterString += '&';
      }
      parameterString += this.format('{0}={1}', name, encodeURI(params[name]));
    }
    return parameterString;
  },
  
  /**
  * Make a GET request. The given parameter hash is converted to
  * a parameter string.
  *
  * @param {Object} request the request literal
  * @param {Object} params the request parameters hash
  * @param {Boolean} sync if true request is made synchronous
  * @example helper.doGet({url: '/foo'}, {param1: 'bar'});
  */
  doGet: function(request, params, sync) {
    request.method = 'GET';
    request.url += "?" + this._encodeParameterHash(params);
    return this.doXHR(request, sync);
  },
  
  /**
  * Make a POST request. The given parameter hash is converted to
  * a parameter string.
  *
  * @param {Object} request the request literal
  * @param {Object} params the request parameters hash
  * @param {Boolean} sync if true request is made synchronous
  * @example helper.doPost({url: '/foo'}, {param1: 'bar'});
  */
  doPost: function(request, params, sync) {
    request.method = 'POST';
    request['headers'] = request.headers || {}; 
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.body = this._encodeParameterHash(params);
    return this.doXHR(request, sync);
  },
  
  /**
  * Set the focus for the input element with the given id 
  * and put the cursor at the end of the input.
  * 
  * @param {String} id the id of the target element
  * @example helper.setCursorToEnd('myinput');
  */
  selectEnd: function(id) {
    var element = document.getElementById(id);
    
    if (element) {
      element.focus();
       // If this function exists...
      if (element.setSelectionRange) {
      // ... then use it (Doesn't work in IE)
      // Double the length because Opera is inconsistent about whether 
      // a carriage return is one character or two. Sigh.
        var len = element.value.length * 2;
        element.setSelectionRange(len, len);
      } else {
      // ... otherwise replace the contents with itself
      // (Doesn't work in Google Chrome)
        element.value = element.value;

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Google Chrome)
        element.scrollTop = 999999;
      }
    }
  }
}