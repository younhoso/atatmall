agent.fn.extend({
    initWidget: function() {
      if (arguments.length == 1) {
        var widget = String(arguments[0]);
        if (widget == 'home') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['home']);
        } else if (widget == 'back') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['back']);
        } else if (widget == 'link') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['link']);
        } else if (widget == 'cart') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['cart']).trigger('update_cart.agent_widget');
        } else if (widget == 'message') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['message']);
        } else if (widget == 'member_link') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['member_link']);
        } else if (widget.match(/^category_/i) != null) {
          this.setting(_widget.initSetting['category_new']).trigger('widget_rendering.agent_widget');
  
  
  
  
  
  
  
        } else if (widget == 'search_link') {
          this.setting({
            '_event': {
              'click.agent_widget': function(event) {
                var page_request = {};
                page_request['p'] = agent(this).dataAttribute('link');
                page_request['global_search'] = agent(this).dataAttribute('search_value');
                agent.link(page_request);
              }
            }
          });
        } else if (widget == 'member_section') {
          if (agent.config('member_status') > 0) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'fadein_member_section') {
          if (agent.config('member_status') > 0) {
            this.fadeIn(500);
          } else {
            this.hide();
          }
        } else if (widget == 'fadein_member1020_section') {
          if (agent.config('member_status') > 10 && agent.config('member_status') < 20) {
            this.fadeIn(500);
          } else {
            this.hide();
          }
        } else if (widget == 'member20_section') {
          if (agent.config('member_status') > 20) {
            this.show();
          } else {
            this.hide();
          }
          if (this.dataAttribute('link')) {
            this.on('click', function(event) {
              cs(3333);
              agent(this).link();
            });
          }
        } else if (widget == 'member70_section') {
          if (agent.config('member_status') >= 70) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'member58_section') {
          if (agent.config('member_status') >= 58) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'member57_section') {
          if (agent.config('member_status') >= 57) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'member55_section') {
          if (agent.config('member_status') >= 55) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'member53_section') {
          if (agent.config('member_status') >= 53) {
            this.show();
          } else {
            this.hide();
          }
        } else if (widget == 'guest_section') {
          if (agent.config('member_status') > 0) {
            this.hide();
          } else {
            this.show();
          }
        } else if (widget == 'fadein_guest_section') {
          if (agent.config('member_status') > 0) {
            this.hide();
          } else {
            this.fadeIn(500);
          }
        } else if (widget == 'guest20_section') {
          if (agent.config('member_status') > 20) {
            this.hide();
          } else {
            this.show();
          }
          if (this.dataAttribute('link')) {
            this.on('click', function(event) {
              agent(this).link();
            });
          }
        } else if (widget.match(/category$/i) != null) {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['category']);
          this.setting('default_option_string', this.text());
          for (var i = 0; i < this.bindElement('field').length; i++) {
            this.bindElement('field').eq(i).setting('default_option_string', this.bindElement('field').eq(i).text());
          }
          if (agent.config(widget)) {
            var category_array = agent.config(widget);
            var value_string = '<option value="">' + this.setting('default_option_string') + '</option>';
            for (var category_key in category_array) {
              var category_value = category_array[category_key];
              value_string = value_string + '<option value="' + category_key + '">' + category_key + '</option>';
            }
            this.html(value_string);
          }
        } else if (widget.match(/category0$/i) != null) {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['category0']);
          var default_option_string = this.find('option').length > 0 ? trim(this.find('option').text()) : '';
          this.setting('default_option_string', default_option_string);
          this.trigger('change.agent_widget');
        } else if (widget.match(/category1$/i) != null) {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['category1']);
          var default_option_string = this.find('option').length > 0 ? trim(this.find('option').text()) : '';
          this.setting('default_option_string', default_option_string);
          this.trigger('change.agent_widget');
        } else if (widget.match(/category2$/i) != null) {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['category2']);
          var default_option_string = this.find('option').length > 0 ? trim(this.find('option').text()) : '';
          this.setting('default_option_string', default_option_string);
          this.trigger('change.agent_widget');
        } else if (widget.match(/datepicker$/i) != null) {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['datepicker']).trigger('init.agent_widget');
        } else if (widget == 'signin' || widget == 'login') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['signin']);
          var signin_string = '';
          var signout_string = '';
          if (this.string('signin')) {
            signin_string = this.string('signin');
          } else if (this.string('login')) {
            signin_string = this.string('login');
          }
          if (this.string('signout')) {
            signout_string = this.string('signout');
          } else if (this.string('logout')) {
            signout_string = this.string('logout');
          }
          if (agent.config('member_status') > 0 && signin_string) {
            this.setDisplayValue(signin_string);
          } else if (signout_string) {
            this.setDisplayValue(signout_string);
          }
        } else if (widget == 'your_account' || widget == 'mypage') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['your_account']);
          var signin_string = '';
          var signout_string = '';
          if (this.string('signin')) {
            signin_string = this.string('signin');
          } else if (this.string('login')) {
            signin_string = this.string('login');
          }
          if (this.string('signout')) {
            signout_string = this.string('signout');
          } else if (this.string('logout')) {
            signout_string = this.string('logout');
          }
          if (agent.config('member_status') > 0 && signin_string) {
            this.setDisplayValue(signin_string);
          } else if (signout_string) {
            this.setDisplayValue(signout_string);
          }
        } else if (widget == 'secession') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['secession']);
        }
      } else if (arguments.length == 2) {
        var widget = arguments[0];
        var type = arguments[1];
        if (widget == 'config') {
          this.setting(_widget.initSetting['common']);
          var keyword_string = this.setting('type');
          if (agent.config(keyword_string)) {
            if (keyword_string == 'id') {
              keyword_string = 'member_id';
            }
            var display_string = agent.config(keyword_string);
            if (keyword_string == 'phone' || keyword_string == 'mobile') {
              this.setHiddenValue(display_string);
              display_string = String(display_string).toPhoneString();
            }
            this.setDisplayValue(display_string);
          }
        } else if (widget == 'field' && type == 'email') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['field_email']);
        } else if (widget == 'field' && type == 'phone') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['field_phone']);
        } else if (widget == 'field' && type == 'category') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['field_category']);
          if (agent.config('category_index')) {
            var category_index = agent.config('category_index');
            if (this.dataAttribute('depth') && agent.getPageRequest('category')) {
              var category = 0;
  
              category = String(agent.getPageRequest('category')).substr(0, Number(this.dataAttribute('depth')) + 1);
              this.setDisplayValue(agent.checkProperty(category_index, category, 'name'));
            } else if (this.dataAttribute('category')) {
              this.setDisplayValue(agent.checkProperty(category_index, this.dataAttribute('category'), 'name'));
            }
          }
        } else if (widget == 'field' && type == 'shop1_category') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['field_category']);
          if (agent.config('shop1_category_index')) {
            var category_index = agent.config('shop1_category_index');
            if (this.dataAttribute('depth') && agent.getPageRequest('shop1_category')) {
              var category = 0;
  
              category = String(agent.getPageRequest('shop1_category')).substr(0, Number(this.dataAttribute('depth')) + 1);
              this.setDisplayValue(agent.checkProperty(category_index, category, 'name'));
            } else if (this.dataAttribute('category')) {
              this.setDisplayValue(agent.checkProperty(category_index, this.dataAttribute('category'), 'name'));
            }
          }
        } else if (widget == 'dialog' && type == 'juso') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['dialog_juso']);
        } else if (widget == 'dialog' && type == 'select_administrative_areas') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['dialog_administrative_areas']);
        } else if (widget == 'dialog' && type == 'find_your_id') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['dialog_find_your_id']);
        } else if (widget == 'dialog' && type == 'find_your_password') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['dialog_find_your_password']);
        } else if (widget == 'dialog') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['dialog']);
        } else if (widget == 'verify' && type == 'password') {
          this.setting(_widget.initSetting['common']).setting(_widget.initSetting['verify_password']);
        } else if (widget == 'count' && type == 'goods') {
          this.api({
            '_action': 'count',
            '_type': 'goods',
            '_callback': function(data) {
              var callback_element = data['callback_element'];
              callback_element.setDisplayValue(data['count']);
            }
          });
        } else if (widget == 'category') {}
      }
    },
  });
  
  agent().beforePlugin(function() {
    // load category
    var api_param = {};
    api_param['_action'] = 'file_storage';
    api_param['_type'] = 'load';
    api_param['_mode'] = 'category';
    api_param['_callback'] = function(data) {
      var callback_element = data['callback_element'];
      _widget.category_array = {};
      if (data['json_data']) {
        _widget.category_array = data['json_data'];
        try {
          _widget.category_array = JSON.parse(_widget.category_array);
        } catch (e) {}
      }
    };
    //agent().api(api_param);
  });
  
  agent().initPlugin(function() {
    agent('[data-r-widget]').setting({
      '_setting_type': 'default',
      'type': null,
    });
    for (var i = 0; i < agent('[data-r-widget]').length; i++) {
      if (agent('[data-r-widget]').eq(i).setting('type')) {
        agent('[data-r-widget]').eq(i).initWidget(agent('[data-r-widget]').eq(i).dataAttribute('widget'), agent('[data-r-widget]').eq(i).setting('type'));
      } else {
        agent('[data-r-widget]').eq(i).initWidget(agent('[data-r-widget]').eq(i).dataAttribute('widget'));
      }
    }
  });
  
  _widget.initSetting = {
    'category_new': {
      '_event': {
        'widget_rendering.agent_widget': function(event) {
          if (agent.config('indexed_category')) {
            var indexed_category = agent.config('indexed_category');
            var widget = String(agent(this).dataAttribute('widget'));
            if (widget.match(/[\-\_](keep)/i) != null) {
              if (!agent(this).dataAttribute('field_display_type')) {
                agent(this).dataAttribute('field_display_type', 'keep');
              }
              widget = widget.replace(/[\-\_](keep)/i, '');
            } else if (widget.match(/[\-\_](section)/i) != null) {
              if (!agent(this).dataAttribute('field_display_type')) {
                agent(this).dataAttribute('field_display_type', 'section');
              }
              widget = widget.replace(/[\-\_](section)/i, '');
            }
            category_index = widget.replace(/^category[\-\_]{0,}/i, '');
            if (category_index.match(/^d/) != null) {
              var category_depth = category_index.replace(/^(d|depth)[\-\_]{0,}/i, '');
            } else {
              agent(this).dataAttribute('category_index', category_index);
              agent(this).dataAttribute('category', category_index.replace(/[\-\_]/g, ''));
              if (agent(this).dataAttribute('field_display_type') == 'keep') {} else if (agent(this).dataAttribute('field_display_type') == 'section') {
                if (indexed_category[category_index] && indexed_category[category_index]['name']) {
                  agent(this).show();
                } else {
                  agent(this).hide();
                }
              } else {
                if (indexed_category[category_index] && indexed_category[category_index]['name']) {
                  agent(this).setDisplayValue(indexed_category[category_index]['name']);
                } else {
                  agent(this).hide();
                }
              }
            }
          }
          if (agent(this).dataAttribute('link')) {
            agent(this).addClass('agent_cursor_pointer');
          }
        },
        'click.agent_widget': function(event) {
          if (agent(this).dataAttribute('link')) {
            agent(this).link();
          }
        },
      },
    },
    'common': {
      '_setting_type': 'default',
    },
    'message': {
      '_event': {
        'click.agent_widget': function(event) {
          if (agent(this).dataAttribute('message_string')) {
            agent.showMessage(agent(this).dataAttribute('message_string'));
          }
        },
      },
    },
    'cart': {
      '_setting_type': 'default',
      '_event': {
        'update_cart.agent_widget': function(event) {
          var cart_list_item = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
          cart_list_item = typeof cart_list_item == 'object' && cart_list_item instanceof Array ? cart_list_item : [];
          agent(this).setDisplayValue(cart_list_item.length);
        },
      },
    },
    'count': {
      '_setting_type': 'default',
      '_request': {
        '_action': 'count',
        '_callback': function(data) {
          var callback_element = data['callback_element'];
          if (data['code'] == '000') {} else {}
        },
      },
    },
    'datepicker': {
      '_setting_type': 'default',
      'datetime_format': 'YYYY-MM-DD',
      '_event': {
        'init.agent_widget': function(event) {
          if (agent(this).setting('init_datepicker')) {
            return;
          }
          var date_picker_option = {
            'formatter': function(el, date) {
              var date_value = moment(date);
              el.value = date_value.format(agent(el).setting('datetime_format'));
            },
            'customMonths': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'customDays': ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
          };
          if (agent.config('locale') == 'ko') {
            date_picker_option['customMonths'] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            date_picker_option['customDays'] = ['일', '월', '화', '수', '목', '금', '토'];
            date_picker_option['overlayPlaceholder'] = '년도를 입력해주세요';
            date_picker_option['overlayButton'] = '이동';
          }
          var picker = datepicker(this, date_picker_option);
          agent(this).setting('init_datepicker', true);
        },
      },
      'bind_show': {
        '_event': {
          'click.agent_widget': function(event) {
            var picker = datepicker(this);
          },
        }
      },
      'bind_select': {
        '_event': {
          'change.agent_widget': function(event) {
            var target_agent = agent(this);
            var start_agent = start_agent.bindElement('start');
            var end_agent = start_agent.bindElement('end');
            var today = moment();
            var diff_date = moment();
  
            if (target_agent.value() == 'custom') {
  
            } else if (target_agent.value() == 'clear') {
              start_agent.clearValue();
              end_agent.clearValue();
            } else if (target_agent.value() == 'today') {
              start_agent.datepicker('setDate', today.toDate());
              end_agent.datepicker('setDate', today.toDate());
              end_agent.setting('value', today.add(1, 'days').format('YYYY-MM-DD'));
            } else if (target_agent.value() == 'recent_month') {
              start_agent.datepicker('setDate', diff_date.add(-1, 'months').toDate());
              end_agent.datepicker('setDate', today.toDate());
              end_agent.setting('value', today.add(1, 'days').format('YYYY-MM-DD'));
            } else if (target_agent.value() == 'month') {
              start_agent.datepicker('setDate', diff_date.set('date', 1).toDate());
              end_agent.datepicker('setDate', diff_date.endOf('month').toDate());
              end_agent.setting('value', diff_date.add(1, 'days').format('YYYY-MM-DD'));
            } else if (target_agent.value() == 'last_month') {
              start_agent.datepicker('setDate', diff_date.add(-1, 'months').set('date', 1).toDate());
              end_agent.datepicker('setDate', diff_date.endOf('month').toDate());
              end_agent.setting('value', diff_date.add(1, 'days').format('YYYY-MM-DD'));
            }
  
            start_agent.trigger('change');
            end_agent.trigger('change');
  
            target_agent.dataAttribute('change', true);
          },
        }
      },
      'bind_end': null,
    },
    'category': {
      '_setting_type': 'default',
      'bind_field': null,
      '_event': {
        'change.agent_widget': function(event) {
          var bind_field_element = agent(this).bindElement('field');
          var selected_value = agent(this).getDisplayValue();
          if (agent(this).setting('selected_value')) {
            selected_value = agent(this).setting('selected_value');
            agent(this).setting('selected_value', '');
            agent(this).setDisplayValue(selected_value);
          }
          if (!selected_value) {
            if (bind_field_element.length > 0) {
              var value_string = '<option value="">' + bind_field_element.eq(0).setting('default_option_string') + '</option>';
              bind_field_element.eq(0).html(value_string).trigger('change.agent_search');
            }
            return;
          }
          var category_array = agent.config(agent(this).dataAttribute('widget'));
          var tag_value = category_array[selected_value]['tag'];
          //agent(this).setHiddenValue(tag_value);
          if (category_array[selected_value]['sub'] && bind_field_element.length > 0) {
            var sub_array = category_array[selected_value]['sub'];
            var bind_field_sub_element = bind_field_element.eq(0);
            var sub_selected_value = bind_field_sub_element.setting('selected_value');
            bind_field_sub_element.setting('selected_value', '');
  
            var value_string = '<option value="">' + bind_field_sub_element.setting('default_option_string') + '</option>';
            for (var category_json_key in sub_array) {
              var category_json_value = sub_array[category_json_key];
              if (sub_selected_value && sub_selected_value == category_json_key) {
                value_string = value_string + '<option selected="selected" value="' + category_json_key + '">' + category_json_key + '</option>';
              } else {
                value_string = value_string + '<option value="' + category_json_key + '">' + category_json_key + '</option>';
              }
            }
            bind_field_sub_element.html(value_string).trigger('change.agent_search');
            if (sub_selected_value && category_array['sub'][sub_selected_value]['sub'] && bind_field_element.length > 1) {
              var sub_array = category_array['sub'][sub_selected_value]['sub'];
              var bind_field_sub_element = bind_field_element.eq(1);
              var sub_selected_value = bind_field_sub_element.setting('selected_value');
              bind_field_sub_element.setting('selected_value', '');
  
              var value_string = '<option value="">' + bind_field_sub_element.setting('default_option_string') + '</option>';
              for (var category_json_key in sub_array) {
                var category_json_value = sub_array[category_json_key];
                if (sub_selected_value && sub_selected_value == category_json_key) {
                  value_string = value_string + '<option selected="selected" value="' + category_json_key + '">' + category_json_key + '</option>';
                } else {
                  value_string = value_string + '<option value="' + category_json_key + '">' + category_json_key + '</option>';
                }
              }
              bind_field_sub_element.html(value_string).trigger('change.agent_search');
            }
          }
        },
      },
    },
    'category0': {
      '_setting_type': 'default',
      '_event': {
        'change.agent_widget': function(event) {
          var selected_value = agent(this).getDisplayValue();
          if (agent(this).setting('selected_value')) {
            selected_value = agent(this).setting('selected_value');
            agent(this).setting('selected_value', '');
            agent(this).setDisplayValue(selected_value);
          }
          var default_option_string = agent(this).string('default_option') ? agent(this).string('default_option') : '';
          if (agent.config('category')) {
            var category_array = agent.config('category');
            var value_string = '<option value="">' + default_option_string + '</option>';
            for (var category_key in category_array) {
              var category_value = category_array[category_key];
              if (selected_value && selected_value == category_key) {
                value_string = value_string + '<option selected="selected" value="' + category_key + '">' + category_key + '</option>';
              } else {
                value_string = value_string + '<option value="' + category_key + '">' + category_key + '</option>';
              }
            }
            agent(this).html(value_string).trigger('change.agent_search');
            agent('[data-r-field="category1"]').trigger('change.agent_widget');
            agent('[data-r-field="category2"]').trigger('change.agent_widget');
          }
        },
      },
    },
    'category1': {
      '_setting_type': 'default',
      '_event': {
        'change.agent_widget': function(event) {
          var selected_value = agent(this).getDisplayValue();
          if (agent(this).setting('selected_value')) {
            selected_value = agent(this).setting('selected_value');
            agent(this).setting('selected_value', '');
            agent(this).setDisplayValue(selected_value);
          }
          var default_option_string = agent(this).string('default_option') ? agent(this).string('default_option') : '';
          var value_string = '<option value="">' + default_option_string + '</option>';
          var category0 = agent('[data-r-field="category0"]');
          if (agent.config('category') && category0.length > 0 && agent.checkProperty(agent.config('category'), category0.getDisplayValue(), 'sub')) {
            var category_array = agent.checkProperty(agent.config('category'), category0.getDisplayValue(), 'sub');
            for (var category_key in category_array) {
              var category_value = category_array[category_key];
              if (selected_value && selected_value == category_key) {
                value_string = value_string + '<option selected="selected" value="' + category_key + '">' + category_key + '</option>';
              } else {
                value_string = value_string + '<option value="' + category_key + '">' + category_key + '</option>';
              }
            }
            agent('[data-r-field="category2"]').trigger('change.agent_widget');
          }
          agent(this).html(value_string).trigger('change.agent_search');
        },
      },
    },
    'category2': {
      '_setting_type': 'default',
      '_event': {
        'change.agent_widget': function(event) {
          var selected_value = agent(this).getDisplayValue();
          if (agent(this).setting('selected_value')) {
            selected_value = agent(this).setting('selected_value');
            agent(this).setting('selected_value', '');
            agent(this).setDisplayValue(selected_value);
          }
          var default_option_string = agent(this).string('default_option') ? agent(this).string('default_option') : '';
          var value_string = '<option value="">' + default_option_string + '</option>';
          var category0 = agent('[data-r-field="category0"]');
          var category1 = agent('[data-r-field="category1"]');
          if (agent.config('category') && category0.length > 0 && category1.length > 0 && agent.checkProperty(agent.config('category'), category0.getDisplayValue(), 'sub', category1.getDisplayValue(), 'sub')) {
            var category_array = agent.checkProperty(agent.config('category'), category0.getDisplayValue(), 'sub', category1.getDisplayValue(), 'sub');
            for (var category_key in category_array) {
              var category_value = category_array[category_key];
              if (selected_value && selected_value == category_key) {
                value_string = value_string + '<option selected="selected" value="' + category_key + '">' + category_key + '</option>';
              } else {
                value_string = value_string + '<option value="' + category_key + '">' + category_key + '</option>';
              }
            }
          }
          agent(this).html(value_string).trigger('change.agent_search');
        },
      },
    },
    'field_id': {
      '_setting_type': 'default',
      'regexp': null,
      'string_regexp_error_ko': null,
      'string_empty_ko': '아이디를 입력해주세요.',
      'string_do_not_check_ko': '사용 가능한 아이디인지 확인해주세요.',
      'string_available_ko': '사용 가능한 아이디입니다.',
      'string_unavailable_ko': '사용할 수 없는 아이디입니다. 다른 아이디를 입력하세요.',
      'bind_message': null,
      'bind_verify': {
        '_event': {
          'click.agent_widget': function(event) {
            agent(this).parentElement().trigger('verify.agent_widget');
          },
        },
      },
      '_event': {
        'field_rendering_callback.agent_field': function(event) {
          if (!agent(this).setting('regexp') && agent.config('default_id_regexp')) {
            agent(this).setting('regexp', agent.config('default_id_regexp'));
          }
          if (!agent(this).string('regexp_error_ko') && agent.config('default_string_id_regexp_error_ko')) {
            agent(this).string('regexp_error_ko', agent.config('default_string_id_regexp_error_ko'));
          }
        },
        'verify.agent_widget': function(event) {
          if (agent(this).checkValue()) {
            var api_param = {};
            api_param['_action'] = 'verify_account_information';
            api_param['_type'] = 'id';
            api_param['member_id'] = agent(this).getDisplayValue();
            api_param['_callback'] = function(data) {
              var callback_element = data['callback_element'];
              if (agent.checkProperty(data, 'code') == '000') {
                if (callback_element.string('available') && callback_element.bindElement('message').length > 0) {
                  callback_element.bindElement('message').setDisplayValue(callback_element.string('available'));
                } else if (callback_element.string('available') && callback_element.bindElement('message').length > 0) {
                  agent.showMessage(callback_element.string('available'));
                }
                callback_element.setting('available_value', callback_element.getDisplayValue());
              } else {
                if (callback_element.string('unavailable') && callback_element.bindElement('message').length > 0) {
                  callback_element.bindElement('message').setDisplayValue(callback_element.string('unavailable'));
                } else if (callback_element.string('unavailable') && callback_element.bindElement('message').length > 0) {
                  agent.showMessage(callback_element.string('unavailable'));
                }
                callback_element.setting('available_value', '');
              }
            };
            agent(this).api(api_param);
          }
        },
        'change.agent_widget': function(event) {
          if (agent(this).bindElement('verify').length == 0) {
            agent(this).trigger('verify.agent_widget');
          }
        },
      },
    },
    'field_email': {
      '_setting_type': 'default',
      'regexp': null,
      'string_regexp_error_ko': '4글자 이상의 영숫자를 입력해주세요.',
      'string_empty_ko': '이메일을 입력해주세요.',
      'string_do_not_check_ko': '사용 가능한 이메일인지 확인해주세요.',
      'string_available_ko': '사용 가능한 이메일입니다.',
      'string_unavailable_ko': '사용할 수 없는 이메일입니다. 다른 이메일을 입력하세요.',
      'field_display_type': 'email',
      'bind_message': null,
      'bind_field': {
        '_event': {
          'focusout.agent_widget': function(event) {
            agent(this).parentElement().trigger('focusout.agent_widget');
            if (agent(this).next('select').length > 0) {
              agent(this).next('select').setDisplayValue('');
              agent(this).next('select').setDisplayValue(agent(this).getDisplayValue());
            }
          },
          'change.agent_widget': function(event) {
            if (agent(this).is('select')) {
              var parent_element = agent(this).parentElement();
              if (parent_element.bindElement('field').length > 0 && parent_element.bindElement('field').eq(0).is('input')) {
                parent_element.bindElement('field').eq(0).setDisplayValue(agent(this).getDisplayValue());
              }
            }
            agent(this).parentElement().trigger('focusout.agent_widget');
          },
        },
      },
      'bind_verify': {
        '_event': {
          'click.agent_widget': function(event) {
            agent(this).parentElement().trigger('verify.agent_widget');
          },
        },
      },
      '_event': {
        'verify.agent_widget': function(event) {
          if (agent(this).checkValue()) {
            var api_param = {};
            api_param['_action'] = 'verify_account_information';
            api_param['_type'] = 'email';
            api_param['email'] = agent(this).getDisplayValue();
            api_param['_callback'] = function(data) {
              var callback_element = data['callback_element'];
              if (agent.checkProperty(data, 'code') == '000') {
                if (callback_element.string('available') && callback_element.bindElement('message').length > 0) {
                  callback_element.bindElement('message').setDisplayValue(callback_element.string('available'));
                } else if (callback_element.string('available') && callback_element.bindElement('message').length > 0) {
                  agent.showMessage(callback_element.string('available'));
                }
                callback_element.setting('available_value', callback_element.getDisplayValue());
              } else {
                if (callback_element.string('unavailable') && callback_element.bindElement('message').length > 0) {
                  callback_element.bindElement('message').setDisplayValue(callback_element.string('unavailable'));
                } else if (callback_element.string('unavailable') && callback_element.bindElement('message').length > 0) {
                  agent.showMessage(callback_element.string('unavailable'));
                }
                callback_element.setting('available_value', '');
              }
            };
            agent(this).api(api_param);
          }
        },
        'field_rendering_callback.agent_field': function(event) {
          var email_string = String(agent(this).getHiddenValue());
          var split_email_string = email_string.split(/@/);
          if (agent(this).bindElement('field').length > 0 && split_email_string.length > 1) {
            agent(this).setDisplayValue(split_email_string[0]);
            for (var i = 0; i < agent(this).bindElement('field').length; i++) {
              agent(this).bindElement('field').eq(i).setDisplayValue(split_email_string[1]);
            }
          }
        },
        'focusout.agent_widget': function(event) {
          var email_string = agent(this).getDisplayValue();
          if (email_string && agent(this).bindElement('field').length > 0) {
            email_string = email_string + '@';
            for (var i = 0; i < agent(this).bindElement('field').length; i++) {
              if (agent(this).bindElement('field').eq(i).is('input')) {
                if (agent(this).bindElement('field').eq(i).getDisplayValue()) {
                  email_string = email_string + agent(this).bindElement('field').eq(i).getDisplayValue();
                } else {
                  email_string = '';
                }
              }
            }
          }
          agent(this).setHiddenValue(email_string);
          if (email_string && agent(this).bindElement('verify').length == 0) {
            agent(this).trigger('verify.agent_widget');
          }
        },
      },
    },
    'field_phone': {
      '_setting_type': 'default',
      'field_display_type': 'phone',
      'bind_field': {
        '_event': {
          'focusout.agent_widget': function(event) {
            agent(this).parentElement().trigger('change.agent_widget');
          },
        },
      },
      '_event': {
        'change.agent_widget': function(event) {
          var number_string = agent(this).getDisplayValue();
          if (number_string && agent(this).bindElement('field').length > 0) {
            for (var i = 0; i < agent(this).bindElement('field').length; i++) {
              if (!agent(this).bindElement('field').eq(i).getDisplayValue()) {
                number_string = '';
                break;
              }
              number_string = number_string + agent(this).bindElement('field').eq(i).getDisplayValue();
            }
          }
          agent(this).setHiddenValue(number_string);
        },
      },
      'string_empty_ko': '전화번호를 입력해주세요.',
    },
    'field_telephone': {
      '_setting_type': 'default',
      'field_display_type': 'phone',
      'bind_field': {
        '_event': {
          'focusout.agent_widget': function(event) {
            agent(this).parentElement().trigger('change.agent_widget');
          },
        },
      },
      '_event': {
        'change.agent_widget': function(event) {
          var number_string = agent(this).getDisplayValue();
          if (number_string && agent(this).bindElement('field').length > 0) {
            for (var i = 0; i < agent(this).bindElement('field').length; i++) {
              if (!agent(this).bindElement('field').eq(i).getDisplayValue()) {
                number_string = '';
                break;
              }
              number_string = number_string + agent(this).bindElement('field').eq(i).getDisplayValue();
            }
          }
          agent(this).setHiddenValue(number_string);
        },
        'field_rendering_callback.agent_field': function(event) {
          var number_string = String(agent(this).getHiddenValue()).toPhoneString();
          var split_number_string = number_string.split(/\-/);
          if (agent(this).bindElement('field').length > 0 && split_number_string.length > 0) {
            agent(this).setDisplayValue(split_number_string[0]);
            for (var i = 1; i < split_number_string.length; i++) {
              if (agent(this).bindElement('field').length > i - 1) {
                agent(this).bindElement('field').eq(i - 1).setDisplayValue(split_number_string[i]);
              }
            }
          }
        },
      },
      'string_empty_ko': '휴대전화번호를 입력해주세요.',
    },
    'dialog': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          if (agent(this).dataAttribute('type')) {
            var dialog_type = agent(this).dataAttribute('type');
            agent(this).setting({
              'dialog': dialog_type,
            }).showDialog();
          }
        },
      },
    },
    'dialog_administrative_areas': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).setting({
            'dialog': 'administrative_areas',
          }).showDialog();
        },
        'positive_callback.agent_dialog': function(event, dialog) {
          var area1_checkbox = agent(dialog).find('.area1_checkbox:checked');
          var selected_areas = '';
          for (var i = 0; i < area1_checkbox.length; i++) {
            var selected_string = area1_checkbox.eq(i).parents('.area_section').find('.area0').text() + ' ' + area1_checkbox.eq(i).next('span').text();
            selected_areas = selected_areas ? selected_areas + ',' + selected_string : selected_string;
          }
          agent('[data-r-field="service_area"]').setDisplayValue(selected_areas);
          agent('[data-r-field="member_category3_area"]').setDisplayValue(selected_areas);
        },
      },
    },
    'dialog_juso': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).setting({
            'dialog': 'juso',
          }).showDialog();
        },
        'positive_callback.agent_dialog': function(event, dialog) {
          var field = agent(dialog).bindElement('field');
          if (agent(this).parent().find('[data-r-field="address_zip_code"]').length > 0 || agent(this).parent().find('[data-r-field="billing_address_zip_code"]').length > 0 || agent(this).parent().find('[data-r-field="billing_address_zip_code"]').length > 0 || agent(this).parent().find('[data-r-field="shipping_address_zip_code"]').length > 0) {
            agent(this).parent().find('[data-r-field="zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent(this).parent().find('[data-r-field="billing_address_zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent(this).parent().find('[data-r-field="shipping_address_zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent(this).parent().find('[data-r-field="road_address"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
            agent(this).parent().find('[data-r-field="billing_address_road"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
            agent(this).parent().find('[data-r-field="shipping_address_road"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
          } else {
            agent('[data-r-field="zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent('[data-r-field="billing_address_zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent('[data-r-field="shipping_address_zip_code"]').setDisplayValue(agent(dialog).find('.search_result_zipcode').getDisplayValue());
            agent('[data-r-field="road_address"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
            agent('[data-r-field="billing_address_road"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
            agent('[data-r-field="shipping_address_road"]').setDisplayValue(agent(dialog).find('.search_result_address').getDisplayValue());
          }
        },
      },
    },
    'dialog_find_your_id': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).setting({
            'dialog': 'find_your_id',
          }).showDialog();
        },
      },
    },
    'dialog_find_your_password': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).setting({
            'dialog': 'find_your_password',
          }).showDialog();
        },
      },
    },
    'home': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).link({
            'p': agent.config('home_page')
          });
        },
      },
    },
    'back': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          history.go(-1);
        },
      },
    },
    'link': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).link();
        },
      },
    },
    'member_link': { // TODO not use it
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          if (agent.config('member_status') > 0) {
            if (agent(this).dataAttribute('link').match(/\/\//) != null) {
              window.open(agent(this).dataAttribute('link'), '_blank');
              return true;
            }
            agent(this).link();
          } else if (agent('[data-r-role="dialog"][data-r-type="signin"]').length > 0) {
            agent(this).setting({
              'dialog': 'signin',
            }).showDialog();
          } else {
            if (agent(this).string('block')) {
              agent.showMessage(agent(this).string('block'));
            }
          }
        },
      },
      'string_block_ko': '회원만 사용할 수 있습니다.',
    },
    'signin': {
      '_setting_type': 'default',
      'string_signin': null,
      'string_signout': null,
      'string_login': null,
      'string_login_ko': 'LOGOUT',
      'string_logout': null,
      'string_logout_ko': 'LOGIN',
      '_event': {
        'click.agent_widget': function(event) {
          if (agent.config('member_status') > 0) {
            var api_param = {};
            api_param['_action'] = 'signout';
            api_param['_type'] = 'plugin';
            api_param['_callback'] = function(data) {
              // var auth2 = gapi.auth2.getAuthInstance();
              // auth2.signOut().then(function () {
              //   console.log('User signed out.');
              // });
              agent.reload();
            };
            agent.local('agent_cart', JSON.stringify([]));
            agent(this).api(api_param);
          } else {
            if (agent.config('signin_page')) {
              agent(this).link(agent.config('signin_page'));
            } else if (agent.config('login_page')) {
              window.open('/?p=login', 'name4', 'resizable=no width=395 height=530');
              return false
              //agent(this).link(agent.config('login_page'));
            } else {
              agent(this).link(agent.config('home_page'));
            }
          }
        },
      },
    },
    'your_account': {
      '_setting_type': 'default',
      'string_signin': null,
      'string_signout': null,
      'string_login': null,
      'string_login_ko': '마이페이지',
      'string_logout': null,
      'string_logout_ko': '회원가입',
      '_event': {
        'click.agent_widget': function(event) {
          if (agent.config('social_signin') && agent(this).dataAttribute('link_social_signon')) {
            agent(this).link(agent(this).dataAttribute('link_social_signon'));
          } else if (agent(this).dataAttribute('link_member20') && agent.config('member_status') > 20) {
            agent(this).link({
              'p': agent(this).dataAttribute('link_member20')
            });
          } else if (agent(this).dataAttribute('link') && agent.config('member_status') > 0) {
            agent(this).link({
              'p': agent(this).dataAttribute('link')
            });
          } else if (agent.config('member_status') > 0) {
            agent(this).link({
              'p': agent.config('your_account_page')
            });
          } else {
            agent(this).link({
              'p': agent.config('join_page')
            });
          }
        },
      },
    },
    'verify_password': {
      '_setting_type': 'default',
      'string_empty_ko': '패스워드를 입력해주세요.',
      'string_fail_ko': '패스워드가 다릅니다. 다시 확인해주세요.',
      'bind_submit': {
        '_event': {
          'click.agent_widget': function(event) {
            agent(this).parentElement().trigger('submit.agent_widget');
          },
        },
      },
      '_event': {
        'keyup.agent_widget': function(event) {
          var ENTER_KEY_CODE = 13;
          if (event.which == ENTER_KEY_CODE) {
            agent(this).trigger('submit.agent_widget');
          }
        },
        'submit.agent_widget': function(event) {
          if (agent(this).checkValue()) {
            var api_param = {};
            api_param['_action'] = 'verify_account_information';
            api_param['_type'] = 'password';
            api_param['member_password'] = agent(this).getDisplayValue();
            api_param['_callback'] = function(data) {
              var callback_element = data['callback_element'];
              if (data['code'] == '000') {
                callback_element.link();
              } else if (callback_element.string('fail')) {
                agent.showMessage(callback_element.string('fail'));
              }
            };
            agent(this).api(api_param);
          }
        },
      },
    },
    'secession': {
      '_setting_type': 'default',
      '_event': {
        'click.agent_widget': function(event) {
          agent(this).setting({
            'dialog': 'confirm',
            'string_dialog_message': '탈퇴하시겠습니까?',
          }).showDialog();
        },
        'positive_callback.agent_dialog': function(event, dialog) {
          agent(this).api({
            '_action': 'secession',
            '_callback': function(data) {
              var callback_element = data['callback_element'];
              callbackElement.link(agent.config('home_page'));
            },
          });
        },
      },
    },
  };