// this script is required jQuery

// fix later without jQuery
// support ie 9.0 higher
// native querySelectorAll (1,362 ms)
// var c = document.querySelectorAll("#comments .comment");

// native getElementById / getElementsByClassName (107 ms)
// var n = document.getElementById("comments");
// var c = n.getElementsByClassName("comment");

if (!window.jQuery) {
    alert('jQuery is not loaded. Do not work.');
  }
  
  var version = '1.0.0',
    agent = jQuery;
  agent.fn.agent = version;
  
  document['_string'] = {
    'is_error': 'Check the error message',
    'error_call_api': 'Server call failed. Please refresh page',
    'do_not_have_permission': 'Do not have permission',
  };
  document['_debug_mode'] = false;
  document['_remove_data_attribute'] = true;
  document['_settings'] = {};
  document['_elements'] = [];
  document['_api_interval_time'] = 1000;
  document['_api_timeover_time'] = 60 * 1000;
  document['_api_url'] = '';
  document['_api'] = [];
  document['_config'] = {};
  document['_process'] = [];
  document['_sequence_event'] = [];
  document['_sequence_function'] = [];
  document['_sequence_image'] = [];
  document['_page_request'] = {};
  document['_page'] = {
    'current': '',
    'reload_count': 0,
  };
  document['_show_message_on_dialog'] = true;
  
  String.prototype.agent = function() {
    if (this.toString()) {
      if (this.toString().match(/^_/) != null) {
        if (agent('[data-r-element-id="' + this.toString() + '"]').length > 0) {
          return agent('[data-r-element-id="' + this.toString() + '"]');
        } else if (agent('[data-r-element-class="' + this.toString() + '"]').length > 0) {
          return agent('[data-r-element-class="' + this.toString() + '"]');
        }
      }
      return agent(this.toString());
    }
    return agent();
  };
  
  Number.prototype.agent = function() {
    if (this.toString()) {
      return agent('[data-r-element-id="' + '_' + this.toString() + '"]');
    }
    return agent();
  };
  
  Boolean.prototype.agent = function() {
    return agent();
  };
  
  // basic function
  var _rune = {
    deepCloneObject: function(target_object) {
      if (target_object === null || typeof target_object != 'object' || typeof target_object == 'function') {
        return target_object;
      }
      if (target_object instanceof agent || target_object instanceof HTMLElement) {
        return target_object;
      }
      var new_object = target_object.constructor();
      for (var property in target_object) {
        if (target_object.hasOwnProperty(property)) {
          new_object[property] = _rune.deepCloneObject(target_object[property]);
        }
      }
      return new_object;
    },
  
    deepCloneObjectWithJson: function(target_object) {
      return JSON.parse(JSON.stringify(target_object));
    },
  
    log: function() {
      if (arguments.length < 1) {
        return '';
      }
      var print_target = arguments[0];
      if (arguments.length > 1) {
        print_target = [];
        for (var i = 0; i < arguments.length; i++) {
          print_target.push(arguments[i]);
        }
      }
      try {
        _rune.debug(_rune.parseLogString(print_target));
      } catch (err) {
        _rune.debug(err);
      }
    },
  
    parseLogString: function(print_target) {
      if (print_target == undefined || print_target == null) {
        return '[null]';
      } else if (print_target === true) {
        return '[true]';
      } else if (print_target === false) {
        return '[false]';
      } else if (typeof print_target == 'string' || typeof print_target == 'number') {
        return print_target;
      } else if (typeof print_target == 'object') {
        if (print_target instanceof agent) {
          return '[agent]';
        } else {
          var print_string = '';
          for (var item_key in print_target) {
            print_string = print_string + '{ ' + item_key + ' : ' + _rune.parseLogString(print_target[item_key]) + ' } ';
          }
          return print_string;
        }
      }
      return '[unknown]';
    },
  
    parseJsonString: function(json_string) {
      var json_object = {};
      if (typeof json_string == 'string') {
        if (json_string.match(/^[\{\[]/) != null && json_string.match(/[\}\]]$/) != null) {
          try {
            json_object = JSON.parse(json_string);
          } catch (error) {}
        } else {
          json_object = [];
          json_object.push(json_string);
        }
      } else if (typeof json_string == 'object') {
        json_object = json_string;
      }
  
      for (var json_key in json_object) {
        if (typeof json_object[json_key] == 'string' && json_object[json_key].match(/^[\{\[]/) != null && json_object[json_key].match(/[\}\]]$/) != null) {
          json_object[json_key] = _rune.parseJsonString(json_object[json_key]);
        }
      }
      return json_object;
    },
  
    parseArgumentsParams: function(arguments_array) {
      // set params array from arguments[1] ...
      // arguments[0], "param1, param2", [param3], arguments[3], arguments[4] to [param1, param2, param3, arguments[3], arguments[4]]
      var param = [];
      for (var i = 1; i < arguments_array.length; i++) {
        if (typeof arguments_array[i] == 'object' && arguments_array[i] instanceof Array) {
          param = param.concat(arguments_array[i]);
        } else if (typeof arguments_array[i] == 'string') {
          var param_split = arguments_array[i].split(/\s{0,},\s{0,}/);
          for (var j = 0; j < param_split.length; j++) {
            param.push(param_split[j]);
          }
        } else if (typeof arguments_array[i] == 'number') {
          param.push(arguments_array[i]);
        }
      }
      return param;
    },
  
    getJsonValue: function() {
      if (arguments.length > 1) {
        var json_object = _rune.parseJsonString(arguments[0]);
        var json_key = _rune.parseArgumentsParams(arguments);
        // get json_value
        var json_value = json_object;
        for (var i = 0; i < json_key.length; i++) {
          json_value = json_value[json_key[i]];
          if (json_value === undefined) {
            return null;
          }
        }
        if (typeof json_value == 'string' && json_value.match(/^false$/i) != null) {
          return false;
        }
        if (typeof json_value == 'string' && json_value.match(/^null$/i) != null) {
          return null;
        }
        return json_value;
      }
      return null;
    },
  
    setJsonValue: function() {
      if (arguments.length > 1) {
        var json_object = _rune.parseJsonString(arguments[0]);
        var json_key = _rune.parseArgumentsParams(arguments);
        // set json_value
        var json_object = typeof json_object != 'object' ? json_object : {};
        if (json_key.length == 2) {
          json_object[json_key[0]] = json_key[1];
        }
        if (json_key.length > 2 && typeof json_object[json_key[0]][json_key[1]] != 'object') {
          json_object[json_key[0]][json_key[1]] = {};
        }
        if (json_key.length == 3) {
          json_object[json_key[0]][json_key[1]] = json_key[2];
        }
        if (json_key.length > 3 && typeof json_object[json_key[0]][json_key[1]][json_key[2]] != 'object') {
          json_object[json_key[0]][json_key[1]][json_key[2]] = {};
        }
        if (json_key.length == 4) {
          json_object[json_key[0]][json_key[1]][json_key[2]] = json_key[3];
        }
        if (json_key.length > 4 && typeof json_object[json_key[0]][json_key[1]][json_key[2]][json_key[3]] != 'object') {
          json_object[json_key[0]][json_key[1]][json_key[2]][json_key[3]] = {};
        }
        if (json_key.length == 5) {
          json_object[json_key[0]][json_key[1]][json_key[2]][json_key[3]] = json_key[4];
        }
        return json_object;
      }
      return {};
    },
  
    debug: function(debug_string) {
      if (window.console && console.log) {
        try {
          console.log(debug_string)
        } catch (e) {
  
        }
      } else if (window.console && console.dir) {
        console.dir(debug_string)
      }
      if (!document['_debug_mode']) {
        return '';
      }
      if (agent('.agent_debug_section').length < 1) {
        agent('body').append('<div class="agent_debug_section"></div>');
      }
      var $debug_message = agent('<p class="agent_debug"></p>');
      $debug_message.html(debug_string);
      agent('.agent_debug_section').append($debug_message);
    },
  
    isPlainObject: function(target_object) {
      var plane_object = {};
      if (!target_object || plane_object.toString.call(target_object) !== '[object Object]') {
        return false;
      }
  
      var target_prototype = Object.getPrototypeOf(target_object);
      if (!target_prototype) {
        return true;
      }
  
      var target_constructor = plane_object.hasOwnProperty.call(target_prototype, 'constructor') && target_prototype.constructor;
      return typeof target_constructor === 'function' && plane_object.hasOwnProperty.toString.call(target_constructor) === plane_object.hasOwnProperty.toString.call(Object);
    },
  
    isEmptyObject: function(target_object) {
      for (var property_name in target_object) {
        return false;
      }
      return true;
    },
  
    isEmpty: function(target_object) {
      if (target_object == null) {
        return true;
      } else if (target_object.length > 0) {
        return false;
      } else if (target_object.length === 0) {
        return true;
      } else if (typeof target_object !== 'object') {
        return true;
      }
      for (var target_object_key in target_object) {
        if (Object.prototype.hasOwnProperty.call(target_object, target_object_key)) {
          return false;
        }
      }
      return true;
    },
  
    checkProperty: function() { // isset property and return property value
      if (arguments.length > 0 && typeof arguments[0] == 'object' && arguments[0] != null) {
        var check_object = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
          if (check_object[arguments[i]] == undefined) {
            return null;
          }
          check_object = check_object[arguments[i]];
        }
        if (typeof check_object == 'string' && check_object.match(/^false$/i) != null) {
          return false;
        }
        if (typeof check_object == 'string' && check_object.match(/^null$/i) != null) {
          return null;
        }
        return check_object;
      } else if (arguments.length == 1) {
        return arguments[0];
      } else if (arguments.length > 0) {
        return null;
      }
      return null;
    },
  
    trim: function(target_string) {
      return String(target_string).trim();
    },
  
    removeTag: function(tag_string) {
      var result_string = String(tag_string);
      result_string = result_string.replace(/<\/?[^>]+(>|$)/g, '');
      result_string = result_string.replace(/&nbsp;?/g, ' ');
      result_string = result_string.replace(/\s+/g, ' ');
      return String(result_string).trim();
    },
  
    toCashString: function(target_string, digit, separator) {
      target_string = String(target_string).replace(/[\,]/g, '');
      if (digit == undefined || isNaN(digit)) {
        digit = 3;
      }
      if (separator == undefined) {
        separator = ',';
      }
      if (!isNaN(target_string)) {
        var split_number_string = String(target_string).split(/\./);
        var number0 = split_number_string[0];
        var number1 = split_number_string.length > 1 ? split_number_string[1] : '';
        var regexp_string = new RegExp('(\\d{' + digit + '})(?=[^$|^-])', 'g');
        number0 = number0.split('').reverse().join('').replace(regexp_string, "$1" + separator).split('').reverse().join('');
        var return_number_string = number1 ? number0 + '.' + number1 : number0;
        return return_number_string;
      } else if (target_string == '' || target_string == undefined || target_string == null) {
        return 0;
      }
      return target_string;
    },
    toDatetimeString: function(target_string, datetime_format) {
      if (datetime_format == undefined) {
        datetime_format = 'YYYY-MM-DD';
      }
      if (!target_string || target_string == 'null' || target_string == 'false') {
        return '';
      }
      var day_of_week_ko = ['월', '화', '수', '목', '금', '토', '일'];
      if (target_string.length == 1 && !isNaN(target_string)) {
        return day_of_week_ko[Number(target_string)];
      }
      var datetime = moment();
      if (moment(target_string, datetime_format).isValid()) {
        datetime = moment(target_string, datetime_format);
      } else {
        var datetime_object = Date.parse(target_string);
        if (moment(datetime_object, datetime_format).isValid()) {
          datetime = moment(datetime_object, datetime_format);
        } else {
          for (var i = target_string.length; i < 13; i++) {
            target_string = target_string + '0';
            if (moment(target_string, datetime_format).isValid()) {
              datetime = moment(target_string, datetime_format);
            }
          }
        }
      }
      return datetime.format(datetime_format);
    },
  
    toSIString: function(target_string) {
      if (isNaN(target_string)) {
        return target_string;
      } else {
        var split_dot = target_string.split(/\./);
        var number1 = split_dot[0];
        if (number1.length < 4) {
          return number1;
        } else if (number1.length < 7) {
          return (Math.round(Number(number1.substring(0, number1.length - 1)) / 10) / 10) + 'K';
        } else if (number1.length < 10) {
          return (Math.round(Number(number1.substring(0, number1.length - 4)) / 10) / 10) + 'M';
        } else if (number1.length < 13) {
          return (Math.round(Number(number1.substring(0, number1.length - 7)) / 10) / 10) + 'G';
        } else if (number1.length < 16) {
          return (Math.round(Number(number1.substring(0, number1.length - 10)) / 10) / 10) + 'T';
        } else if (number1.length < 19) {
          return (Math.round(Number(number1.substring(0, number1.length - 13)) / 10) / 10) + 'P';
        } else if (number1.length < 22) {
          return (Math.round(Number(number1.substring(0, number1.length - 16)) / 10) / 10) + 'E';
        } else if (number1.length < 25) {
          return (Math.round(Number(number1.substring(0, number1.length - 19)) / 10) / 10) + 'Z';
        } else if (number1.length < 28) {
          return (Math.round(Number(number1.substring(0, number1.length - 22)) / 10) / 10) + 'Y';
        }
      }
    },
  
    toPhoneString: function(target_string) {
      target_string = String(target_string).replace(/\-/g, '');
      if (target_string.match(/^(010|011|012|013|014|015|016|017|018|019)/) != null) {
        if (target_string.length == 9) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{3})([0-9]{3})/, '$1-$2-$3');
        } else if (target_string.length == 10) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{3})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.length == 11) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1-$2-$3');
        }
      } else {
        if (target_string.match(/^02/) != null && target_string.length == 9) {
          target_string = target_string.replace(/([0-9]{2})([0-9]{3})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.match(/^02/) != null && target_string.length == 10) {
          target_string = target_string.replace(/([0-9]{2})([0-9]{4})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.length == 7) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{4})/, '$1-$2');
        } else if (target_string.length == 8) {
          target_string = target_string.replace(/([0-9]{4})([0-9]{4})/, '$1-$2');
        } else if (target_string.length == 9) {
          target_string = target_string.replace(/([0-9]{2})([0-9]{3})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.length == 10) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{3})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.length == 11) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1-$2-$3');
        } else if (target_string.length == 12) {
          target_string = target_string.replace(/([0-9]{3})([0-9]{4})([0-9]{5})/, '$1-$2-$3');
        }
      }
      return target_string;
    },
  
    parseCommaString: function(target_string) {
      if (typeof target_string == 'string') {
        var parse_array = [];
        if (this.trim(target_string)) {
          var split_comma = target_string.split(/\s{0,}\,\s{0,}/);
          for (var i = 0; i < split_comma.length; i++) {
            // IMPORTANT do not remove blank string
            parse_array.push(split_comma[i]);
          }
          return parse_array;
        }
      }
      return [];
    },
  
    parseHashString: function(target_string) {
      if (typeof target_string == 'string') {
        var parse_array = [];
        var handling_string = target_string.replace(/^#\s{0,}/, '');
        handling_string = handling_string.replace(/\s{0,}#$/, '');
        if (this.trim(handling_string)) {
          var split_hash = handling_string.split(/\s{0,}#\s{0,}/);
          for (var i = 0; i < split_hash.length; i++) {
            // IMPORTANT do not remove blank string
            parse_array.push(split_hash[i]);
          }
          return parse_array;
        }
      }
      return [];
    },
  
    parseSideString: function(target_string) {
      if (typeof target_string == 'string') {
        var parse_side = {};
        var split_hand_side = target_string.split(/\s{0,}=\s{0,}/);
        if (split_hand_side.length > 0) {
          parse_side['left_side'] = split_hand_side[0];
        }
        if (split_hand_side.length > 1) {
          parse_side['right_side'] = split_hand_side[1];
        }
        return parse_side;
      }
      return {};
    },
  
    parseSideStringInArray: function(target_array) {
      if (target_array instanceof Array) {
        var parse_array = [];
        for (var i = 0; i < target_array.length; i++) {
          var parse_side = {};
          var split_hand_side = String(target_array[i]).split(/\s{0,}=\s{0,}/);
          if (split_hand_side.length > 0) {
            parse_side['left_side'] = split_hand_side[0];
          }
          if (split_hand_side.length > 1) {
            parse_side['right_side'] = split_hand_side[1];
          }
          parse_array.push(parse_side);
        }
        return parse_array;
      }
      return target_array;
    },
  
    removeEmptyInArray: function(target_array) {
      if (target_array instanceof Array) {
        var parse_array = [];
        for (var i = 0; i < target_array.length; i++) {
          if (typeof target_array[i] == 'object' && target_array[i] instanceof Array) {
            parse_array.push(this.removeEmptyInArray(target_array[i]));
          } else if (target_array[i] === undefined) {
            parse_array.push(target_array[i]);
          }
        }
        return parse_array;
      }
      return target_array;
    },
  
    removeDuplicatesInArray: function(target_array) {
      if (target_array instanceof Array) {
        var parse_array = [];
        for (var i = 0; i < target_array.length; i++) {
          if (typeof target_array[i] == 'object' && target_array[i] instanceof Array) {
            parse_array.push(this.removeDuplicatesInArray(target_array[i]));
          } else if (typeof target_array[i] == 'object') {
            var is_unique = true;
            for (var j = 0; j < i; j++) {
              for (var object_key in target_array[i]) {
                if (target_array[j][object_key] && target_array[i][object_key] === target_array[j][object_key]) {
                  is_unique = false;
                  break;
                }
              }
              if (!is_unique) {
                break;
              }
            }
            if (is_unique) {
              parse_array.push(target_array[i]);
            }
          }
        }
        return parse_array;
      }
      return target_array;
    },
  
    toHashString: function(target_array) {
      if (target_array instanceof Array) {
        var hash_string = '';
        for (var i = 0; i < target_array.length; i++) {
          var handling_string = target_array[i] == undefined ? '' : target_array[i];
          handling_string = handling_string.replace(/^#\s{0,}/, '');
          handling_string = handling_string.replace(/\s{0,}#$/, '');
          hash_string = hash_string ? hash_string + handling_string + ' #' : '#' + handling_string + ' #';
        }
        return hash_string;
      }
      return '';
    },
  
    deepSearchCategory: function(category_object, combine_tag, prefix_tag, postfix_tag, parent_depth_sequence_string, category_index) {
      if (!category_index) {
        category_index = {};
      }
      if (!parent_depth_sequence_string) {
        parent_depth_sequence_string = '';
      }
      if (!combine_tag) {
        combine_tag = ' ';
      }
      if (!prefix_tag) {
        prefix_tag = '';
      }
      if (!postfix_tag) {
        postfix_tag = '';
      }
      var depth_sequence = 0;
      for (var category_key in category_object) {
        var category_value = category_object[category_key];
        var depth_item = {};
        depth_item['name'] = category_key;
        depth_item['tag'] = category_value['tag'];
        var tag_string = prefix_tag + category_value['tag'] + postfix_tag;
        depth_item['tags_with_children'] = tag_string;
        var name_navigation = [];
        var tag_navigation = [];
        if (parent_depth_sequence_string) {
          for (var i = 0; i < parent_depth_sequence_string.length; i++) {
            var parent_depth_sequence_string_part = parent_depth_sequence_string.substr(0, i + 1);
            category_index[parent_depth_sequence_string_part]['tags_with_children'] = category_index[parent_depth_sequence_string_part]['tags_with_children'] + combine_tag + tag_string;
            tag_navigation.push(category_index[parent_depth_sequence_string_part]['tag']);
            name_navigation.push(category_index[parent_depth_sequence_string_part]['name']);
          }
        }
        name_navigation.push(category_key);
        tag_navigation.push(category_value['tag']);
        depth_item['name_navigation'] = name_navigation;
        depth_item['tag_navigation'] = tag_navigation;
        depth_sequence_string = '' + parent_depth_sequence_string + depth_sequence;
        category_index[depth_sequence_string] = depth_item;
        if (category_value['sub']) {
          category_index = _rune.deepSearchCategory(category_value['sub'], combine_tag, prefix_tag, postfix_tag, depth_sequence_string, category_index);
        }
        depth_sequence++;
      }
      return category_index;
    },
  };
  
  agent.log = function() {
    _rune.log.apply(this, arguments);
  };
  
  agent.cs = function() {
    _rune.log.apply(this, arguments);
  };
  
  log = function() {
    if (window.console && console.log) {
      //console.log(log.caller);
      try {
        console.log.apply(this, arguments);
      } catch (e) {
  
      }
    } else if (window.console && console.dir) {
      console.dir.apply(this, arguments);
    }
  };
  
  cs = function() {
    if (window.console && console.log) {
      // console.log(cs.caller);
      try {
        console.log.apply(this, arguments);
      } catch (e) {
  
      }
    } else if (window.console && console.dir) {
      console.dir.apply(this, arguments);
    }
  };
  
  String.prototype.log = function() {
    if (this.toString()) {
      return _rune.log(this.toString());
    }
    return this;
  };
  
  Number.prototype.log = function() {
    if (this.toString()) {
      return _rune.log(this.toString());
    }
    return this;
  };
  
  Boolean.prototype.log = function() {
    if (this.toString()) {
      return _rune.log(this.toString());
    }
    return this;
  };
  
  agent.isEmptyObject = function() {
    return _rune.isEmptyObject.apply(this, arguments);
  };
  
  isEmpty = function() {
    return _rune.isEmpty.apply(this, arguments);
  };
  
  agent.checkProperty = function() {
    return _rune.checkProperty.apply(this, arguments);
  };
  
  checkProperty = function() {
    return _rune.checkProperty.apply(this, arguments);
  };
  
  // extend Object, String, Number, Boolean
  Object.defineProperty(Object.prototype, 'cloneObject', {
    value: function() {
      var new_object = this.constructor();
      for (var property in this) {
        if (this.hasOwnProperty(property)) {
          new_object[property] = _rune.deepCloneObject(this[property]);
        }
      }
      return new_object;
    }
  });
  
  Object.defineProperty(Object.prototype, 'mergeObject', {
    value: function(target_object) {
      if (target_object === null || typeof target_object != 'object' || typeof target_object == 'function') {
        return this;
      }
      if (target_object instanceof agent || target_object instanceof HTMLElement) {
        return this;
      }
      for (var property in target_object) {
        if (target_object.hasOwnProperty(property)) {
          //this[property] = target_object[property];
          this[property] = _rune.deepCloneObject(target_object[property]);
        }
      }
      return this;
    }
  });
  
  Number.prototype.trim = function() {
    if (this.toString()) {
      return String(this.toString()).trim();
    }
    return '';
  };
  
  Boolean.prototype.trim = function() {
    if (this.toString()) {
      return String(this.toString()).trim();
    }
    return '';
  };
  
  trim = function() {
    return _rune.trim.apply(this, arguments);
  };
  
  String.prototype.removeTag = function() {
    if (this.toString()) {
      return _rune.removeTag(this.toString());
    }
    return '';
  };
  
  removeTag = function() {
    return _rune.removeTag.apply(this, arguments);
  };
  
  String.prototype.toCashString = function(digit, separator) {
    if (this.toString()) {
      return _rune.toCashString(this.toString(), digit, separator);
    }
    return '0';
  };
  
  Number.prototype.toCashString = function(digit, separator) {
    if (this.toString()) {
      return _rune.toCashString(this.toString(), digit, separator);
    }
    return '';
  };
  
  String.prototype.toDatetimeString = function(date_format) {
    if (this.toString()) {
      return _rune.toDatetimeString(this.toString(), date_format);
    }
    return '';
  };
  
  Number.prototype.toDatetimeString = function(date_format) {
    if (this.toString()) {
      return _rune.toDatetimeString(this.toString(), date_format);
    }
    return '';
  };
  
  Boolean.prototype.toDatetimeString = function(date_format) {
    return '';
  };
  
  String.prototype.toSIString = function() {
    if (this.toString()) {
      return _rune.toSIString(this.toString());
    }
    return '';
  };
  
  Number.prototype.toSIString = function() {
    if (this.toString()) {
      return _rune.toSIString(this.toString());
    }
    return '';
  };
  
  Boolean.prototype.toSIString = function() {
    return '';
  };
  
  String.prototype.parseCommaString = function() {
    if (this.toString()) {
      return _rune.parseCommaString(this.toString());
    }
    return [];
  };
  
  String.prototype.toPhoneString = function() {
    if (this.toString()) {
      return _rune.toPhoneString(this.toString());
    }
    return '';
  };
  
  Number.prototype.toPhoneString = function() {
    if (this.toString()) {
      return _rune.toPhoneString(this.toString());
    }
    return '';
  };
  
  Number.prototype.parseCommaString = function() {
    if (this.toString()) {
      return _rune.parseCommaString(this.toString());
    }
    return [];
  };
  
  Boolean.prototype.parseCommaString = function() {
    if (this.toString()) {
      return _rune.parseCommaString(this.toString());
    }
    return [];
  };
  
  String.prototype.parseHashString = function() {
    if (this.toString()) {
      return _rune.parseHashString(this.toString());
    }
    return [];
  };
  
  Number.prototype.parseHashString = function() {
    if (this.toString()) {
      return _rune.parseHashString(this.toString());
    }
    return [];
  };
  
  Boolean.prototype.parseHashString = function() {
    if (this.toString()) {
      return _rune.parseHashString(this.toString());
    }
    return [];
  };
  
  String.prototype.parseSideString = function() {
    if (this.toString()) {
      return _rune.parseSideString(this.toString());
    }
    return {};
  };
  
  Array.prototype.parseSideString = function() {
    if (this.toString()) {
      return _rune.parseSideStringInArray(this);
    }
    return {};
  };
  
  Number.prototype.parseSideString = function() {
    if (this.toString()) {
      return this.toString();
    }
    return {};
  };
  
  Boolean.prototype.parseSideString = function() {
    if (this.toString()) {
      return this.toString();
    }
    return {};
  };
  
  String.prototype.removeEmpty = function() {
    return [];
  };
  
  Array.prototype.removeEmpty = function() {
    if (this.toString()) {
      return _rune.removeEmptyInArray(this);
    }
    return [];
  };
  
  Number.prototype.removeEmpty = function() {
    return [];
  };
  
  Boolean.prototype.removeEmpty = function() {
    return [];
  };
  
  String.prototype.removeDuplicates = function() {
    return [];
  };
  
  Array.prototype.removeDuplicates = function() {
    if (this.toString()) {
      return _rune.removeDuplicatesInArray(this);
    }
    return [];
  };
  
  Number.prototype.removeDuplicates = function() {
    return [];
  };
  
  Boolean.prototype.removeDuplicates = function() {
    return [];
  };
  
  String.prototype.toHashString = function() {
    if (this.toString()) {
      return this.toString();
    }
    return '';
  };
  
  Array.prototype.toHashString = function() {
    if (this.toString()) {
      return _rune.toHashString(this);
    }
    return '';
  };
  
  Number.prototype.toHashString = function() {
    if (this.toString()) {
      return this.toString();
    }
    return '';
  };
  
  Boolean.prototype.toHashString = function() {
    if (this.toString()) {
      return this.toString();
    }
    return '';
  };
  
  String.prototype.showMessage = function() {
    if (this.toString()) {
      return agent.showMessage(this.toString());
    }
    return this;
  };
  
  String.prototype.showConfirm = function() {
    if (this.toString()) {
      return agent.showConfirm(this.toString());
    }
    return this;
  };
  
  Number.prototype.showMessage = function() {
    if (this.toString()) {
      return agent.showMessage(this.toString());
    }
    return this;
  };
  
  Number.prototype.showConfirm = function() {
    return this;
  };
  
  Boolean.prototype.showMessage = function() {
    return this;
  };
  
  Boolean.prototype.showConfirm = function() {
    return this;
  };
  
  String.prototype.config = function() {
    if (this.toString()) {
      return agent.config(this.toString());
    }
    return this;
  };
  
  Number.prototype.config = function() {
    if (this.toString()) {
      return agent.config(this.toString());
    }
    return this;
  };
  
  Boolean.prototype.config = function() {
    return this;
  };
  
  String.prototype.reload = function() {
    if (this.toString()) {
      return agent.reload({
        'p': this.toString()
      });
    }
    return this;
  };
  
  Number.prototype.reload = function() {
    if (this.toString()) {
      return agent.reload();
    }
    return this;
  };
  
  Boolean.prototype.reload = function() {
    if (this.toString()) {
      return agent.reload();
    }
    return this;
  };
  
  String.prototype.message = function() {
    if (this.toString()) {
      return agent.showMessage(this.toString());
    }
    return this;
  };
  
  Number.prototype.message = function() {
    return this;
  };
  
  Boolean.prototype.message = function() {
    return this;
  };
  
  // page control
  agent.loadPageRequest = function() {
    var location_string = String(window.location);
    var sub_index = location_string.lastIndexOf('?');
    if (sub_index > 0) {
      var request_string = location_string.substr(sub_index + 1);
      request_string = request_string.replace(/#[^&]*$/, '');
      // remove #id
      var split_request = request_string.split(/&/);
      for (var i = 0; i < split_request.length; i++) {
        var value_pair = split_request[i].split(/=/);
        if (value_pair.length < 2) {
          value_pair[1] = true;
        }
        var page_request_key = String(decodeURIComponent(value_pair[0])).trim();
        var page_request_value = String(decodeURIComponent(value_pair[1])).trim();
        document['_page_request'][page_request_key] = page_request_value;
      }
      if (!document['_page']['current'] && document['_page_request']['p']) {
        document['_page']['current'] = document['_page_request']['p'];
        document['_page']['reload_count'] = 0;
      }
    }
  };
  
  agent.deletePageRequest = function(target_key) {
    if (target_key != undefined) {
      var regexp_string = new RegExp('^' + target_key);
      for (var request_key in document['_page_request']) {
        if (request_key.match(regexp_string) != null) {
          delete document['_page_request'][request_key];
        }
      }
    } else {
      for (var request_key in document['_page_request']) {
        if (request_key == 'p') {
          continue;
        }
        delete document['_page_request'][request_key];
      }
    }
  };
  
  agent.setPageRequest = function() {
    if (arguments.length == 1) {
      for (var page_request_key in arguments[0]) {
        var page_request_value = agent.trim(arguments[0][page_request_key]);
        document['_page_request'][page_request_key] = page_request_value;
      }
    } else if (arguments.length == 2) {
      var page_request_key = agent.trim(arguments[0]);
      var page_request_value = agent.trim(arguments[1]);
      document['_page_request'][page_request_key] = page_request_value;
    } else if (arguments.length == 3) {
      var page_request_key = agent.trim(arguments[0]);
      var page_request_value = arguments[1];
      if (page_request_key == 'p') {
        document['_page_request'][page_request_key] = page_request_value;
      } else {
        if (agent.trim(arguments[2])) {
          document['_page_request'][page_request_key + '.' + agent.trim(arguments[2])] = agent.trim(page_request_value);
        }
      }
    }
    if (document['_page_request'] != undefined && document['_page_request']['p'] != undefined) {
      // change p value if exists config
      if (agent.config(document['_page_request']['p'])) {
        document['_page_request']['p'] = agent.config(document['_page_request']['p']);
      }
    }
    return this;
  };
  
  agent.getPageRequest = function() {
    if (arguments.length == 1 && typeof arguments[0] == 'string' && document['_page_request'][arguments[0]] != undefined) {
      // case one word
      return document['_page_request'][arguments[0]];
    } else if (arguments.length > 1 && typeof arguments[0] == 'string') {
      // case page, _id, class
      // get page._id
      // get page.class
      // get page
      for (var i = 1; i < arguments.length; i++) {
        if (arguments[i]) {
          if (document['_page_request'][arguments[0] + '.' + arguments[i]] != undefined) {
            return document['_page_request'][arguments[0] + '.' + arguments[i]];
          }
        }
      }
      if (document['_page_request'][arguments[0]] != undefined) {
        return document['_page_request'][arguments[0]];
      }
    }
    return '';
  };
  
  agent.reload = function(page_request_param) {
    location.reload();
  };
  
  agent.replaceState = function() {
    var page_request = {};
    if (arguments.length == 1 && typeof arguments[0] == 'object') {
      page_request = arguments[0];
    } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
      page_request[arguments[0]] = arguments[1];
    }
    for (var page_request_key in page_request) {
      document['_page_request'][page_request_key] = page_request[page_request_key];
    }
    for (var page_request_key in document['_page_request']) {
      var page_request_value = document['_page_request'][page_request_key];
      if (typeof page_request_value != 'string' && typeof page_request_value != 'number' && typeof page_request_value != 'boolean') {
        page_request_value = true;
      }
      page_request[page_request_key] = page_request_value;
    }
  
    // make link request_string
    var link_request_string = 'p=' + page_request['p'];
    for (var page_request_key in page_request) {
      var page_request_value = page_request[page_request_key];
      if (page_request_key.match(/^(p)$/) != null) {
        continue;
      }
      link_request_string = link_request_string != '' ? link_request_string + '&' : '';
      link_request_string = link_request_string + encodeURIComponent(page_request_key) + '=' + encodeURIComponent(page_request_value);
    }
    link_request_string = link_request_string != '' ? '?' + link_request_string : '';
    var link_url_string = agent.config('root_url') + link_request_string;
    try {
      window.history.replaceState({}, agent.config('title'), link_url_string);
    } catch (e) {
  
    }
  };
  
  agent.link = function(page_request_param) {
    var page_request = page_request_param ? page_request_param : {};
    if (typeof page_request == 'string') {
      var page = page_request;
      page_request = {};
      page_request['p'] = page;
    }
    if (page_request['scroll']) {
      // delete current scroll
      delete page_request['scroll'];
    }
    for (var page_request_key in document['_page_request']) {
      var page_request_value = document['_page_request'][page_request_key];
      if (page_request_key.match(/^(theme|mode|locale|device|admin)$/i) != null && page_request[page_request_key] == undefined) {
        if (typeof page_request_value != 'string' && typeof page_request_value != 'number' && typeof page_request_value != 'boolean') {
          page_request_value = true;
        }
        page_request[page_request_key] = page_request_value;
      }
    }
    if (page_request['keep_idx'] && document['_page_request']['idx']) {
      page_request['idx'] = document['_page_request']['idx'];
    }
    if (page_request['keep_code'] && document['_page_request']['code']) {
      page_request['code'] = document['_page_request']['code'];
    }
    var link_new_tab = false;
    if (page_request['link_new_tab']) {
      link_new_tab = true;
      delete page_request['link_new_tab'];
    }
    if (page_request['p'] == undefined) {
      page_request['p'] = document['_page']['current'];
    }
    if (page_request['p'] == undefined && agent.config('mode') == 'admin' && agent.config('admin_home_page')) {
      page_request['p'] = agent.config('admin_home_page');
    } else if (page_request['p'] == undefined && agent.config('home_page')) {
      page_request['p'] = agent.config('home_page');
    }
    page_request['random'] = Math.floor(Math.random() * 100000);
    if (page_request['p'].match(/[^<>"']*[\\\/]{2,}/) != null) {
      // if url type
      if (link_new_tab) {
        window.open(page_request['p'], '_blank');
      } else {
        location.href = page_request['p'];
      }
    } else {
      // p parsing hash
      if (page_request['p'] && page_request['p'].match(/#[^&]*/) != null) {
        page_request['hash'] = page_request['p'].match(/#[^&]*/);
        page_request['p'] = page_request['p'].replace(/#[^&]*/, '');
      }
      // p parsing theme, locale, mode ...
      if (page_request['p'] && page_request['p'].match(/&/) != null) {
        var split_p = page_request['p'].split(/&/);
        for (var i = 0; i < split_p.length; i++) {
          var split_hand_side = split_p[i].split(/\s{0,}=\s{0,}/);
          if (split_hand_side.length > 1) {
            page_request[split_hand_side[0]] = split_hand_side[1];
          }
        }
        page_request['p'] = split_p[0];
      }
      // keep theme, locale, mode
      if (!agent.checkProperty(page_request, 'theme') && agent.getPageRequest('theme')) {
        page_request['theme'] = agent.getPageRequest('theme');
      }
      if (!agent.checkProperty(page_request, 'locale') && agent.getPageRequest('locale')) {
        page_request['locale'] = agent.getPageRequest('locale');
      }
      if (!agent.checkProperty(page_request, 'mode') && agent.getPageRequest('mode')) {
        page_request['mode'] = agent.getPageRequest('mode');
      }
  
      // check reload
      if (document['_page']['current'] != page_request['p']) {
        // replace current page
        document['_page']['current'] = page_request['p'];
        document['_page']['reload_count'] = 0;
      } else {
        // increase reload_count
        document['_page']['reload_count']++;
        // keep value (when reload)
        var keep_value = agent('[data-r-keep-value]');
        for (var i = 0; i < keep_value.length; i++) {
          // value
          // if (keep_value.eq(i).value() && keep_value.eq(i).elementClass()) {
          //   page_request['hidden_value' + '.' + keep_value.eq(i).elementClass()] = keep_value.eq(i).value();
          // } else if (keep_value.eq(i).value()) {
          //   page_request['hidden_value' + '.' + keep_value.eq(i).elementID()] = keep_value.eq(i).value();
          // }
          // class on, active
          if (keep_value.eq(i).hasClass('on') || keep_value.eq(i).hasClass('active')) {
            if (keep_value.eq(i).value() && keep_value.eq(i).elementClass()) {
              page_request['on' + '.' + keep_value.eq(i).elementClass()] = keep_value.eq(i).value();
            } else if (keep_value.eq(i).value()) {
              page_request['on' + '.' + keep_value.eq(i).elementID()] = keep_value.eq(i).value();
            }
          }
        }
      }
  
      // search
      var search_element = agent('[data-r-role="search"]');
      for (var i = 0; i < search_element.length; i++) {
        var page_request_search = {};
        if (search_element.eq(i).setting('search_value')) {
          if (search_element.eq(i).parentID()) {
            var search_parent_element = search_element.eq(i).parentElement();
            var search_key = search_parent_element.elementClass() ? 'search' + '.' + search_parent_element.elementClass() : 'search' + '.' + search_parent_element.elementID();
            page_request[search_key] = page_request[search_key] ? page_request[search_key] + ',(' + search_element.eq(i).setting('search_value') + ')' : '(' + search_element.eq(i).setting('search_value') + ')';
          } else {
            page_request['search.'] = page_request['search.'] ? page_request['search.'] + ',(' + search_element.eq(i).setting('search_value') + ')' : '(' + search_element.eq(i).setting('search_value') + ')';
          }
        }
      }
  
      // make link request_string
      var link_request_string = 'p=' + page_request['p'];
      for (var page_request_key in page_request) {
        var page_request_value = page_request[page_request_key];
        if (page_request_key.match(/^(p)$/) != null) {
          continue;
        }
        link_request_string = link_request_string != '' ? link_request_string + '&' : '';
        link_request_string = link_request_string + encodeURIComponent(page_request_key) + '=' + encodeURIComponent(page_request_value);
      }
      link_request_string = link_request_string != '' ? '?' + link_request_string : '';
      var link_url_string = agent.config('root_url') + link_request_string;
  
      if (link_new_tab) {
        window.open(link_url_string, '_blank');
      } else {
        location.href = link_url_string;
      }
    }
  };
  
  agent.parseJsonString = function() {
    return _rune.parseJsonString.apply(this, arguments);
  };
  
  agent.getJsonValue = function() {
    return _rune.getJsonValue.apply(this, arguments);
  };
  
  agent.setJsonValue = function() {
    return _rune.setJsonValue.apply(this, arguments);
  };
  
  // storage
  agent.setCookie = function(cookie_key, cookie_value, cookie_days) {
    if (cookie_days == undefined) {
      cookie_days = 0;
    }
    if (typeof cookie_key == 'string' && typeof cookie_value == 'string') {
      var cookie_string = '';
      cookie_string = cookie_key + '=' + cookie_value;
      if (!isNaN(cookie_days)) {
        if (cookie_days > 0) {
          var expires_date = new Date();
          expires_date.setTime(expires_date.getTime() + (cookie_days * 24 * 60 * 60 * 1000));
          cookie_string = cookie_string + '; expires=' + expires_date.toUTCString();
        }
      }
      cookie_string = cookie_string + '; path=/';
      document.cookie = cookie_string;
    }
  };
  
  agent.getCookie = function(cookie_key) {
    if (typeof cookie_key == 'string') {
      var split_cookie = document.cookie.split(/\s{0,};\s{0,}/);
      for (var i = 0; i < split_cookie.length; i++) {
        var split_cookie_item = String(split_cookie[i]).split(/\s{0,}=\s{0,}/);
        if (split_cookie_item.length > 1 && split_cookie_item[0] == cookie_key) {
          var control_value = split_cookie_item[1];
          if (control_value === undefined || control_value === null || control_value === 'undefined' || control_value === 'null') {
            control_value = '';
          } else if (control_value === true || control_value === 'true') {
            control_value = true;
          } else if (control_value === false || control_value === 'false') {
            control_value = false;
          }
          return control_value;
        }
      }
    }
    return '';
  };
  
  agent.setSessionData = function(control_key, control_value) {
    var support_storage = false;
    if (!window.sessionStorage) {
      support_storage = false;
    } else {
      try {
        sessionStorage.setItem('agent_test_key', '1');
        sessionStorage.removeItem('agent_test_key');
        support_storage = true;
      } catch (error) {
        support_storage = false;
      }
    }
    if (support_storage) {
      sessionStorage.setItem(control_key, control_value);
    } else {
      agent.setCookie(control_key, control_value, -1);
    }
  };
  
  agent.getSessionData = function(control_key) {
    var support_storage = false;
    if (!window.sessionStorage) {
      support_storage = false;
    } else {
      try {
        sessionStorage.setItem('agent_test_key', '1');
        sessionStorage.removeItem('agent_test_key');
        support_storage = true;
      } catch (error) {
        support_storage = false;
      }
    }
    if (support_storage) {
      var control_value = sessionStorage.getItem(control_key);
      if (control_value === undefined || control_value === null || control_value === 'undefined' || control_value === 'null') {
        control_value = '';
      } else if (control_value === true || control_value === 'true') {
        control_value = true;
      } else if (control_value === false || control_value === 'false') {
        control_value = false;
      }
      return control_value;
    } else {
      return agent.getCookie(control_key);
    }
    return '';
  };
  
  agent.setLocalData = function(control_key, control_value) {
    var support_storage = false;
    if (!window.localStorage) {
      support_storage = false;
    } else {
      try {
        localStorage.setItem('agent_test_key', '1');
        localStorage.removeItem('agent_test_key');
        support_storage = true;
      } catch (error) {
        support_storage = false;
      }
    }
    if (support_storage) {
      localStorage.setItem(control_key, control_value);
    } else {
      agent.setCookie(control_key, control_value, 365);
    }
  };
  
  agent.getLocalData = function(control_key) {
    var support_storage = false;
    if (!window.localStorage) {
      support_storage = false;
    } else {
      try {
        localStorage.setItem('agent_test_key', '1');
        localStorage.removeItem('agent_test_key');
        support_storage = true;
      } catch (error) {
        support_storage = false;
      }
    }
    if (support_storage) {
      var control_value = localStorage.getItem(control_key);
      if (control_value === undefined || control_value === null || control_value === 'undefined' || control_value === 'null') {
        control_value = '';
      } else if (control_value === true || control_value === 'true') {
        control_value = true;
      } else if (control_value === false || control_value === 'false') {
        control_value = false;
      }
      return control_value;
    } else {
      return agent.getCookie(control_key);
    }
    return '';
  };
  
  agent.session = function() {
    if (arguments.length == 0) {
      return '';
    } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
      return agent.getSessionData(arguments[0]);
    } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
      for (var session_key in arguments[0]) {
        agent.setSessionData(session_key, arguments[0][session_key]);
      }
    } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
      agent.setSessionData(arguments[0], arguments[1]);
    }
  };
  
  agent.local = function() {
    if (arguments.length == 0) {
      return '';
    } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
      return agent.getLocalData(arguments[0]);
    } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
      for (var local_key in arguments[0]) {
        agent.setLocalData(local_key, arguments[0][local_key]);
      }
    } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
      agent.setLocalData(arguments[0], arguments[1]);
    }
  };
  
  // storage object
  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  };
  
  Storage.prototype.getObject = function(key) {
    return this.getItem(key) && JSON.parse(this.getItem(key));
  };
  
  // message
  agent.showMessage = function() {
    if (arguments.length == 1 && typeof arguments[0] == 'string' && arguments[0] != '') {
      if (document['_show_message_on_dialog'] && agent('[data-r-role="dialog"][data-r-type="message"]').length > 0) {
        agent('body').dataAttribute('dialog', 'message').dataAttribute('string_dialog_message', arguments[0]).showDialog();
      } else {
        if (agent('.agent_message_section').length < 1) {
          agent('body').prepend('<div class="agent_message_section"></div>');
        }
        for (var i = 0; i < agent('.agent_message_section .message').length; i++) {
          if (agent('.agent_message_section .message').eq(i).text() == arguments[0]) {
            return '';
          }
        }
        var $agent_message = agent('<p class="message"></p>');
        $agent_message.text(arguments[0]);
        $agent_message.hide();
        $agent_message.on('click', function(event) {
          agent(this).fadeOut(300).remove();
        });
        setTimeout(function() {
          $agent_message.fadeOut(300).remove();
        }, 10 * 1000);
        agent('.agent_message_section').prepend($agent_message);
        $agent_message.slideDown(300);
      }
    } else if (arguments.length == 2 && typeof arguments[0] == 'string' && arguments[0] != '' && typeof arguments[1] == 'string') {
      if (agent('.agent_message_section').length < 1) {
        agent('body').prepend('<div class="agent_message_section"></div>');
      }
      var $agent_message = agent('<p class="message"></p>');
      $agent_message.text(arguments[0]);
      $agent_message.addClass(arguments[1]);
      $agent_message.hide();
      $agent_message.on('click', function(event) {
        agent(this).fadeOut(300).remove();
      });
      setTimeout(function() {
        $agent_message.fadeOut(300).remove();
      }, 10 * 1000);
      agent('.agent_message_section').prepend($agent_message);
      $agent_message.slideDown(300);
    }
  };
  
  // loading
  agent.showLoading = function() {
    if (agent('[data-r-role="dialog"][data-r-type="loading"]').length == 0) {
      return;
    }
    if (agent('[data-r-role="dialog"][data-r-type="loading"]:visible').length > 0) {
      agent('[data-r-role="dialog"][data-r-type="loading"]').dismissDialog();
    }
    var loading_message = '';
    if (arguments.length > 0 && typeof arguments[0] == 'string' && arguments[0] != '') {
      loading_message = arguments[0];
    }
    if (arguments.length > 1 && typeof arguments[1] == 'object' && arguments[1] instanceof agent) {
      document['_show_loading_callback_element'] = arguments[1];
    }
    if (loading_message) {
      agent('body').dataAttribute('dialog', 'loading').dataAttribute('string_dialog_message', loading_message).showDialog();
    }
    setTimeout(function() {
      if (document['_show_loading_callback_element']) {
        document['_show_loading_callback_element'].trigger('show_loading_callback.agent');
      }
      document['_show_loading_callback_element'] = false;
      agent.hideLoading();
    }, 100);
  };
  
  agent.hideLoading = function() {
    agent('[data-r-role="dialog"][data-r-type="loading"]').dismissDialog();
  };
  
  agent.hideMessage = function() {
    if (arguments.length == 0) {
      agent('.agent_message_section .message').remove();
    } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
      agent('.agent_message_section .' + arguments[0]).remove();
    }
  };
  
  // confirm
  agent.showConfirm = function() {
    if (arguments.length > 0 && typeof arguments[0] == 'string' && arguments[0] != '') {
      if (agent('[data-r-role="dialog"][data-r-type="confirm"]').length > 0) {
        agent('body').dataAttribute('dialog', 'confirm').dataAttribute('string_dialog_message', arguments[0]).showDialog();
      }
    }
    if (arguments.length > 1 && typeof arguments[1] == 'function') {
      agent('body').setting({
        '_event': {
          'positive_callback.agent_dialog': arguments[1],
        },
      });
    }
    agent('body').showDialog();
  };
  
  // api
  agent.callApi = function() {
    if (arguments.length == 1 && typeof arguments[0] == 'object') {
      var api_param = arguments[0].cloneObject();
      var api_url = '';
      var api_callback = '';
      if (api_param['_api_url'] != undefined) {
        api_url = api_param['_api_url'];
        delete api_param['_api_url'];
      }
      if (api_param['_callback'] != undefined) {
        api_callback = api_param['_callback'];
        delete api_param['_callback'];
      }
      // check _action
      if (typeof api_url != 'string' || typeof api_param != 'object' || typeof api_param['_action'] != 'string') {
        return false;
      }
      // filtering parameter
      for (var param_key in api_param) {
        if (param_key.match(/^(submit_element)$/i) != null) {
          delete api_param[param_key];
        } else if (param_key.match(/^_(process|element|setting)_/i) != null && param_key.match(/^_(process|element)_id$/i) == null) {
          delete api_param[param_key];
        }
      }
      //check duplicated api (not allowed duplicate running)
      if (api_param['_element_id'] == undefined) {
        api_param['_element_id'] = '_api_' + document['_api'].length;
      }
      var chk_duplicated_api = false;
      var now = new Date();
      for (var i = 0; i < document['_api'].length; i++) {
        if (document['_api'][i]['_action'] == api_param['_action'] && document['_api'][i]['_element_id'] == api_param['_element_id']) {
          if (now.getTime() - document['_api'][i]['_time'] < document['_api_interval_time']) {
            chk_duplicated_api = true;
          } else {
            // remove timeout api
            document['_api'].splice(i, 1);
          }
          break;
        }
      }
      if (chk_duplicated_api) {
        return false;
      }
      // push running api
      document['_api'].push({
        '_element_id': api_param['_element_id'],
        '_action': api_param['_action'],
        '_field': api_param['_field'],
        '_where': api_param['_where'],
        '_search': api_param['_search'],
        '_time': now.getTime()
      });
      var request_type = 'post';
      if (api_param['_api_type']) {
        request_type = api_param['_api_type'];
        delete api_param['_api_type'];
      }
      if (request_type == 'post') {
        if (api_param['_action'] == 'url') {
          agent.ajax({
            url: api_url,
            type: 'post',
            data: api_param,
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
              delete api_param['password'];
              agent.successCallApi(data, api_param, api_callback);
            },
            error: agent.failCallAPI
          });
        } else {
          agent.post(api_url, api_param).done(function(data) {
            delete api_param['password'];
            agent.successCallApi(data, api_param, api_callback);
          }).fail(agent.failCallAPI);
        }
      } else if (request_type == 'get') {
        var get_request_string = '';
        for (var param_key in api_param) {
          var param_value = String(api_param[param_key]).trim();
          get_request_string = get_request_string != '' ? get_request_string + '&' : '';
          get_request_string = get_request_string + param_key + '=' + encodeURIComponent(param_value);
        }
        if (get_request_string != '') {
          api_url = api_url.match(/\?/) == null ? api_url + '?' : api_url + '&';
          api_url = api_url + get_request_string;
        }
        agent.get(api_url).done(function(data) {
          delete api_param['password'];
          agent.successCallApi(data, api_param, api_callback);
        }).fail(function(api_result, textStatus, xhr) {
          delete api_param['password'];
          agent.log('error_call_api');
          agent.log(api_result, textStatus);
          agent.failCallAPI(api_result, api_param, api_callback);
        });
      }
    }
  };
  
  agent.successCallApi = function(api_result, api_param, api_callback) {
    if (typeof api_result == 'string') {
      if (api_result.match(/^[\[\{].{1,}[\]\}]$/) != null) {
        try {
          api_result = agent.parseJSON(api_result);
        } catch (e) {
          api_result = {};
        }
      } else if (api_result == '') {
        api_result = {};
      } else {
        api_result = {
          'message': api_result
        };
      }
    }
    if (typeof api_result == 'function') {} else if (typeof api_result == 'object') {
      api_result['data_string'] = JSON.stringify(api_result);
      api_result['data'] = api_result.cloneObject();
      if (api_param['_element_id']) {
        api_result['_element_id'] = api_param['_element_id'];
        api_result['callback_element'] = api_result['_element_id'].agent();
      } else {
        api_result['_element_id'] = '';
        api_result['callback_element'] = agent();
      }
      if (api_param['_mode']) {
        api_result['_mode'] = api_param['_mode'];
      }
      if (api_param['_type']) {
        api_result['_type'] = api_param['_type'];
      }
      if (api_param['_element_id']) {
        api_param['_element_id'].agent().loading('hide');
      }
      var now = new Date();
      for (var i = 0; i < document['_api'].length; i++) {
        if (document['_api'][i]['_action'] == api_param['_action'] && document['_api'][i]['_element_id'] == api_param['_element_id']) { // remove current api
          document['_api'].splice(i, 1);
        } else if ((now.getTime() - document['_api'][i]['_time']) > document['_api_timeover_time']) { // remove timeover api
          document['_api'].splice(i, 1);
        }
      }
    }
  
    if (typeof api_callback == 'function') {
      api_callback(api_result, api_param);
    }
  };
  
  agent.failCallAPI = function(api_result, api_param, api_callback) {
    if (api_result['responseText']) {
      log('agent.failCallAPI', api_result['responseText']);
    } else {
      log('agent.failCallAPI', api_result);
    }
    api_result = {};
    if (api_param['_element_id']) {
      api_result['_element_id'] = api_param['_element_id'];
      api_result['callback_element'] = api_result['_element_id'].agent();
    } else {
      api_result['_element_id'] = '';
      api_result['callback_element'] = agent();
    }
    if (api_param['_mode']) {
      api_result['_mode'] = api_param['_mode'];
    }
    if (api_param['_type']) {
      api_result['_type'] = api_param['_type'];
    }
    if (api_param['_element_id']) {
      api_param['_element_id'].agent().loading('hide');
    }
  
    if (typeof api_callback == 'function') {
      api_callback(api_result, api_param);
    }
  };
  
  agent.loadConfig = function(config_callback) {
    if (agent.checkProperty(preload_data, 'config')) {
      for (var config_item_key in preload_data['config']) {
        var config_item_value = preload_data['config'][config_item_key];
        document['_config'][config_item_key] = config_item_value;
        if (String(config_item_value).match(/^[\[\{]/) != null) {
          try {
            document['_config'][config_item_key] = JSON.parse(config_item_value);
            // cast number
            if (document['_config']['member_status']) {
              document['_config']['member_status'] = Number(document['_config']['member_status']);
            }
          } catch (e) {
  
          }
        }
      }
      if (typeof config_callback == 'function') {
        config_callback();
      }
    } else {
      var api_param = {};
      var api_url = document['_api_url'];
      api_param['_action'] = 'load.config';
      agent.post(api_url, api_param).done(function(data) {
        agent.successLoadConfig(data, config_callback);
      }).fail(agent.failCallAPI);
    }
  };
  
  agent.successLoadConfig = function(api_result, config_callback) {
    document['_config'] = document['_config'] ? document['_config'] : {};
    if (agent.checkProperty(api_result, 'item', 0)) {
      for (var item_key in api_result['item'][0]) {
        document['_config'][item_key] = api_result['item'][0][item_key];
        if (String(api_result['item'][0][item_key]).match(/^[\[\{]/) != null) {
          try {
            document['_config'][item_key] = JSON.parse(api_result['item'][0][item_key]);
          } catch (e) {
  
          }
        }
      }
    } else {
      for (var item_key in api_result) {
        document['_config'][item_key] = api_result[item_key];
        if (String(api_result[item_key]).match(/^[\[\{]/) != null) {
          try {
            document['_config'][item_key] = JSON.parse(api_result[item_key]);
          } catch (e) {
  
          }
        }
      }
    }
    if (typeof config_callback == 'function') {
      config_callback();
    }
  };
  
  agent.config = function() {
    if (arguments.length == 0) {
      return document['_config'];
    } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
      if (document['_config'] && document['_config'][arguments[0]]) {
        var config_value = document['_config'][arguments[0]];
        if (config_value == 'true') {
          config_value = true;
        } else if (config_value == 'false') {
          config_value = false;
        } else if (!isNaN(config_value) && String(config_value).match(/^0/) == null) {
          config_value = Number(config_value);
        }
        return config_value;
      }
      return '';
    } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
      document['_config'][arguments[0]] = arguments[1];
    }
  };
  
  agent.setSelectCategory = function(agent_target) {
    var category_object = agent_target.setting('category_object') ? agent_target.setting('category_object') : {};
    var category_depth = agent_target.setting('category_depth') ? agent_target.setting('category_depth') : 0;
    var bind_select = agent_target.bindElement('select');
    var bind_field = agent_target.bindElement('field');
  
    for (var i = 0; i < bind_select.length; i++) {
      if (i < category_depth) {
  
      } else if (i == category_depth) {
        bind_select.eq(category_depth).html('<option value="">전체</option>');
        for (var category_key in category_object) {
          var category_value = category_object[category_key];
          var option_element_string = '<option value="' + category_value['tag'] + '">' + category_key + '</option>';
          var option_element = agent(option_element_string);
          if (category_value['sub']) {
            option_element.setting('category_object', category_value['sub']);
          }
          bind_select.eq(category_depth).append(option_element);
        }
        bind_select.eq(category_depth).setting({
          'category_depth': category_depth,
          'bind_select': bind_select,
          'bind_field': bind_field,
          '_event': {
            'change': agent.changeSelectCategory,
          },
        });
      } else {
        bind_select.eq(i).html('<option value="">전체</option>');
      }
    }
  };
  
  agent.changeSelectCategory = function(event) {
    var category_object = agent(this).find('option:selected').setting('category_object');
    var category_depth = agent(this).setting('category_depth');
    var bind_select = agent(this).bindElement('select');
    var bind_field = agent(this).bindElement('field');
    var navigation_string = '';
    var search_tag = '';
    for (var i = 0; i < bind_select.length; i++) {
      navigation_string = navigation_string ? navigation_string + ' > ' + bind_select.eq(i).find('option:selected').text() : bind_select.eq(i).find('option:selected').text();
      search_tag = search_tag ? search_tag + ' ' + bind_select.eq(i).value() : bind_select.eq(i).value();
      if (agent(this).is(bind_select.eq(i))) {
        break;
      }
    }
    for (var i = 0; i < bind_field.length; i++) {
      if (bind_field.eq(i).setting('field_type') == 'navigation') {
        bind_field.eq(i).setting('hidden_value', agent(this).value());
        // set value
        bind_field.eq(i).value(navigation_string);
        // set display_value
      } else if (bind_field.eq(i).setting('field_type') == 'tag') {
        var tag_array = bind_field.eq(i).value().parseHashString();
        var handling_string = agent(this).value();
        handling_string = handling_string.replace(/^#\s{0,}/, '');
        handling_string = handling_string.replace(/\s{0,}#$/, '');
        tag_array.push(handling_string);
  
        bind_field.eq(i).value(agent(this).value());
        // replace tag
        // bind_field.eq(i).value(tag_array.removeDuplicates().toHashString()); // add tag
      } else if (bind_field.eq(i).setting('field_type') == 'search') {
        bind_field.eq(i).value(agent(this).value()).trigger('agent_set_value');
      } else {
        bind_field.eq(i).value(agent(this).value());
      }
    }
    if (bind_select.length > category_depth + 1) {
      bind_select.eq(category_depth + 1).setting({
        'category_object': category_object,
        'category_depth': category_depth + 1,
        'bind_select': bind_select,
        'bind_field': bind_field,
      });
      agent.setSelectCategory(bind_select.eq(category_depth + 1));
    }
  };
  
  agent.setSelectCategoryValue = function(agent_target) {
    var category_object = agent_target.setting('category_object') ? agent_target.setting('category_object') : {};
    var deep_search_category = _rune.deepSearchCategory(category_object);
    var bind_select = agent_target.bindElement('select');
    var field_value = agent_target.bindElement('field').value();
    var category_value = '#' + field_value.parseHashString()[0];
    for (var deep_key in deep_search_category) {
      var deep_value = deep_search_category[deep_key];
      if (deep_value['tag'] == category_value) {
        for (var i = 0; i < deep_value['tag_navigation'].length; i++) {
          if (bind_select.length > i) {
            bind_select.eq(i).find('option[value="' + deep_value['tag_navigation'][i] + '"]').prop('selected', true).trigger('change');
          }
        }
      }
    }
  };
  
  agent.deepSearchCategory = function() {
    return _rune.deepSearchCategory.apply(this, arguments);
  };
  
  // agent extend
  agent.fn.extend({
    log: function() {
      if (arguments.length > 0) {
        _rune.log(arguments);
      } else {
        log(this);
      }
      return this;
    },
  
    isEmptyElement: function() {
      if (this.length == 0) {
        return true;
      }
      return false;
    },
  
    isEmptyAgent: function() {
      if (this.length == 0) {
        return true;
      }
      return false;
    },
  
    elementID: function() {
      return this.dataAttribute('id');
    },
  
    agentID: function() {
      return this.dataAttribute('id');
    },
  
    elementClass: function() {
      return this.dataAttribute('class');
    },
  
    agentClass: function() {
      return this.dataAttribute('class');
    },
  
    parentID: function() {
      return this.dataAttribute('bind');
    },
  
    parentElement: function() {
      if (this.dataAttribute('bind')) {
        return this.dataAttribute('bind').agent();
      }
      return agent();
    },
  
    eachElement: function(each_function, return_value_only) {
      if (typeof each_function == 'function') {
        for (var i = 0; i < this.length; i++) {
          if (return_value_only) {
            each_function(agent(this[i]));
          } else {
            each_function(i, agent(this[i]));
          }
        }
      }
      return this;
    },
  
    showLoading: function() {
      if (this.length > 0 && arguments.length > 0) {
        agent.showLoading(arguments[0], this);
      }
      return this;
    },
  
    getFieldClassElements: function(selector, field_class) {
      if (!field_class && this.dataAttribute('field_class')) {
        field_class = this.dataAttribute('field_class');
      } else if (!field_class && this.dataAttribute('field')) {
        field_class = this.dataAttribute('field');
      }
      var fields = agent();
      if (this.setting('item_body') && this.setting('item_body').bindElements('member_fields')) {
        fields = this.setting('item_body').bindElements('member_fields');
      } else if (this.setting('item_body') && this.setting('item_body').bindElements('field')) {
        // TODO
        fields = this.setting('item_body').bindElements('field');
      } else {
        fields = agent('[data-r-field]');
      }
      if (selector) {
        if (String(selector).match(/^\//) != null) {
          selector = String(selector).replace(/^\/\s{0,}/, '');
          selector = String(selector).replace(/\s{0,}\/$/, '');
          var selector_regexp = new RegExp(selector);
          for (i = 0; i < fields.length; i++) {
            if (fields.eq(i).dataAttribute('field') && String(fields.eq(i).dataAttribute('field')).match(selector_regexp) != null) {
  
            } else {
              fields = fields.not(fields.eq(i));
            }
          }
        } else if (String(selector).match(/^[\[\.#]/) != null) {
          fields = fields.filter(selector);
        } else {
          fields = fields.filter('[data-r-field="' + selector + '"]');
        }
      }
      return fields;
    },
  
    applyFieldSettings: function() {
      var field_default_settings = {
        '_setting_type': 'default',
        'field': null,
        'field_key': null,
        'field_type': null,
        'field_value': null,
        'field_display': null,
        'field_display_type': null,
        'field_flag': null,
        'field_format': null,
        'field_replace': null,
        'field_replace_value': null,
        'datetime_format': null,
        'string_length': null,
        'string_ellipsis': '...',
        'string_mask': '*',
        'string_dialog_message': null,
      };
      this.setting(field_default_settings);
      if (arguments.length == 0) {
        if (this.setting('_selector') && document['_settings'][this.setting('_selector')]) {
          this.setting(document['_settings'][this.setting('_selector')]);
        } else {
          for (var field_settings_key in document['_settings']) {
            if (this.is(field_settings_key)) {
              this.setting(document['_settings'][field_settings_key]);
            }
          }
        }
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        if (document['_settings'][arguments[0]]) {
          this.setting(document['_settings'][arguments[0]]);
        }
      }
      return this;
    },
  
    prepareMemberFieldsSettings: function() {
      // second setting type
      var prefix_selector = '';
      if (this.setting('_selector')) {
        prefix_selector = this.setting('_selector');
      } else {
        if (this.dataAttribute('role')) {
          prefix_selector = prefix_selector + '[data-r-role="' + this.dataAttribute('role') + '"]';
        }
        if (this.dataAttribute('type')) {
          prefix_selector = prefix_selector + '[data-r-type="' + this.dataAttribute('type') + '"]';
        }
      }
      prefix_selector = prefix_selector ? prefix_selector + ' ' : '';
  
      if (arguments.length == 0) {
        if (this.setting('_selector') && document['_settings'][this.setting('_selector')]) {
          return document['_settings'][this.setting('_selector')];
        }
        return {};
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        if (this.setting('_selector') && document['_settings'][this.setting('_selector')]) {
          return document['_settings'][this.setting('_selector')][arguments[0]];
        }
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var member_field_key in arguments[0]) {
          if (member_field_key && typeof arguments[0][member_field_key] == 'object') {
            var selector = String(member_field_key).match(/^[A-Za-z]/) != null ? prefix_selector + '[data-r-field="' + member_field_key + '"]' : prefix_selector + member_field_key;
            document['_settings'][selector] = document['_settings'][selector] ? document['_settings'][selector] : {};
            document['_settings'][selector].mergeObject(arguments[0][member_field_key]);
          }
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        if (arguments[0] && typeof arguments[1] == 'object') {
          var selector = String(arguments[0]).match(/^[A-Za-z]/) != null ? prefix_selector + '[data-r-field="' + arguments[0] + '"]' : prefix_selector + arguments[0];
          document['_settings'][selector] = document['_settings'][selector] ? document['_settings'][selector] : {};
          document['_settings'][selector].mergeObject(arguments[1]);
        }
      }
      return this;
    },
  
    loadPageRequest: function() {
      agent.loadPageRequest();
      return this;
    },
  
    link: function(page_request) {
      // TODO
      if (this.dataAttribute('coming_soon')) {
        agent.showMessage(this.dataAttribute('coming_soon'));
        return;
      }
  
      page_request = page_request ? page_request : {};
      if (typeof page_request == 'string') {
        var page = page_request;
        page_request = {};
        page_request['p'] = page;
      }
      if (this.length) {
        this.setting({
          '_setting_type': 'default',
          'string_member_link_ko': '회원만 이용하실 수 있습니다. 로그인 후 이용해 주세요',
          'page_request': null,
          'link_new_tab': null,
          'keep_idx': null,
          'keep_code': null,
        });
        if (this.setting('page_request') && typeof this.setting('page_request') == 'object') {
          for (var request_key in this.setting('page_request')) {
            page_request[request_key] = page_request[request_key] != undefined ? page_request[request_key] : this.setting('page_request')[request_key];
          }
        } else if (this.setting('page_request') && typeof this.setting('page_request') == 'string') {
          var split_page_request = this.setting('page_request').split(/\s{0,},\s{0,}/);
          for (var i = 0; i < split_page_request.length; i++) {
            var split_pair = split_page_request[i].split(/\s{0,}=\s{0,}/);
            if (split_pair.length > 1) {
              page_request[split_pair[0]] = page_request[split_pair[0]] != undefined ? page_request[split_pair[0]] : split_pair[1];
            }
          }
        }
        var data_attributes = this.dataAttribute();
        for (var data_attribute_key in data_attributes) {
          var zero_number = data_attribute_key.match(/member_link/i);
          var one_number = data_attribute_key.match(/member([0-9]{2})_link/i);
          var two_number = data_attribute_key.match(/member([0-9]{2})([0-9]{2})_link/i);
          if (zero_number != null) {
            if (!page_request['p'] && data_attributes[data_attribute_key]) {
              page_request['p'] = data_attributes[data_attribute_key];
            }
            if (Number(agent.config('member_status')) < 1) {
              if (this.string('block_link')) {
                agent.showMessage(this.string('block_link'));
              } else if (this.string('member_link')) {
                agent.showMessage(this.string('member_link'));
              }
              return;
            }
          } else if (one_number != null) {
            if (!page_request['p'] && data_attributes[data_attribute_key]) {
              page_request['p'] = data_attributes[data_attribute_key];
            }
            if (Number(agent.config('member_status')) < 1) {
              if (this.string('block_link')) {
                agent.showMessage(this.string('block_link'));
              } else if (this.string('member_link')) {
                agent.showMessage(this.string('member_link'));
              }
              return;
            }
            var number0 = Number(one_number[1]);
            if (Number(agent.config('member_status')) < number0) {
              if (this.string(data_attribute_key)) {
                agent.showMessage(this.string(data_attribute_key));
              } else if (this.string('block_link')) {
                agent.showMessage(this.string('block_link'));
              } else if (this.string('member_link')) {
                agent.showMessage(this.string('member_link'));
              }
              return;
            }
          } else if (two_number != null) {
            if (!page_request['p'] && data_attributes[data_attribute_key]) {
              page_request['p'] = data_attributes[data_attribute_key];
            }
            if (Number(agent.config('member_status')) < 1) {
              if (this.string('block_link')) {
                agent.showMessage(this.string('block_link'));
              } else if (this.string('member_link')) {
                agent.showMessage(this.string('member_link'));
              }
              return;
            }
            var number0 = Number(two_number[1]);
            var number1 = Number(two_number[2]);
            if (Number(agent.config('member_status')) < number0 || number1 < Number(agent.config('member_status'))) {
              if (this.string(data_attribute_key)) {
                agent.showMessage(this.string(data_attribute_key));
              } else if (this.string('block_link')) {
                agent.showMessage(this.string('block_link'));
              } else if (this.string('member_link')) {
                agent.showMessage(this.string('member_link'));
              }
              return;
            }
          }
        }
        if (!page_request['p'] && this.dataAttribute('link')) {
          page_request['p'] = this.dataAttribute('link');
        }
        if (!page_request['category'] && this.dataAttribute('category')) {
          page_request['category'] = this.dataAttribute('category');
        }
        if (!page_request['category_index'] && this.dataAttribute('category_index')) {
          page_request['category_index'] = this.dataAttribute('category_index');
        }
        if (!page_request['link_new_tab'] && this.setting('link_new_tab')) {
          page_request['link_new_tab'] = true;
        }
        if (!page_request['keep_idx'] && this.setting('keep_idx')) {
          page_request['keep_idx'] = true;
        }
        if (!page_request['keep_code'] && this.setting('keep_code')) {
          page_request['keep_code'] = true;
        }
      }
      agent.link(page_request);
      return this;
    },
  
    loading: function() {
      if (arguments.length == 0) {
        this.find('.agent_loading_section').remove();
      } else if (arguments.length > 0 && typeof arguments[0] == 'string') {
        var message_string = arguments[0];
        if (arguments[0].match(/^(clear|hide|deactive|off|disable)$/i) != null) {
          this.find('.agent_loading_section').remove();
        } else if (arguments[0].match(/^(show|active|on|enable)$/i) != null) {
          if (String(this.css('position')).match(/relative/) == null) {
            //this.css('position', 'relative');
          }
          for (var i = 0; i < this.length; i++) {
            var $sec_loading = agent('<div class="agent_loading_section"><div class="agent_background"></div><div class="sec_loading"><div class="icon_loading"></div></div></div>');
            $sec_loading.addClass("borderbox");
            $sec_loading.css({
              'width': agent(this[i]).outerWidth(true),
              'height': agent(this[i]).outerHeight(true),
              'padding-top': (agent(this[i]).outerHeight(true) / 2 - 24)
            });
            agent(this[i]).append($sec_loading);
            $sec_loading.on('click tap', function() {
              return false;
            });
          }
        }
      }
      return this;
    },
  
    message: function() {
      if (arguments.length == 0) {
        agent.hideMessage();
      } else if (arguments.length > 0 && typeof arguments[0] == 'string') {
        var message_string = arguments[0];
        if (this.string(message_string)) {
          message_string = this.string(message_string);
        }
        if (message_string.match(/^(clear|hide|deactive|off|disable)$/i) != null) {
          agent.hideMessage();
        } else {
          agent.showMessage(message_string);
        }
        //     if (message_string.match(/^([A-Za-z0-9]+)[\_\-]/i) != null) {
        //     var message_string = message_string.replace(/^([A-Za-z0-9]+)[\_\-]/i, '');
        //     var match_message_string = message_string.match(/^([A-Za-z0-9]+)[\_\-]/i);
        //     var prefix_string = message_string.match(/^([A-Za-z0-9]+)[\_\-]/i)[1];
        //     agent.showMessage(message_string, prefix_string);
      } else {
        agent.showMessage(message_string);
      }
      return this;
    },
  
    session: function() {
      if (arguments.length == 0) {
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        return agent.getSessionData(arguments[0]);
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var session_key in arguments[0]) {
          agent.setSessionData(session_key, arguments[0][session_key]);
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        agent.setSessionData(arguments[0], arguments[1]);
      }
      return this;
    },
  
    local: function() {
      if (arguments.length == 0) {
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        return agent.getLocalData(arguments[0]);
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var local_key in arguments[0]) {
          agent.setLocalData(local_key, arguments[0][local_key]);
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        agent.setLocalData(arguments[0], arguments[1]);
      }
      return this;
    },
  
    config: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_config']) {
            return this[i]['_config'];
          }
        }
        return document['_config'];
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var property_key_without_prefix = arguments[0].replace(/^(config)[\_\-]/, '');
        for (var i = 0; i < this.length; i++) {
          if (agent.checkProperty(this[i], '_config', property_key_without_prefix)) {
            var config_value = this[i]['_config'][property_key_without_prefix];
            if (config_value == 'true') {
              config_value = true;
            } else if (config_value == 'false') {
              config_value = false;
            } else if (!isNaN(config_value)) {
              config_value = Number(config_value);
            }
            return config_value;
          }
        }
        if (agent.checkProperty(document, '_config', property_key_without_prefix)) {
          var config_value = document['_config'][property_key_without_prefix];
          if (config_value == 'true') {
            config_value = true;
          } else if (config_value == 'false') {
            config_value = false;
          } else if (!isNaN(config_value)) {
            config_value = Number(config_value);
          }
          return config_value;
        }
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        if (this.length == 0) {
          document['_config'] = typeof document['_config'] != 'object' ? {} : document['_config'];
          for (var property_key in arguments[0]) {
            var property_key_without_prefix = property_key.replace(/^(config)[\_\-]/, '');
            if (agent.checkProperty(arguments, 0, '_setting_type') != 'default' || agent.checkProperty(document, '_config', property_key_without_prefix) === null) {
              document['_config'][property_key_without_prefix] = arguments[0][property_key];
            }
          }
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i]['_config'] = typeof this[i]['_config'] != 'object' ? {} : this[i]['_config'];
            for (var property_key in arguments[0]) {
              var property_key_without_prefix = property_key.replace(/^(config)[\_\-]/, '');
              if (agent.checkProperty(arguments, 0, '_setting_type') != 'default' || agent.checkProperty(this[i], '_config', property_key_without_prefix) === null) {
                this[i]['_config'][property_key_without_prefix] = arguments[0][property_key];
              }
            }
          }
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        if (this.length == 0) {
          document['_config'] = typeof document['_config'] != 'object' ? {} : document['_config'];
          var property_key_without_prefix = arguments[0].replace(/^(config)[\_\-]/, '');
          document['_config'][property_key_without_prefix] = arguments[1];
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i]['_config'] = typeof this[i]['_config'] != 'object' ? {} : this[i]['_config'];
            var property_key_without_prefix = arguments[0].replace(/^(config)[\_\-]/, '');
            this[i]['_config'][property_key_without_prefix] = arguments[1];
          }
        }
      }
      return this;
    },
  
    string: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_string']) {
            return this[i]['_string'];
          }
        }
        return document['_string'];
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var property_key_without_prefix = arguments[0].replace(/^(string)[\_\-]/i, '');
        property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)$/i, '_');
        property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)[\_\-]/i, '_');
        property_key_without_prefix = property_key_without_prefix.replace(/[\_\-]/g, '_');
        for (var i = 0; i < this.length; i++) {
          if (agent(this[i]).dataAttribute('string_' + property_key_without_prefix)) {
            return agent(this[i]).dataAttribute('string_' + property_key_without_prefix);
          } else if (this[i]['_string'] && this[i]['_string'][property_key_without_prefix]) {
            return this[i]['_string'][property_key_without_prefix];
          } else if (agent.checkProperty(this[i], '_string', property_key_without_prefix + '_' + agent.config('locale'))) {
            return this[i]['_string'][property_key_without_prefix + '_' + agent.config('locale')];
          }
        }
        if (document['_string'] && document['_string'][property_key_without_prefix]) {
          return document['_string'][property_key_without_prefix];
        } else if (agent.checkProperty(document, '_string', property_key_without_prefix + '_' + agent.config('locale'))) {
          return document['_string'][property_key_without_prefix + '_' + agent.config('locale')];
        }
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        var setting_type = arguments[0]['_setting_type'] ? arguments[0]['_setting_type'] : 'replace';
        for (var string_key in arguments[0]) {
          if (setting_type != 'default' || this.string(string_key)) {
            this.string(string_key, arguments[0][string_key]);
          }
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        if (this.length == 0) {
          document['_string'] = typeof document['_string'] != 'object' ? {} : document['_string'];
          var property_key_without_prefix = arguments[0].replace(/^(string)[\_\-]/i, '');
          property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)$/i, '_');
          property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)[\_\-]/i, '_');
          property_key_without_prefix = property_key_without_prefix.replace(/[\_\-]/g, '_');
          document['_string'][property_key_without_prefix] = arguments[1];
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i]['_string'] = typeof this[i]['_string'] != 'object' ? {} : this[i]['_string'];
            var property_key_without_prefix = arguments[0].replace(/^(string)[\_\-]/i, '');
            property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)$/i, '_');
            property_key_without_prefix = property_key_without_prefix.replace(/[\_\-](string)[\_\-]/i, '_');
            property_key_without_prefix = property_key_without_prefix.replace(/[\_\-]/g, '_');
            this[i]['_string'][property_key_without_prefix] = arguments[1];
          }
        }
      }
      return this;
    },
  
    removeBindElements: function() {
      if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var bind_key = arguments[0].replace(/^(bind)[\_\-]/, '');
        for (var i = 0; i < this.length; i++) {
          this[i]['_bind_elements'][bind_key] = agent();
        }
      }
      return this;
    },
  
    bindElements: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_bind_elements']) {
            return this[i]['_bind_elements'];
          }
        }
        return {};
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var bind_key = arguments[0].replace(/^(bind)[\_\-]/, '');
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_bind_elements'] && this[i]['_bind_elements'][bind_key]) {
            return this[i]['_bind_elements'][bind_key];
          }
        }
        return agent();
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var bind_key in arguments[0]) {
          this.bindElement(bind_key, arguments[0][bind_key]);
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        var bind_key = arguments[0].replace(/^(bind)[\_\-]/, '');
        var bind_element = arguments[1];
        if (typeof bind_element == 'string' || (typeof bind_element == 'object' && bind_element instanceof HTMLElement)) {
          bind_element = agent(bind_element);
        }
        if (typeof bind_element == 'object' && (bind_element instanceof agent)) {
          for (var i = 0; i < this.length; i++) {
            this[i]['_bind_elements'] = typeof this[i]['_bind_elements'] != 'object' ? {} : this[i]['_bind_elements'];
            if (this[i]['_bind_elements'][bind_key]) {
              // add bind element
              this[i]['_bind_elements'][bind_key] = this[i]['_bind_elements'][bind_key].add(bind_element);
            } else {
              // set element
              this[i]['_bind_elements'][bind_key] = bind_element;
            }
  
            var element_id = agent(this[i]).elementID();
            bind_element.setting({
              '_parent_id': element_id
            });
          }
        }
      }
      return this;
    },
  
    bindElement: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_bind_elements']) {
            return this[i]['_bind_elements'];
          }
        }
        return {};
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var bind_key = arguments[0].replace(/^(bind)[\_\-]/, '');
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_bind_elements'] && this[i]['_bind_elements'][bind_key]) {
            return this[i]['_bind_elements'][bind_key];
          }
        }
        return agent();
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var bind_key in arguments[0]) {
          this.bindElement(bind_key, arguments[0][bind_key]);
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        var bind_key = arguments[0].replace(/^(bind)[\_\-]/, '');
        var bind_element = arguments[1];
        if (typeof bind_element == 'string' || (typeof bind_element == 'object' && bind_element instanceof HTMLElement)) {
          bind_element = agent(bind_element);
        }
        if (typeof bind_element == 'object' && (bind_element instanceof agent)) {
          for (var i = 0; i < this.length; i++) {
            this[i]['_bind_elements'] = typeof this[i]['_bind_elements'] != 'object' ? {} : this[i]['_bind_elements'];
            if (this[i]['_bind_elements'][bind_key]) {
              // add bind element
              this[i]['_bind_elements'][bind_key] = this[i]['_bind_elements'][bind_key].add(bind_element);
            } else {
              // set element
              this[i]['_bind_elements'][bind_key] = bind_element;
            }
  
            var element_id = agent(this[i]).elementID();
            bind_element.setting({
              '_parent_id': element_id
            });
          }
        }
      }
      return this;
    },
  
    bindField: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_bind_elements'] && this[i]['_bind_elements']['field']) {
            return this[i]['_bind_elements']['field'];
          }
        }
        return {};
      } else if (arguments.length == 1) {
        var bind_element = arguments[0];
        if (typeof bind_element == 'string' || (typeof bind_element == 'object' && bind_element instanceof HTMLElement)) {
          bind_element = agent(bind_element);
        }
        if (typeof bind_element == 'object' && (bind_element instanceof agent)) {
          for (var i = 0; i < this.length; i++) {
            this[i]['_bind_elements'] = typeof this[i]['_bind_elements'] != 'object' ? {} : this[i]['_bind_elements'];
            if (this[i]['_bind_elements']['field']) {
              // add bind element
              this[i]['_bind_elements']['field'] = this[i]['_bind_elements']['field'].add(bind_element);
            } else {
              // set element
              this[i]['_bind_elements']['field'] = bind_element;
            }
  
            var element_id = agent(this[i]).elementID();
            bind_element.setting({
              '_parent_id': element_id
            });
          }
        }
      }
      return this;
    },
  
    clearRequest: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_request']) {
            delete this[i]['_request'];
            this[i]['_request'] = {};
          }
        }
      }
      return this;
    },
  
    request: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_request']) {
            return this[i]['_request'];
          }
        }
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var property_key_without_prefix = arguments[0].replace(/^(request)[\_\-]/, '');
        for (var i = 0; i < this.length; i++) {
          if (agent.checkProperty(this[i], '_request', property_key_without_prefix)) {
            return this[i]['_request'][property_key_without_prefix];
          }
        }
        return '';
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var i = 0; i < this.length; i++) {
          this[i]['_request'] = typeof this[i]['_request'] != 'object' ? {} : this[i]['_request'];
          for (var property_key in arguments[0]) {
            var property_key_without_prefix = property_key.replace(/^(request)[\_\-]/, '');
            if (agent.checkProperty(arguments, 0, '_setting_type') != 'default' || agent.checkProperty(this[i], '_request', property_key_without_prefix) === null) {
              var request_value = arguments[0][property_key];
              if (typeof request_value == 'object') {
                request_value = JSON.stringify(request_value);
              }
              this[i]['_request'][property_key_without_prefix] = request_value;
            }
          }
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        for (var i = 0; i < this.length; i++) {
          this[i]['_request'] = typeof this[i]['_request'] != 'object' ? {} : this[i]['_request'];
          var property_key_without_prefix = arguments[0].replace(/^(request)[\_\-]/, '');
          var request_value = arguments[1];
          if (typeof request_value == 'object') {
            request_value = JSON.stringify(request_value);
          }
          this[i]['_request'][property_key_without_prefix] = request_value;
        }
      }
      return this;
    },
  
    setting: function() {
      if (arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_setting']) {
            return this[i]['_setting'];
          }
        }
        return {};
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var property_key = arguments[0];
        property_key = property_key.replace(/\-/g, '_').toLowerCase();
        for (var i = 0; i < this.length; i++) {
          if (this[i]['_setting'] != null && this[i]['_setting'][property_key] != undefined) {
            return this[i]['_setting'][property_key];
          } else if (this[i]['_setting'] != null && this[i]['_setting'][property_key + '_' + agent.config('locale')] != undefined) {
            return this[i]['_setting'][property_key + '_' + agent.config('locale')];
          }
        }
        return undefined;
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        var setting_object = arguments[0].cloneObject();
        var setting_type = setting_object['_setting_type'] == undefined ? 'replace' : setting_object['_setting_type'];
        if (setting_object['_bind_elements'] != undefined) {
          setting_object['_bind_elements']['_setting_type'] = setting_object['_bind_elements']['_setting_type'] ? setting_object['_bind_elements']['_setting_type'] : setting_type;
          this.bindElement(setting_object['_bind_elements']);
          delete setting_object['_bind_elements'];
        }
        if (setting_object['_string'] != undefined) {
          setting_object['_string']['_setting_type'] = setting_object['_string']['_setting_type'] ? setting_object['_string']['_setting_type'] : setting_type;
          this.string(setting_object['_string']);
          delete setting_object['_string'];
        }
        if (setting_object['_request'] != undefined) {
          // TODO current only replace
          setting_object['_request']['_setting_type'] = setting_object['_request']['_setting_type'] ? setting_object['_request']['_setting_type'] : setting_type;
          this.request(setting_object['_request']);
          delete setting_object['_request'];
        }
        if (setting_object['_event'] != undefined) {
          setting_object['_event']['_setting_type'] = setting_object['_event']['_setting_type'] ? setting_object['_event']['_setting_type'] : setting_type;
          this.settingEvent(setting_object['_event']);
          delete setting_object['_event'];
        }
        this.settingElement(setting_object);
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        var setting_object = {};
        setting_object[arguments[0]] = arguments[1];
        this.settingElement(setting_object);
      }
      return this;
    },
  
    settingElement: function() {
      if (arguments.length > 0 && typeof arguments[0] == 'object') {
        var setting_object = arguments[0];
        var setting_type = setting_object['_setting_type'] ? setting_object['_setting_type'] : 'replace';
  
        // delete password
        if (setting_object['password']) {
          delete setting_object['password'];
        }
  
        // setting
        for (var i = 0; i < this.length; i++) {
          this[i]['_setting'] = typeof this[i]['_setting'] != 'object' ? {} : this[i]['_setting'];
  
          // set element id (auto set)
          if (!this[i]['_element_id']) {
            document['_elements'].push(this[i]);
            this[i]['_element_id'] = '_' + document['_elements'].length;
            agent(this[i]).dataAttribute('id', this[i]['_element_id']);
          }
          var element_id = this[i]['_element_id'];
  
          // set element class
          if (agent(this[i]).dataAttribute('class')) {
            this[i]['_element_class'] = agent(this[i]).dataAttribute('class');
          } else if (setting_object['_element_class'] != undefined && (!this[i]['_element_class'] || setting_type != 'default')) {
            this[i]['_element_class'] = setting_object['_element_class'];
          }
          var element_class = this[i]['_element_class'];
  
          // set setting
          for (var setting_item_key in setting_object) {
            var setting_item_value = setting_object[setting_item_key];
            if (setting_item_key.match(/^[\_\-]/) != null) {
              continue;
            }
            if (setting_item_value === null || setting_item_value === undefined) {
              continue;
            }
            if (setting_item_key.match(/^(string)[\_\-]/i) != null || setting_item_key.match(/[\_\-](string)$/i) != null || setting_item_key.match(/[\_\-](string)[\_\-]/i) != null) {
              // string
              if (setting_type != 'default' || !agent(this[i]).string(setting_item_key)) {
                agent(this[i]).string(setting_item_key, setting_item_value);
              }
            } else if (setting_item_key.match(/^(bind)[\_\-]/) != null) {
              if (typeof setting_item_value == 'string' || (typeof setting_item_value == 'object' && (setting_item_value instanceof agent))) {
                agent(this[i]).bindElement(setting_item_key, setting_item_value);
              }
            } else {
              // setting item
              if (setting_type != 'default' || agent.checkProperty(this[i], '_setting', setting_item_key) === null) {
                this[i]['_setting'][setting_item_key] = setting_item_value;
              }
            }
  
            // set dataAttribute role, widget, type, link ...
            if (setting_item_key.match(/^(role|widget|type|link|field)$/) != null && setting_item_value) {
              //agent(this[i]).dataAttribute(setting_item_key, setting_item_value);
            }
          }
  
          // set from data-r-* in html
          for (var setting_item_key in setting_object) {
            var setting_item_value = setting_object[setting_item_key];
            var data_attribute_value = agent(this[i]).dataAttribute(setting_item_key);
            if (data_attribute_value == null) {
              // return null when do not have attribute
              continue;
            }
            if (setting_item_key.match(/^(string|str|text)[\_\-]/) != null) {
              agent(this[i]).string(setting_item_key, data_attribute_value);
            } else if (setting_item_key.match(/^(bind)[\_\-]/) != null) {
              agent(this[i]).bindElement(setting_item_key, data_attribute_value);
              if (data_attribute_value == '.confirm_password') {
                // TODO
              }
              if (typeof setting_item_value == 'object' && setting_item_value != null && !(setting_item_value instanceof agent) && !(setting_item_value instanceof HTMLElement)) {
                // case {}
                var bind_setting = setting_item_value;
                bind_setting['_setting_type'] = setting_type;
                agent(this[i]).bindElement(setting_item_key).setting(bind_setting);
              }
            } else {
              this[i]['_setting'][setting_item_key] = data_attribute_value;
            }
            if (setting_item_key.match(/^(role|widget|type|link|field)$/) == null && document['_remove_data_attribute']) {
              agent(this[i]).removeDataAttribute(setting_item_key);
            }
          }
        }
      }
      return this;
    },
  
    settingEvent: function() {
      if (arguments.length == 0) {} else if (arguments.length > 0 && typeof arguments[0] == 'object') {
        var event_object = arguments[0];
        var setting_type = event_object['_setting_type'] ? event_object['_setting_type'] : 'replace';
        delete event_object['_setting_type'];
        var event_namespace = arguments[1] ? arguments[1] : 'rune';
        for (var event_type in event_object) {
          for (var i = 0; i < this.length; i++) {
            if (typeof event_object[event_type] == 'function') {
              // Support: IE 11, Edge
              // if (document.defaultView.addEventListener) {
              //     this[i].addEventListener(event_type, event_object[event_type], false);
              //
              //
              //     // Support: IE 9 - 10 only
              // } else if (document.defaultView.attachEvent) {
              //     this[i].attachEvent(event_type, event_object[event_type]);
              // }
              var event_type_with_namespace = event_type;
              if (event_type_with_namespace.match(/\./) == null) {
                // use namespace (unbind the unique and rebind the unique)
                event_type_with_namespace = event_type_with_namespace + '.' + event_namespace;
              }
  
              // bind only one namespace event
              agent(this[i]).off(event_type_with_namespace);
              agent(this[i]).on(event_type_with_namespace, event_object[event_type]);
  
              // TODO
              var bind_event = this[i]['_event'] ? this[i]['_event'] : {};
            }
          }
        }
      }
      return this;
    },
  
    dataAttribute: function(attribute_string) {
      if (arguments.length == 0) {
        var data_attribute_array = {};
        for (var i = 0; i < this.length; i++) {
          var element_attributes = this[i].attributes;
          for (var j = 0; j < element_attributes.length; j++) {
            if (String(element_attributes[j].nodeName).match(/^data[\-\_]r[\-\_]/i) != null) {
              var data_attribute_key = String(element_attributes[j].nodeName).replace(/^data[\-\_]r[\-\_]/i, '');
              data_attribute_key = data_attribute_key.replace(/[\-\_]/g, '_');
              data_attribute_array[data_attribute_key] = element_attributes[j].nodeValue;
            }
          }
        }
  
        return data_attribute_array;
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var attr_key = arguments[0];
        attr_key = attr_key.match(/^(id|class)$/i) != null ? 'element-' + attr_key : attr_key;
        attr_key = attr_key.match(/^(bind|parent)$/i) != null ? 'bind-element' : attr_key;
        attr_key = attr_key.replace(/^(data[\-\_]r[\-\_])/i, '');
        var attr_key_variation = attr_key;
        var attr_key_variation1 = 'data-r-' + attr_key_variation.replace(/\_/g, '-').toLowerCase();
        var attr_key_variation3 = 'data-r-' + attr_key_variation.replace(/\-/g, '_').toLowerCase();
        var attr_key_variation5 = 'data-r-' + attr_key_variation.replace(/[\-\_]/g, '').toLowerCase();
        for (var i = 0; i < this.length; i++) {
          // case single attribute : getAttribute is '' (ex. data-r-test)
          // case do not have attribute : getAttribute is null
          try {
            if (this[i].getAttribute(attr_key_variation1) != null) {
              // var attr_value = this[i].getAttribute(attr_key_variation1) === 'false' ? false : this[i].getAttribute(attr_key_variation1);
              return this[i].getAttribute(attr_key_variation1);
            } else if (this[i].getAttribute(attr_key_variation3) != null) {
              return this[i].getAttribute(attr_key_variation3);
            } else if (this[i].getAttribute(attr_key_variation5) != null) {
              return this[i].getAttribute(attr_key_variation5);
            }
          } catch (e) {
  
          }
        }
        if (attr_key.match(/^(element-id|element-class|bind-element)$/i) != null) {
          return '';
        }
        return null;
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var i = 0; i < this.length; i++) {
          for (var attr_key in arguments[0]) {
            attr_key = attr_key.match(/^(id|class)$/i) != null ? attr_key = 'element-' + attr_key : attr_key;
            attr_key = attr_key.match(/^(bind|parent)$/i) != null ? attr_key = 'bind-element' : attr_key;
            attr_key = attr_key.replace(/^(data[\-\_]r[\-\_])/i, '');
            attr_key = attr_key.replace(/\_/g, '-');
            attr_key = 'data-r-' + attr_key;
            this[i].setAttribute(attr_key, arguments[0][attr_key]);
          }
        }
      } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
        var attr_key = arguments[0];
        attr_key = attr_key.match(/^(id|class)$/i) != null ? attr_key = 'element-' + attr_key : attr_key;
        attr_key = attr_key.match(/^(bind|parent)$/i) != null ? attr_key = 'bind-element' : attr_key;
        attr_key = attr_key.replace(/^(data[\-\_]r[\-\_])/i, '');
        attr_key = attr_key.replace(/\_/g, '-');
        attr_key = 'data-r-' + attr_key;
        for (var i = 0; i < this.length; i++) {
          try {
            this[i].setAttribute(attr_key, arguments[1]);
          } catch (e) {
  
          }
        }
      }
      return this;
    },
  
    removeDataAttribute: function(attribute_string) {
      var attr_key = attribute_string.match(/^(id|class)$/i) != null ? 'element-' + attribute_string : attribute_string;
      attr_key = attr_key.match(/^(bind|parent)$/i) != null ? 'bind-element' : attr_key;
      attr_key = attr_key.replace(/^(data[\-\_]r[\-\_])/i, '');
      if (attr_key.match(/^(element[\-\_]id|bind[\-\_]element|role|widget|type|field)$/) != null) {
        return this;
      }
      var attr_key_variation = attr_key;
      var attr_key_variation1 = 'data-r-' + attr_key_variation.replace(/\_/g, '-').toLowerCase();
      var attr_key_variation3 = 'data-r-' + attr_key_variation.replace(/\-/g, '_').toLowerCase();
      var attr_key_variation5 = 'data-r-' + attr_key_variation.replace(/[\-\_]/g, '').toLowerCase();
      for (var i = 0; i < this.length; i++) {
        this[i].removeAttribute(attr_key_variation1);
        this[i].removeAttribute(attr_key_variation3);
        this[i].removeAttribute(attr_key_variation5);
      }
      return this;
    },
  
    clearDisplayValue: function() {
      if (this.length) {
        for (var i = 0; i < this.length; i++) {
          if (agent(this[i]).is(':radio') || agent(this[i]).is(':checkbox')) {
            agent(this[i]).prop('checked', false);
          } else if ((agent(this[i]).is('select') || agent(this[i]).is('input') || agent(this[i]).is('textarea'))) {
            agent(this[i]).val('');
          } else if (agent(this[i]).is('img')) {
            return this[i].removeAttribute('src');
          } else if (agent(this[i]).is('table')) {
            agent(this[i]).find('tbody').html('');
          } else if (agent(this[i]).html()) {
            agent(this[i]).html('');
          }
        }
      }
      return this;
    },
  
    clearHiddenValue: function() {
      if (this.length) {
        for (var i = 0; i < this.length; i++) {
          if (agent(this[i]).setting('hidden_value')) {
            delete this[i]['_setting']['hidden_value'];
          }
        }
      }
      return this;
    },
  
    clearValue: function() {
      return this.clearDisplayValue().clearHiddenValue();
    },
  
    getDisplayValue: function() {
      if (this.is(':radio')) {
        var element_name = this.attr('name');
        var $same_name = agent('[name="' + element_name + '"]');
        for (var i = 0; i < $same_name.length; i++) {
          if ($same_name.eq(i).is(':checked')) {
            return $same_name.eq(i).val();
          }
        }
      } else if (this.is(':checkbox')) {
        return this.prop('checked');
      } else if ((this.is('select') || this.is('input') || this.is('textarea'))) {
        return String(this.val()).trim();
      } else if (this.is('img')) {
        return this.attr('src');
      } else if (this.html()) {
        return String(this.html()).trim();
      }
      return '';
    },
  
    getHiddenValue: function() {
      var return_string = this.setting('hidden_value') !== undefined ? this.setting('hidden_value') : undefined;
      return return_string;
    },
  
    getValue: function() {
      if (arguments.length == 0) {
        if (this.setting('hidden_value') !== undefined) {
          return this.getHiddenValue();
        } else {
          return this.getDisplayValue();
        }
      }
      return '';
    },
  
    setDisplayValue: function() {
      if (arguments.length == 1) {
        if (this.length) {
          for (var i = 0; i < this.length; i++) {
            if (agent(this[i]).is(':radio')) {
              var element_name = agent(this[i]).attr('name');
              var $same_name = agent('[name="' + element_name + '"]');
              for (var j = 0; j < $same_name.length; j++) {
                if (String($same_name.eq(j).val()) == String(arguments[0])) {
                  $same_name.eq(j).prop('checked', true);
                }
              }
            } else if (agent(this[i]).is(':checkbox')) {
              if (arguments[0] && arguments[0] != 'false' && arguments[0] != 'null') {
                agent(this[i]).addClass('on');
                agent(this[i]).prop('checked', true);
              } else {
                agent(this[i]).removeClass('on');
                agent(this[i]).prop('checked', false);
              }
            } else if (agent(this[i]).is('select')) {
              if (agent(this[i]).find('option[value="' + arguments[0] + '"]').length > 0) {
                agent(this[i]).find('option[value="' + arguments[0] + '"]').prop('selected', true);
              } else {
                agent(this[i]).find('option[value=""]').prop('selected', true);
              }
            } else if (agent(this[i]).is('input') || agent(this[i]).is('textarea')) {
              agent(this[i]).val(arguments[0]);
            } else if (agent(this[i]).is('img')) {
              if (arguments[0]) {
                agent(this[i]).attr('src', arguments[0]);
                // document['_sequence_image'].push(agent(this[i]));
                // agent(this[i]).dataAttribute('image_url', arguments[0]);
              }
            } else if (agent(this[i]).is('video')) {
              if (arguments[0]) {
                agent(this[i]).attr('src', arguments[0]);
              }
            } else if (agent(this[i]).is('iframe')) {
              if (arguments[0]) {
                agent(this[i]).attr('src', arguments[0]);
              }
            } else if (agent(this[i]).is('a')) {
              if (arguments[0]) {
                if (String(arguments[0]).match(/\.[A-Za-z]{1,4}$/) != null) {
                  agent(this[i]).attr('href', arguments[0]);
                } else {
                  agent(this[i]).html(arguments[0]);
                }
              }
            } else if (arguments[0] != undefined && arguments[0] != null) {
              agent(this[i]).html(arguments[0]);
            } else {
              agent(this[i]).html('');
            }
          }
        }
      }
      return this;
    },
  
    setHiddenValue: function() {
      if (arguments.length == 1) {
        this.setting('hidden_value', arguments[0]);
      }
      return this;
    },
  
    setValue: function() {
      if (arguments.length == 1) {
        this.setDisplayValue(arguments[0]);
      }
      return this;
    },
  
    checkEmpty: function() {
      if (!this.getValue() && this.attr('required')) {
        this.trigger('empty.agent_field');
        return false;
      }
      return true;
    },
  
    checkRegExp: function() {
      var element_regexp = null;
      if (typeof this.setting('regexp') == 'string') {
        var regexp_string = this.setting('regexp');
        regexp_string = regexp_string.replace(/^\//, '');
        regexp_string = regexp_string.replace(/\/$/, '');
        element_regexp = new RegExp(regexp_string);
      } else if (typeof this.setting('regexp') == 'object' && this.setting('regexp') instanceof RegExp) {
        element_regexp = this.setting('regexp');
      } else {
        return true;
      }
      if (element_regexp && String(this.getDisplayValue()).match(element_regexp) == null) {
        this.trigger('regexp_error.agent_field');
        return false;
      }
      return true;
    },
  
    checkValue: function() {
      var pass_check = true;
      if (arguments.length == 0) {
        if (this.length) {
          for (var i = 0; i < this.length; i++) {
            var element_value = agent(this[i]).getValue();
            if (String(element_value).match(/^\*{1,}$/)) {
              continue;
            }
            if (!agent(this[i]).checkEmpty()) {
              if (agent(this[i]).string('empty')) {
                agent.showMessage(agent(this[i]).string('empty'));
              } else if (!agent(this[i]).string('empty') && agent(this[i]).dataAttribute('string_empty') === '') {
                agent(this[i]).focus().addClass('agent_field_error');
              } else {
                agent.showMessage('필수 입력값이 없습니다.');
                agent(this[i]).focus().addClass('agent_field_error');
              }
              pass_check = false;
            } else if (!agent(this[i]).checkRegExp()) {
              if (agent(this[i]).string('regexp_error')) {
                agent.showMessage(agent(this[i]).string('regexp_error'));
              } else if (!agent(this[i]).string('regexp_error') && agent(this[i]).dataAttribute('string_regexp_error') === '') {
                agent(this[i]).focus().addClass('agent_field_error');
              } else {
                agent.showMessage('입력 형식이 잘못되었습니다.');
                agent(this[i]).focus().addClass('agent_field_error');
              }
              pass_check = false;
            }
          }
        }
      }
      return pass_check;
    },
  
    value: function() {
      if (arguments.length == 0) {
        return this.getValue();
      } else if (arguments.length == 1) {
        this.setValue(arguments[0]);
      }
      return this;
    },
  
    displayValue: function() {
      if (arguments.length == 0) {
        //this.checkValue();
        return this.getDisplayValue();
      } else if (arguments.length == 1) {
        this.setDisplayValue(arguments[0]);
      }
      return this;
    },
  
    hiddenValue: function() {
      if (arguments.length == 0) {
        //this.checkValue();
        return this.getHiddenValue();
      } else if (arguments.length == 1) {
        this.setHiddenValue(arguments[0]);
      }
      return this;
    },
  
    api: function() {
      if (this.length) {
        for (var i = 0; i < this.length; i++) {
  
          var request_object = this[i]['_request'] ? this[i]['_request'].cloneObject() : {};
          request_object['_element_id'] = this[i]['_element_id'];
          request_object['_api_url'] = this[i]['_config'] != undefined && this[i]['_config']['_api_url'] != undefined ? this[i]['_config']['_api_url'] : document['_api_url'];
  
          if (arguments.length == 1) {
            for (var request_key in arguments[0]) {
              request_object[request_key] = arguments[0][request_key];
            }
          }
          //agent(this[i]).loading('show');
          agent.callApi(request_object);
        }
      } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        agent.callApi(arguments[0]);
      }
    },
  
    // life cycle
    setEventBeforeLoadPlugin: function(queue_function) {
      if (typeof queue_function == 'function') {
        document['_sequence_function'].push({
          'type': 'before_plugin',
          'function': queue_function
        });
      }
      return this;
    },
  
    setEventLoadPlugin: function(queue_function) {
      if (typeof queue_function == 'function') {
        document['_sequence_function'].push({
          'type': 'load_plugin',
          'function': queue_function
        });
      }
      return this;
    },
  
    setEventAfterLoadPlugin: function(queue_function) {
      if (typeof queue_function == 'function') {
        document['_sequence_function'].push({
          'type': 'after_plugin',
          'function': queue_function
        });
      }
      return this;
    },
  
    setEventPageReady: function(queue_function) {
      if (typeof queue_function == 'function') {
        document['_sequence_function'].push({
          'type': 'agent_page_ready',
          'function': queue_function
        });
      }
      return this;
    },
  
    beforePlugin: function(queue_function) {
      return this.setEventBeforeLoadPlugin(queue_function);
    },
  
    pageSetting: function(queue_function) {
      return this.setEventBeforeLoadPlugin(queue_function);
    },
  
    initPlugin: function(queue_function) {
      return this.setEventLoadPlugin(queue_function);
    },
  
    afterPlugin: function(queue_function) {
      return this.setEventAfterLoadPlugin(queue_function);
    },
  
    pageReady: function(queue_function) {
      return this.setEventAfterLoadPlugin(queue_function);
    },
  
    callSequenceFunction: function(event_string) {
      if (event_string == undefined) {
        // call function before load plugin
        for (var i = 0; i < document['_sequence_function'].length; i++) {
          if (document['_sequence_function'][i]['type'] == 'before_plugin' && typeof document['_sequence_function'][i]['function'] == 'function') {
            document['_sequence_function'][i]['function']();
          }
        }
        // call function load plugin
        for (var i = 0; i < document['_sequence_function'].length; i++) {
          if (document['_sequence_function'][i]['type'] == 'load_plugin' && typeof document['_sequence_function'][i]['function'] == 'function') {
            document['_sequence_function'][i]['function']();
          }
        }
        // call function after plugin
        for (var i = 0; i < document['_sequence_function'].length; i++) {
          if (document['_sequence_function'][i]['type'] == 'after_plugin' && typeof document['_sequence_function'][i]['function'] == 'function') {
            document['_sequence_function'][i]['function']();
          }
        }
      } else {
        for (var i = 0; i < document['_sequence_function'].length; i++) {
          if (document['_sequence_function'][i]['type'] == event_string && typeof document['_sequence_function'][i]['function'] == 'function') {
            document['_sequence_function'][i]['function']();
          }
        }
      }
      return this;
    },
  
    process: function() { // do not use now (call api sequence)
      var process_item = false;
      if (arguments.length == 0 && document['_process'].length > 0) {
        process_item = document['_process'].shift();
      } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        for (var i = 0; i < document['_process'].length; i++) {
          if (typeof document['_process'][i]['_process_role'] == 'string' && document['_process'][i]['_process_role'] == arguments[0]) {
            process_item = this._process.splice(i, 1);
            break;
          }
        }
      }
      if (document['_process'].length > 0) {
        if (arguments.length == 0) {
          this.process();
        } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
          this.process(arguments[0]);
        }
      }
      return this;
    },
  
    setSelectCategory: function() {
      if (this.length) {
        for (var i = 0; i < this.length; i++) {
          agent.setSelectCategory(agent(this[i]));
          if (agent(this[i]).bindElement('field').value()) {
            agent.setSelectCategoryValue(agent(this[i]));
          }
        }
      }
    },
  });
  
  // page common
  agent.replaceSrcHref = function(target_element) {
    var $sec_target = agent('body');
    if (target_element != undefined && typeof target_element == 'string') {
      $sec_target = agent(target_element);
    } else if (target_element != undefined && typeof target_element == 'object') {
      $sec_target = target_element;
    }
    var $img_tag = $sec_target.find('img');
    for (var i = 0; i < $img_tag.length; i++) {
      var txt_src = agent.trim($img_tag.eq(i).attr('src'));
      if (txt_src && txt_src.match(/[^<>"']*[\\\/]{2,}/) == null) {
        txt_src = txt_src.replace(/^[\\\/]+/, '');
        $img_tag.eq(i).attr('src', agent.config('view_url') + txt_src);
      }
    }
  
    var $a_tag = $sec_target.find('a');
    for (var i = 0; i < $a_tag.length; i++) {
      var txt_href = agent.trim($a_tag.eq(i).attr('href'));
      if (txt_href && txt_href.match(/[^<>"']*[\\\/]{2,}/) == null) {
        txt_href = txt_href.replace(/^[\\\/]+/, '');
        txt_href = txt_href.replace(/\.\w{1,}$/, '');
        $a_tag.eq(i).attr('href', agent.config('page_url') + txt_href);
      }
    }
  };
  
  // math
  agent.random = function(range) {
    return Math.floor(Math.random() * range);
  };
  
  // sum float number and round
  agent.sumFloat = function(number1, number2, digit) {
    if (digit == undefined || isNaN(digit) || digit < 1 || digit > 9) {
      digit = 6;
    }
    digit_string = '1';
    for (var i = 1; i < digit; i++) {
      digit_string = digit_string + '0';
    }
    digit_string = digit_string + 'e';
    var T = Number(digit_string + 1);
    return Math.round((parseFloat(number1) + parseFloat(number2)) * T) / T;
  };
  
  // storage
  agent.saveStorage = function() {
  
  };
  
  // page load
  agent(function() {
    agent().loadPageRequest();
  
    agent.loadConfig(function() {
      // test
      // if (agent.config('member_idx') == '2') {
      //   // document['_config']['member_code'] = '113228';
      //   // document['_config']['member_status'] = '21';
      // }
      agent().callSequenceFunction();
  
      if (agent.config('page_after_block')) {
        //agent.showMessage('접근 권한이 없습니다. 로그인 여부 및 접근 권한을 확인하세요.');
      }
  
      // for (i = 0; i < document['_sequence_image'].length; i++) {
      //   var image_url = agent.config('root_url') + document['_sequence_image'][i].dataAttribute('image_url');
      //   $.ajax({
      //     type: 'GET',
      //     url: image_url,
      //     dataType: 'image/jpg',
      //     async: true,
      //     success: function(data) {
      //       document['_sequence_image'][i].attr("src", 'data:image/png;base64,' + data);
      //     }
      //   });
      // }
  
    });
  });
  
  // view object
  var view = new Object();
  
  // Key code
  var ENTER_KEY_CODE = 13;
  var LEFT_KEY_CODE = 37;
  var UP_KEY_CODE = 38;
  var RIGHT_KEY_CODE = 39;
  var DOWN_KEY_CODE = 40;
  var A_KEY_CODE = 65;
  var B_KEY_CODE = 66;
  var S_KEY_CODE = 83;
  var U_KEY_CODE = 85;
  var a_KEY_CODE = 97;
  var b_KEY_CODE = 98;
  
  // Konami command
  var COMMAND_KEY_UPPER = [UP_KEY_CODE, UP_KEY_CODE, DOWN_KEY_CODE, DOWN_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE, B_KEY_CODE, A_KEY_CODE];
  var COMMAND_KEY_LOWER = [UP_KEY_CODE, UP_KEY_CODE, DOWN_KEY_CODE, DOWN_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE, b_KEY_CODE, a_KEY_CODE];
  var command_key_index = 0;
  var command_handler_time;
  agent(document).on('keyup', 'body', function(event) {
    if (event.which == COMMAND_KEY_UPPER[command_key_index] || event.which == COMMAND_KEY_LOWER[command_key_index]) {
      command_key_index++;
      if (command_key_index >= COMMAND_KEY_UPPER.length) {
        agent.showMessage('POWER UP');
        command_key_index = 0;
      } else {
        clearTimeout(command_handler_time);
        command_handler_time = setTimeout(function() {
          command_key_index = 0;
        }, 1000);
      }
    } else {
      command_key_index = 0;
    }
  });
  
  // check json object
  // var check_json_object = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(json_string.replace(/"(\\.|[^"\\])*"/g, '')));
  
  
  
  // if (typeof Worker !== 'undefined') {
  //   document['_loading_worker'] = new Worker(agent.config('root_url') + 'common/style_script/loading.js');
  //   document['_loading_worker'].onmessage = function(event) {
  //     // document.getElementById("result").innerHTML = event.data;
  //   };
  // }