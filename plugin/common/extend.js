agent.fn.extend({
    prepareFieldsSettings: function() {
      var role = this.dataAttribute('role') ? this.dataAttribute('role') : '';
      var type = this.dataAttribute('type') ? this.dataAttribute('type') : '';
  
      var prefix_selector = '';
      // Do not use
      // if (role) {
      //   prefix_selector = prefix_selector + '[data-r-role="' + role + '"]';
      // }
      // if (type) {
      //   prefix_selector = prefix_selector + '[data-r-type="' + type + '"]';
      // }
      // prefix_selector = prefix_selector ? prefix_selector + ' ' : '';
  
      if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (var member_field_key in arguments[0]) {
          if (member_field_key && typeof arguments[0][member_field_key] == 'object') {
            // var selector = String(member_field_key).match(/^[A-Za-z]/) != null ? prefix_selector + '[data-r-field="' + member_field_key + '"]' : prefix_selector + member_field_key;
            var selector = member_field_key;
            document['_settings'][selector] = document['_settings'][selector] ? document['_settings'][selector] : {};
            document['_settings'][selector].mergeObject(arguments[0][member_field_key]);
          }
        }
      }
      return this;
    },
  
    /*
  
  
    */
    initMemberFieldsSettings: function() {
      var item_field = this.dataAttribute('field') ? String(this.dataAttribute('field')) : '';
      var item_type = this.setting('item_type') ? String(this.setting('item_type')) : '';
      var member_fields = this.bindElements('member_fields');
      for (var i = 0; i < member_fields.length; i++) {
        var field = String(member_fields.eq(i).dataAttribute('field'));
        member_fields.eq(i).setting('item_body', this);
        var member_field_setting = document['_settings'][field] ? document['_settings'][field].cloneObject() : {};
  
        // TODO
        if ((item_field.match(/items$/i) != null || item_field.match(/item$/i) != null) && (!member_field_setting['_event'] || !member_field_setting['_event']['click.agent_field'])) {
          member_field_setting['_event'] = member_field_setting['_event'] ? member_field_setting['_event'] : {};
          if (document['_settings']['show_detail']) {
            member_field_setting['_event']['click.agent_field'] = document['_settings']['show_detail']['_event']['click.agent_field'];
          }
        }
        if (item_type == 'posts') {
          delete member_field_setting['field_replace_' + agent.config('locale')];
        } else if (item_type == 'detail') {
          delete member_field_setting['string_empty_' + agent.config('locale')];
        } else if (item_type == 'list') {
          delete member_field_setting['string_empty_' + agent.config('locale')];
        }
        // default postfix setting
        if (field.match(/_section$/i) != null) {
          if (!member_field_setting['field_key']) {
            member_field_setting['field_key'] = field.replace(/_section$/i, '');
          }
          if (!member_field_setting['field_display'] && field.match(/^member/i) != null) {
            var member_status = field.match(/^member([0-9]{1,})_/i)[1];
            if (member_status.length == 4) {
              var start_member_status = member_status.substr(0, 2);
              var end_member_status = member_status.substr(2, 2);
              member_field_setting['field_display'] = '{config.member_status}>' + start_member_status + '&&' + '{config.member_status}<' + end_member_status;
            } else if (member_status) {
              member_field_setting['field_display'] = '{config.member_status}>' + member_status;
            } else {
              member_field_setting['field_display'] = '{config.member_status}';
            }
          } else if (!member_field_setting['field_display']) {
            member_field_setting['field_display'] = '{' + field.replace(/_section$/i, '') + '}';
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'keep';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_class$/i) != null) {
          if (!member_field_setting['field_key']) {
            member_field_setting['field_key'] = field.replace(/_class$/i, '');
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'class';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_mask$/i) != null) {
          if (!member_field_setting['field_key']) {
            member_field_setting['field_key'] = field.replace(/_mask$/i, '');
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'mask';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_ellipsis$/i) != null) {
          if (!member_field_setting['field_key']) {
            member_field_setting['field_key'] = field.replace(/_ellipsis$/i, '');
          }
          if (!member_field_setting['string_length']) {
            member_field_setting['string_length'] = 20;
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_(price|total)$/i) != null) {
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'cash';
          }
        } else if (field.match(/(_phone|telephone|mobile)$/i) != null) {
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'phone';
          }
          if (!member_field_setting['_event'] && document['_settings']['phone'] && document['_settings']['phone']['_event']) {
            for (var event_key in document['_settings']['phone']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['phone']['_event'][event_key];
            }
          }
        } else if (field.match(/_(phone|telephone|mobile)_part1$/i) != null) {
          if (!member_field_setting['_event'] && document['_settings']['phone_part1'] && document['_settings']['phone_part1']['_event']) {
            for (var event_key in document['_settings']['phone_part1']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['phone_part1']['_event'][event_key];
            }
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'keep';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_(phone|telephone|mobile)_part2$/i) != null) {
          if (!member_field_setting['_event'] && document['_settings']['phone_part2'] && document['_settings']['phone_part2']['_event']) {
            for (var event_key in document['_settings']['phone_part2']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['phone_part2']['_event'][event_key];
            }
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'keep';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_email$/i) != null) {
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'email';
          }
          if (!member_field_setting['_event'] && document['_settings']['email'] && document['_settings']['email']['_event']) {
            for (var event_key in document['_settings']['email']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['email']['_event'][event_key];
            }
          }
        } else if (field.match(/_email_part1$/i) != null) {
          if (!member_field_setting['_event'] && document['_settings']['email_part1'] && document['_settings']['email_part1']['_event']) {
            for (var event_key in document['_settings']['email_part1']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['email_part1']['_event'][event_key];
            }
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'keep';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/_email_part2$/i) != null) {
          if (!member_field_setting['_event'] && document['_settings']['email_part2'] && document['_settings']['email_part2']['_event']) {
            for (var event_key in document['_settings']['email_part2']['_event']) {
              member_field_setting['_event'][event_key] = document['_settings']['email_part2']['_event'][event_key];
            }
          }
          if (!member_field_setting['field_display_type']) {
            member_field_setting['field_display_type'] = 'keep';
          }
          if (member_field_setting['do_not_submit'] === undefined) {
            member_field_setting['do_not_submit'] = true;
          }
        } else if (field.match(/search_member[0-9]{4}_list/i) != null) {
          if (!member_field_setting['_event'] && document['_settings']['search_list']) {
            member_field_setting = document['_settings']['search_list'].cloneObject();
          }
        }
        if (!member_field_setting['field_key']) {
          member_field_setting['field_key'] = field;
        }
        member_fields.eq(i).setting(member_field_setting);
        if (member_fields.eq(i).dataAttribute('role') == 'froala') {
          member_fields.eq(i).initFroala();
        }
      }
      member_fields.trigger('member_field_initialized_callback.agent_field');
      return this;
    },
    bindMemberFields: function() {
      var role = this.dataAttribute('role') ? this.dataAttribute('role') : '';
      var type = this.dataAttribute('type') ? this.dataAttribute('type') : '';
  
      var member_fields = this.find('[data-r-field]');
      if (role && type) {
        member_fields = member_fields.not('[data-r-role="' + role + '"][data-r-type="' + type + '"] [data-r-role] [data-r-field]');
      } else if (role) {
        member_fields = member_fields.not('[data-r-role="' + role + '"] [data-r-role] [data-r-field]');
      }
      for (var i = 0; i < member_fields.length; i++) {
        if (String(member_fields.eq(i).dataAttribute('field')).match(/list$/i) != null) {
          member_fields = member_fields.not('[data-r-field="' + String(member_fields.eq(i).dataAttribute('field')) + '"] [data-r-field]');
        }
        if (String(member_fields.eq(i).dataAttribute('field')).match(/items$/i) != null) {
          member_fields = member_fields.not('[data-r-field="' + String(member_fields.eq(i).dataAttribute('field')) + '"] [data-r-field]');
        }
      }
  
      this.bindElements('member_fields', member_fields); // TODO
      this.bindElements('field', member_fields); // TODO
  
      if (this.dataAttribute('member_fields')) {
        this.bindElements('member_fields', this.dataAttribute('member_fields'));
      }
      member_fields.trigger('member_field_binded_callback.agent_field');
      return this;
    },
    initPosts: function() {
      var role = this.dataAttribute('role') ? this.dataAttribute('role') : '';
      var type = this.dataAttribute('type') ? this.dataAttribute('type') : '';
      var item_class = this.dataAttribute('item_class') ? this.dataAttribute('item_class') + '_' : '';
      var submit_mode = 'insert';
      this.setting('item_type', 'posts');
      if (this.dataAttribute('submit_mode')) {
        submit_mode = this.dataAttribute('submit_mode');
      } else if (item_class && agent.getPageRequest(item_class + 'idx')) {
        submit_mode = 'update';
      } else if (item_class && agent.getPageRequest(item_class + 'code')) {
        submit_mode = 'update';
      } else if (item_class) {
        submit_mode = 'insert';
      } else if (agent.getPageRequest('idx')) {
        submit_mode = 'update';
      } else if (agent.getPageRequest('code')) {
        submit_mode = 'update';
      }
      if (!this.request('_submit_mode')) {
        this.request('_submit_mode', submit_mode);
      }
      if (!this.request('_load_mode')) {
        this.request('_load_mode', 'post');
      }
      this.bindMemberFields();
      this.bindElements('member_fields').setting('action_body', this);
      this.setting(_common.initSetting['common']).setting(_common.initSetting['common_posts']);
      var common_fields = _common.initSetting['common_fields'].cloneObject();
      var common_posts_fields = _common.initSetting['common_posts_fields'].cloneObject();
      var base_fields = common_fields.mergeObject(common_posts_fields);
      this.prepareFieldsSettings(base_fields);
  
      this.trigger('item_initialized_callback.agent_item');
      return this;
    },
    /*
  
  
  
    */
    initItem: function() {
      var common_fields = _common.initSetting['common_fields'].cloneObject();
      var common_posts_fields = _common.initSetting['common_posts_fields'].cloneObject();
      var base_fields = common_fields.mergeObject(common_posts_fields);
      this.prepareFieldsSettings(base_fields);
  
      var field_default_setting = {
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
        'bind_append': null,
        'datetime_format': null,
        'string_length': null,
        'string_ellipsis': '...',
        'string_mask': '*',
        'string_dialog_message': null,
      };
  
      this.setting(_common.initSetting['common']);
      if (!this.dataAttribute('item_class') && this.dataAttribute('type')) {
        this.dataAttribute('item_class', this.dataAttribute('type'));
      }
      var member_field_setting = _common.initSetting['common_fields'].cloneObject();
      var role = this.dataAttribute('role');
      if (role) {
        var inner_field = this.find('[data-r-field]').not('[data-r-role="' + role + '"] [data-r-role] [data-r-field]').not('[data-r-field="buy_list_item"] [data-r-field]');
        // inner_field = inner_field.not('[data-r-field="item"] [data-r-field]');
        this.bindElement('field', inner_field);
        var type = String(this.dataAttribute('type'));
        if (type.match(/_posts$/i) != null) {
          this.setting(_common.initSetting['common_posts']);
          var common_posts_fields = _common.initSetting['common_posts_fields'].cloneObject();
          for (var common_posts_fields_key in common_posts_fields) {
            member_field_setting[common_posts_fields_key] = common_posts_fields[common_posts_fields_key];
          }
        } else if (type.match(/_detail$/i) != null) {
          this.setting(_common.initSetting['common_detail']);
          var common_detail_fields = _common.initSetting['common_detail_fields'].cloneObject();
          for (var common_detail_fields_key in common_detail_fields) {
            member_field_setting[common_detail_fields_key] = common_detail_fields[common_detail_fields_key];
          }
        } else if (type.match(/_list$/i) != null) {
          this.setting(_common.initSetting['common_list']);
          var common_list_fields = _common.initSetting['common_list_fields'].cloneObject();
          for (var common_list_fields_key in common_list_fields) {
            member_field_setting[common_list_fields_key] = common_list_fields[common_list_fields_key];
          }
        } else { // default is posts
          this.setting(_common.initSetting['common_posts']);
          var common_posts_fields = _common.initSetting['common_posts_fields'].cloneObject();
          for (var common_posts_fields_key in common_posts_fields) {
            member_field_setting[common_posts_fields_key] = common_posts_fields[common_posts_fields_key];
          }
        }
      } else {
        var inner_field = this.find('[data-r-field]');
        if (this.dataAttribute('field') == 'item') {
          // inner_field = inner_field.not('[data-r-field="buy_list_item"] [data-r-field]');
        }
        this.bindElement('field', inner_field);
      }
      var prepare_member_field_setting = this.setting('prepare_member_field_setting');
      for (var prepare_member_field_key in prepare_member_field_setting) {
        delete prepare_member_field_setting[prepare_member_field_key]['field_empty_' + agent.config('locale')];
        member_field_setting[prepare_member_field_key] = prepare_member_field_setting[prepare_member_field_key];
      }
      if (this.dataAttribute('field')) {
        this.bindElement('field', this.dataAttribute('field'));
      }
      if (role) {
        var type = String(this.dataAttribute('type'));
        if (type.match(/_posts$/i) != null) {
          for (var member_field_key in member_field_setting) {
            delete member_field_setting[member_field_key]['field_replace_' + agent.config('locale')];
            member_field_setting[member_field_key] = member_field_setting[member_field_key];
          }
        } else if (type.match(/_detail$/i) != null) {
          for (var member_field_key in member_field_setting) {
            delete member_field_setting[member_field_key]['string_empty_' + agent.config('locale')];
            member_field_setting[member_field_key] = member_field_setting[member_field_key];
          }
        } else if (type.match(/_list$/i) != null) {
          for (var member_field_key in member_field_setting) {
            delete member_field_setting[member_field_key]['string_empty_' + agent.config('locale')];
            // TODO button add event
            // if (member_field_key.match(/^checkbox/i) == null && _common.initSetting['common_fields']['show_detail'] && _common.initSetting['common_fields']['show_detail']['_event']) {
            if (member_field_key.match(/^checkbox/i) == null && _common.initSetting['common_fields']['show_detail'] && _common.initSetting['common_fields']['show_detail']['_event']) {
              var event_settings = member_field_setting[member_field_key]['_event'] ? member_field_setting[member_field_key]['_event'] : {};
              if (member_field_key.match(/^(image|file)[0-9]$/i) != null || !member_field_setting[member_field_key]['_event']) {
                for (var show_detail_event_key in _common.initSetting['common_fields']['show_detail']['_event']) {
                  if (!event_settings[show_detail_event_key]) {
                    event_settings[show_detail_event_key] = _common.initSetting['common_fields']['show_detail']['_event'][show_detail_event_key];
                  }
                }
                member_field_setting[member_field_key]['_event'] = event_settings;
              }
            }
          }
        } else { // default is posts
          for (var member_field_key in member_field_setting) {
            delete member_field_setting[member_field_key]['field_replace_' + agent.config('locale')];
            member_field_setting[member_field_key] = member_field_setting[member_field_key];
          }
        }
      }
      var bind_array = ['bind_submit', 'bind_preview', 'bind_search'];
      for (var i = 0; i < bind_array.length; i++) {
        var bind_string = bind_array[i];
        var field_string = bind_array[i].replace(/^bind_/i, '');
        if (this.dataAttribute(bind_string)) {
          this.bindElement('field', this.dataAttribute(bind_string));
          agent(this.dataAttribute(bind_string)).setting('field', field_string);
        }
      }
      var member_field = this.bindElement('field');
      for (var i = 0; i < member_field.length; i++) {
        member_field.eq(i).setting(field_default_setting);
        var field = member_field.eq(i).setting('field');
        if (field) {
          if (!member_field_setting[field]) {
            member_field_setting[field] = {};
          }
          // default postfix setting
          if (String(field).match(/^flag_/i) != null) {} else if (String(field).match(/_section$/i) != null) {
            if (!member_field_setting[field]['field_key']) {
              member_field_setting[field]['field_key'] = String(field).replace(/_section$/i, '');
            }
            if (!member_field_setting[field]['field_display'] && String(field).match(/^member/i) != null) {
              var member_status = String(field).match(/^member([0-9]{1,})_/i)[1];
              if (member_status.length == 4) {
                var start_member_status = member_status.substr(0, 2);
                var end_member_status = member_status.substr(2, 2);
                member_field_setting[field]['field_display'] = '{config.member_status}>' + start_member_status + '&&' + '{config.member_status}<' + end_member_status;
              } else if (member_status) {
                member_field_setting[field]['field_display'] = '{config.member_status}>' + member_status;
              } else {
                member_field_setting[field]['field_display'] = '{config.member_status}';
              }
            } else if (!member_field_setting[field]['field_display']) {
              member_field_setting[field]['field_display'] = '{' + String(field).replace(/_section$/i, '') + '}';
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_class$/i) != null) {
            if (!member_field_setting[field]['field_key']) {
              member_field_setting[field]['field_key'] = String(field).replace(/_class$/i, '');
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'class';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_mask$/i) != null) {
            if (!member_field_setting[field]['field_key']) {
              member_field_setting[field]['field_key'] = String(field).replace(/_mask$/i, '');
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'mask';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_ellipsis$/i) != null) {
            if (!member_field_setting[field]['field_key']) {
              member_field_setting[field]['field_key'] = String(field).replace(/_ellipsis$/i, '');
            }
            if (!member_field_setting[field]['string_length']) {
              member_field_setting[field]['string_length'] = 20;
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_price$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'cash';
            }
          } else if (String(field).match(/_total$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'cash';
            }
          } else if (String(field).match(/_phone$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'phone';
            }
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone']['_event'];
            }
          } else if (String(field).match(/telephone$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'phone';
            }
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone']['_event'];
            }
          } else if (String(field).match(/mobile$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'phone';
            }
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone']['_event'];
            }
          } else if (String(field).match(/_phone_part1$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part1']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_phone_part2$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part2']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/telephone_part1$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part1']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/telephone_part2$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part2']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/mobile_part1$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part1']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/mobile_part2$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['phone_part2']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_email$/i) != null) {
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'email';
            }
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['email']['_event'];
            }
          } else if (String(field).match(/_email_part1$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['email_part1']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          } else if (String(field).match(/_email_part2$/i) != null) {
            if (!member_field_setting[field]['_event']) {
              member_field_setting[field]['_event'] = _common.initSetting['common_fields']['email_part2']['_event'];
            }
            if (!member_field_setting[field]['field_display_type']) {
              member_field_setting[field]['field_display_type'] = 'keep';
            }
            if (member_field_setting[field]['do_not_submit'] == undefined) {
              member_field_setting[field]['do_not_submit'] = true;
            }
          }
          if (!member_field_setting[field]['field_key']) {
            member_field_setting[field]['field_key'] = String(field);
          }
          member_field.eq(i).setting(member_field_setting[field]);
        }
        member_field.eq(i).setting('item_body', this);
        if (member_field.eq(i).dataAttribute('role') == 'froala') {
          member_field.eq(i).initFroala();
        }
        member_field.eq(i).trigger('init_member_field_callback.agent_field');
      }
  
      this.trigger('init_callback.agent_item');
      return this;
    },
    setMemberFields: function() {
      var role = '';
      if (this.dataAttribute('role')) {
        role = String(this.dataAttribute('role'));
      }
      var type = '';
      if (this.dataAttribute('type')) {
        type = String(this.dataAttribute('type'));
        if (!this.dataAttribute('item_class')) {
          this.dataAttribute('item_class', type);
        }
      }
  
      // member fields
      var member_fields = agent();
      if (role && type) {
        // .not('[data-r-field="buy_list_item"] [data-r-field]')
        member_fields = this.find('[data-r-field]').not('[data-r-role="' + role + '"][data-r-type="' + type + '"] [data-r-role] [data-r-field]');
      } else if (role) {
        member_fields = this.find('[data-r-field]').not('[data-r-role="' + role + '"] [data-r-role] [data-r-field]');
      } else {
        member_fields = this.find('[data-r-field]');
      }
  
      this.bindElements('field', member_fields); // TODO
      this.bindElements('member_fields', member_fields); // TODO
  
      if (this.dataAttribute('member_fields')) {
        this.bindElements('member_fields', this.dataAttribute('member_fields'));
      }
  
      member_fields = this.bindElements('member_fields');
      for (var i = 0; i < member_fields.length; i++) {
        // remove prev bind TODO
        // if (member_fields.eq(i).setting('item_body')) {
        //   var item_body_member_fields = member_fields.eq(i).setting('item_body').bindElements('member_fields');
        //   var new_member_fields = item_body_member_fields.not(member_fields);
        //   member_fields.eq(i).setting('item_body').removeBindElements('member_fields').bindElements('member_fields', new_member_fields);
        // }
      }
  
      // TODO remove previous bind (member_fields)
      return this;
    },
    initMemberFields: function() {
      var member_fields = this.bindElements('member_fields');
      for (var i = 0; i < member_fields.length; i++) {
        member_fields.eq(i).setting('item_body', this);
        member_fields.eq(i).applyFieldSettings();
        if (member_fields.eq(i).dataAttribute('role') == 'froala') {
          member_fields.eq(i).initFroala();
        }
        member_fields.eq(i).trigger('init_member_field_callback.agent_field');
      }
      return this;
    },
    itemRendering: function() {
      var data = agent(this).setting('data') ? agent(this).setting('data') : {};
      if (agent.getPageRequest('p') == 'admin_order_total_list' || agent.getPageRequest('p') == 'admin_order_cancle_list' || agent.getPageRequest('p') == 'supplier_order_total_list' || agent.getPageRequest('p') == 'supplier_order_cancel_list') {
        var count = Number(data['count']);
        var items = data['items'];
        agent('[data-r-cloned-item').remove();
        var tmp_base_item = agent('[data-r-field="item"]');
        var tmp_body = tmp_base_item.parent();
        tmp_base_item.hide();
        tmp_base_item.find('[data-r-field]').text('');
        var tmp_clone_item = tmp_base_item.clone(true, true);
  
        var tmp_base_item2 = agent('[data-r-field="item2"]');
        var tmp_body2 = tmp_base_item2.parent();
        tmp_base_item2.hide();
        tmp_base_item2.find('[data-r-field]').text('');
        var tmp_clone_item2 = tmp_base_item2.clone(true, true);
        for (var i = 0; i < items.length; i++) {
          var tmp_append_item = tmp_base_item;
          var tmp_append_item2 = tmp_base_item2;
          if (i > 0) {
            tmp_append_item = tmp_clone_item.clone(true, true);
            tmp_append_item.dataAttribute('cloned_item', true);
            tmp_body.append(tmp_append_item);
  
            tmp_append_item2 = tmp_clone_item2.clone(true, true);
            tmp_append_item2.dataAttribute('cloned_item', true);
            tmp_body2.append(tmp_append_item2);
          }
          tmp_append_item.show();
          tmp_append_item.setting('data', items[i]);
          var tmp_fields = tmp_append_item.find('[data-r-field]');
          for (var j = 0; j < tmp_fields.length; j++) {
            var field_string = tmp_fields.eq(j).dataAttribute('field');
            tmp_fields.eq(j).setting('item_body', tmp_append_item).text(items[i][field_string]);
          }
  
          tmp_append_item2.show();
          tmp_append_item2.setting('data', items[i]);
          var tmp_fields2 = tmp_append_item2.find('[data-r-field]');
          for (var j = 0; j < tmp_fields2.length; j++) {
            var field_string = tmp_fields2.eq(j).dataAttribute('field');
            if (field_string == 'order_status') {
              items[i][field_string] = !items[i][field_string] || items[i][field_string] == '0' ? '��湲�' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '11' ? '二쇰Ц痍⑥냼' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '19' ? '二쇰Ц痍⑥냼' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '51' ? '二쇰Ц�뺤젙' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '52' ? '湲곗뾽寃곗젣�꾨즺' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '100' ? '二쇰Ц�꾨즺' : items[i][field_string];
            } else if (field_string == 'payment_status') {
              items[i][field_string] = !items[i][field_string] || items[i][field_string] == '0' ? '��湲�' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '-1' ? '痍⑥냼' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '100' ? '�꾨즺' : items[i][field_string];
            } else if (field_string == 'shipping_status') {
              items[i][field_string] = !items[i][field_string] || items[i][field_string] == '0' ? '諛곗넚��湲�' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '51' ? '諛곗넚以�' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '52' ? '諛곗넚以�鍮꾩쨷' : items[i][field_string];
              items[i][field_string] = items[i][field_string] == '100' ? '諛곗넚�꾨즺' : items[i][field_string];
            } else if (String(field_string).match(/(price|total|cost)$/i) != null) {
              items[i][field_string] = String(items[i][field_string]).toCashString();
            } else if (String(field_string).match(/(phone|mobile)$/i) != null) {
              items[i][field_string] = String(items[i][field_string]).toPhoneString();
            }
            tmp_fields2.eq(j).setting('item_body', tmp_append_item2).text(items[i][field_string]);
          }
        }
  
        agent('.pagenation_sec').hide();
        agent('[data-r-field="total_count"]').text(data['total_count']);
        agent('[data-r-field="total_number_of_items"]').text(data['total_number_of_items']);
        agent('[data-r-field="total_number_of_order"]').text(data['total_number_of_order']);
        agent('[data-r-field="total_number_of_order_status11"]').text(data['total_number_of_order_status11']);
        agent('[data-r-field="total_number_of_order_status51"]').text(data['total_number_of_order_status51']);
        agent('[data-r-field="total_number_of_search_items"]').text(data['total_number_of_search_items']);
        agent('[data-r-field="total_number_of_shipping_status0"]').text(data['total_number_of_shipping_status0']);
        agent('[data-r-field="total_number_of_shipping_status51"]').text(data['total_number_of_shipping_status51']);
        agent('[data-r-field="total_results"]').text(data['total_results']);
        agent('[data-r-field="total_search_results"]').text(data['total_search_results']);
        agent('[data-r-field="count"]').text(data['count']);
  
        return;
      } else if (agent.getPageRequest('p') == 'admin_order_total_list_test') {
        return;
      }
      var member_field = agent(this).bindElement('field');
      for (var i = 0; i < member_field.length; i++) {
        if (agent.getPageRequest('p') == 'admin_order_total_list' && member_field.eq(i).is('[data-r-field="item"] [data-r-field]')) {
          continue;
        }
        var field_key = member_field.eq(i).setting('field_key');
        // TODO applyFieldSetting twice called (old ver)
        member_field.eq(i).applyFieldSettings().setting('rendering_data', data[field_key]).fieldRendering();
      }
      var role = this.dataAttribute('role');
      if (role) {
        var type = String(this.dataAttribute('type'));
        if (type.match(/_list$/i) != null) {
          if (data['count'] == '0') {
            member_field.filter('[data-r-field="no_data"]').show();
            member_field.filter('[data-r-field="list_page"]').hide();
            member_field.filter('[data-r-field="previous_page"]').hide();
            member_field.filter('[data-r-field="next_page"]').hide();
            member_field.filter('[data-r-field="first_page"]').hide();
            member_field.filter('[data-r-field="last_page"]').hide();
          } else {
            member_field.filter('[data-r-field="no_data"]').hide();
            var count = data.length;
            // member_field.filter('[data-r-field="quantity"]').setDisplayValue(count).show();
            var total_search_results = data['total_search_results'] ? Number(data['total_search_results']) : count;
            var page = data['page'] ? Number(data['page']) : 1;
            var length = data['length'] ? Number(data['length']) : 10;
            var total_page = Math.ceil(total_search_results / length);
            member_field.filter('[data-r-field="total_page"]').setDisplayValue(total_page).show();
            member_field.filter('[data-r-field="first_page"]').dataAttribute('page_number', 1).addClass('on').show();
            if (page == 1) {
              member_field.filter('[data-r-field="first_page"]').dataAttribute('page_number', -1).removeClass('on');
            }
            member_field.filter('[data-r-field="last_page"]').dataAttribute('page_number', total_page).addClass('on').show();
            if (page == total_page) {
              member_field.filter('[data-r-field="last_page"]').dataAttribute('page_number', -1).removeClass('on');
            }
            var page_link_length = member_field.filter('[data-r-field="list_page"]').length ? member_field.filter('[data-r-field="list_page"]').length : 1;
            var page_link_start_number = page - Math.floor(page_link_length / 2) > 1 ? page - Math.floor(page_link_length / 2) : 1;
            var page_link_end_number = page_link_length < total_page ? page_link_length : total_page;
            if (page_link_start_number + page_link_length > total_page) {
              page_link_start_number = total_page - page_link_length + 1 > 1 ? total_page - page_link_length + 1 : 1;
            }
            member_field.filter('[data-r-field="list_page"]').hide().removeClass('on');
            for (var i = 0; i < page_link_end_number; i++) {
              member_field.filter('[data-r-field="list_page"]').eq(i).dataAttribute('page_number', page_link_start_number + i).setDisplayValue(page_link_start_number + i).show();
              if (page == page_link_start_number + i) {
                member_field.filter('[data-r-field="list_page"]').eq(i).dataAttribute('page_number', -1).addClass('on');
              }
            }
            var previous_page_number = page - page_link_length > 0 ? page - page_link_length : 1;
            member_field.filter('[data-r-field="previous_page"]').dataAttribute('page_number', previous_page_number).addClass('on').show();
            if (page == previous_page_number) {
              member_field.filter('[data-r-field="previous_page"]').dataAttribute('page_number', -1).removeClass('on');
            }
            var next_page_number = page + page_link_length < total_page ? page + page_link_length : total_page;
            member_field.filter('[data-r-field="next_page"]').dataAttribute('page_number', next_page_number).addClass('on').show();
            if (page == next_page_number) {
              member_field.filter('[data-r-field="next_page"]').dataAttribute('page_number', -1).removeClass('on');
            }
          }
        }
      }
      this.trigger('item_rendering_callback.agent_item', data);
      return this;
    },
    fieldRendering: function() {
      // TODO (check running sequence)
      // var run_count = this.dataAttribute('run_count') ? this.dataAttribute('run_count') : 0;
      // run_count++;
      // this.dataAttribute('run_count', run_count);
      // if (run_count > 1) {
      // }
      if (this.dataAttribute('field') == 'option_items') {
        this.trigger('rendering_items.agent_field');
        return;
      }
      if (this.dataAttribute('field') == 'option_0_section') {
        this.trigger('field_rendering_callback.agent_field');
        return;
      }
  
      if (agent.config('mode') == 'admin') {
  
      } else {
        if (this.dataAttribute('field') == 'flag_new' || this.dataAttribute('field') == 'flag_best' || this.dataAttribute('field') == 'flag_md' || this.dataAttribute('field') == 'flag_hot') {
          if (agent('[data-r-type="goods_posts"]').length == 0 && agent('[data-r-type="goods_detail"]').length == 0) {
            this.setting('field_display', '{' + this.dataAttribute('field') + '}');
            this.setting('field_display_type', 'keep');
          } else {
            this.setting('field_display', '{' + this.dataAttribute('field') + '}');
          }
        }
      }
  
      var rendering_data = this.setting('rendering_data');
      if (typeof rendering_data == 'object') {
        var item_body_setting = this.setting('item_body').setting();
        item_body_setting['_setting_type'] = 'default';
        var list_body = this.parent();
        var list_rendering_data = rendering_data;
        if (list_rendering_data.length == undefined) {
          agent.log('check field : ' + this.dataAttribute('field'), 'data is not array (include string key (not number))');
        }
        var list_item_field = this.dataAttribute('field');
  
        if (list_rendering_data.length < 1) {
          this.hide();
        }
        if (this.is('select')) {
          var option_element = this.find('option');
          for (var i = 0; i < option_element.length; i++) {
            if (option_element.eq(i).val() != '') {
              option_element.eq(i).remove();
            }
          }
          for (var i = 0; i < list_rendering_data.length; i++) {
            var option_item = agent('<option></option>');
            option_item.val(i);
            if (list_rendering_data[i]['option_point'] == 0) {
              option_item.text(list_rendering_data[i]['option_name']);
            } else {
              option_item.text(list_rendering_data[i]['option_name'] + ' (' + String(list_rendering_data[i]['option_point']).toCashString() + '��)');
            }
            this.append(option_item);
            option_item.setting('item_body', item_body).setting('list_item_index', i).setting('data', list_rendering_data[i]);
          }
        } else if (list_item_field.match(/^calendar$/i) != null) {
          // this.setting('item_body', item_body).setting('data', rendering_data).initItem().itemRendering();
        } else if (list_body.setting('list_item_template')) {
          list_body.find('.agent_list_item_clone').remove();
          list_body.find('.agent_list_item_part1_clone').remove();
          var list_item_template = list_body.setting('list_item_template');
          var list_item_part1_template = false;
          if (list_body.setting('list_item_part1_template')) {
            list_item_part1_template = list_body.setting('list_item_part1_template');
          }
          var list_item_part1_show = false;
          if (list_body.setting('list_item_part1_show')) {
            list_item_part1_show = list_body.setting('list_item_part1_show');
          }
          var item_body = list_body.setting('item_body');
          for (var i = 0; i < list_rendering_data.length; i++) {
            var list_item_clone = this;
            var list_item_part1_clone = false;
            if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]').length > 0) {
              list_item_part1_clone = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]');
            } else if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]').length > 0) {
              list_item_part1_clone = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]');
            }
            if (i > 0) {
              list_item_clone = list_item_template.clone(true, true);
              list_item_clone.addClass('agent_list_item_clone');
              list_body.append(list_item_clone);
              if (_common.initSetting['common_fields'][list_item_field]) {
                list_item_clone.setting(_common.initSetting['common_fields'][list_item_field]);
              }
              var prepare_member_field_setting = this.parents('[data-r-role]').setting('prepare_member_field_setting');
              if (prepare_member_field_setting[list_item_field]) {
                list_item_clone.setting(prepare_member_field_setting[list_item_field]);
              }
              if (list_item_part1_template) {
                list_item_part1_clone = list_item_part1_template.clone(true, true);
                list_item_part1_clone.addClass('agent_list_item_part1_clone');
                list_body.append(list_item_part1_clone);
              }
            } else {
              var spoid_element = list_item_template.clone(true, true);
              this.html(spoid_element.html());
            }
            list_item_clone.setting(item_body_setting).setting('item_body', item_body).setting('list_item_index', i).setting('data', list_rendering_data[i]).initItem().setMemberFields().initMemberFields().itemRendering().show();
  
            if (list_item_part1_clone) {
              list_item_part1_clone.setting(item_body_setting).setting('item_body', item_body).setting('list_item_index', i).setting('data', list_rendering_data[i]).initItem().setMemberFields().initMemberFields().itemRendering().show();
              if (list_item_part1_show) {
                list_item_part1_clone.show();
              } else {
                list_item_part1_clone.hide();
              }
            }
          }
        } else {
          this.setting('list_body', list_body);
          var list_item_template = this.clone(true, true);
          list_body.setting('list_item_template', list_item_template);
          var list_item_part1_template = false;
          var list_item_part1_show = false;
          if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]').length > 0) {
            list_item_part1_template = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]');
            list_body.setting('list_item_part1_template', list_item_part1_template);
            list_item_part1_show = true;
          } else if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]').length > 0) {
            list_item_part1_template = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]');
            list_body.setting('list_item_part1_template', list_item_part1_template);
          }
          if (agent('[data-r-type="order_detail"]').length > 0 || agent('[data-r-type="your_order_detail"]').length > 0) {
            this.hide();
          }
          var item_body = this.setting('item_body');
          list_body.setting('item_body', item_body);
          for (var i = 0; i < list_rendering_data.length; i++) {
            var list_item_clone = this;
            var list_item_part1_clone = false;
            if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]').length > 0) {
              list_item_part1_clone = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1"]');
            } else if (list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]').length > 0) {
              list_item_part1_clone = list_body.find('[data-r-field="' + this.dataAttribute('field') + '_part1_hidden"]');
            }
            if (i > 0) {
              list_item_clone = list_item_template.clone(true, true);
              list_item_clone.addClass('agent_list_item_clone');
              list_body.append(list_item_clone);
              if (_common.initSetting['common_fields'][list_item_field]) {
                list_item_clone.setting(_common.initSetting['common_fields'][list_item_field]);
              }
              var prepare_member_field_setting = this.parents('[data-r-role]').setting('prepare_member_field_setting');
              if (prepare_member_field_setting && prepare_member_field_setting[list_item_field]) {
                list_item_clone.setting(prepare_member_field_setting[list_item_field]);
              }
              if (list_item_part1_template) {
                list_item_part1_clone = list_item_part1_template.clone(true, true);
                list_item_part1_clone.addClass('agent_list_item_part1_clone');
                list_body.append(list_item_part1_clone);
              }
            }
            if (i == 0 && (agent('[data-r-type="order_detail"]').length > 0 || agent('[data-r-type="your_order_detail"]').length > 0)) {
              list_item_clone = list_item_template.clone(true, true);
              list_item_clone.addClass('agent_list_item_clone');
              list_body.append(list_item_clone);
              if (_common.initSetting['common_fields'][list_item_field]) {
                list_item_clone.setting(_common.initSetting['common_fields'][list_item_field]);
              }
              var prepare_member_field_setting = this.parents('[data-r-role]').setting('prepare_member_field_setting');
              if (prepare_member_field_setting && prepare_member_field_setting[list_item_field]) {
                list_item_clone.setting(prepare_member_field_setting[list_item_field]);
              }
              if (list_item_part1_template) {
                list_item_part1_clone = list_item_part1_template.clone(true, true);
                list_item_part1_clone.addClass('agent_list_item_part1_clone');
                list_body.append(list_item_part1_clone);
              }
            }
            list_item_clone.setting(item_body_setting).setting('item_body', item_body).setting('list_item_index', i).setting('data', list_rendering_data[i]).initItem().setMemberFields().initMemberFields().itemRendering().show();
            if (list_item_part1_clone) {
              list_item_part1_clone.setting(item_body_setting).setting('item_body', item_body).setting('list_item_index', i).setting('data', list_rendering_data[i]).initItem().setMemberFields().initMemberFields().itemRendering();
              if (list_item_part1_show) {
                list_item_part1_clone.show();
              } else {
                list_item_part1_clone.hide();
              }
            }
          }
        }
      } else {
        var item_data = this.setting('item_body').setting('data');
        var field = this.setting('field');
        var field_key = this.setting('field_key');
        var field_type = this.setting('field_type') ? this.setting('field_type') : 'string';
        var field_value = this.setting('field_value') ? this.setting('field_value') : rendering_data;
        var field_display_type = this.setting('field_display_type') ? this.setting('field_display_type') : 'replace';
  
        if (field_value === null || field_value == 'null') {
          field_value = '';
        }
  
        // todo (�꾩떆)
        if (!field_value && field.match(/participation/) != null && field.match(/request/) == null) {
          return;
        }
  
        // replace value
        if (this.setting('field_replace') && typeof this.setting('field_replace') == 'string') {
          var field_replace = this.setting('field_replace');
          var field_replace_value = this.setting('field_replace_value') ? this.setting('field_replace_value') : '';
          field_value = String(field_value).replace(new RegExp(field_replace, 'g'), field_replace_value);
        } else if (this.setting('field_replace') && typeof this.setting('field_replace') == 'object') {
          var field_replace = this.setting('field_replace');
          for (var replace_key in field_replace) {
            var replace_value = field_replace[replace_key];
            var replace_item_array = replace_key.match(/\{[^\{\}]+\}/g);
            var eval_string = replace_key;
            for (var j = 0; j < replace_item_array.length; j++) {
              var select_replace_item = replace_item_array[j].replace(/\s{0,}[\{\}]\s{0,}/g, '');
              var regexp_string = new RegExp('\\{' + select_replace_item + '}', 'g');
              var select_replace_value = item_data[select_replace_item];
              if (select_replace_value === null || select_replace_value === 'null' || select_replace_value === false || select_replace_value === 'false') {
                select_replace_value = 'false';
              } else if (select_replace_value === true || select_replace_value === 'true') {
                select_replace_value = 'true';
              }
              if (replace_key.match(/(<=|>=|<>|<|>|!=|==|=|\+|\*|\-|\/)/) == null) {
                if (select_replace_value && select_replace_value != null && select_replace_value != 'null' && select_replace_value != 'false') {
                  select_replace_value = 'true';
                } else {
                  select_replace_value = 'false';
                }
              }
              if (isNaN(select_replace_value) && select_replace_value != 'true' && select_replace_value != 'false') {
                select_replace_value = '"' + select_replace_value + '"';
              }
              eval_string = eval_string.replace(regexp_string, select_replace_value);
            }
            try {
              if (eval(eval_string)) {
                field_value = replace_value;
                break;
              }
            } catch (e) {}
          }
        }
  
        if (field_type == 'eval' && field_value !== undefined) {
          // field type eval
          var eval_item_array = String(field_value).match(/\{[^\{\}]+\}/g);
          var eval_string = String(field_value);
          for (var j = 0; j < eval_item_array.length; j++) {
            var select_display_item = eval_item_array[j].replace(/\s{0,}[\{\}]\s{0,}/g, '');
            var regexp_string = new RegExp('\\{' + select_display_item + '}', 'g');
            var replace_value = '';
            if (select_display_item.match(/^config\./) != null) {
              select_display_item = select_display_item.replace(/^config\./, '');
              replace_value = agent.config(select_display_item);
            } else {
              replace_value = agent.getJsonValue(item_data, select_display_item);
            }
            if (replace_value === null || replace_value === 'null' || replace_value === false || replace_value === 'false') {
              replace_value = 'false';
            } else if (replace_value === true || replace_value === 'true') {
              replace_value = 'true';
            }
            if (eval_string.match(/(<=|>=|<>|<|>|!=|==|=|\+|\*|\-|\/)/) == null) {
              if (replace_value && replace_value != null && replace_value != 'null' && replace_value != 'false') {
                replace_value = 'true';
              } else {
                replace_value = 'false';
              }
            }
            if (isNaN(replace_value) && replace_value != 'true' && replace_value != 'false') {
              replace_value = '"' + replace_value + '"';
            }
            eval_string = eval_string.replace(regexp_string, replace_value);
          }
          try {
            field_value = eval(eval_string);
          } catch (e) {}
        } else if (field_type == 'regexp' && field_value !== undefined) {
          var field_regexp_from = this.setting('field_regexp_from');
          if (typeof field_regexp_from == 'string') {
            field_regexp_from = new RegExp(field_regexp_from);
          }
          var field_regexp_to = this.setting('field_regexp_to');
          field_value = String(field_value).replace(field_regexp_from, field_regexp_to);
        } else if (field_type == 'format' && field_value !== undefined) {
          // field type format
          var format_item_array = String(field_value).match(/\{[^\{\}]+\}/g);
          for (var j = 0; j < format_item_array.length; j++) {
            var select_format_item = format_item_array[j].replace(/\s{0,}[\{\}]\s{0,}/g, '');
            var split_format_item = select_format_item.split(/\s{1,}/);
            var format_item_key = split_format_item[0];
            var format_item_type = split_format_item.length > 1 ? split_format_item[1] : 'string';
            var format_item_value = agent.getJsonValue(item_data, format_item_key);
  
            // field item type cash
            if (format_item_type == 'cash') {
              format_item_value = String(format_item_value).toCashString();
            }
            // field item type datetime
            if (format_item_type == 'datetime') {
              var datetime_format = field_setting['datetime_format'] ? field_setting['datetime_format'] : 'YYYY-MM-DD HH:mm:SS';
              format_item_value = String(format_item_value).toDatetimeString(datetime_format);
            }
            // field item type si
            if (format_item_type == 'si') {
              format_item_value = String(format_item_value).toSIString();
            }
  
            var regexp_string = new RegExp('\\{' + format_item_key + '\\s{0,}[^\\{\\}]*\\}', 'g');
            if (format_item_value) {
              field_value = field_value.replace(regexp_string, format_item_value);
            }
          }
        }
  
        // set display value
        if (field_display_type == 'keep') {
          // do not setting value and hidden_value
        } else if (field_display_type == 'hidden_value') {
          this.hiddenValue(field_value);
        } else if (field_display_type == 'class') {
          this.hiddenValue(field_value);
          if (!field_value) {
            // empty value class is field_key only
            field_value = '';
          }
          // class is field_keyfield_value (ex. posts_status0)
          var field_key = this.setting('field_key');
          if (!isNaN(field_value) && String(field_value).match(/^\-/) != null) {
            this.addClass(field_key + '_minus');
            this.addClass(field_key + String(field_value).replace(/^\-/, ''));
          } else {
            this.addClass(field_key + field_value);
          }
        } else if (field_display_type == 'active' && field_value !== undefined) {
          this.hiddenValue(field_value);
          for (var j = 0; j < Number(field_value); j++) {
            this.bindElement('field').eq(j).active('on');
          }
        } else if (field_display_type == 'cash' && field_value !== undefined) {
          this.hiddenValue(field_value);
          this.displayValue(String(field_value).toCashString());
        } else if (field_display_type == 'datetime' && field_value !== undefined) {
          this.hiddenValue(field_value);
          var datetime_format = this.setting('datetime_format') ? this.setting('datetime_format') : 'YYYY-MM-DD HH:mm:SS';
          this.displayValue(String(field_value).toDatetimeString(datetime_format));
        } else if (field_display_type == 'si' && field_value !== undefined) {
          this.hiddenValue(field_value);
          this.displayValue(String(field_value).toSIString());
        } else if (field_display_type == 'phone' && field_value !== undefined) {
          this.hiddenValue(field_value);
          this.displayValue(String(field_value).toPhoneString());
        } else if (field_display_type == 'mask' && field_value !== undefined) {
          // TODO
          this.hiddenValue(field_value);
          if (agent.config('member_status') > 0) {
            this.displayValue(String(field_value).toPhoneString());
          } else {
            this.displayValue(String(field_value).toPhoneString().replace(/[0-9]/g, '*'));
          }
        } else if (field_display_type == 'email' && field_value !== undefined) {
          this.hiddenValue(field_value);
          this.displayValue(String(field_value));
        } else if (field_display_type == 'score') {
          // if (field_value) {
          //   field_value = Number(field_value);
          // } else if (this.setting('field_default_value')) {
          //   field_value = Number(this.setting('field_default_value'));
          // } else if (this.children().length > 0) {
          //   field_value = this.find('.on').length;
          // } else {
          //   field_value = 1;
          // }
          // this.addClass('score' + field_value);
          // this.setting({
          //   '_setting_type': 'default',
          //   '_event': {
          //     'refresh.agent_field': function(event) {
          //       var inner_element = agent(this).children();
          //       var score_value = Number(agent(this).getHiddenValue());
          //       if (inner_element.length > 0) {
          //         for (var i = 0; i < inner_element.length; i++) {
          //           if (i < score_value) {
          //             inner_element.eq(i).addClass('on');
          //           } else {
          //             inner_element.eq(i).removeClass('on');
          //           }
          //         }
          //       }
          //     },
          //   },
          // });
          // this.children().setting({
          //   '_setting_type': 'default',
          //   '_event': {
          //     'click.agent_common': function(event) {
          //       var field_element = agent(this).parent();
          //       var score_field_name = agent(this).prop('tagName');
          //       var index_element = agent(score_field_name).index(this);
          //       field_element.setHiddenValue(index_element).trigger('refresh.agent_field');
          //     },
          //   },
          // });
          // this.setHiddenValue(field_value).trigger('refresh.agent_field');
        } else if (this.is('select')) {
          // select is delay setting value
          this.setting('selected_value', field_value);
          if (String(this.dataAttribute('widget')).match(/(category)/) != null) {
            this.delay(2000).trigger('change.agent_widget');
          } else {
            this.delay(400).setDisplayValue(this.setting('selected_value'));
            this.setting('selected_value', '');
          }
        } else if (field == 'file_url') {
          if (this.is('button')) {
            this.setHiddenValue(field_value);
          } else if (this.is('a')) {
            this.attr('href', field_value);
          } else if (this.is('img')) {
            this.attr('src', field_value);
          } else {
            this.setDisplayValue(field_value);
          }
        } else if (field == 'image_file_url') {
          if (this.is('button')) {
            this.setHiddenValue(field_value);
          } else if (this.is('a')) {
            this.attr('href', field_value);
          } else if (this.is('img')) {
            this.attr('src', field_value);
          } else {
            this.setDisplayValue(field_value);
          }
        } else if (field == 'video_file_url') {
          if (this.is('button')) {
            this.setHiddenValue(field_value);
          } else if (this.is('a')) {
            this.attr('href', field_value);
          } else if (this.is('img')) {
            this.attr('src', field_value);
          } else {
            this.setDisplayValue(field_value);
          }
        } else if (field == 'video0' && this.is('input')) {
          this.setDisplayValue(field_value);
        } else if (field == 'video0' && String(field_value).match(/http(s)?:\/\/youtu/i) != null) {
          var tag = document.createElement('script');
  
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
          this.attr('id', 'video0');
          var video_id = field_value;
          video_id = String(video_id).replace(/http(s)?:\/\/youtu\.be\//i, '');
          this.dataAttribute('video_id', video_id);
        } else if (field == 'video0') {
          this.attr('src', field_value);
        } else {
          // froala editor
          if (this.dataAttribute('role') == 'froala' && field_value !== undefined) {
            this.froalaEditor('html.set', field_value);
          } else if (this.is('textarea') && field_value !== undefined) {
            this.setDisplayValue(field_value.replace(/<br \/>/g, '\n'));
          } else if (field_value !== undefined) {
            if (field_value && this.string('length')) {
              field_value = String(field_value).removeTag();
              if (field_value.length > string_length) {
                field_value = field_value.substr(0, Number(this.string('length'))) + this.string('ellipsis');
              }
            }
            this.setDisplayValue(field_value);
          }
        }
  
        // field show or hide
        if (this.setting('field_display') && String(this.setting('field_display')).match(/\{[^\{\}]+\}/g) != null) {
          var display_item_array = String(this.setting('field_display')).match(/\{[^\{\}]+\}/g);
          var eval_string = String(this.setting('field_display'));
          for (var j = 0; j < display_item_array.length; j++) {
            var select_display_item = display_item_array[j].replace(/\s{0,}[\{\}]\s{0,}/g, '');
            var regexp_string = new RegExp('\\{' + select_display_item + '}', 'g');
            var replace_value = '';
            if (select_display_item.match(/^config\./i) != null) {
              select_display_item = select_display_item.replace(/^config\./, '');
              replace_value = agent.config(select_display_item);
            } else if (select_display_item.match(/^today$/i) != null) {
              replace_value = moment().format('YYYY-MM-DD');
            } else if (select_display_item.match(/_date$/i) != null) {
              replace_value = moment(item_data[select_display_item]).format('YYYY-MM-DD');
            } else {
              replace_value = item_data[select_display_item];
            }
            if (replace_value === null || replace_value === 'null' || replace_value === undefined || replace_value === 'undefined' || replace_value === false || replace_value === 'false') {
              replace_value = 'false';
            } else if (replace_value === true || replace_value === 'true') {
              replace_value = 'true';
            }
            if (eval_string.match(/(<=|>=|<>|<|>|!=|==|=|\+|\*|\-|\/)/) == null) {
              if (replace_value && replace_value != null && replace_value != 'null' && replace_value != 'false') {
                replace_value = 'true';
              } else {
                replace_value = 'false';
              }
            }
            if (isNaN(replace_value) && replace_value != 'true' && replace_value != 'false') {
              replace_value = '"' + replace_value + '"';
            }
            eval_string = eval_string.replace(regexp_string, replace_value);
          }
          try {
            if (eval(eval_string)) {
              if (field.match(/^flag_/i)) {
                if (item_data['flag_md'] && item_data['flag_best']) {
                  this.css('opacity', 100);
                } else if (item_data['flag_md'] && field == 'flag_md') {
                  this.css('opacity', 100);
                } else if (item_data['flag_best'] && field == 'flag_best') {
                  this.show();
                }
              } else {
                this.show();
              }
            } else {
              if (field.match(/^flag_/i)) {
                if (item_data['flag_md'] && field == 'flag_best') {
                  this.css('opacity', 0);
                } else if (item_data['flag_best'] && field == 'flag_md') {
                  this.hide();
                } else {
                  this.css('opacity', 0);
                }
              } else {
                this.hide();
              }
            }
          } catch (e) {
            this.hide();
          }
        }
        this.trigger('field_rendering_callback.agent_field', field_value);
      }
      return this;
    },
    // prepareMemberFieldSetting (not apply field setting)
    prepareMemberFieldSetting: function() {
      if (this.length > 0) {
        this.prepareFieldsSettings(arguments[0]);
        for (var i = 0; i < this.length; i++) {
          var prepare_member_field_setting = agent(this[i]).setting('prepare_member_field_setting') ? agent(this[i]).setting('prepare_member_field_setting') : {};
          if (arguments.length == 1 && typeof arguments[0] == 'object') {
            prepare_member_field_setting.mergeObject(arguments[0]);
          } else if (arguments.length == 2 && typeof arguments[0] == 'string') {
            prepare_member_field_setting[arguments[0]] = arguments[1];
          }
          agent(this[i]).setting('prepare_member_field_setting', prepare_member_field_setting);
        }
      }
      return this;
    },
    loadItem: function(param) {
      // set _action
      if (!this.request('_action') && this.setting('type')) {
        this.request('_action', this.setting('type'));
      }
  
      var api_param = {};
  
  
      // set _type
      if (!this.request('_action_type')) {
        api_param['_action_type'] = 'load';
      }
  
      if (!this.request('_load_mode')) {
        agent.showMessage('load_mode is null');
        return;
      }
  
      var item_class = this.dataAttribute('item_class') ? this.dataAttribute('item_class') + '_' : '';
  
      // set _idx, _code
      if (item_class && agent.getPageRequest(item_class + 'idx')) {
        api_param['_idx'] = agent.getPageRequest(item_class + 'idx');
      } else if (!this.request('_idx') && agent.getPageRequest(item_class + 'idx')) {
        api_param['_idx'] = agent.getPageRequest('idx');
      }
      if (item_class && agent.getPageRequest(item_class + 'code')) {
        api_param['_code'] = agent.getPageRequest(item_class + 'code');
      } else if (!this.request('_code') && agent.getPageRequest(item_class + 'code')) {
        api_param['_code'] = agent.getPageRequest('code');
      }
  
      // set _length ...
      if (item_class && agent.getPageRequest(item_class + 'length')) {
        api_param['_length'] = agent.getPageRequest(item_class + 'length');
      } else if (this.dataAttribute('list_length')) {
        api_param['_length'] = this.dataAttribute('list_length');
      } else if (!this.request('_length') && agent.getPageRequest(item_class + 'length')) {
        api_param['_length'] = agent.getPageRequest('length');
      }
      if (item_class && agent.getPageRequest(item_class + 'page')) {
        api_param['_page'] = agent.getPageRequest(item_class + 'page');
      } else if (this.dataAttribute('list_page')) {
        api_param['_page'] = this.dataAttribute('list_page');
      } else if (!this.request('_page') && agent.getPageRequest(item_class + 'page')) {
        api_param['_page'] = agent.getPageRequest('page');
      }
      if (item_class && agent.getPageRequest(item_class + 'order_by')) {
        api_param['_order_by'] = agent.getPageRequest(item_class + 'order_by');
      } else if (this.dataAttribute('list_order_by')) {
        api_param['_order_by'] = this.dataAttribute('list_order_by');
      } else if (!this.request('_order_by') && agent.getPageRequest(item_class + 'order_by')) {
        api_param['_order_by'] = agent.getPageRequest('order_by');
      }
      var category = undefined;
      if (agent.getPageRequest('category')) {
        category = agent.getPageRequest('category')
      } else if (this.dataAttribute('category')) {
        category = this.dataAttribute('category')
      }
      if (category != undefined && api_param['_mode'] == 'list') {
        var category_prefix = '';
        if (this.dataAttribute('type') && String(this.dataAttribute('type')).match(/^shop[0-9]/i) != null) {
          category_prefix = String(this.dataAttribute('type')).match(/^(shop[0-9]_)/i)[1];
        }
        if (agent.config(category_prefix + 'category_index')) {
          var category_search_string = String(agent.checkProperty(agent.config(category_prefix + 'category_index'), category, 'search_string'));
          category_search_string = category_search_string.replace(/\{prefix_search0\}/g, category_prefix + 'category0=%');
          category_search_string = category_search_string.replace(/\{prefix_search1\}/g, category_prefix + 'category1=%');
          category_search_string = category_search_string.replace(/\{prefix_search2\}/g, category_prefix + 'category2=%');
          category_search_string = category_search_string.replace(/\{prefix_search3\}/g, category_prefix + 'category3=%');
          category_search_string = category_search_string.replace(/\{postfix_search\}/g, '%');
          category_search_string = category_search_string.replace(/\{logical_connective\}/g, ' OR ');
          category_search_string = category_search_string.replace(/#/g, '');
          api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + category_search_string : category_search_string;
        }
      }
  
      var category0 = undefined;
      if (agent.getPageRequest('category0')) {
        category0 = agent.getPageRequest('category0')
      } else if (this.dataAttribute('category0')) {
        category0 = this.dataAttribute('category0')
      }
      if (category0 != undefined && api_param['_mode'] == 'list') {
        var category_search_string = 'category0=' + category0;
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + category_search_string : category_search_string;
      }
  
      // set _global search ...
      if (agent.getPageRequest('global_search')) {
        var global_search_string = 'all=%' + agent.getPageRequest('global_search') + '%';
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + global_search_string : global_search_string;
      }
  
      // set search ...
      if (item_class && agent.getPageRequest(item_class + 'search')) {
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + agent.getPageRequest(item_class + 'search') : agent.getPageRequest(item_class + 'search');
      } else if (this.dataAttribute('list_search')) {
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + this.dataAttribute('list_search') : this.dataAttribute('list_search');
      }
  
      // set param
      if (param) {
        for (var param_key in param) {
          api_param[param_key] = param[param_key];
        }
      }
  
      // _callback
      api_param['_callback'] = function(data) {
        var callback_element = data['callback_element'];
  
        callback_element.setting('data', data);
        if (agent.session('preview_data')) {
          callback_element.setting('preview_data', agent.session('preview_data'));
        }
  
        if (typeof callback_element.setting('load_callback') == 'function') {
          data['_element_id'] = callback_element.elementID();
          data['callback_element'] = callback_element;
          callback_element.setting('load_callback')(data);
        } else {
          callback_element;
        }
        callback_element.trigger('item_loaded_callback.agent_item', data);
      }
  
      this.api(api_param);
  
      return this;
    },
    loadItemData: function(param) {
      // set _action
      if (!this.request('_action') && this.setting('type')) {
        this.request('_action', this.setting('type'));
      }
  
      var api_param = {};
  
  
      // set _type
      if (!this.request('_action_type')) {
        api_param['_action_type'] = 'load';
      }
  
      // set _mode
      if (!this.request('_mode') && String(this.request('_action')).match(/_posts$/i) != null) {
        api_param['_mode'] = 'posts';
      } else if (!this.request('_mode') && String(this.request('_action')).match(/_detail$/i) != null) {
        api_param['_mode'] = 'detail';
      } else if (!this.request('_mode') && String(this.request('_action')).match(/_list$/i) != null) {
        api_param['_mode'] = 'list';
      } else if (!this.request('_mode')) {
        api_param['_mode'] = 'posts';
      } else {
        api_param['_mode'] = 'posts';
      }
  
      var item_class = this.dataAttribute('item_class') ? this.dataAttribute('item_class') + '_' : '';
  
      // set _idx, _code
      if (agent.getPageRequest(item_class + 'idx')) {
        api_param['_idx'] = agent.getPageRequest(item_class + 'idx');
      } else if (agent.getPageRequest('idx')) {
        api_param['_idx'] = agent.getPageRequest('idx');
      }
      if (agent.getPageRequest(item_class + 'code')) {
        api_param['_code'] = agent.getPageRequest(item_class + 'code');
      } else if (agent.getPageRequest('code')) {
        api_param['_code'] = agent.getPageRequest('code');
      }
  
      // set _length ...
      if (agent.getPageRequest(item_class + 'length')) {
        api_param['_length'] = agent.getPageRequest(item_class + 'length');
      } else if (this.dataAttribute('list_length')) {
        api_param['_length'] = this.dataAttribute('list_length');
      }
      if (agent.getPageRequest(item_class + 'page')) {
        api_param['_page'] = agent.getPageRequest(item_class + 'page');
      } else if (this.dataAttribute('list_page')) {
        api_param['_page'] = this.dataAttribute('list_page');
      }
      if (agent.getPageRequest(item_class + 'order_by')) {
        api_param['_order_by'] = agent.getPageRequest(item_class + 'order_by');
      } else if (this.dataAttribute('list_order_by')) {
        api_param['_order_by'] = this.dataAttribute('list_order_by');
      }
  
      var category = undefined;
      if (agent.getPageRequest('category')) {
        category = agent.getPageRequest('category')
      } else if (this.dataAttribute('category')) {
        category = this.dataAttribute('category')
      }
      if (category != undefined && api_param['_mode'] == 'list') {
        var category_prefix = '';
        if (this.dataAttribute('type') && String(this.dataAttribute('type')).match(/^shop[0-9]/i) != null) {
          category_prefix = String(this.dataAttribute('type')).match(/^(shop[0-9]_)/i)[1];
        }
        if (agent.config(category_prefix + 'category_index')) {
          var category_search_string = String(agent.checkProperty(agent.config(category_prefix + 'category_index'), category, 'search_string'));
          category_search_string = category_search_string.replace(/\{prefix_search0\}/g, category_prefix + 'category0=%');
          category_search_string = category_search_string.replace(/\{prefix_search1\}/g, category_prefix + 'category1=%');
          category_search_string = category_search_string.replace(/\{prefix_search2\}/g, category_prefix + 'category2=%');
          category_search_string = category_search_string.replace(/\{prefix_search3\}/g, category_prefix + 'category3=%');
          category_search_string = category_search_string.replace(/\{postfix_search\}/g, '%');
          category_search_string = category_search_string.replace(/\{logical_connective\}/g, ' OR ');
          category_search_string = category_search_string.replace(/#/g, '');
          if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 1) {
            category_search_string = 'category=10 OR category=11 OR category=12 OR category=13 OR category=14 OR category=15 OR category=16 OR category=17 OR category=18 OR category=19 OR category=1a OR category=1b OR category=1c OR category=1d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 2) {
            category_search_string = 'category=20 OR category=21 OR category=22 OR category=23 OR category=24 OR category=25 OR category=26 OR category=27 OR category=28 OR category=29 OR category=2a OR category=2b OR category=2c OR category=2d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 3) {
            category_search_string = 'category=30 OR category=31 OR category=32 OR category=33 OR category=34 OR category=35 OR category=36 OR category=37 OR category=38 OR category=39 OR category=3a OR category=3b OR category=3c OR category=3d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 4) {
            category_search_string = 'category=40 OR category=41 OR category=42 OR category=43 OR category=44 OR category=45 OR category=46 OR category=47 OR category=48 OR category=49 OR category=4a OR category=4b OR category=4c OR category=4d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 5) {
            category_search_string = 'category=50 OR category=51 OR category=52 OR category=53 OR category=54 OR category=55 OR category=56 OR category=57 OR category=58 OR category=59 OR category=5a OR category=5b OR category=5c OR category=5d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 6) {
            category_search_string = 'category=60 OR category=61 OR category=62 OR category=63 OR category=64 OR category=65 OR category=66 OR category=67 OR category=68 OR category=69 OR category=6a OR category=6b OR category=6c OR category=6d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 7) {
            category_search_string = 'category=70 OR category=71 OR category=72 OR category=73 OR category=74 OR category=75 OR category=76 OR category=77 OR category=78 OR category=79 OR category=7a OR category=7b OR category=7c OR category=7d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 8) {
            category_search_string = 'category=80 OR category=81 OR category=82 OR category=83 OR category=84 OR category=85 OR category=86 OR category=87 OR category=88 OR category=89 OR category=8a OR category=8b OR category=8c OR category=8d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1 && agent.getPageRequest('category') == 9) {
            category_search_string = 'category=90 OR category=91 OR category=92 OR category=93 OR category=94 OR category=95 OR category=96 OR category=97 OR category=98 OR category=99 OR category=9a OR category=9b OR category=9c OR category=9d';
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length == 1) {
            // category_search_string = 'category=' + agent.getPageRequest('category');
          } else if (agent.getPageRequest('category') && String(agent.getPageRequest('category')).length > 1 && String(agent.getPageRequest('category')).match(/^71/) != null) {
            category_search_string = 'category=' + agent.getPageRequest('category');
          }
          //api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + category_search_string : category_search_string;
          category = '' + category;
          var category_index = agent.config('category_index');
          if (category.length == 1) {
            category_search_string = 'category0=' + category_index[category]['name'];
          } else {
            category_search_string = 'category1=' + category_index[category]['name'];
          }
          api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + category_search_string : category_search_string;
        }
      }
  
      var category0 = undefined;
      if (agent.getPageRequest('category0')) {
        category0 = agent.getPageRequest('category0')
      } else if (this.dataAttribute('category0')) {
        category0 = this.dataAttribute('category0')
      }
      if (category0 != undefined && api_param['_mode'] == 'list') {
        var category_search_string = 'category0=' + category0;
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + category_search_string : category_search_string;
      }
  
      // set _global search ...
      if (agent.getPageRequest('global_search')) {
        var global_search_string = 'all=%' + agent.getPageRequest('global_search') + '%';
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + global_search_string : global_search_string;
      }
  
      // set search ...
      if (agent.getPageRequest(item_class + 'search')) {
        api_param['_search'] = api_param['_search'] ? api_param['_search'] + ' AND ' + agent.getPageRequest(item_class + 'search') : agent.getPageRequest(item_class + 'search');
      }
  
      // set param
      if (param) {
        for (var param_key in param) {
          api_param[param_key] = param[param_key];
        }
      }
  
      // _callback
      api_param['_callback'] = function(data) {
        if (agent.getPageRequest('p') == 'mypage_01order' && agent.checkProperty(data, 'item', 0)) {
          for (var i = 0; i < data['item'].length; i++) {
            delete data['item'][i]['image0'];
            delete data['item'][i]['goods_name'];
            delete data['item'][i]['image0'];
          }
        }
  
        var callback_element = data['callback_element'];
  
        if (callback_element.setting('previous_item')) {
          if (data['item'].length > 0) {
            data['item'] = callback_element.setting('previous_item').concat(data['item']);
            data['items'] = callback_element.setting('previous_item').concat(data['items']);
          } else {
            return;
          }
        }
  
        callback_element.setting('data', data);
        if (agent.checkProperty(data, 'item', 0)) {
          callback_element.setting('item_data', data['item'][0]);
        }
        if (agent.session('preview_item_data')) {
          callback_element.setting('preview_item_data', agent.session('preview_item_data'));
        }
        if (agent.checkProperty(data, 'template_data', 0)) {
          callback_element.setting('template_item_data', data['template_data'][0]);
        }
        if (typeof callback_element.setting('load_callback') == 'function') {
          data['_element_id'] = callback_element.elementID();
          data['callback_element'] = callback_element;
          callback_element.setting('load_callback')(data);
        } else {
          callback_element.itemRendering();
        }
        callback_element.trigger('load_item_callback.agent_item', data);
      }
  
      this.api(api_param);
  
      return this;
    },
    submitItem: function() {
      // set _action
      if (!this.request('_action') && this.setting('type')) {
        this.request('_action', this.setting('type'));
      }
      // set _action_type
      if (!this.request('_action_type')) {
        this.request('_action_type', 'submit');
      }
      if (this.bindElement('field').checkValue()) {
        var api_param = {};
  
        // set _mode
        if (!this.request('_mode')) {
          if (this.request('_action_type') == 'submit' && agent.getPageRequest('idx')) {
            api_param['_mode'] = 'update';
          } else if (this.request('_action_type') == 'submit') {
            api_param['_mode'] = 'insert';
          } else if (this.request('_action_type') == 'template' && this.setting('template_item_data')) {
            api_param['_mode'] = 'update';
          } else if (this.request('_action_type') == 'template') {
            api_param['_mode'] = 'insert';
          }
        }
  
        var item_class = this.dataAttribute('item_class') ? this.dataAttribute('item_class') + '_' : '';
  
        // set _idx, _code
        if (agent.getPageRequest(item_class + 'idx')) {
          api_param['_idx'] = agent.getPageRequest(item_class + 'idx');
        } else if (agent.getPageRequest('idx')) {
          api_param['_idx'] = agent.getPageRequest('idx');
        }
        if (agent.getPageRequest(item_class + 'code')) {
          api_param['_code'] = agent.getPageRequest(item_class + 'code');
        } else if (agent.getPageRequest('code')) {
          api_param['_code'] = agent.getPageRequest('code');
        }
        // _callback
        api_param['_callback'] = function(data) {
          var callback_element = data['callback_element'];
          callback_element.setting('data', data);
          callback_element.trigger('submit_callback.agent_item', data);
        }
        // set submit_item_data
        this.initItem().setMemberFields().initMemberFields().setSubmitItemData();
        //TODO init is mobile, phone is set ''
        var submit_item_data = this.setting('submit_item_data') ? this.setting('submit_item_data') : {};
        for (var submit_item_key in submit_item_data) {
          api_param[submit_item_key] = submit_item_data[submit_item_key];
        }
        if (typeof this.setting('submit') == 'function') {
          api_param['_element_id'] = this.elementID();
          api_param['submit_element'] = this;
          this.setting('submit')(api_param);
        } else {
          this.api(api_param);
        }
      }
      return this;
    },
    setSubmitItemData: function() {
      var submit_item_data = this.setting('submit_item_data') ? this.setting('submit_item_data') : {};
      var member_fields = this.bindElements('member_fields').length > 0 ? this.bindElements('member_fields') : this.bindElements('field');
      for (var i = 0; i < member_fields.length; i++) {
        var field_item = member_fields.eq(i);
        if (field_item.setting('do_not_submit')) {
          continue;
        }
        var field = field_item.dataAttribute('field');
        if (!field) {
          continue;
        }
        if (String(field).match(/option_[0-9]_(list|item|section)/i) != null || String(field).match(/option_list_item/i) != null) {
          continue;
        } else if (String(field).match(/option_[0-9]_/i) != null) {
          field_item.setting('field_key', field);
        }
  
  
        var field_key = field_item.setting('field_key') ? field_item.setting('field_key') : field;
        if (field_item.setting('submit_field_key')) {
          field_key = field_item.setting('submit_field_key');
        }
        var field_type = field_item.setting('field_type') ? field_item.setting('field_type') : 'string';
        var field_display_type = field_item.setting('field_display_type') ? field_item.setting('field_display_type') : '';
        var field_value = '';
        if (field_item.dataAttribute('role') == 'froala') {
          field_value = field_item.froalaEditor('html.get');
        } else if (field_item.is('textarea')) {
          field_value = String(field_item.getDisplayValue()).replace(/\n/g, '<br />');
        } else if (field_display_type == 'cash') {
          field_value = String(field_item.getDisplayValue()).replace(/\,/g, '');
        } else if (field_display_type == 'datetime') {
          field_value = field_item.getDisplayValue();
          field_value = String(field_value).toDatetimeString('YYYY-MM-DD HH:mm:SS');
        } else {
          field_value = field_item.getValue();
        }
        if (field_type == 'flag') {
          submit_item_data[field_key] = submit_item_data[field_key] ? submit_item_data[field_key] | field_value : field_value;
        } else {
          if (!field_value && submit_item_data[field_key]) {
            // case 2 more same name
          } else {
            submit_item_data[field_key] = field_value;
          }
        }
      }
      for (var submit_item_key in submit_item_data) {
        if (typeof submit_item_data[submit_item_key] == 'object') {
          submit_item_data[submit_item_key] = JSON.stringify(submit_item_data[submit_item_key]);
        }
        if (submit_item_key.match(/_date$/i) != null) {
          var pure_field_string = submit_item_key.replace(/_date$/i, '');
          var datetime_key_string = pure_field_string + '_datetime';
          if (!submit_item_data[datetime_key_string]) {
            var hours = submit_item_data[pure_field_string + '_time_hours'] ? Number(submit_item_data[pure_field_string + '_time_hours']) : 0;
            hours = submit_item_data[pure_field_string + '_time_meridiem'] && String(submit_item_data[pure_field_string + '_time_meridiem']).match(/pm/i) != null ? hours + 12 : hours;
            hours = hours < 10 ? '0' + hours : '' + hours;
            var minutes = submit_item_data[pure_field_string + '_time_minutes'] ? Number(submit_item_data[pure_field_string + '_time_minutes']) : 0;
            minutes = minutes < 10 ? '0' + minutes : '' + minutes;
            var seconds = submit_item_data[pure_field_string + '_time_seconds'] ? Number(submit_item_data[pure_field_string + '_time_seconds']) : 0;
            seconds = seconds < 10 ? '0' + seconds : '' + seconds;
            submit_item_data[datetime_key_string] = submit_item_data[submit_item_key] + ' ' + hours + ':' + minutes + ':' + seconds;
          }
        }
      }
      this.setting('submit_item_data', submit_item_data);
      return this;
    },
  });
  
  _common.initSetting = {
    'common': {
      '_setting_type': 'default',
      'link': null,
      'detail_link': null,
      'modify_link': null,
      'string_insert_success_en': 'success',
      'string_update_success_en': 'success',
      'string_delete_success_en': 'success',
      'string_insert_success_ko': '�깅줉�섏뿀�듬땲��',
      'string_update_success_ko': '�섏젙�섏뿀�듬땲��',
      'string_delete_success_ko': '��젣�섏뿀�듬땲��',
      'string_no_data': null,
      '_event': {
        'preview.agent_item': function(event) {},
        'item_rendering_callback.agent_item': function(event, data) {
          if (typeof agent(this).setting('rendering_callback') == 'function') {
            data['_element_id'] = agent(this).elementID();
            data['callback_element'] = agent(this);
            agent(this).setting('rendering_callback')(data);
          }
        },
        'positive_callback_on_message_dialog.agent_dialog': function(event, data) {
          if (typeof agent(this).dataAttribute('link')) {
            agent(this).link();
          }
        },
        'submit_callback.agent_item': function(event, data) {
          if (typeof agent(this).setting('submit_callback') == 'function') {
            agent(this).setting('submit_callback')(data);
          } else {
            var dialog_message = '';
            var after_link = '';
            if (data['code'] == '000') {
              if (agent(this).dataAttribute('link_after_success')) {
                after_link = agent(this).dataAttribute('link_after_success');
                dialog_message = '';
              } else if (agent(this).string(data['_mode'] + '_success')) {
                // data['_mode'] : insert, update ...
                dialog_message = agent(this).string(data['_mode'] + '_success');
              } else if (agent(this).string('success')) {
                dialog_message = agent(this).string('success');
              }
            } else if (data['code'] != '000' && data['error_message']) {
              agent.showMessage(data['error_message']);
              return;
            } else if (data['code'] != '000') {
              if (agent(this).dataAttribute('link_after_fail')) {
                after_link = agent(this).dataAttribute('link_after_fail');
                dialog_message = '';
              } else if (agent(this).string(data['_mode'] + '_fail')) {
                // data['_mode'] : insert, update ...
                dialog_message = agent(this).string(data['_mode'] + '_fail');
              } else if (agent(this).string('success')) {
                dialog_message = agent(this).string('success');
              }
            }
            if (agent.getPageRequest('p') == 'admin_product_write') {
              agent(this).dataAttribute('link', 'admin_product_list').link();
              return;
            } else if (agent.getPageRequest('p') == 'admin_product_write_p') {
              agent(this).dataAttribute('link', 'admin_product_list_p').link();
              return;
            }
            if (dialog_message) {
              agent(this).setting({
                'dialog': 'message',
                'string_dialog_message': dialog_message,
                '_event': {
                  'dismiss.agent_dialog': function(event) {
                    if (agent(this).setting('link_after_dismiss_dialog')) {
                      agent(this).link(agent(this).setting('link_after_dismiss_dialog'));
                    } else if (agent(this).parents('[data-r-role="dialog"]').length > 0) {
  
                    } else {
                      //history.back();
                      agent.reload();
                    }
                  },
                },
              }).showDialog();
            } else if (after_link) {
              agent(this).dataAttribute('link', after_link).link();
            } else {
              if (data['message'] && String(data['message']).match(/^[A-z0-9\s]{1,}$/) == null) {
                agent.showMessage(data['message']);
              } else {
                agent.showMessage('�쒕쾭 �꾩넚�� �ㅽ뙣�섏��듬땲��.');
              }
            }
          }
        },
      },
    },
    'common_fields': {
      'more': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_item': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            agent(this).setting('item_body').request('_order_by', '').loadItemData();
          },
        },
      },
      'order_by_default': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_item': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            agent(this).setting('item_body').request('_order_by', '').loadItemData();
          },
        },
      },
      'order_by_new': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_item': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            agent(this).setting('item_body').request('_order_by', 'new').loadItemData();
          },
        },
      },
      'order_by_low_price': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_item': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            agent(this).setting('item_body').request('_order_by', 'point_asc').loadItemData();
          },
        },
      },
      'order_by_high_price': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_item': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            agent(this).setting('item_body').request('_order_by', 'point_desc').loadItemData();
          },
        },
      },
      'item': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'update_item.agent_item': function(event, data) {
            if (data && data['set'] && agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              var item_data = agent(this).setting('data');
              var action = agent(this).setting('item_body').request('_action');
              var api_param = {};
              api_param['_action'] = action;
              api_param['_action_type'] = 'submit';
              api_param['_submit_mode'] = 'update';
              api_param['_mode'] = 'update';
              api_param['_set'] = data['set'];
              api_param['_idx'] = item_data['idx'];
              agent(this).api(api_param);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
          'click.agent_item': function(event) {
            if (agent(this).next('[data-r-field="item_part1_hidden"]').length > 0) {
              if (agent(this).next('[data-r-field="item_part1_hidden"]').is(':visible')) {
                agent(this).removeClass('on');
                agent(this).next('[data-r-field="item_part1_hidden"]').hide().removeClass('on');
              } else {
                agent(this).addClass('on');
                agent(this).next('[data-r-field="item_part1_hidden"]').fadeIn(300).addClass('on');
              }
            }
          },
        },
      },
      'event_items': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'update_item.agent_item': function(event, data) {
            if (data && data['set'] && agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              var item_data = agent(this).setting('data');
              var action = agent(this).setting('item_body').request('_action');
              var api_param = {};
              api_param['_action'] = action;
              api_param['_action_type'] = 'submit';
              api_param['_mode'] = 'update';
              api_param['_set'] = data['set'];
              api_param['_idx'] = item_data['idx'];
              agent(this).api(api_param);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
          'click.agent_item': function(event) {
            if (agent(this).next('[data-r-field="event_items_part1_hidden"]').length > 0) {
              if (agent(this).next('[data-r-field="event_items_part1_hidden"]').is(':visible')) {
                agent(this).removeClass('on');
                agent(this).next('[data-r-field="event_items_part1_hidden"]').hide().removeClass('on');
              } else {
                agent(this).addClass('on');
                agent(this).next('[data-r-field="event_items_part1_hidden"]').fadeIn(300).addClass('on');
              }
            }
          },
        },
      },
      'checkbox_all': {
        '_setting_type': 'default',
        'field_type': 'checkbox',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            var data = agent(this).setting('item_body').setting('data');
            var checkbox_value = agent(this).prop('checked');
            data['checkbox_all'] = checkbox_value;
            if (data['cart_list_item']) {
              var buy_list_item = [];
              for (var i = 0; i < data['cart_list_item'].length; i++) {
                data['cart_list_item'][i]['checkbox'] = checkbox_value;
                if (data['cart_list_item'][i]['checkbox']) {
                  buy_list_item.push(data['cart_list_item'][i]);
                }
              }
              data['buy_list_item'] = buy_list_item;
              data = _common.makeBuyListData(data);
              agent(this).setting('item_body').setting('data', data).itemRendering();
            } else {
              agent(this).setting('item_body').find('[data-r-field="checkbox"]').prop('checked', agent(this).prop('checked'));
            }
          },
        },
      },
      'checkbox': {
        '_setting_type': 'default',
        'field_type': 'checkbox',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('item_body')) {
              var data = agent(this).setting('item_body').setting('item_body').setting('data');
              var item_data = agent(this).setting('item_body').setting('data');
              var checkbox_value = agent(this).prop('checked');
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              data['checkbox_all'] = checkbox_value;
              if (data['cart_list_item']) {
                var buy_list_item = [];
                for (var i = 0; i < data['cart_list_item'].length; i++) {
                  if (i == list_item_index) {
                    data['cart_list_item'][i]['checkbox'] = !data['cart_list_item'][i]['checkbox'];
                  }
                  data['checkbox_all'] = data['checkbox_all'] && data['cart_list_item'][i]['checkbox'];
                  if (data['cart_list_item'][i]['checkbox']) {
                    buy_list_item.push(data['cart_list_item'][i]);
                  }
                }
                data['buy_list_item'] = buy_list_item;
                data = _common.makeBuyListData(data);
                agent(this).setting('item_body').setting('item_body').setting('data', data).itemRendering();
              } else {
                if (agent(this).setting('item_body').find('[data-r-field="checkbox"]').length == agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked').length) {
                  agent(this).setting('item_body').find('[data-r-field="checkbox_all"]').prop('checked', true);
                } else {
                  agent(this).setting('item_body').find('[data-r-field="checkbox_all"]').prop('checked', false);
                }
              }
            }
          },
        },
      },
      'option_0_list': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'option_0_item': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'option_0_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            agent(this).setting('item_body').setting('option_0_list_body', list_body);
            var base_option_0_section = list_body.find('[data-r-field="option_0_section"],[data-r-field="option_0_hidden_section"]');
            agent(this).setting('item_body').setting('base_option_0_section', base_option_0_section);
            agent(this).setting('item_body').setting('option_0_section_clone', base_option_0_section.clone(true, true));
          },
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data');
            var list_body = agent(this).setting('item_body').setting('option_0_list_body');
            var base_section = agent(this).setting('item_body').setting('base_option_0_section');
            var section_clone = agent(this).setting('item_body').setting('option_0_section_clone');
            list_body.find('[data-r-field="option_0_section"],[data-r-field="option_0_hidden_section"]').not(base_section).remove();
            if (!item_data['indexed_option_items']) {
              return;
            }
            if (item_data['indexed_option_items']['0'] && item_data['indexed_option_items']['0']['status'] && (!item_data['indexed_option_items']['0']['status'] || item_data['indexed_option_items']['0']['status'] == 'false')) {
              agent(this).hide();
              return;
            }
            var option_0_index = 0;
            for (var option_item_key in item_data['indexed_option_items']) {
              if (String(option_item_key).match(/^0_/) != null) {
                var option_section = base_section;
                if (option_0_index > 0) {
                  option_section = section_clone.clone(true, true);
                  list_body.append(option_section);
                }
                option_section.setting('data', item_data['indexed_option_items'][option_item_key]).setMemberFields().initMemberFields().itemRendering().show();
                var section_member_fields = option_section.bindElements('member_fields');
                for (var i = 0; i < section_member_fields.length; i++) {
                  section_member_fields.eq(i).dataAttribute('field', 'option_' + option_item_key + '_' + section_member_fields.eq(i).dataAttribute('field'));
                }
                option_0_index++;
                option_section.on('click', function(event) {
                  var option_name = agent(this).find('.option_name').getDisplayValue();
                  var option_price = agent(this).find('.option_price').getHiddenValue();
                  agent('[data-r-field="selected_option_0_name"]').setDisplayValue(option_name);
                  agent('[data-r-field="price_total"]').setting('option_0_price', Number(option_price));
                  var price_total = 0;
                  if (agent('[data-r-field="price_total"]').setting('option_0_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_0_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_1_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_1_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_2_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_2_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_3_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_3_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_4_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_4_price'));
                  }
                  agent('[data-r-field="price_total"]').setHiddenValue(price_total).setDisplayValue(String(price_total).toCashString());
                  agent('.gift-pro_spacepay,.gift-pro_serviceselect').hide();
                });
              }
            }
          },
        },
      },
      'option_2_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            agent(this).setting('item_body').setting('option_2_list_body', list_body);
            var base_option_2_section = list_body.find('[data-r-field="option_2_section"],[data-r-field="option_2_hidden_section"]');
            agent(this).setting('item_body').setting('base_option_2_section', base_option_2_section);
            agent(this).setting('item_body').setting('option_2_section_clone', base_option_2_section.clone(true, true));
          },
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data');
            var list_body = agent(this).setting('item_body').setting('option_2_list_body');
            var base_section = agent(this).setting('item_body').setting('base_option_2_section');
            var section_clone = agent(this).setting('item_body').setting('option_2_section_clone');
            list_body.find('[data-r-field="option_2_section"],[data-r-field="option_2_hidden_section"]').not(base_section).remove();
  
            if (!item_data['indexed_option_items']) {
              return;
            }
            if (item_data['indexed_option_items']['2'] && item_data['indexed_option_items']['2']['status'] && (!item_data['indexed_option_items']['2']['status'] || item_data['indexed_option_items']['2']['status'] == 'false')) {
              agent(this).hide();
              agent(this).parents('.gift-pro_optionService').hide();
              return;
            }
            var option_2_index = 0;
            for (var option_item_key in item_data['indexed_option_items']) {
              if (String(option_item_key).match(/^2_/) != null) {
                var option_section = base_section;
                if (option_2_index > 0) {
                  option_section = section_clone.clone(true, true);
                  list_body.append(option_section);
                }
                option_section.setting('data', item_data['indexed_option_items'][option_item_key]).setMemberFields().initMemberFields().itemRendering().show();
                var section_member_fields = option_section.bindElements('member_fields');
                for (var i = 0; i < section_member_fields.length; i++) {
                  section_member_fields.eq(i).dataAttribute('field', 'option_' + option_item_key + '_' + section_member_fields.eq(i).dataAttribute('field'));
                }
                option_2_index++;
                option_section.on('click', function(event) {
                  var option_name = agent(this).find('.option_name').getDisplayValue();
                  var option_price = agent(this).find('.option_price').getHiddenValue();
                  agent('[data-r-field="selected_option_2_name"]').setDisplayValue(option_name);
                  agent('[data-r-field="price_total"]').setting('option_2_price', Number(option_price));
                  var price_total = 0;
                  if (agent('[data-r-field="price_total"]').setting('option_0_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_0_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_1_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_1_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_2_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_2_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_3_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_3_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_4_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_4_price'));
                  }
                  agent('[data-r-field="price_total"]').setHiddenValue(price_total).setDisplayValue(String(price_total).toCashString());
                  agent('.gift-pro_spacepay,.gift-pro_serviceselect').hide();
                });
              }
            }
          },
        },
      },
      'option_3_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            agent(this).setting('item_body').setting('option_3_list_body', list_body);
            var base_option_3_section = list_body.find('[data-r-field="option_3_section"],[data-r-field="option_3_hidden_section"]');
            agent(this).setting('item_body').setting('base_option_3_section', base_option_3_section);
            agent(this).setting('item_body').setting('option_3_section_clone', base_option_3_section.clone(true, true));
          },
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data');
            var list_body = agent(this).setting('item_body').setting('option_3_list_body');
            var base_section = agent(this).setting('item_body').setting('base_option_3_section');
            var section_clone = agent(this).setting('item_body').setting('option_3_section_clone');
            list_body.find('[data-r-field="option_3_section"],[data-r-field="option_3_hidden_section"]').not(base_section).remove();
  
            if (!item_data['indexed_option_items']) {
              return;
            }
            if (item_data['indexed_option_items']['3'] && item_data['indexed_option_items']['3']['status'] && (!item_data['indexed_option_items']['3']['status'] || item_data['indexed_option_items']['3']['status'] == 'false')) {
              agent(this).hide();
              agent(this).parents('.gift-pro_optionService').hide();
              return;
            }
            var option_3_index = 0;
            for (var option_item_key in item_data['indexed_option_items']) {
              if (String(option_item_key).match(/^3_/) != null) {
                var option_section = base_section;
                if (option_3_index > 0) {
                  option_section = section_clone.clone(true, true);
                  list_body.append(option_section);
                }
                option_section.setting('data', item_data['indexed_option_items'][option_item_key]).setMemberFields().initMemberFields().itemRendering().show();
                var section_member_fields = option_section.bindElements('member_fields');
                for (var i = 0; i < section_member_fields.length; i++) {
                  section_member_fields.eq(i).dataAttribute('field', 'option_' + option_item_key + '_' + section_member_fields.eq(i).dataAttribute('field'));
                }
                option_3_index++;
                option_section.on('click', function(event) {
                  var option_name = agent(this).find('.option_name').getDisplayValue();
                  var option_price = agent(this).find('.option_price').getHiddenValue();
                  agent('[data-r-field="price_total"]').setting('option_3_price', Number(option_price));
                  agent('[data-r-field="selected_option_3_name"]').setDisplayValue(option_name);
                  var price_total = 0;
                  if (agent('[data-r-field="price_total"]').setting('option_0_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_0_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_1_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_1_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_2_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_2_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_3_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_3_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_4_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_4_price'));
                  }
                  agent('[data-r-field="price_total"]').setHiddenValue(price_total).setDisplayValue(String(price_total).toCashString());
                  agent('.gift-pro_spacepay,.gift-pro_serviceselect').hide();
                });
              }
            }
          },
        },
      },
      'option_4_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            agent(this).setting('item_body').setting('option_4_list_body', list_body);
            var base_option_4_section = list_body.find('[data-r-field="option_4_section"],[data-r-field="option_4_hidden_section"]');
            agent(this).setting('item_body').setting('base_option_4_section', base_option_4_section);
            agent(this).setting('item_body').setting('option_4_section_clone', base_option_4_section.clone(true, true));
          },
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data');
            var list_body = agent(this).setting('item_body').setting('option_4_list_body');
            var base_section = agent(this).setting('item_body').setting('base_option_4_section');
            var section_clone = agent(this).setting('item_body').setting('option_4_section_clone');
            list_body.find('[data-r-field="option_4_section"],[data-r-field="option_4_hidden_section"]').not(base_section).remove();
  
            if (!item_data['indexed_option_items']) {
              return;
            }
            if (item_data['indexed_option_items']['4'] && item_data['indexed_option_items']['4']['status'] && (!item_data['indexed_option_items']['4']['status'] || item_data['indexed_option_items']['4']['status'] == 'false')) {
              agent(this).hide();
              agent(this).parents('.gift-pro_optionService').hide();
              return;
            }
            var option_4_index = 0;
            for (var option_item_key in item_data['indexed_option_items']) {
              if (String(option_item_key).match(/^4_/) != null) {
                var option_section = base_section;
                if (option_4_index > 0) {
                  option_section = section_clone.clone(true, true);
                  list_body.append(option_section);
                }
                option_section.setting('data', item_data['indexed_option_items'][option_item_key]).setMemberFields().initMemberFields().itemRendering().show();
                var section_member_fields = option_section.bindElements('member_fields');
                for (var i = 0; i < section_member_fields.length; i++) {
                  section_member_fields.eq(i).dataAttribute('field', 'option_' + option_item_key + '_' + section_member_fields.eq(i).dataAttribute('field'));
                }
                option_4_index++;
                option_section.on('click', function(event) {
                  var option_name = agent(this).find('.option_name').getDisplayValue();
                  var option_price = agent(this).find('.option_price').getHiddenValue();
                  agent('[data-r-field="selected_option_4_name"]').setDisplayValue(option_name);
                  agent('[data-r-field="price_total"]').setting('option_4_price', Number(option_price));
                  var price_total = 0;
                  if (agent('[data-r-field="price_total"]').setting('option_0_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_0_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_1_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_1_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_2_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_2_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_3_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_3_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_4_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_4_price'));
                  }
                  agent('[data-r-field="price_total"]').setHiddenValue(price_total).setDisplayValue(String(price_total).toCashString());
                  agent('.gift-pro_spacepay,.gift-pro_serviceselect').hide();
                });
              }
            }
          },
        },
      },
      'option_1_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            agent(this).setting('item_body').setting('option_1_list_body', list_body);
            var base_option_1_section = list_body.find('[data-r-field="option_1_section"],[data-r-field="option_1_hidden_section"]');
            agent(this).setting('item_body').setting('base_option_1_section', base_option_1_section);
            agent(this).setting('item_body').setting('option_1_section_clone', base_option_1_section.clone(true, true));
          },
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data');
            var list_body = agent(this).setting('item_body').setting('option_1_list_body');
            var base_section = agent(this).setting('item_body').setting('base_option_1_section');
            var section_clone = agent(this).setting('item_body').setting('option_1_section_clone');
            list_body.find('[data-r-field="option_1_section"],[data-r-field="option_1_hidden_section"]').not(base_section).remove();
  
            if (!item_data['indexed_option_items']) {
              return;
            }
            if (item_data['indexed_option_items']['1'] && item_data['indexed_option_items']['1']['status'] && (!item_data['indexed_option_items']['1']['status'] || item_data['indexed_option_items']['1']['status'] == 'false')) {
              agent(this).hide();
              agent(this).parents('.gift-pro_optionService').hide();
              return;
            }
            var option_1_index = 0;
            for (var option_item_key in item_data['indexed_option_items']) {
              if (String(option_item_key).match(/^1_/) != null) {
                var option_section = base_section;
                if (option_1_index > 0) {
                  option_section = section_clone.clone(true, true);
                  list_body.append(option_section);
                }
                option_section.setting('data', item_data['indexed_option_items'][option_item_key]).setMemberFields().initMemberFields().itemRendering().show();
                var section_member_fields = option_section.bindElements('member_fields');
                for (var i = 0; i < section_member_fields.length; i++) {
                  section_member_fields.eq(i).dataAttribute('field', 'option_' + option_item_key + '_' + section_member_fields.eq(i).dataAttribute('field'));
                }
                option_1_index++;
                option_section.on('click', function(event) {
                  var option_name = agent(this).find('.option_name').getDisplayValue();
                  var option_price = agent(this).find('.option_price').getHiddenValue();
                  agent('[data-r-field="selected_option_1_name"]').setDisplayValue(option_name);
                  agent('[data-r-field="price_total"]').setting('option_1_price', Number(option_price));
                  var price_total = 0;
                  if (agent('[data-r-field="price_total"]').setting('option_0_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_0_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_1_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_1_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_2_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_2_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_3_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_3_price'));
                  }
                  if (agent('[data-r-field="price_total"]').setting('option_4_price')) {
                    price_total = price_total + Number(agent('[data-r-field="price_total"]').setting('option_4_price'));
                  }
                  agent('[data-r-field="price_total"]').setDisplayValue(price_total);
                  agent('.gift-pro_spacepay,.gift-pro_serviceselect').hide();
                });
              }
            }
          },
        },
      },
      'option_items': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var list_body = agent(this).parent();
            list_body.setting('item_body', agent(this).setting('item_body'));
            agent(this).setting('list_body', list_body);
            list_body.setMemberFields();
            var list_body_member_fields = agent(this);
            list_body.setting('base_member_fields', list_body_member_fields);
            var base_member_fields_clone = list_body_member_fields.clone(true, true);
            list_body.setting('base_member_fields_clone', base_member_fields_clone);
          },
          'rendering_items.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data') ? agent(this).setting('item_body').setting('data') : {};
            if (typeof item_data['option_items'] == 'string' && item_data['option_items'].match(/^[\[\{]/) != null) {
              try {
                item_data['option_items'] = JSON.parse(item_data['option_items']);
              } catch (e) {
                item_data['option_items'] = {};
              }
            }
            item_data['option_items'] = typeof item_data['option_items'] == 'object' ? item_data['option_items'] : {};
            agent(this).setting('item_body').setting('data', item_data);
  
            var list_body = agent(this).setting('list_body');
            list_body.setting('item_body', agent(this).setting('item_body'));
            list_body.setMemberFields();
            var list_body_member_fields = list_body.bindElements('member_fields');
            var base_member_fields = list_body.setting('base_member_fields');
            var base_member_fields_clone = list_body.setting('base_member_fields_clone');
            list_body_member_fields.filter('[data-r-field="option_items"]').not(base_member_fields).remove();
            var option_index = agent(this).dataAttribute('option_index') ? Number(agent(this).dataAttribute('option_index')) : 0;
            if (typeof item_data['option_items'][option_index] == 'object' && item_data['option_items'][option_index].length) {
              for (var i = 0; i < item_data['option_items'][option_index].length; i++) {
                var option_item = item_data['option_items'][option_index][i];
                if (i == 0) {
                  // TODO infinity loop .fieldRendering()
                  base_member_fields.applyFieldSettings().setting('rendering_data', option_item).setMemberFields().initMemberFields();
  
                  if (option_item['option_status'] > -1) {
                    base_member_fields.show();
                  } else {
                    base_member_fields.hide();
                  }
                  var option_item_member_fields = base_member_fields.bindElements('member_fields');
                  option_item_member_fields.filter('[data-r-field="option_name"]').setting('rendering_data', option_item['option_name']).applyFieldSettings().fieldRendering();
                  option_item_member_fields.filter('[data-r-field="option_price"]').setting('rendering_data', option_item['option_price']).applyFieldSettings().fieldRendering();
                } else {
                  var new_member_fields = base_member_fields_clone.clone(true, true);
                  new_member_fields.applyFieldSettings().setting('rendering_data', option_item).setMemberFields().initMemberFields();
                  if (option_item['option_status'] > -1) {
                    new_member_fields.show();
                  } else {
                    new_member_fields.hide();
                  }
                  list_body.append(new_member_fields);
                  var option_item_member_fields = new_member_fields.bindElements('member_fields');
                  option_item_member_fields.filter('[data-r-field="option_name"]').setting('rendering_data', option_item['option_name']).applyFieldSettings().fieldRendering();
                  option_item_member_fields.filter('[data-r-field="option_price"]').setDisplayValue(String(option_item['option_price']).toCashString()).setHiddenValue(option_item['option_price']);
                }
              }
              agent('[data-r-field="option_items"]').on('click', function(event) {
                var option_name = agent(this).find('[data-r-field="option_name"]').getDisplayValue();
                var option_price = agent(this).find('[data-r-field="option_price"]').getHiddenValue();
                var item_data = agent('[data-r-type="goods_detail"]').setting('data');
                var buy_list_items = [];
                var buy_item = {};
                buy_item['image0'] = item_data['image0'];
                buy_item['goods_name'] = item_data['goods_name'] + ' ' + option_name;
                buy_item['price'] = option_price;
                buy_list_items.push(buy_item);
                var buy_data = _common.makeBuyListData(buy_list_items);
                agent('[data-r-type="goods_detail"]').find('[data-r-field="price_total"]').setDisplayValue(String(buy_data['price_total']).toCashString());
                agent.session('agent_buy_list', JSON.stringify(buy_data['buy_list_item']));
  
                agent('.gift-pro_spacepay').hide();
                agent('.gift-pro_selectTitle').setDisplayValue(option_name);
              });
  
            }
          },
          'change_item.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var item_data = agent(this).setting('item_body').setting('data') ? agent(this).setting('item_body').setting('data') : {};
            item_data['option_items'] = item_data['option_items'] ? item_data['option_items'] : {};
            var option_index = agent(this).dataAttribute('option_index') ? Number(agent(this).dataAttribute('option_index')) : 0;
            item_data['option_items'][option_index] = item_data['option_items'][option_index] ? item_data['option_items'][option_index] : [];
  
            agent(this).setting('list_body').setMemberFields();
            agent(this).setting('list_body').find('[data-r-field]').applyFieldSettings();
            var option_item_values = agent(this).setting('list_body').getMemberFieldsValues();
            if (option_item_values['option_items']) {
              for (var i = 0; i < option_item_values['option_items'].length; i++) {
                if (option_item_values['option_items'][i]['option_status'] == undefined) {
                  option_item_values['option_items'][i]['option_status'] = 0;
                }
              }
              item_data['option_items'][option_index] = option_item_values;
            }
            // TODO
            agent('[data-r-type="goods_posts"]').request('option_items', item_data['option_items']);
          },
        },
      },
      'option_price': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'cash',
      },
      'submit': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (agent(this).is(caller)) {
              agent(this).find('[data-r-field]').setDisplayValue('');
            }
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (agent(this).is(caller)) {
              agent(this).find('[data-r-field]').setDisplayValue('');
            }
            agent(this).setting('item_body').request('_action_type', 'submit').submitItem();
          },
        },
      },
      'submit_search': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'search_target': null,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            // agent('[data-r-field="search"],[data-r-field="search_start_date"],[data-r-field="search_end_date"]').trigger('set_search_request.agent_field');
            agent('.search_word_input').trigger('set_search_request.agent_field').trigger('search_list.agent_field');
  
            // var search_in_page = true;
            // if (agent(this).dataAttribute('field_class') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').length > 0) {
            //   agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').trigger('search_list.agent_field');
            //   search_in_page = false;
            // }
            // if (search_in_page) {
            //   var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            //   agent.replaceState(item_class + 'page', 1);
            //   agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            // }
          },
        },
      },
      'clear_search': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            agent('[data-r-field="search"],[data-r-field="search_start_date"],[data-r-field="search_end_date"]').setDisplayValue('');
  
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            agent.deletePageRequest(item_class + 'search');
            agent.replaceState(item_class + 'page', 1);
            agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
          },
        },
      },
      'select_search_key': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'change.agent_field': function(event) {
            var search_key = agent(this).getDisplayValue();
            if (search_key && agent(this).dataAttribute('field_class')) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="search"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').setting('search_key', search_key).trigger('change.agent_field');
            } else if (search_key) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="search"]').setting('search_key', search_key).trigger('change.agent_field');
            }
          },
        },
      },
      'select_search_format': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'change.agent_field': function(event) {
            var search_format = agent(this).getDisplayValue();
            if (search_format && agent(this).dataAttribute('field_class')) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="search"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').setting('search_format', search_format).trigger('change.agent_field');
            } else if (search_format) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="search"]').setting('search_format', search_format).trigger('change.agent_field');
            }
          },
        },
      },
      'search': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'search_key': 'all',
        'search_format': '{search_key}=%{search_value}%',
        'search_target': null,
        'logical_connective': 'AND',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            if (!agent(this).dataAttribute('field_class')) {
              agent(this).dataAttribute('field_class', 'search');
            }
            var select_search_key_element = agent();
            if (agent(this).dataAttribute('field_class')) {
              select_search_key_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_key"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]');
            } else {
              select_search_key_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_key"]');
            }
            if (select_search_key_element.length > 0 && select_search_key_element.eq(0).val()) {
              agent(this).setting('search_key', select_search_key_element.eq(0).val());
            }
            var select_search_format_element = agent();
            if (agent(this).dataAttribute('field_class') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="search"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').length > 0) {
              select_search_format_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_format"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]');
            } else {
              select_search_format_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_format"]');
            }
            if (select_search_format_element.length > 0 && select_search_format_element.eq(0).val()) {
              agent(this).setting('search_format', select_search_format_element.eq(0).val());
            }
          },
          'search_list.agent_field': function(event) {
            var search_in_page = true;
            if (agent(this).dataAttribute('field_class')) {
              var search_fields = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]');
              for (var i = 0; i < search_fields.length; i++) {
                if (String(search_fields.eq(i).dataAttribute('field')).match(/list$/i) != null) {
                  search_in_page = false;
                  search_fields.eq(i).trigger('set_search_request.agent_field').trigger('load_list.agent_field');
                }
              }
            }
            if (search_in_page) {
              var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
              agent.replaceState(item_class + 'page', 1);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
          'keyup.agent_field': function(event) {
            if (event.which == ENTER_KEY_CODE) {
              agent(this).trigger('set_search_request.agent_field').trigger('search_list.agent_field');
            }
          },
          'click.agent_field': function(event) {
            if (agent(this).prop('nodeName').toUpperCase() == 'INPUT' && agent(this).attr('type').toUpperCase() == 'RADIO') {
              agent(this).trigger('set_search_request.agent_field').trigger('search_list.agent_field');
            }
          },
          'focusout.agent_field': function(event) {
            if (agent(this).is('input[type="text"]')) {
              agent(this).trigger('set_search_request.agent_field');
            }
          },
          'change.agent_field': function(event) {
            if (agent(this).is('select')) {
              agent(this).trigger('set_search_request.agent_field');
              if (agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="submit_search"]').length == 0) {
                agent(this).trigger('search_list.agent_field');
              }
            }
          },
          'remove_search_request.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var search_request = agent.getPageRequest(item_class + 'search');
            var search_format_array = [];
  
            // get search pattern
            var search_format = agent(this).setting('search_format');
            var search_key = agent(this).setting('search_key');
            search_format_array.push(search_format.replace(/\{search_key\}/g, search_key));
            var select_search_key_element = agent();
            if (agent(this).dataAttribute('field_class')) {
              select_search_key_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_key"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]');
            } else {
              select_search_key_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_key"]');
            }
            for (var i = 0; i < select_search_key_element.length; i++) {
              for (var j = 0; j < select_search_key_element.eq(i).find('option').length; j++) {
                var select_search_key = select_search_key_element.eq(i).find('option').eq(j).val();
                if (select_search_key) {
                  search_format_array.push(search_format.replace(/\{search_key\}/g, select_search_key));
                }
              }
            }
            var select_search_format_element = agent();
            if (agent(this).dataAttribute('field_class')) {
              select_search_format_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_format"][data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]');
            } else {
              select_search_format_element = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="select_search_format"]');
            }
            for (var i = 0; i < select_search_format_element.length; i++) {
              for (var j = 0; j < select_search_format_element.eq(i).find('option').length; j++) {
                var select_search_format = select_search_format_element.eq(i).find('option').eq(j).val();
                if (select_search_format) {
                  search_format_array.push(select_search_format.replace(/\{search_key\}/g, search_key));
                }
              }
            }
  
            if (search_request) {
              for (var i = 0; i < search_format_array.length; i++) {
                var remove_search_format_string = search_format_array[i].replace(/\{search_value\}/, '[^\\s]{1,}');
                search_request = search_request.replace(new RegExp(remove_search_format_string + '\\s{1,}(and|or)', 'ig'), '');
                search_request = search_request.replace(new RegExp(remove_search_format_string + '$', 'ig'), '');
                search_request = search_request.replace(new RegExp('\\s{1,}(and|or)\\s{0,}$', 'ig'), '');
                search_request = search_request.replace(new RegExp('^\\s{0,}(and|or)\\s{1,}', 'ig'), '');
              }
            }
            agent(this).setting('search_request', trim(search_request));
          },
          'set_search_request.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            agent(this).trigger('remove_search_request.agent_field');
            var search_request = agent(this).setting('search_request');
            var search_format = agent(this).setting('search_format');
            var search_key = agent(this).setting('search_key');
            var search_value = agent(this).getDisplayValue();
            var search_string = search_format.replace(/\{search_key\}/g, search_key);
            search_string = search_string.replace(/\{search_value\}/g, search_value);
            if (!search_value) {
              search_string = '';
            } else {
              search_request = search_request ? search_request + ' AND ' + search_string : search_string;
            }
            if (search_request) {
              agent.replaceState(item_class + 'search', search_request);
              if (agent(this).dataAttribute('field_class') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').length > 0) {
                agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').setting('search_request', search_request);
              }
            } else {
              agent.deletePageRequest(item_class + 'search');
              agent.replaceState();
              if (agent(this).dataAttribute('field_class') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').length > 0) {
                agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]').setting('search_request', '');
              }
            }
          },
        },
      },
      'search_start_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'search_key': 'created_datetime',
        'search_format': '{search_key}>={search_value}',
        'logical_connective': 'AND',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            if (_common.initSetting['common_fields']['search']) {
              agent(this).setting(_common.initSetting['common_fields']['search']);
            }
            agent(this).initWidget('datepicker');
          },
        },
      },
      'search_end_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'search_key': 'created_datetime',
        'search_format': '{search_key}<={search_value}',
        'logical_connective': 'AND',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            if (_common.initSetting['common_fields']['search']) {
              agent(this).setting(_common.initSetting['common_fields']['search']);
            }
            agent(this).initWidget('datepicker');
          },
        },
      },
      'search_today': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('day');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('day');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_today': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('day');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('day');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_current_month': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('month');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('month');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_last_month': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            select_datetime.subtract(1, 'months');
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('month');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('month');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_last_week': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            select_datetime.subtract(1, 'weeks');
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('week');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('week');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_current_week': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            select_datetime.startOf('week');
            member_fields.filter('[data-r-field="search_start_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
            select_datetime.endOf('week');
            member_fields.filter('[data-r-field="search_end_date"]').setDisplayValue(select_datetime.format('YYYY-MM-DD'));
          },
        },
      },
      'search_dialog': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).showDialog();
          },
        },
      },
      'search_list': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'load_list.agent_field': function(event) {
            var list_items = [];
            agent(this).find('.agent_option_items').remove();
            if (agent(this).setting('search_request')) {
              var search_items = [];
              var search_requests = agent(this).setting('search_request').split(/\s{1,}(and|or)\s{1,}/i);
              for (var i = 0; i < search_requests.length; i++) {
                var parse_search_request = String(search_requests[i]).match(/([^=<>!]{1,})\s{0,}(<=|>=|<>|<|>|!=|==|=)\s{0,}([^=<>!]{1,})/);
                if (parse_search_request != null && parse_search_request.length > 3) {
                  var search_item = {};
                  search_item['search_key'] = parse_search_request[1];
                  search_item['operator'] = parse_search_request[2] == '==' ? '=' : parse_search_request[2];
                  search_item['search_value'] = String(parse_search_request[3]).replace(/%/g, '');
                  search_items.push(search_item);
                }
              }
              var data = agent(this).setting('data');
              for (var i = 0; i < data['items'].length; i++) {
                var item_matched = true;
                for (var j = 0; j < search_items.length; j++) {
                  var search_item = search_items[j];
                  if (search_item['search_key'].match(/^all$/i) != null || !search_item['search_key']) {
                    item_matched = false;
                    for (var item_key in data['items'][i]) {
                      if (String(data['items'][i][item_key]).match(new RegExp(search_item['search_value'], 'i')) != null) {
                        item_matched = true;
                        break;
                      }
                    }
                  } else if (String(agent.checkProperty(data['items'], i, search_item['search_key'])).match(new RegExp(search_item['search_value'], 'i')) == null) {
                    item_matched = false;
                    break;
                  }
                }
                if (item_matched) {
                  list_items.push(data['items'][i]);
                }
              }
            }
            for (var i = 0; i < list_items.length; i++) {
              var option_string = '';
              if (agent.checkProperty(list_items, i, 'name')) {
                option_string = list_items[i]['name'];
              }
              if (agent.checkProperty(list_items, i, 'member_id')) {
                option_string = option_string ? option_string + ' (' + list_items[i]['member_id'] + ')' : list_items[i]['member_id'];
              }
              var option_item = agent('<option class="agent_option_items" value="' + list_items[i]['idx'] + '">' + option_string + '</option>');
              option_item.setting('item_data', list_items[i]).setting('item_body', agent(this));
              agent(this).append(option_item);
            }
          },
          'change.agent_field': function(event) {
            if (agent(this).is('select')) {
              var option_item = agent(this).find('option:selected');
              var item_data = option_item.setting('item_data');
              agent(this).setHiddenValue(item_data);
              var request_data = {};
              request_data['_submit_mode'] = 'update';
              if (item_data['schedule_items']) {
                request_data['schedule_items'] = item_data['schedule_items'];
              }
              if (item_data['idx']) {
                request_data['_idx'] = item_data['idx'];
                request_data['select_idx'] = item_data['idx'];
                request_data['owner_idx'] = item_data['idx'];
                request_data['goods_owner_idx'] = item_data['idx'];
              }
              if (item_data['code']) {
                request_data['_code'] = item_data['code'];
                request_data['select_code'] = item_data['code'];
                request_data['owner_code'] = item_data['code'];
              }
              if (item_data['member_id']) {
                request_data['select_id'] = item_data['member_id'];
                request_data['owner_id'] = item_data['member_id'];
              }
              if (item_data['phone']) {
                request_data['select_phone'] = item_data['phone'];
                request_data['owner_phone'] = item_data['phone'];
              }
              if (item_data['mobile']) {
                request_data['select_mobile'] = item_data['mobile'];
                request_data['owner_mobile'] = item_data['mobile'];
              }
              if (item_data['telephone']) {
                request_data['select_telephone'] = item_data['telephone'];
                request_data['owner_telephone'] = item_data['telephone'];
              }
              if (item_data['email']) {
                request_data['select_email'] = item_data['email'];
                request_data['owner_email'] = item_data['email'];
              }
              if (item_data['full_address']) {
                request_data['select_full_address'] = item_data['full_address'];
                request_data['owner_full_address'] = item_data['full_address'];
              }
              if (item_data['name']) {
                request_data['select_name'] = item_data['name'];
                request_data['owner_name'] = item_data['name'];
              }
              agent(this).setting('item_body').request(request_data).loadItem();
              var item_body_member_fields = agent(this).setting('item_body').bindElements('member_fields');
              for (var field_key in request_data) {
                item_body_member_fields.filter('[data-r-field="' + field_key + '"]').setDisplayValue(request_data[field_key]);
              }
              for (var field_key in item_data) {
                item_body_member_fields.filter('[data-r-field="' + field_key + '"]').setDisplayValue(item_data[field_key]);
              }
            }
          },
          'member_field_initialized_callback.agent_field': function(event) {
            if (!agent(this).is(event.target || event.srcElement)) {
              return;
            }
            var field = String(agent(this).dataAttribute('field'));
            var member2_match = field.match(/member([0-9]{2})([0-9]{2})_list/i);
            if (member2_match != null) {
              var api_param = {};
              api_param['_action'] = 'member' + member2_match[1] + member2_match[2] + '_list';
              api_param['_action_type'] = 'load';
              api_param['_load_mode'] = 'list';
              api_param['_callback'] = function(data) {
                if (data['code'] == '000') {
                  if (data['callback_element'].is('select')) {
                    data['callback_element'].setting('data', data);
                    data['callback_element'].find('.agent_option_items').remove();
                    for (var i = 0; i < data['items'].length; i++) {
                      var option_string = '';
                      if (agent.checkProperty(data, 'items', i, 'name')) {
                        option_string = data['items'][i]['name'];
                      }
                      if (agent.checkProperty(data, 'items', i, 'member_id')) {
                        option_string = option_string ? option_string + ' (' + data['items'][i]['member_id'] + ')' : data['items'][i]['member_id'];
                      }
                      var option_item = agent('<option class="agent_option_items" value="' + data['items'][i]['idx'] + '">' + option_string + '</option>');
                      option_item.setting('item_data', data['items'][i]).setting('item_body', data['callback_element']);
                      data['callback_element'].append(option_item);
                    }
                  }
                }
              };
              agent(this).api(api_param);
            }
          },
        },
      },
      'search_goods_list': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {},
        },
      },
      'list_order_by': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            if (agent.getPageRequest(item_class + 'order_by')) {
              agent(this).setDisplayValue(agent.getPageRequest(item_class + 'order_by'));
            } else if (agent(this).setting('item_body').dataAttribute('list_order_by')) {
              agent(this).setDisplayValue(agent(this).setting('item_body').dataAttribute('list_order_by'));
            }
          },
          'change.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            agent.replaceState(item_class + 'page', 1);
            agent.replaceState(item_class + 'order_by', agent(this).getDisplayValue());
            agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
          },
        },
      },
      'list_length': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            if (agent.getPageRequest(item_class + 'length')) {
              agent(this).setDisplayValue(agent.getPageRequest(item_class + 'length'));
            } else if (agent(this).setting('item_body').dataAttribute('list_length')) {
              agent(this).setDisplayValue(agent(this).setting('item_body').dataAttribute('list_length'));
            }
          },
          'change.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            agent.replaceState(item_class + 'page', 1);
            agent.replaceState(item_class + 'length', agent(this).getDisplayValue());
            agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
          },
        },
      },
      'list_page': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            if (agent.getPageRequest(item_class + 'page')) {
              agent(this).setDisplayValue(agent.getPageRequest(item_class + 'page'));
            }
          },
          'change.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).getDisplayValue();
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
          'click.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).dataAttribute('page_number');
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
        },
      },
      'first_page': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).dataAttribute('page_number');
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
        },
      },
      'last_page': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).dataAttribute('page_number');
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
        },
      },
      'previous_page': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).dataAttribute('page_number');
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
        },
      },
      'next_page': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var item_class = agent(this).setting('item_body').dataAttribute('item_class') ? agent(this).setting('item_body').dataAttribute('item_class') + '_' : '';
            var page_number = agent(this).dataAttribute('page_number');
            if (page_number > 0) {
              agent.replaceState(item_class + 'page', page_number);
              agent(this).setting('item_body').request('_action_type', 'load').loadItemData();
            }
          },
        },
      },
      'no_data': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
      },
      'show_write': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).dataAttribute('dialog')) {
              var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-role]');
              var item_class = target_item.dataAttribute('item_class') ? target_item.dataAttribute('item_class') + '_' : '';
              agent.deletePageRequest(item_class + 'idx');
              agent.deletePageRequest(item_class + 'code');
              agent.replaceState();
              target_item.initItem();
              for (var i = 0; i < target_item.bindElements('member_fields').filter('input').length; i++) {
                target_item.bindElements('member_fields').filter('input').eq(i).setDisplayValue('');
              }
              agent(this).showDialog();
            } else if (agent(this).dataAttribute('link')) {
              agent(agent(this)).link();
            }
          },
        },
      },
      'make_schedule': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'show_loading_callback.agent': function(event) {
            agent(this).setting('item_body');
          },
          'click.agent_field': function(event) {
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            var number_of_teams = member_fields.filter('[data-r-field="number_of_teams"]').length > 0 ? Number(member_fields.filter('[data-r-field="number_of_teams"]').getDisplayValue()) : 1;
            var flag_working_on_sunday = member_fields.filter('[data-r-field="flag_working_on_sunday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_sunday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_sunday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_monday = member_fields.filter('[data-r-field="flag_working_on_monday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_monday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_monday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_tuesday = member_fields.filter('[data-r-field="flag_working_on_tuesday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_tuesday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_tuesday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_wednesday = member_fields.filter('[data-r-field="flag_working_on_wednesday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_wednesday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_wednesday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_thursday = member_fields.filter('[data-r-field="flag_working_on_thursday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_thursday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_thursday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_friday = member_fields.filter('[data-r-field="flag_working_on_friday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_friday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_friday"]').getDisplayValue() === 'false') : true;
            var flag_working_on_saturday = member_fields.filter('[data-r-field="flag_working_on_saturday"]').length > 0 ? !(member_fields.filter('[data-r-field="flag_working_on_saturday"]').getDisplayValue() === false || member_fields.filter('[data-r-field="flag_working_on_saturday"]').getDisplayValue() === 'false') : true;
            var schedule_items = [];
            var schedule_date = moment();
            agent('[data-r-field="date"]').setting('event_items', []);
            for (var i = 0; i < 365; i++) {
              var schedule_item = {};
              schedule_date.startOf('day');
              schedule_item['datetime'] = schedule_date.format('YYYY-MM-DD HH:mm:ss');
              schedule_item['start_datetime'] = schedule_date.format('YYYY-MM-DD HH:mm:ss');
              schedule_date.endOf('day');
              schedule_item['end_datetime'] = schedule_date.format('YYYY-MM-DD HH:mm:ss');
              schedule_item['number_of_teams'] = number_of_teams;
              schedule_item['working_day'] = true;
              schedule_item['setting_type'] = 'auto';
              for (var j = 0; j < number_of_teams; j++) {
                schedule_item['flag_team' + j] = true;
              }
              if (flag_working_on_monday && schedule_date.format('e') == 0) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_tuesday && schedule_date.format('e') == 1) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_wednesday && schedule_date.format('e') == 2) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_thursday && schedule_date.format('e') == 3) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_friday && schedule_date.format('e') == 4) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_saturday && schedule_date.format('e') == 5) {
                schedule_items.push(schedule_item);
              } else if (flag_working_on_sunday && schedule_date.format('e') == 6) {
                schedule_items.push(schedule_item);
              }
              schedule_date.add(1, 'days');
            }
            agent(this).setting('item_body').request('schedule_items', schedule_items);
            var item_data = agent(this).setting('item_body').setting('data');
            item_data['schedule_items'] = schedule_items;
            agent(this).setting('item_body').setting('data', item_data);
            agent(this).showLoading('�ㅼ�以� �앹꽦 以묒엯�덈떎. �좎떆留� 湲곕떎�ㅼ＜�몄슂. <br />而댄벂�� �깅뒫�� �곕씪�� �쒓컙�� �ㅻ옒 �뚯슂�� �� �덉뒿�덈떎.');
          },
        },
      },
      'calendar': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'member_field_initialized_callback.agent_field': function(event) {
            if (!agent(this).is(event.target || event.srcElement)) {
              return;
            }
            agent(this).setMemberFields().initMemberFields();
          },
          'field_rendering_callback.agent_field': function(event) {
            if (!agent(this).is(event.target || event.srcElement)) {
              return;
            }
            agent(this).trigger('set_calendar.agent_field');
          },
          'set_calendar.agent_field': function(event) {
            var now = moment();
            var select_datetime = moment();
            if (agent(this).setting('select_datetime')) {
              select_datetime = agent(this).setting('select_datetime');
            }
            var item_data = agent(this).setting('item_body').setting('data') ? agent(this).setting('item_body').setting('data') : {};
            var items = item_data['items'] ? item_data['items'] : [];
            if (item_data['schedule_items']) {
              items = item_data['schedule_items'];
            }
            var member_fields = agent(this).setting('item_body').bindElements('member_fields');
            member_fields.filter('[data-r-field="select_year"]').setDisplayValue(select_datetime.format('YYYY'));
            member_fields.filter('[data-r-field="select_month"]').setDisplayValue(select_datetime.format('MM'));
            var date_fields = member_fields.filter('[data-r-field="date"]');
            var start_datetime_of_selected_datetime = select_datetime.clone().startOf('month');
            var end_datetime_of_selected_datetime = select_datetime.clone().endOf('month');
            var start_number = Number(start_datetime_of_selected_datetime.format('d'));
            var end_number = Number(end_datetime_of_selected_datetime.format('DD'));
            date_fields.setDisplayValue('').removeClass('on');
            calendar_date = select_datetime.clone().startOf('month');
            now.startOf('day');
            calendar_date.startOf('day');
            for (var i = 0; i < end_number; i++) {
              date_fields.eq(i + start_number).setDisplayValue(i + 1);
              for (var j = 0; j < items.length; j++) {
                if (items[j]['start_datetime'] && items[j]['end_datetime']) {
                  var item_start_datetime = moment(items[j]['start_datetime'], 'YYYY-MM-DD HH:mm:ss');
                  var item_end_datetime = moment(items[j]['end_datetime'], 'YYYY-MM-DD HH:mm:ss');
                  if (calendar_date.isSameOrAfter(items[j]['start_datetime']) && calendar_date.isSameOrBefore(items[j]['end_datetime'])) {
                    date_fields.eq(i + start_number).addClass('on');
                    var event_items = date_fields.eq(i + start_number).setting('event_items') ? date_fields.eq(i + start_number).setting('event_items') : [];
                    event_items.push(items[j]);
                    event_items = event_items.removeDuplicates();
                    date_fields.eq(i + start_number).setting('event_items', event_items);
  
                    date_fields.eq(i + start_number).setting('selected_schedule_idx', j);
                    date_fields.eq(i + start_number).setting('selected_schedule_item', items[j]);
                  }
                } else if (items[j]['start_datetime']) {
                  var item_start_datetime = moment(items[j]['start_datetime']);
                  if (calendar_date.isSameOrAfter(items[j]['start_datetime'])) {
                    date_fields.eq(i + start_number).addClass('on');
                    var event_items = date_fields.eq(i + start_number).setting('event_items') ? date_fields.eq(i + start_number).setting('event_items') : [];
                    event_items.push(items[j]);
                    event_items = event_items.removeDuplicates();
                    date_fields.eq(i + start_number).setting('event_items', event_items);
  
                    date_fields.eq(i + start_number).setting('selected_schedule_idx', j);
                    date_fields.eq(i + start_number).setting('selected_schedule_item', items[j]);
                  }
                } else if (items[j]['end_datetime']) {
                  var item_end_datetime = moment(items[j]['end_datetime']);
                  if (calendar_date.isSameOrBefore(items[j]['end_datetime'])) {
                    date_fields.eq(i + start_number).addClass('on');
                    var event_items = date_fields.eq(i + start_number).setting('event_items') ? date_fields.eq(i + start_number).setting('event_items') : [];
                    event_items.push(items[j]);
                    event_items = event_items.removeDuplicates();
                    date_fields.eq(i + start_number).setting('event_items', event_items);
  
                    date_fields.eq(i + start_number).setting('selected_schedule_idx', j);
                    date_fields.eq(i + start_number).setting('selected_schedule_item', items[j]);
                  }
                }
              }
              if (now.isSame(calendar_date)) {
                if (agent.config('default_pg') == 'nicepay' || agent.config('default_pg') == 'nicepay_no_auth') {
                  date_fields.eq(i + start_number).trigger('click.agent_field');
                }
              }
              date_fields.eq(i + start_number).setting('calendar_date', calendar_date.clone());
              calendar_date.add(1, 'days');
            }
            agent(this).setting('select_datetime', select_datetime);
          },
        },
      },
      'schedule_title': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'posts_title',
        '_event': {
          'click.agent_field': function(event) {
            var data = {};
            data['total_count'] = 0;
            if (agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              data['event_items'] = [];
              data['event_items'].push(item_data);
              data['total_count'] = data['event_items'].length;
              var calendar_date = moment(item_data['start_datetime']);
              agent('[data-r-field="selected_month"]').setDisplayValue(calendar_date.format('M'));
              agent('[data-r-field="selected_day"]').setDisplayValue(calendar_date.format('D'));
            }
            if (data['total_count'] == 0) {
              agent('[data-r-field="no_data"]').show();
              agent('[data-r-field="event_items"]').hide();
            } else {
              agent('[data-r-field="no_data"]').hide();
              agent('[data-r-field="event_items"]').show();
              agent('[data-r-type="event_list"]').setting('data', data).initItem().itemRendering();
            }
          },
        },
      },
      'date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            if (!agent(this).is(event.target || event.srcElement)) {
              return;
            }
            var data = {};
            data['total_count'] = 0;
            if (agent(this).setting('event_items')) {
              data['event_items'] = agent(this).setting('event_items');
              data['total_count'] = data['event_items'].length;
              if (data['event_items'][0]) {
                agent('[data-r-field="modify_schedule_items"]').setting('data', data['event_items'][0]);
              }
            }
  
            var selected_schedule_item = agent(this).setting('selected_schedule_item') ? agent(this).setting('selected_schedule_item') : {};
            var selected_schedule_idx = agent(this).setting('selected_schedule_idx') ? agent(this).setting('selected_schedule_idx') : 0;
            var item_data = agent('[data-r-type="update_member_posts"]').setting('data');
            var number_of_teams = isNaN(selected_schedule_item['number_of_teams']) ? 0 : Number(selected_schedule_item['number_of_teams']);
            agent('.teams').hide();
            for (var i = 0; i < number_of_teams; i++) {
              if (i < agent('.teams').length) {
                agent('.teams').eq(i).show();
                agent('.teams').eq(i).find('[data-r-field="selected_flag_team' + i + '"]').setDisplayValue(selected_schedule_item['flag_team' + i]);
              }
            }
            agent('[data-r-field="selected_schedule_idx"]').setDisplayValue(agent(this).setting('selected_schedule_idx'));
            agent('[data-r-field="selected_number_of_teams"]').setDisplayValue(selected_schedule_item['number_of_teams']);
  
            var calendar_date = moment();
            if (agent(this).setting('calendar_date')) {
              calendar_date = agent(this).setting('calendar_date');
            }
            agent('[data-r-field="modify_schedule_items"]').show();
            agent('[data-r-field="modify_schedule_items"]').setting('selected_datetime', calendar_date).trigger('set_child_value.agent_field');
  
            agent('[data-r-field="selected_date"]').setDisplayValue(calendar_date.format('YYYY-MM-DD'));
            agent('[data-r-field="selected_year"]').setDisplayValue(calendar_date.format('YYYY'));
            agent('[data-r-field="selected_day_of_week"]').setDisplayValue(String(calendar_date.format('e')).toDatetimeString('e'));
            agent('[data-r-field="selected_month"]').setDisplayValue(calendar_date.format('M'));
            agent('[data-r-field="selected_day"]').setDisplayValue(calendar_date.format('D'));
            if (data['total_count'] == 0) {
              agent('[data-r-field="no_data"]').show();
              agent('[data-r-field="event_items"]').hide();
            } else {
              agent('[data-r-field="no_data"]').hide();
              agent('[data-r-field="event_items"]').show();
              agent('[data-r-type="event_list"]').setting('data', data).initItem().itemRendering();
            }
  
            if (agent('.gift-pro_spacepay').length > 0) {
              if (selected_schedule_idx == 0) {
                agent.showMessage('�좏깮�� �좎쭨�� 援щℓ媛� 遺덇��ν빀�덈떎. �ㅻⅨ �좎쭨瑜� �좏깮�댁＜�몄슂.');
              } else {
                agent('.gift-pro_spacepay').hide();
                agent('[data-r-field="buy_date"]').setDisplayValue(calendar_date.format('YYYY-MM-DD'));
              }
            }
  
  
          },
        },
      },
      'modify_schedule_items': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (agent(this).is(caller)) {
              agent(this).find('[data-r-field]').setDisplayValue('');
            }
          },
          'set_child_value.agent_field': function(event) {
            if (agent(this).setting('data')) {
              var item_data = agent(this).setting('data');
              for (var item_key in item_data) {
                agent(this).find('[data-r-field="' + item_key + '"]').setDisplayValue(item_data[item_key]);
              }
            }
          },
        },
      },
      'previous_month': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'member_field_initialized_callback.agent_field': function(event) {
            if (!agent(this).is(event.target || event.srcElement)) {
              return;
            }
          },
          'click.agent_field': function(event) {
            var select_datetime = moment();
            if (agent(this).setting('item_body').setting('select_datetime')) {
              select_datetime = agent(this).setting('item_body').setting('select_datetime');
            }
            select_datetime.subtract(1, 'months');
            agent(this).setting('item_body').setting('select_datetime', select_datetime);
            agent(this).setting('item_body').trigger('set_calendar.agent_field');
          },
        },
      },
      'next_month': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            var select_datetime = moment();
            if (agent(this).setting('item_body').setting('select_datetime')) {
              select_datetime = agent(this).setting('item_body').setting('select_datetime');
            }
            select_datetime.add(1, 'months');
            agent(this).setting('item_body').setting('select_datetime', select_datetime);
            agent(this).setting('item_body').trigger('set_calendar.agent_field');
          },
        },
      },
      'show_detail': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (agent(this).is('input[type="text"]')) {
              return;
            }
            cs(agent.getPageRequest('p'));
            if (agent.getPageRequest('p') == 'cart') {
              return;
            }
  
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              /*if ( data['category'] == '55' && ((String(data['goods_name']).match(/�좉퇋/) != null && String(data['goods_name']).match(/踰덊샇�대룞/) != null) || String(data['goods_name']).match(/湲곌린蹂�寃�/) != null)) {
                agent.link({ 'p': 'http://cloud.phons.co.kr/ata_test/?mobile=' + agent.config('mobile') + '&code=' + data['goods_code'] });
                return;
              }*/
              // if ( data['category'] == '58') {
              //   agent.link({ 'p': 'http://cloud.phons.co.kr/ata_phone/?mobile=' + agent.config('mobile') + '&code=' + data['goods_code'] });
              //   return;
              // }
              var page_request = agent(this).setting('page_request') ? agent(this).setting('page_request') : {};
              // todo api code is same
              // if (data['code']) {
              //   page_request['code'] = data['code'];
              // }
              if (data['idx'] && agent.getPageRequest('p') != 'list_pri') {
                page_request['idx'] = data['idx'];
              }
              if (data['order_code']) {
                page_request['code'] = data['order_code'];
              }
              if (data['category1'] && agent.config('category_index')) {
                var category_index = agent.config('category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['category1']) {
                    page_request['category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['category0'] && agent.config('category_index')) {
                var category_index = agent.config('category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['category0']) {
                    page_request['category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['shop1_category1'] && agent.config('shop1_category_index')) {
                var category_index = agent.config('shop1_category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['shop1_category1']) {
                    page_request['shop1_category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['shop1_category0'] && agent.config('shop1_category_index')) {
                var category_index = agent.config('shop1_category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['shop1_category0']) {
                    page_request['shop1_category'] = category_index_key;
                    break;
                  }
                }
              }
              agent(this).setting('page_request', page_request);
            }
            if (agent(this).dataAttribute('dialog')) {
              if (agent(this).setting('page_request')) {
                var page_request = agent(this).setting('page_request');
                var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-role]');
                var item_class = target_item.dataAttribute('item_class') ? target_item.dataAttribute('item_class') + '_' : '';
                for (var page_request_key in page_request) {
                  agent.replaceState(item_class + page_request_key, page_request[page_request_key]);
                }
                target_item.initItem().loadItemData();
              }
              var item_data = agent(this).setting('item_body').setting('data');
              if (item_data['video0'] && String(item_data['video0']).match(/http(s)?:\/\/youtu/i) != null) {
                var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-field="video0"]');
                var video_id = item_data['video0'];
                video_id = String(video_id).replace(/http(s)?:\/\/youtu\.be\//i, '');
                target_item.dataAttribute('video_id', video_id);
  
                if (_common.video0_player) {
                  if (String(video_id).match(/youtube.com\//) != null) {
                    _common.video0_player.loadVideoByUrl(video_id).playVideo();
                  } else {
                    _common.video0_player.loadVideoById(video_id).playVideo();
                  }
                } else {
                  var tag = document.createElement('script');
  
                  tag.src = "https://www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
                  target_item.attr('id', 'video0');
                }
                agent(this).dataAttribute('dialog', 'video');
                agent(this).showDialog();
              } else if (item_data['video0']) {
                var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-field="video0"]');
                target_item.attr('src', item_data['video0']);
                agent(this).showDialog();
              } else if (item_data['image1'] && agent('[data-r-role="dialog"][data-r-type="image"]').length > 0) {
                agent(this).dataAttribute('dialog', 'image');
                var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-field="image1"]');
                target_item.attr('src', item_data['image1']);
                agent(this).showDialog();
              } else {
                agent(this).showDialog();
              }
            } else if (agent(this).dataAttribute('link')) {
              if (agent.getPageRequest('p') == 'admin_product_list' || agent.getPageRequest('p') == 'admin_product_list2' || agent.getPageRequest('p') == 'admin_product_list3' || agent.getPageRequest('p') == 'admin_product_list_old3') {
                agent(this).setting('link_new_tab', true);
              }
              agent(agent(this)).link();
            } else if (agent(this).dataAttribute('field_action') == 'select' && agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              var request_data = {};
              if (item_data['idx']) {
                request_data['select_idx'] = item_data['idx'];
                request_data['owner_idx'] = item_data['idx'];
              }
              if (item_data['code']) {
                request_data['select_code'] = item_data['code'];
                request_data['owner_code'] = item_data['code'];
              }
              if (item_data['member_id']) {
                request_data['select_id'] = item_data['member_id'];
                request_data['owner_id'] = item_data['member_id'];
              }
              if (item_data['phone']) {
                request_data['select_phone'] = item_data['phone'];
                request_data['owner_phone'] = item_data['phone'];
              }
              if (item_data['mobile']) {
                request_data['select_mobile'] = item_data['mobile'];
                request_data['owner_mobile'] = item_data['mobile'];
              }
              if (item_data['telephone']) {
                request_data['select_telephone'] = item_data['telephone'];
                request_data['owner_telephone'] = item_data['telephone'];
              }
              if (item_data['email']) {
                request_data['select_email'] = item_data['email'];
                request_data['owner_email'] = item_data['email'];
              }
              if (item_data['full_address']) {
                request_data['select_full_address'] = item_data['full_address'];
                request_data['owner_full_address'] = item_data['full_address'];
              }
              if (item_data['name']) {
                request_data['select_name'] = item_data['name'];
                request_data['owner_name'] = item_data['name'];
              }
              var dialog = agent(this).parents('[data-r-role="dialog"]');
              if (dialog.length > 0) {
                var on_open_dialog_element = dialog.setting('on_open_dialog_element');
                on_open_dialog_element.request(request_data);
                var on_open_dialog_element_member_fields = on_open_dialog_element.setting('item_body').bindElements('member_fields');
                for (var field_key in request_data) {
                  on_open_dialog_element_member_fields.filter('[data-r-field="' + field_key + '"]').setDisplayValue(request_data[field_key]);
                }
                for (var field_key in item_data) {
                  on_open_dialog_element_member_fields.filter('[data-r-field="' + field_key + '"]').setDisplayValue(item_data[field_key]);
                }
                dialog.dismissDialog();
              }
            } else {
              if (agent(this).parents('[data-r-type="md2_goods_list"]').length > 0) {
                agent(agent(this)).link({ "p": "detail" });
              }
            }
          },
        },
      },
      'show_modify': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              var page_request = agent(this).setting('page_request') ? agent(this).setting('page_request') : {};
              // todo api code is same
              // if (data['code']) {
              //   page_request['code'] = data['code'];
              // }
              if (data['idx']) {
                page_request['idx'] = data['idx'];
              }
              if (data['category1'] && agent.config('category_index')) {
                var category_index = agent.config('category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['category1']) {
                    page_request['category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['category0'] && agent.config('category_index')) {
                var category_index = agent.config('category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['category0']) {
                    page_request['category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['shop1_category1'] && agent.config('shop1_category_index')) {
                var category_index = agent.config('shop1_category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['shop1_category1']) {
                    page_request['shop1_category'] = category_index_key;
                    break;
                  }
                }
              } else if (data['shop1_category0'] && agent.config('shop1_category_index')) {
                var category_index = agent.config('shop1_category_index');
                for (var category_index_key in category_index) {
                  if (category_index[category_index_key]['name'] == data['shop1_category0']) {
                    page_request['shop1_category'] = category_index_key;
                    break;
                  }
                }
              }
              agent(this).setting('page_request', page_request);
            }
            if (agent(this).dataAttribute('dialog')) {
              agent(this).dataAttribute('dialog', agent(this).dataAttribute('dialog'));
            }
            if (agent(this).dataAttribute('dialog')) {
              if (agent(this).setting('page_request')) {
                var page_request = agent(this).setting('page_request');
                var target_item = agent('[data-r-role="dialog"][data-r-type="' + agent(this).dataAttribute('dialog') + '"]').find('[data-r-role]');
                var item_class = target_item.dataAttribute('item_class') ? target_item.dataAttribute('item_class') + '_' : '';
                for (var page_request_key in page_request) {
                  agent.replaceState(item_class + page_request_key, page_request[page_request_key]);
                }
                target_item.initItem().loadItemData();
              }
              agent(this).showDialog();
            } else if (agent(this).dataAttribute('link')) {
              agent(agent(this)).link();
            }
          },
        },
      },
      'input_shipping': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'dialog': 'input_shipping',
        'string_dialog_message_ko': '蹂�寃쏀븯�쒓쿋�듬땲源�?',
        'string_no_selection_ko': '�좏깮�� ��ぉ�� �놁뒿�덈떎',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'field_rendering_callback.agent_field': function(event) {
            setTimeout(function() {
              agent('[data-r-type="order_list"]').find('[data-r-field="checkbox"]').prop('checked', false);
            }, 500);
          },
          'click.agent_field': function(event) {
            var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
            if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
              agent.showMessage(agent(this).string('no_selection'));
            } else {
              agent('.shipping_company').setDisplayValue('');
              agent('.tracking_number').setDisplayValue('');
              agent(this).showDialog();
            }
          },
          'positive_callback.agent_dialog': function(event) {
            if (!agent('.shipping_company').getDisplayValue() || !agent('.tracking_number').getDisplayValue()) {
              return;
            }
  
            var set_string = 'shipping_status=51,shipping_company=' + String(agent('.shipping_company').getDisplayValue()).replace(/\s{1,}/, '');
            set_string = set_string + ',tracking_number=' + agent('.tracking_number').getDisplayValue();
            var idx_string = '';
            var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
            for (var i = 0; i < selected_checkbox.length; i++) {
              var item_data = selected_checkbox.eq(i).setting('item_body').setting('data');
              idx_string = idx_string ? idx_string + ',' + item_data['idx'] : '' + item_data['idx'];
            }
            var api_param = {};
            api_param['_action'] = 'order_list';
            api_param['_action_type'] = 'submit';
            api_param['_submit_mode'] = 'update';
            api_param['_mode'] = 'update';
            api_param['_set'] = set_string;
            api_param['_idx'] = idx_string;
            api_param['_callback'] = function(data) {
              agent('[data-r-type="order_list"]').loadItemData();
            };
            agent().api(api_param);
          },
        },
      },
      'input_cs': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'dialog': 'input_cs',
        'string_dialog_message_ko': '蹂�寃쏀븯�쒓쿋�듬땲源�?',
        'string_no_selection_ko': '�좏깮�� ��ぉ�� �놁뒿�덈떎',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
            if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
              agent.showMessage(agent(this).string('no_selection'));
            } else {
              agent('.order_status').setDisplayValue('');
              agent('.cs_memo').setDisplayValue('');
              agent(this).showDialog();
            }
          },
          'positive_callback.agent_dialog': function(event) {
            var set_string = 'order_status=' + String(agent('.order_status').getDisplayValue());
            set_string = set_string + ',cs_memo=' + agent('.cs_memo').getDisplayValue();
            var idx_string = '';
            var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
            for (var i = 0; i < selected_checkbox.length; i++) {
              var item_data = selected_checkbox.eq(i).setting('item_body').setting('data');
              idx_string = idx_string ? idx_string + ',' + item_data['idx'] : '' + item_data['idx'];
            }
            var api_param = {};
            api_param['_action'] = 'order_list';
            api_param['_action_type'] = 'submit';
            api_param['_submit_mode'] = 'update';
            api_param['_mode'] = 'update';
            api_param['_set'] = set_string;
            api_param['_idx'] = idx_string;
            api_param['_callback'] = function(data) {
              agent('[data-r-type="order_list"]').loadItemData();
            };
            agent().api(api_param);
          },
        },
      },
  
      'update_action': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'dialog': 'confirm',
        'string_dialog_message_ko': '蹂�寃쏀븯�쒓쿋�듬땲源�?',
        'string_no_selection_ko': '�좏깮�� ��ぉ�� �놁뒿�덈떎',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
              if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
                agent.showMessage(agent(this).string('no_selection'));
              } else {
                agent(this).showDialog();
              }
            } else {
              agent(this).showDialog();
            }
          },
          'positive_callback.agent_dialog': function(event) {
            agent(this).setting({
              '_setting_type': 'default',
              'set': null,
            });
            var event_data = {};
            event_data['set'] = agent(this).setting('set');
  
            if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              agent(this).setting('item_body').trigger('update_list.agent_item', event_data);
            } else if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_posts/i) != null) {
              agent(this).setting('item_body').trigger('update_posts.agent_item', event_data);
            } else if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('field') && String(agent(this).setting('item_body').dataAttribute('field')).match(/^item$/i) != null) {
              agent(this).setting('item_body').trigger('update_item.agent_item', event_data);
            }
          },
        },
      },
      'update_action_and_refresh': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
            agent(this).setting(_common.initSetting['common_fields']['update_action']);
            agent(this).setting('item_body').setting('refresh', true);
          },
        },
      },
      'delete_action': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        'dialog': 'confirm',
        'string_dialog_message_ko': '�좏깮�� ��ぉ�� ��젣�섏떆寃좎뒿�덇퉴?',
        'string_no_selection_ko': '�좏깮�� ��ぉ�� �놁뒿�덈떎',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
              if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
                agent.showMessage(agent(this).string('no_selection'));
              } else {
                agent(this).showDialog();
              }
            }
          },
          'positive_callback.agent_dialog': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
              var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
              var idx_string = '';
              for (var i = 0; i < selected_checkbox.length; i++) {
                var data = selected_checkbox.eq(i).setting('item_body').setting('data');
                idx_string = idx_string ? idx_string + ',' + data['idx'] : data['idx'];
              }
              if (idx_string) {
                // TODO
                var api_param = {};
                api_param['_action_type'] = 'submit';
                api_param['_mode'] = 'delete';
                api_param['_idx'] = idx_string;
                api_param['_callback'] = function(data) {
                  agent.reload();
                };
                agent(this).setting('item_body').api(api_param);
              }
            }
          },
        },
      },
      'cancel_dialog': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).parents('[data-r-role="dialog"]').dismissDialog();
          },
        },
      },
      'created_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'created_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'updated_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'updated_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'created_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'created_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'updated_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'updated_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'last_access_datetime': {
        '_setting_type': 'default',
        'do_not_submit': true,
      },
      'join_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'join_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'join_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'join_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'sales_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'sales_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'sales_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'sales_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'inquiry_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'inquiry_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'inquiry_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'inquiry_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'answer_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'answer_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'answer_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'answer_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'last_access_date': {
        '_setting_type': 'default',
        'field_key': 'last_access_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
        'do_not_submit': true,
      },
      'start_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'start_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'start_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'start_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'end_date': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'end_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'end_time': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_key': 'end_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_empty_ko': '泥⑤��� �뚯씪�� �좏깮�댁＜�몄슂.',
        '_event': {
          'select_file.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var file_url_selector = '[data-r-field="file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                file_url_selector = file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_url_selector);
              var file_url_string = agent(this).getHiddenValue();
              file_url_element.setDisplayValue(file_url_string);
              var file_name_selector = '[data-r-field="file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                file_name_selector = file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_name_selector);
              var file_name_string = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
              file_name_element.setDisplayValue(file_name_string);
              if (file_url_element.length == 0 && file_name_element.length == 0 && String(agent(this).setting('file_extension')).match(/(jpg|png|gif|bmp|svg)/i) != null && agent(this).is('img')) {
                agent(this).setDisplayValue(agent(this).getHiddenValue());
              }
              // var item_data = agent(this).setting('item_body').setting('data');
              // var file_array = item_data['file'];
              var file_array = [];
              var file_item = {};
              file_item['file_name'] = file_name_string;
              file_item['file_url'] = file_url_string;
              file_item['file_extension'] = agent(this).setting('file_extension');
              file_array.push(file_item);
              agent(this).setting('item_body').request('file', JSON.stringify(file_array));
            }
          },
        },
      },
      'file_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
      },
      'file_url': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_does_not_work_on_ios_ko': '�꾩씠�곗� �ㅼ슫濡쒕뱶瑜� 吏��먰븯吏� �딆뒿�덈떎',
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).is('input[type="text"]')) {
              return;
            }
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
              if (agent(this).string('does_not_work_on_ios')) {
                agent.showMessage(agent(this).string('does_not_work_on_ios'));
              }
            } else {
              agent.link(agent.config('root_url') + '?_action=file_download&file_path=' + encodeURIComponent(agent(this).getHiddenValue()));
            }
            // if (agent.config('device') == 'mobile') {
            //   agent('<form></form>').attr('action', agent(this).getHiddenValue()).appendTo('body').submit().remove()
            //   // var download_iframe = agent('<iframe id="my_iframe" style="display:none;"></iframe>');
            //   // agent('body').append(download_iframe);
            //   // download_iframe.attr('src', agent(this).getHiddenValue());
            // } else {
            //   var file_name = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
            //   ajaxDownload(agent(this).getHiddenValue(), file_name, function(file) {});
            // }
            // var file_name = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
            // var download_url = agent(this).getHiddenValue();
            // agent.ajax({
            //   url: download_url,
            //   success: download.bind(true, "text/html", file_name)
            // });
          },
        },
      },
      'remove_file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body')) {
              var file_url_selector = '[data-r-field="file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                file_url_selector = file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_url_selector);
              file_url_element.setDisplayValue('');
              var file_name_selector = '[data-r-field="file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                file_name_selector = file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_name_selector);
              file_name_element.setDisplayValue('');
              var file_array = [];
              agent(this).setting('item_body').request('file', JSON.stringify(file_array));
            }
          },
        },
      },
      'image_file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_empty_ko': '泥⑤��� �뚯씪�� �좏깮�댁＜�몄슂.',
        '_event': {
          'select_image_file.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var image_file_url_selector = '[data-r-field="image_file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                image_file_url_selector = image_file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var image_file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(image_file_url_selector);
              var image_file_url_string = agent(this).getHiddenValue();
              image_file_url_element.setDisplayValue(image_file_url_string);
              agent('[data-r-field="image1"]').setDisplayValue(image_file_url_string);
              var image_file_name_selector = '[data-r-field="image_file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                image_file_name_selector = image_file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var image_file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(image_file_name_selector);
              var image_file_name_string = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
              image_file_name_element.setDisplayValue(image_file_name_string);
              if (image_file_url_element.length == 0 && image_file_name_element.length == 0 && String(agent(this).setting('image_file_extension')).match(/(jpg|png|gif|bmp|svg)/i) != null && agent(this).is('img')) {
                agent(this).setDisplayValue(agent(this).getHiddenValue());
              }
              // var item_data = agent(this).setting('item_body').setting('data');
              // var image_file_array = item_data['image_file'];
              var image_file_array = [];
              var image_file_item = {};
              image_file_item['image_file_name'] = image_file_name_string;
              image_file_item['image_file_url'] = image_file_url_string;
              image_file_item['image_file_extension'] = agent(this).setting('image_file_extension');
              image_file_array.push(image_file_item);
              agent(this).setting('item_body').request('image_file', JSON.stringify(image_file_array));
            }
          },
        },
      },
      'image_file_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
      },
      'image_file_url': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_does_not_work_on_ios_ko': '�꾩씠�곗� �ㅼ슫濡쒕뱶瑜� 吏��먰븯吏� �딆뒿�덈떎',
        '_event': {
          'click.agent_field': function(event) {
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
              if (agent(this).string('does_not_work_on_ios')) {
                agent.showMessage(agent(this).string('does_not_work_on_ios'));
              }
            } else {
              agent.link(agent.config('root_url') + '?_action=file_download&file_path=' + encodeURIComponent(agent(this).getHiddenValue()));
            }
          },
        },
      },
      'remove_image_file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body')) {
              var image_file_url_selector = '[data-r-field="image_file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                image_file_url_selector = image_file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var image_file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(image_file_url_selector);
              image_file_url_element.setDisplayValue('');
              agent('[data-r-field="image1"]').setDisplayValue('');
              var image_file_name_selector = '[data-r-field="image_file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                image_file_name_selector = image_file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var image_file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(image_file_name_selector);
              image_file_name_element.setDisplayValue('');
              var image_file_array = [];
              agent(this).setting('item_body').request('image_file', JSON.stringify(image_file_array));
            }
          },
        },
      },
      'video_file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_empty_ko': '泥⑤��� �뚯씪�� �좏깮�댁＜�몄슂.',
        '_event': {
          'select_video_file.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var video_file_url_selector = '[data-r-field="video_file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                video_file_url_selector = video_file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var video_file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(video_file_url_selector);
              var video_file_url_string = agent(this).getHiddenValue();
              video_file_url_element.setDisplayValue(video_file_url_string);
              agent('[data-r-field="video0"]').setDisplayValue(video_file_url_string);
              var video_file_name_selector = '[data-r-field="video_file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                video_file_name_selector = video_file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var video_file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(video_file_name_selector);
              var video_file_name_string = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
              video_file_name_element.setDisplayValue(video_file_name_string);
              if (video_file_url_element.length == 0 && video_file_name_element.length == 0 && String(agent(this).setting('video_file_extension')).match(/(jpg|png|gif|bmp|svg)/i) != null && agent(this).is('img')) {
                agent(this).setDisplayValue(agent(this).getHiddenValue());
              }
              // var item_data = agent(this).setting('item_body').setting('data');
              // var video_file_array = item_data['video_file'];
              var video_file_array = [];
              var video_file_item = {};
              video_file_item['video_file_name'] = video_file_name_string;
              video_file_item['video_file_url'] = video_file_url_string;
              video_file_item['video_file_extension'] = agent(this).setting('video_file_extension');
              video_file_array.push(video_file_item);
              agent(this).setting('item_body').request('video_file', JSON.stringify(video_file_array));
            }
          },
        },
      },
      'video_file_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
      },
      'video_file_url': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'string_does_not_work_on_ios_ko': '�꾩씠�곗� �ㅼ슫濡쒕뱶瑜� 吏��먰븯吏� �딆뒿�덈떎',
        '_event': {
          'click.agent_field': function(event) {
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
              if (agent(this).string('does_not_work_on_ios')) {
                agent.showMessage(agent(this).string('does_not_work_on_ios'));
              }
            } else {
              agent.link(agent.config('root_url') + '?_action=file_download&file_path=' + encodeURIComponent(agent(this).getHiddenValue()));
            }
          },
        },
      },
      'remove_video_file': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body')) {
              var video_file_url_selector = '[data-r-field="video_file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                video_file_url_selector = video_file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var video_file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(video_file_url_selector);
              video_file_url_element.setDisplayValue('');
              agent('[data-r-field="video0"]').setDisplayValue('');
              var video_file_name_selector = '[data-r-field="video_file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                video_file_name_selector = video_file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var video_file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(video_file_name_selector);
              video_file_name_element.setDisplayValue('');
              var video_file_array = [];
              agent(this).setting('item_body').request('video_file', JSON.stringify(video_file_array));
            }
          },
        },
      },
      'file0': {
        '_setting_type': 'default',
        '_event': {
          'init_callback.agent_field': function(event) {
            if (String(agent(this).getHiddenValue()).match(/attachments/i) == null) {}
          },
        },
      },
      'image0': {
        '_setting_type': 'default',
        'field_display_type': 'hidden_value',
        '_event': {
          'init_callback.agent_field': function(event) {
            if (String(agent(this).getHiddenValue()).match(/attachments/i) == null) {}
          },
          'field_rendering_callback.agent_field': function(event) {
            var file_url = String(agent(this).getHiddenValue());
            var file_name = file_url.replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
  
            var file_url_elements = agent(this).getFieldClassElements('file_url');
            var file_name_elements = agent(this).getFieldClassElements('file_name');
            var preview_file_elements = agent(this).getFieldClassElements('preview_file');
            if (file_url_elements.length == 0 && file_name_elements.length == 0 && preview_file_elements.length == 0 && (agent(this).is('img') || agent(this).is('input[type="text"]'))) {
              agent(this).setDisplayValue(file_url);
            } else {
              file_url_elements.setDisplayValue(file_url);
              file_name_elements.setDisplayValue(file_name);
              preview_file_elements.setDisplayValue(file_url);
            }
          },
        },
      },
      'image1': {
        '_setting_type': 'default',
        '_event': {
          'init_callback.agent_field': function(event) {
            if (String(agent(this).getHiddenValue()).match(/attachments/i) == null) {}
          },
        },
      },
      'image2': {
        '_setting_type': 'default',
        '_event': {
          'init_callback.agent_field': function(event) {
            if (String(agent(this).getHiddenValue()).match(/attachments/i) == null) {}
          },
        },
      },
      'image3': {
        '_setting_type': 'default',
        '_event': {
          'init_callback.agent_field': function(event) {
            if (String(agent(this).getHiddenValue()).match(/attachments/i) == null) {}
          },
        },
      },
  
      'image0_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            agent(this).setDisplayValue(String(item_data['image0']).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, ''));
          },
        },
      },
      'image1_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            agent(this).setDisplayValue(String(item_data['image1']).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, ''));
          },
        },
      },
      'image2_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            agent(this).setDisplayValue(String(item_data['image2']).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, ''));
          },
        },
      },
      'image3_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            agent(this).setDisplayValue(String(item_data['image3']).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, ''));
          },
        },
      },
      'file0_name': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            agent(this).setDisplayValue(String(item_data['file0']).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, ''));
          },
        },
      },
      'file0_url': {
        '_setting_type': 'default',
        'field_key': 'file0',
      },
      'image0_url': {
        '_setting_type': 'default',
        'field_key': 'image0',
      },
      'image1_url': {
        '_setting_type': 'default',
        'field_key': 'image1',
      },
      'image2_url': {
        '_setting_type': 'default',
        'field_key': 'image2',
      },
      'image3_url': {
        '_setting_type': 'default',
        'field_key': 'image3',
      },
  
  
      'image01': {
        '_setting_type': 'default',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).dataAttribute('link') || agent(this).dataAttribute('dialog')) {
              agent(this).setting(_common.initSetting['common_fields']['show_detail']);
            }
          },
          'select_file.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var file_url_selector = '[data-r-field="file_url"]';
              if (agent(this).dataAttribute('field_class')) {
                file_url_selector = file_url_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_url_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_url_selector);
              var file_url_string = agent(this).getHiddenValue();
              file_url_element.setDisplayValue(file_url_string);
              var file_name_selector = '[data-r-field="file_name"]';
              if (agent(this).dataAttribute('field_class')) {
                file_name_selector = file_name_selector + '[data-r-field-class="' + agent(this).dataAttribute('field_class') + '"]';
              }
              var file_name_element = agent(this).setting('item_body').bindElements('member_fields').filter(file_name_selector);
              var file_name_string = String(agent(this).getHiddenValue()).replace(/[\\\/]{0,}attachments[\\\/]{1,}/i, '');
              file_name_element.setDisplayValue(file_name_string);
              if (String(agent(this).setting('file_extension')).match(/(jpg|png|gif|bmp|svg)/i) != null && agent(this).is('img')) {
                agent(this).setDisplayValue(agent(this).getHiddenValue());
              }
              // var item_data = agent(this).setting('item_body').setting('data');
              // var file_array = item_data['file'];
              var image_array = [];
              var file_item = {};
              file_item['file_name'] = file_name_string;
              file_item['file_url'] = file_url_string;
              file_item['file_extension'] = agent(this).setting('file_extension');
              image_array.push(file_item);
              agent(this).setting('item_body').request('image', JSON.stringify(image_array));
            }
          },
        },
      },
      'title': {
        '_setting_type': 'default',
        'field_key': 'posts_title',
        'string_empty_ko': '�쒕ぉ�� �낅젰�� 二쇱꽭��',
      },
      'posts_title': {
        '_setting_type': 'default',
        'string_empty_ko': '�쒕ぉ�� �낅젰�� 二쇱꽭��',
      },
      'description': {
        '_setting_type': 'default',
        'field_key': 'posts_description',
        'string_empty_ko': '�댁슜�� �낅젰�� 二쇱꽭��',
      },
      'posts_description': {
        '_setting_type': 'default',
        'string_empty_ko': '�댁슜�� �낅젰�� 二쇱꽭��',
      },
      'place': {
        '_setting_type': 'default',
        'string_empty_ko': '�μ냼瑜� �낅젰�� 二쇱꽭��',
      },
      'writer': {
        '_setting_type': 'default',
        'string_empty_ko': '�묒꽦�� �대쫫�� �낅젰�� 二쇱꽭��',
      },
      'phone': {
        '_setting_type': 'default',
        'field_display_type': 'phone',
        'string_empty_ko': '�곕씫泥섎� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var field_string = agent(this).dataAttribute('field');
            var part1_string = field_string + '_part1';
            var part2_string = field_string + '_part2';
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part1_string + '"]').length > 0) {
              var phone_part1 = agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part1_string + '"]');
              agent(this).setting('phone_part1_element', phone_part1);
              phone_part1.setting('phone_element', agent(this));
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part2_string + '"]').length > 0) {
              var phone_part2 = agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part2_string + '"]');
              agent(this).setting('phone_part2_element', phone_part2);
              phone_part2.setting('phone_element', agent(this));
            }
          },
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var number_string = String(agent(this).getHiddenValue()).toPhoneString();
              var split_number_string = number_string.split(/\-/);
              if (split_number_string.length > 0 && agent(this).setting('phone_part1_element')) {
                agent(this).setDisplayValue(split_number_string[0]);
                agent(this).setting('phone_part1_element').setDisplayValue(split_number_string[1]);
                if (split_number_string.length > 1 && agent(this).setting('phone_part2_element')) {
                  agent(this).setting('phone_part2_element').setDisplayValue(split_number_string[2]);
                }
              }
            }
          },
          'change.agent_field': function(event) {
            if (agent(this).getDisplayValue() && agent(this).setting('phone_part1_element') && agent(this).setting('phone_part1_element').getDisplayValue() && agent(this).setting('phone_part2_element') && agent(this).setting('phone_part2_element').getDisplayValue()) {
              agent(this).setHiddenValue('' + agent(this).getDisplayValue() + agent(this).setting('phone_part1_element').getDisplayValue() + agent(this).setting('phone_part2_element').getDisplayValue());
            } else if (agent(this).getDisplayValue() && agent(this).setting('phone_part1_element') && agent(this).setting('phone_part1_element').getDisplayValue() && agent(this).setting('phone_part2_element') && !agent(this).setting('phone_part2_element').getDisplayValue()) {
              agent(this).setHiddenValue('');
            } else if (agent(this).getDisplayValue() && agent(this).setting('phone_part1_element') && agent(this).setting('phone_part1_element').getDisplayValue()) {
              agent(this).setHiddenValue('' + agent(this).getDisplayValue() + agent(this).setting('phone_part1_element').getDisplayValue());
            } else if (agent(this).getDisplayValue() && agent(this).setting('phone_part1_element') && !agent(this).setting('phone_part1_element').getDisplayValue()) {
              agent(this).setHiddenValue('');
            } else if (agent(this).getDisplayValue()) {
              agent(this).setHiddenValue('' + agent(this).getDisplayValue());
            } else {
              agent(this).setHiddenValue('');
            }
            if (agent(this).getHiddenValue() && String(agent(this).getHiddenValue()).match(/^[0-9\-]{1,}$/) == null) {
              agent(this).setHiddenValue('');
              if (agent(this).string('number_only')) {
                agent.showMessage(agent(this).string('number_only'));
              }
            }
          },
        },
      },
      'phone_part1': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
        '_event': {
          'change.agent_field': function(event) {
            if (String(agent(this).getDisplayValue()).match(/^[0-9\-]{0,}$/) == null && agent(this).string('number_only')) {
              agent.showMessage(agent(this).string('number_only'));
            }
            if (agent(this).setting('phone_element')) {
              agent(this).setting('phone_element').trigger('change.agent_field');
            }
          },
        },
      },
      'phone_part2': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
        '_event': {
          'change.agent_field': function(event) {
            if (String(agent(this).getDisplayValue()).match(/^[0-9\-]{0,}$/) == null && agent(this).string('number_only')) {
              agent.showMessage(agent(this).string('number_only'));
            }
            if (agent(this).setting('phone_element')) {
              agent(this).setting('phone_element').trigger('change.agent_field');
            }
          },
        },
      },
      'telephone': {
        '_setting_type': 'default',
        'field_display_type': 'phone',
        'string_empty_ko': '�꾪솕踰덊샇瑜� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'telephone_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'telephone_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'mobile': {
        '_setting_type': 'default',
        'string_empty_ko': '�대��곕쾲�몃� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'mobile_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'mobile_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'email': {
        '_setting_type': 'default',
        'field_display_type': 'email',
        'string_empty_ko': '�대찓�쇱쓣 �낅젰�댁＜�몄슂',
        'string_regexp_error_ko': '�대찓�� �뺤떇�� �섎せ�섏뿀�듬땲��.',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            var field_string = agent(this).dataAttribute('field');
            var part1_string = field_string + '_part1';
            var part2_string = field_string + '_part2';
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part1_string + '"]').length > 0) {
              var email_part1 = agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part1_string + '"]');
              agent(this).setting('email_part1_element', email_part1);
              email_part1.setting('email_element', agent(this));
              if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part2_string + '"]').length > 0) {
                var email_part2 = agent(this).setting('item_body').bindElements('field').filter('[data-r-field="' + part2_string + '"]');
                agent(this).setting('email_part2_element', email_part2);
                email_part1.setting('email_part2_element', email_part2);
                email_part2.setting('email_part1_element', email_part1);
                email_part2.setting('email_element', agent(this));
              }
            }
          },
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).getHiddenValue()) {
              var email_string = String(agent(this).getHiddenValue());
              var split_email_string = email_string.split(/@/);
              if (split_email_string.length > 0 && agent(this).setting('email_part1_element')) {
                agent(this).setDisplayValue(split_email_string[0]);
                agent(this).setting('email_part1_element').setDisplayValue(split_email_string[1]);
                if (agent(this).setting('email_part2_element')) {
                  agent(this).setting('email_part2_element').setDisplayValue(split_email_string[1]);
                }
              }
            }
          },
          'change.agent_field': function(event) {
            if (agent(this).getDisplayValue() && agent(this).setting('email_part1_element') && agent(this).setting('email_part1_element').getDisplayValue()) {
              agent(this).setHiddenValue('' + agent(this).getDisplayValue() + '@' + agent(this).setting('email_part1_element').getDisplayValue());
            } else if (agent(this).getDisplayValue() && agent(this).setting('email_part1_element') && !agent(this).setting('email_part1_element').getDisplayValue()) {
              agent(this).setHiddenValue('');
            } else if (agent(this).getDisplayValue()) {
              agent(this).setHiddenValue('' + agent(this).getDisplayValue());
            } else {
              agent(this).setHiddenValue('');
            }
            if (agent(this).getHiddenValue() && String(agent(this).getHiddenValue()).match(/^.{1,}@.{1,}\..{1,}$/) == null) {
              agent(this).setHiddenValue('');
              if (agent(this).string('regexp_error')) {
                agent.showMessage(agent(this).string('regexp_error'));
              }
            }
          },
        },
      },
      'email_part1': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'change.agent_field': function(event) {
            if (agent(this).setting('email_part2_element')) {
              agent(this).setting('email_part2_element').setDisplayValue(agent(this).getDisplayValue());
            }
            if (agent(this).setting('email_element')) {
              agent(this).setting('email_element').trigger('change.agent_field');
            }
          },
        },
      },
      'email_part2': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'change.agent_field': function(event) {
            if (agent(this).setting('email_part1_element')) {
              agent(this).setting('email_part1_element').setDisplayValue(agent(this).getDisplayValue());
            }
            if (agent(this).setting('email_element')) {
              agent(this).setting('email_element').trigger('change.agent_field');
            }
          },
        },
      },
      'billing_address_phone': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰Ц�섏떆�� 遺꾩쓽 �곕씫泥섎� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_phone_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_phone_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_telephone': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰Ц�섏떆�� 遺꾩쓽 �꾪솕踰덊샇瑜� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_telephone_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_telephone_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_mobile': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰Ц�섏떆�� 遺꾩쓽 �대��곕쾲�몃� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_mobile_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_mobile_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'billing_address_email': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰Ц�섏떆�� 遺꾩쓽 �대찓�쇱쓣 �낅젰�댁＜�몄슂',
        'string_regexp_error_ko': '�대찓�� �뺤떇�� �섎せ�섏뿀�듬땲��.',
      },
      'shipping_address_phone': {
        '_setting_type': 'default',
        'string_empty_ko': '諛곗넚�� 諛쏅뒗 遺꾩쓽 �곕씫泥섎� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_phone_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_phone_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_telephone': {
        '_setting_type': 'default',
        'string_empty_ko': '諛곗넚�� 諛쏅뒗 遺꾩쓽 �꾪솕踰덊샇瑜� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_telephone_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_telephone_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_mobile': {
        '_setting_type': 'default',
        'string_empty_ko': '諛곗넚�� 諛쏅뒗 遺꾩쓽 �대��곕쾲�몃� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_mobile_part1': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_mobile_part2': {
        '_setting_type': 'default',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
      },
      'shipping_address_email': {
        '_setting_type': 'default',
        'string_empty_ko': '諛곗넚�� 諛쏅뒗 遺꾩쓽 �대찓�쇱쓣 �낅젰�댁＜�몄슂',
        'string_regexp_error_ko': '�대찓�� �뺤떇�� �섎せ�섏뿀�듬땲��.',
      },
      'point_status': {
        '_setting_type': 'default',
        'field_replace': {
          '!{point_status}': '誘몃벑濡�',
          '{point_status}==0': '誘몃벑濡�',
          '{point_status}==1': '�ъ슜媛���',
        },
      },
      'point_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'name': {
        '_setting_type': 'default',
        'string_empty_ko': '�대쫫�� �낅젰�댁＜�몄슂',
      },
      'name_en': {
        '_setting_type': 'default',
        'string_empty_ko': '�대쫫�� �낅젰�댁＜�몄슂',
      },
      'display_name': {
        '_setting_type': 'default',
        'string_empty_ko': '�대쫫�� �낅젰�댁＜�몄슂',
      },
      'prefix_goods_code': {
        '_setting_type': 'default',
        'regexp': '[A-Za-z0-9]{3}',
        'regexp_error_ko': '�멸��먯쓽 �곸닽�먮줈 �낅젰�댁＜�몄슂.',
      },
      'id': {
        '_setting_type': 'default',
        'field_key': 'member_id',
        'string_empty_ko': '�꾩씠�붾� �낅젰�댁＜�몄슂',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            if (!agent(this).setting('regexp') && agent.config('default_id_regexp')) {
              agent(this).setting('regexp', agent.config('default_id_regexp'));
            }
            if (!agent(this).string('regexp_error_ko') && agent.config('default_string_id_regexp_error_ko')) {
              agent(this).string('regexp_error_ko', agent.config('default_string_id_regexp_error_ko'));
            }
          },
        },
      },
      'id_verification': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'string_empty_ko': '�ъ슜 媛��ν븳 �꾩씠�붿씤吏� �뺤씤�댁＜�몄슂',
        'string_unavailable_ko': '�ъ슜�� �� �녿뒗 �꾩씠�붿엯�덈떎',
        'string_available_ko': '�ъ슜 媛��ν븳 �꾩씠�붿엯�덈떎',
        '_request': {
          '_action': 'verify_account_information',
          '_mode': 'id',
          '_callback': function(data) {
            var callback_element = data['callback_element'];
            if (data['code'] == '000') {
              callback_element.setHiddenValue('id_verification', true);
              if (callback_element.string('available')) {
                agent.showMessage(callback_element.string('available'));
              }
              if (callback_element.string('available') && callback_element.setting('item_body') && callback_element.setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').length > 0) {
                callback_element.setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').setDisplayValue(callback_element.string('available')).removeClass('unavailable').addClass('available');
              }
            } else {
              callback_element.setHiddenValue('id_verification', '');
              if (callback_element.string('unavailable')) {
                agent.showMessage(callback_element.string('unavailable'));
              }
              if (callback_element.string('unavailable') && callback_element.setting('item_body') && callback_element.setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').length > 0) {
                callback_element.setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').setDisplayValue(callback_element.string('unavailable')).removeClass('available').addClass('unavailable');
              }
            }
          },
        },
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="id"],[data-r-field="member_id"]').length > 0 && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="id"],[data-r-field="member_id"]').checkValue()) {
              var member_id = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="id"],[data-r-field="member_id"]').getDisplayValue();
              agent(this).api({
                'member_id': member_id,
              });
              agent('[data-r-field="need_id"]').setDisplayValue('true');
            } else {
              if (agent(this).string('unavailable') && agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').length > 0) {
                agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="id_message"]').setDisplayValue(agent(this).string('unavailable')).removeClass('available').addClass('unavailable');
              }
              agent('[data-r-field="need_id"]').setDisplayValue('');
            }
          },
        },
      },
      'need_id': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'string_empty_ko': '�꾩씠�붾� �낅젰�� �덈릺�덇굅�� 以묐났�뺤씤�� �덈릺�덉뒿�덈떎.',
      },
      'id_message': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'password': {
        '_setting_type': 'default',
        'field_key': 'member_password',
        'regexp': null,
        'string_regexp_error_ko': null,
        'dialog': 'confirm',
        'string_dialog_message_ko': '�⑥뒪�뚮뱶瑜� 蹂�寃쏀븯�쒓쿋�듬땲源�?',
        'string_empty_ko': '�⑥뒪�뚮뱶瑜� �뺤씤�댁＜�몄슂',
        'string_not_match_ko': '�⑥뒪�뚮뱶媛� �숈씪�섏� �딆뒿�덈떎.',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password"]').length > 0) {
              var confirm_password = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password"]');
              agent(this).setting('confirm_password_element', confirm_password);
              confirm_password.setting('password_element', agent(this));
              if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password_section"]').length > 0) {
                var confirm_password_section = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password_section"]');
                agent(this).setting('confirm_password_section_element', confirm_password_section);
                confirm_password_section.setting('password_element', agent(this));
                confirm_password.setting('confirm_password_section_element', confirm_password_section);
                confirm_password_section.setting('confirm_password', confirm_password);
  
              }
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="password_message"]').length > 0) {
              var password_message = agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="password_message"]');
              agent(this).setting('password_message_element', password_message);
              password_message.setting('password_element', agent(this));
            }
  
            if (!agent(this).setting('regexp') && agent.config('default_password_regexp')) {
              agent(this).setting('regexp', agent.config('default_password_regexp'));
            }
            if (!agent(this).string('regexp_error_ko') && agent.config('default_string_password_regexp_error_ko')) {
              agent(this).string('regexp_error_ko', agent.config('default_string_password_regexp_error_ko'));
            }
          },
          'click.agent_field': function(event) {
            if (agent(this).setting('confirm_password_section_element') && agent(this).setting('confirm_password_section_element').is(':hidden')) {
              agent(this).showDialog();
            }
          },
          'positive_callback.agent_dialog': function(event) {
            agent(this).setting('confirm_password_section_element').show();
          },
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).getDisplayValue() == '********') {
              agent(this).setHiddenValue('********');
              agent(this).setDisplayValue('');
            }
          },
          'regexp_error.agent_field': function(event) {
            if (agent(this).setting('password_message_element') && agent(this).string('regexp_error')) {
              agent(this).setting('password_message_element').setDisplayValue(agent(this).string('regexp_error'));
            }
          },
          'focusout.agent_field': function(event) {
            if (agent(this).getDisplayValue()) {
              if (agent(this).setting('confirm_password_element')) {
                if (agent(this).getDisplayValue() == agent(this).setting('confirm_password_element').getDisplayValue()) {
                  agent(this).setHiddenValue(agent(this).getDisplayValue());
                  if (agent(this).setting('password_message_element')) {
                    agent(this).setting('password_message_element').setDisplayValue('');
                  }
                  agent(this).checkRegExp();
                } else {
                  agent(this).setHiddenValue('');
                  if (agent(this).setting('password_message_element') && agent(this).string('not_match')) {
                    agent(this).setting('password_message_element').setDisplayValue(agent(this).string('not_match'));
                  }
                }
              } else {
                agent(this).setHiddenValue(agent(this).getDisplayValue());
                if (agent(this).setting('password_message_element')) {
                  agent(this).setting('password_message_element').setDisplayValue('');
                }
                agent(this).checkRegExp();
              }
            }
          },
        },
      },
      'confirm_password': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'focusout.agent_field': function(event) {
            if (agent(this).setting('password_element')) {
              agent(this).setting('password_element').trigger('focusout.agent_field');
            }
          },
        },
      },
      'confirm_password_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).hide();
          },
        },
      },
      'password_message': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'show_change_password': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="change_password_section"]').length > 0) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="change_password_section"]').show();
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="password_section"]').length > 0) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="password_section"]').show();
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password_section"]').length > 0) {
              agent(this).setting('item_body').bindElements('member_fields').filter('[data-r-field="confirm_password_section"]').show();
            }
          },
        },
      },
      'change_password_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'password_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'confirm_password_section': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'member_code': {
        '_setting_type': 'default',
        'string_empty_ko': '�뚯썝踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'posts_password': {
        '_setting_type': 'default',
        'string_empty_ko': '�⑥뒪�뚮뱶瑜� �낅젰�댁＜�몄슂',
      },
      'birthday': {
        '_setting_type': 'default',
        'string_empty_ko': '�앸뀈�붿씪�� �낅젰�댁＜�몄슂',
      },
      'sex': {
        '_setting_type': 'default',
        'string_empty_ko': '�깅퀎�� �낅젰�댁＜�몄슂',
        'field_replace_ko': {
          '{sex}=="male"': '�⑥꽦',
          '{sex}=="female"': '�ъ꽦',
        },
      },
      'member_point': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'field_replace_ko': {
          '!{member_point}': '0',
        },
      },
      'status': {
        '_setting_type': 'default',
        'field_key': 'member_status',
        'field_replace_ko': {
          '{member_status}==-1': '�덊눜',
          '{member_status}==0': '媛��낅�湲�',
          '{member_status}==1': '�쇰컲�뚯썝',
          '{member_status}>10': '�몄쬆�뚯썝',
          '{member_status}>20': '�뚯냽�뚯썝',
          '{member_status}>60': '愿�由ъ옄',
          '{member_status}>80': '理쒓퀬愿�由ъ옄',
        },
      },
      'member_status': {
        '_setting_type': 'default',
        'field_key': 'member_status',
        'field_replace_ko': {
          '{member_status}==-1': '�덊눜',
          '{member_status}==0': '媛��낅�湲�',
          '{member_status}==1': '�쇰컲�뚯썝',
          '{member_status}==10': '�쇰컲�뚯썝',
          '{member_status}>10': '�몄쬆�뚯썝',
          '{member_status}>20': '�뚯냽�뚯썝',
          '{member_status}>60': '愿�由ъ옄',
          '{member_status}>80': '理쒓퀬愿�由ъ옄',
        },
      },
      'zip_code': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'address': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'road_address': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'jibun_address': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'address_line1': {
        '_setting_type': 'default',
        'string_empty_ko': '�곸꽭二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'address_line2': {
        '_setting_type': 'default',
        'string_empty_ko': '�곸꽭二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'resident_registration_number': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰�踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'business_registration_number': {
        '_setting_type': 'default',
        'string_empty_ko': '�ъ뾽�먮쾲�몃� �낅젰�댁＜�몄슂',
      },
      'mail_order_registration_number ': {
        '_setting_type': 'default',
        'string_empty_ko': '�듭떊�먮ℓ�좉퀬踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'business_owner': {
        '_setting_type': 'default',
        'string_empty_ko': '���쒖옄(�ъ뾽��) �대쫫�� �낅젰�댁＜�몄슂',
      },
      'manager': {
        '_setting_type': 'default',
        'string_empty_ko': '�대떦�먮� �낅젰�댁＜�몄슂',
      },
      'sales_manager': {
        '_setting_type': 'default',
        'string_empty_ko': '�먮ℓ�대떦�먮� �낅젰�댁＜�몄슂',
      },
      'fax': {
        '_setting_type': 'default',
        'string_empty_ko': 'FAX 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'company_name': {
        '_setting_type': 'default',
        'string_empty_ko': '�낆껜 �대쫫�� �낅젰�댁＜�몄슂',
      },
      'juso': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'address': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'goods_code': {
        '_setting_type': 'default',
        'string_empty_ko': '�곹뭹肄붾뱶瑜� �낅젰�댁＜�몄슂',
      },
      'goods_code_prefix': {
        '_setting_type': 'default',
        'string_empty_ko': '�곹뭹肄붾뱶 �욎뿉 �ъ슜�� 臾몄옄瑜� �낅젰�댁＜�몄슂',
      },
      'goods_name': {
        '_setting_type': 'default',
        'field_key': 'goods_name',
        'string_empty_ko': '�곹뭹紐낆쓣 �낅젰�댁＜�몄슂',
        '_event': {
          'change.agent_buy': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (agent(this).is('input') && agent(this).val()) {
              agent(this).next('.text_num').text(String(agent(this).val()).length);
              if (String(agent(this).val()).length > 50) {
                agent.showMessage("�곹뭹紐낆쓣 50�� �대궡濡� �낅젰�댁＜�몄슂");
              }
            }
          },
        },
      },
      'goods_name_en': {
        '_setting_type': 'default',
        'field_key': 'goods_name_en',
        'string_empty_ko': '�곷Ц �곹뭹紐낆쓣 �낅젰�댁＜�몄슂',
      },
      'goods_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{goods_status}==-1': '�먮ℓ以묒�',
          '{goods_status}==0': '�먮ℓ以�',
        },
        'string_empty_ko': '�곹뭹 �곹깭瑜� �낅젰�댁＜�몄슂',
      },
      'order_code': {
        '_setting_type': 'default',
      },
      'sales_section': {
        '_setting_type': 'default',
        'field_key': 'sold_out',
        'field_display': '!{sold_out}',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'shipping_company': {
        '_setting_type': 'default',
        'string_empty_ko': '�앸같 �뚯궗瑜� �낅젰�댁＜�몄슂',
      },
      'minimum_payment': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'shipping_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '諛곗넚鍮꾨� �낅젰�댁＜�몄슂',
      },
      'shipping_price_type': {
        '_setting_type': 'default',
        'string_empty_ko': '諛곗넚鍮� ���낆쓣 �낅젰�댁＜�몄슂',
        'field_replace_ko': {
          '!{shipping_price_type}': '',
          '{shipping_price_type}==0': '',
          '{shipping_price_type}==10': '臾대즺',
          '{shipping_price_type}==20': '',
        },
      },
      'maximum_price_with_shipping_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '諛곗넚鍮꾧� 諛쒖깮�섎뒗 理쒕� 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'minimum_price_with_free_shipping': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '臾대즺 諛곗넚�� �쒖옉�섎뒗 理쒖냼 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'return_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '諛섑뭹 �� 吏�遺덊븷 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'exchange_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�곹뭹 援먰솚 �� 吏�遺덊븷 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'cost': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�먭�瑜� �낅젰�댁＜�몄슂',
      },
      'factory_cost': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�쒖“ �먭�瑜� �낅젰�댁＜�몄슂',
      },
      'sales_cost': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�먮ℓ �먭�瑜� �낅젰�댁＜�몄슂',
      },
      'price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�먮ℓ媛�瑜� �낅젰�댁＜�몄슂',
      },
      'member_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�뚯썝 �먮ℓ媛�瑜� �낅젰�댁＜�몄슂',
      },
      'member10_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�뚯썝 �먮ℓ媛�瑜� �낅젰�댁＜�몄슂',
      },
      'member20_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�뚯썝 �먮ℓ媛�瑜� �낅젰�댁＜�몄슂',
      },
      'member10_price_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'member20_price_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'member10_price_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'member20_price_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'cost_to_price_ratio': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.ceil({price}/{cost}*100)',
      },
      'cost_to_point_ratio': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.ceil({point}/{cost}*100)',
      },
      'price_to_cost_ratio': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.ceil({cost}/{price}*100)',
      },
      'point_to_cost_ratio': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.round({cost}/{point}*10000)/100',
      },
      'buy_goods': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_buy': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              if (!item_data['buy_list_item'] || item_data['buy_list_item'].length < 1) {
                agent.showMessage('�듭뀡�� �좏깮�댁＜�몄슂');
                return;
              }
              if (item_data['category'] != '87' && item_data['point_total'] > agent.config('member_point')) {
                agent.showMessage('�ъ씤�멸� 遺�議깊빀�덈떎');
                return;
              }
              if (agent.config('buy_unique_goods') && agent.config('buy_unique_goods') != '' && agent.config('buy_unique_goods') != 'false' && item_data['category'] == '55') {
                if (moment(agent.config('buy_unique_goods'), 'YYYY-MM-DD HH:mm:SS').isValid()) {
                  var buy_unique_goods_datetime = moment(agent.config('buy_unique_goods'), 'YYYY-MM-DD HH:mm:SS');
                  buy_unique_goods_datetime = buy_unique_goods_datetime.add(30, 'day');
                  var now_datetime = moment();
                  if (buy_unique_goods_datetime.isSameOrAfter(now_datetime)) {
                    agent.showMessage('媛��� �꾨줈紐⑥뀡 �쒗뭹�� �쒕떖�� �쒕쾲 援ъ엯 媛��ν빀�덈떎.');
                    return;
                  }
                } else {
                  agent.showMessage('媛��� �꾨줈紐⑥뀡 �쒗뭹 寃�利앹뿉 臾몄젣媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�댁＜�몄슂.');
                  return;
                }
              }
              // if (agent.config('buy_unique_goods87') && item_data['category'] == '87') {
              //   agent.showMessage('酉고떚 �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
              //   return;
              // } else if (item_data['category'] == '87') {
              //   for (var i = 0; i < item_data['buy_list_item'].length; i++) {
              //     if (item_data['category'] == '87' && item_data['buy_list_item'][i]['quantity'] > 1) {
              //       agent.showMessage('酉고떚 �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
              //       return;
              //     }
              //   }
              // }
              agent.session('agent_buy_list', JSON.stringify(item_data['buy_list_item']));
              agent(this).link();
            }
          },
        },
      },
      'buy_options': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_buy': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            if (!agent('[data-r-field="buy_date"]').getDisplayValue()) {
              agent.showMessage('�좎쭨瑜� �좏깮�댁＜�몄슂.');
              return;
            }
            if (!agent('[data-r-field="selected_option_0_name"]').getDisplayValue()) {
              agent.showMessage('泥ル쾲吏� �듭뀡�� �좏깮�댁＜�몄슂.');
              return;
            }
            if (!agent('[data-r-field="selected_option_1_name"]').getDisplayValue()) {
              if (item_data['option_1'] && (!item_data['option_1']['status'] || item_data['option_1']['status'] == 'false')) {
  
              } else if (item_data['option_1'] && (!item_data['option_1']['required'] || item_data['option_1']['required'] == 'false')) {
  
              } else {
                agent.showMessage('�먮쾲吏� �듭뀡�� �좏깮�댁＜�몄슂.');
                return;
              }
            }
            if (!agent('[data-r-field="selected_option_2_name"]').getDisplayValue()) {
              if (item_data['option_2'] && (!item_data['option_2']['status'] || item_data['option_2']['status'] == 'false')) {
  
              } else if (item_data['option_2'] && (!item_data['option_2']['required'] || item_data['option_2']['required'] == 'false')) {
  
              } else {
                agent.showMessage('�몃쾲吏� �듭뀡�� �좏깮�댁＜�몄슂.');
                return;
              }
            }
            if (!agent('[data-r-field="selected_option_3_name"]').getDisplayValue()) {
              if (item_data['option_3'] && (!item_data['option_3']['status'] || item_data['option_3']['status'] == 'false')) {
  
              } else if (item_data['option_3'] && (!item_data['option_3']['required'] || item_data['option_3']['required'] == 'false')) {
  
              } else {
                agent.showMessage('�ㅻ쾲吏� �듭뀡�� �좏깮�댁＜�몄슂.');
                return;
              }
            }
            if (!agent('[data-r-field="selected_option_4_name"]').getDisplayValue()) {
              if (item_data['option_4'] && (!item_data['option_4']['status'] || item_data['option_4']['status'] == 'false')) {
  
              } else if (item_data['option_4'] && (!item_data['option_4']['required'] || item_data['option_4']['required'] == 'false')) {
  
              } else {
                agent.showMessage('�ㅼ꽢踰덉㎏ �듭뀡�� �좏깮�댁＜�몄슂.');
                return;
              }
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              var buy_list = [];
              var buy_data = {};
              buy_data['quantity'] = 1;
              buy_data['image0'] = item_data['image0'];
              buy_data['goods_name'] = item_data['goods_name'];
              buy_data['order_title'] = item_data['goods_name'];
              buy_data['order_options'] = agent('[data-r-field="buy_date"]').getDisplayValue() + ' ' + agent('[data-r-field="selected_option_0_name"]').getDisplayValue() + ' ' + agent('[data-r-field="selected_option_1_name"]').getDisplayValue() + ' ' + agent('[data-r-field="selected_option_2_name"]').getDisplayValue() + ' ' + agent('[data-r-field="selected_option_3_name"]').getDisplayValue() + ' ' + agent('[data-r-field="selected_option_4_name"]').getDisplayValue();
              buy_data['price'] = agent('[data-r-field="price_total"]').getHiddenValue();
              buy_list.push(buy_data);
              agent.session('agent_buy_list', JSON.stringify(buy_list));
              agent(this).link();
            }
          },
        },
      },
      'member_buy_goods': { // TODO remove
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'click.agent_buy': function(event) {
            if (agent.config('member_status') > 0) {
              if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
                var item_data = agent(this).setting('item_body').setting('data');
                agent.session('agent_buy_list', JSON.stringify(item_data['buy_list_item']));
                agent(this).link();
              }
            } else {
              agent.showMessage('�뚯썝留� �댁슜�섏떎 �� �덉뒿�덈떎. 濡쒓렇�몄쓣 吏꾪뻾�댁＜�몄슂.');
            }
          },
        },
      },
      'option_list_item': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).setting('data')) {
              var item_data = agent(this).setting('data');
              for (var item_key in item_data) {
                agent(this).find('[data-r-field="' + item_key + '"]').setDisplayValue(item_data[item_key]);
              }
            }
          },
          'change.agent_item': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              var selected_option_data = agent(this).find('option:selected').setting('data');
              if (selected_option_data) {
                var unique = true;
                for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                  if (item_data['buy_list_item'][i]['goods_code'] == selected_option_data['goods_code'] && item_data['buy_list_item'][i]['option_name'] == selected_option_data['option_name']) {
                    unique = false;
                    item_data['buy_list_item'][i]['quantity']++;
                    break;
                  }
                }
                if (unique) {
                  item_data['buy_list_item'].push(selected_option_data);
                }
                item_data = _common.makeBuyListData(item_data);
                agent(this).setting('item_body').setting('data', item_data).itemRendering();
              }
            }
          },
        },
      },
      'option_name': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            if (agent('[data-r-type="goods_posts"]').length > 0) {
              var role_data = agent('[data-r-type="goods_posts"]').setting('data');
              var option_list_item = [];
              var option_list_item_elements = agent('[data-r-field="option_list_item"]');
              for (var i = 0; i < option_list_item_elements.length; i++) {
                var option_item = {};
                option_item['option_name'] = option_list_item_elements.eq(i).find('[data-r-field="option_name"]').getDisplayValue();
                option_item['option_stock_quantity'] = option_list_item_elements.eq(i).find('[data-r-field="option_stock_quantity"]').getDisplayValue();
                option_item['option_cost'] = option_list_item_elements.eq(i).find('[data-r-field="option_cost"]').getDisplayValue();
                option_item['option_point'] = option_list_item_elements.eq(i).find('[data-r-field="option_point"]').getDisplayValue();
                option_item['option_status'] = option_list_item_elements.eq(i).find('[data-r-field="option_status"]').getDisplayValue();
                option_list_item.push(option_item);
              }
              agent('[data-r-type="goods_posts"]').request('option_list_item', option_list_item);
              for (var i = 0; i < option_list_item.length; i++) {
                agent('[data-r-type="goods_posts"]').request('option' + i + '_name', option_list_item[i]['option_name']);
                agent('[data-r-type="goods_posts"]').request('option' + i + '_stock_quantity', option_list_item[i]['option_stock_quantity']);
                agent('[data-r-type="goods_posts"]').request('option' + i + '_cost', option_list_item[i]['option_cost']);
                agent('[data-r-type="goods_posts"]').request('option' + i + '_point', option_list_item[i]['option_point']);
                agent('[data-r-type="goods_posts"]').request('option' + i + '_status', option_list_item[i]['option_status']);
              }
            }
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_name');
            }
          },
          'field_rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            // if (item_data['goods_name'] == item_data['option_name']) {
            //   agent(this).hide();
            // }
          },
        },
      },
      'option_price': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            agent('[data-r-field="option_name"]').eq(0).trigger('change');
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_price');
            }
          },
        },
      },
      'option_point': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            agent('[data-r-field="option_name"]').eq(0).trigger('change');
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_point');
            }
          },
        },
      },
      'option_stock_quantity': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            agent('[data-r-field="option_name"]').eq(0).trigger('change');
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_stock_quantity');
            }
          },
        },
      },
      'option_cost': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            agent('[data-r-field="option_name"]').eq(0).trigger('change');
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_cost');
            }
          },
        },
      },
      'option_status': {
        '_setting_type': 'default',
        '_event': {
          'change': function(event) {
            agent('[data-r-field="option_name"]').eq(0).trigger('change');
          },
          'init_member_field_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('list_item_index') !== undefined) {
              var list_item_index = agent(this).setting('item_body').setting('list_item_index');
              agent(this).setting('submit_field_key', 'option' + list_item_index + '_status');
            }
          },
        },
      },
      'favorite_list_item': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'change_buy_list.agent_item': function(event, data) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (data && agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var list_item_data = agent(this).setting('item_body').setting('data');
              for (var i = 0; i < list_item_data['favorite_list_item'].length; i++) {
                if (list_item_data['favorite_list_item'][i]['goods_code'] == data['goods_code']) {
                  list_item_data['favorite_list_item'][i]['quantity'] = data['quantity'];
                }
              }
              agent.local('agent_favorite', JSON.stringify(list_item_data['favorite_list_item']));
              var sync_param = {};
              sync_param['_action'] = 'sync_data';
              sync_param['_action_type'] = 'submit';
              sync_param['favorite'] = JSON.stringify(list_item_data['favorite_list_item']);
              agent().api(sync_param);
              list_item_data = _common.makeBuyListData(list_item_data);
              agent(this).setting('item_body').setting('data', list_item_data).itemRendering();
            }
          },
        },
      },
      'cart_list_item': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'change_buy_list.agent_item': function(event, data) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (data && agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var list_item_data = agent(this).setting('item_body').setting('data');
              for (var i = 0; i < list_item_data['cart_list_item'].length; i++) {
                if (list_item_data['cart_list_item'][i]['goods_code'] == data['goods_code'] && list_item_data['cart_list_item'][i]['option_name'] == data['option_name']) {
                  list_item_data['cart_list_item'][i]['quantity'] = data['quantity'];
                }
              }
              agent.local('agent_cart', JSON.stringify(list_item_data['cart_list_item']));
              var sync_param = {};
              sync_param['_action'] = 'sync_data';
              sync_param['_action_type'] = 'submit';
              sync_param['cart'] = JSON.stringify(list_item_data['cart_list_item']);
              agent().api(sync_param);
              list_item_data = _common.makeBuyListData(list_item_data);
              agent(this).setting('item_body').setting('data', list_item_data).itemRendering();
            }
          },
        },
      },
      'buy_list_item': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'change_buy_list.agent_item': function(event, data) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (data && agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                if (item_data['buy_list_item'][i]['goods_code'] == data['goods_code'] && item_data['buy_list_item'][i]['option_name'] == data['option_name']) {
                  item_data['buy_list_item'][i]['quantity'] = data['quantity'];
                }
              }
              item_data = _common.makeBuyListData(item_data);
              agent(this).setting('item_body').setting('data', item_data).itemRendering();
            }
          },
        },
      },
      'remove_buy_list_item': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '��젣�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var data = agent(this).setting('item_body').setting('item_body').setting('data');
            if (data['buy_list_item'] && data['buy_list_item'].length > 1) {
              agent(this).showDialog();
            }
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            var data = agent(this).setting('item_body').setting('item_body').setting('data');
            var item_data = agent(this).setting('item_body').setting('data');
            var checkbox_value = agent(this).prop('checked');
            var list_item_index = agent(this).setting('item_body').setting('list_item_index');
            if (data['buy_list_item']) {
              var remake_buy_list_item = [];
              for (var i = 0; i < data['buy_list_item'].length; i++) {
                if (i == list_item_index) {
                  continue;
                }
                remake_buy_list_item.push(data['buy_list_item'][i]);
              }
              data['buy_list_item'] = remake_buy_list_item;
            }
            data = _common.makeBuyListData(data);
            agent(this).setting('item_body').setting('item_body').setting('data', data).itemRendering();
          },
        },
      },
      'quantity': {
        '_setting_type': 'default',
        'field_display_type': 'number',
        'string_empty_ko': '�섎웾�� �낅젰�댁＜�몄슂',
        'string_number_only_ko': '�レ옄留� �낅젰�댁＜�몄슂',
        'string_not_available_ko': '�먮ℓ媛� 遺덇��ν븳 �섎웾�낅땲��',
        '_event': {
          'change.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var quantity = agent(this).getDisplayValue();
            if (isNaN(quantity) && agent(this).string('number_only')) {
              agent.showMessage(agent(this).string('number_only'));
            } else if (Number(quantity) < 1) {
              agent.showMessage(agent(this).string('not_available'));
              agent(this).setDisplayValue(1);
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var this_data = agent(this).setting('item_body').setting('data');
              if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('item_body') && agent(this).setting('item_body').setting('item_body').setting('data')) {
                var body_data = agent(this).setting('item_body').setting('item_body').setting('data');
                var buy_list_item = body_data['buy_list_item'];
                for (var i = 0; i < body_data['buy_list_item'].length; i++) {
                  if (body_data['buy_list_item'][i]['goods_code'] == this_data['goods_code'] && body_data['buy_list_item'][i]['option_name'] == this_data['option_name']) {
                    body_data['buy_list_item'][i]['quantity'] = Number(quantity);
                  }
                }
                body_data = _common.makeBuyListData(body_data);
                agent(this).setting('item_body').setting('item_body').setting('data', body_data).itemRendering();
              }
            }
          },
        },
      },
      'plus_one_buy_list': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            // TODO
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var this_data = agent(this).setting('item_body').setting('data');
              if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('item_body') && agent(this).setting('item_body').setting('item_body').setting('data')) {
                var body_data = agent(this).setting('item_body').setting('item_body').setting('data');
                var buy_list_item = body_data['buy_list_item'];
                for (var i = 0; i < body_data['buy_list_item'].length; i++) {
                  if (body_data['buy_list_item'][i]['goods_code'] == this_data['goods_code'] && body_data['buy_list_item'][i]['option_name'] == this_data['option_name']) {
                    body_data['buy_list_item'][i]['quantity']++;
                  }
                }
                body_data = _common.makeBuyListData(body_data);
                agent(this).setting('item_body').setting('item_body').setting('data', body_data).itemRendering();
              }
            }
          },
        },
      },
      'subtract_one_buy_list': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'click.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var this_data = agent(this).setting('item_body').setting('data');
              if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('item_body') && agent(this).setting('item_body').setting('item_body').setting('data')) {
                var body_data = agent(this).setting('item_body').setting('item_body').setting('data');
                var buy_list_item = body_data['buy_list_item'];
                for (var i = 0; i < body_data['buy_list_item'].length; i++) {
                  if (body_data['buy_list_item'][i]['goods_code'] == this_data['goods_code'] && body_data['buy_list_item'][i]['option_name'] == this_data['option_name']) {
                    body_data['buy_list_item'][i]['quantity'] = body_data['buy_list_item'][i]['quantity'] > 1 ? body_data['buy_list_item'][i]['quantity'] - 1 : 1;
                  }
                }
                body_data = _common.makeBuyListData(body_data);
                agent(this).setting('item_body').setting('item_body').setting('data', body_data).itemRendering();
              }
            }
          },
        },
      },
      'popup_details': {
        '_setting_type': 'replace',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'show_details',
        '_event': {
          'click.agent_field': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              var data_fields = agent('[data-r-role="dialog"][data-r-type="show_details"]').find('[data-r-field]');
              for (var i = 0; i < data_fields.length; i++) {
                var field_string = data_fields.eq(i).dataAttribute('field');
                if (field_string != 'cancel') {
                  if (item_data[field_string]) {
                    data_fields.eq(i).setDisplayValue(item_data[field_string]);
                  } else {
                    data_fields.eq(i).setDisplayValue('');
                  }
                }
              }
            }
            agent(this).showDialog();
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            // agent(this).trigger('show_details.agent_favorite');
          },
        },
      },
      'add_favorite': {
        '_setting_type': 'replace',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '李쒗븯�쒓쿋�듬땲源�?',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              var goods_code = data['goods_code'];
              var favorite_array = agent.local('agent_favorite') ? JSON.parse(agent.local('agent_favorite')) : [];
              favorite_array = typeof favorite_array == 'object' && favorite_array instanceof Array ? favorite_array : [];
              for (var i = 0; i < favorite_array.length; i++) {
                if (favorite_array[i]['goods_code'] == goods_code) {
                  agent(this).addClass('on');
                }
              }
            }
          },
          'click.agent_field': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (agent(this).hasClass('on')) {
              agent(this).trigger('remove.agent_favorite');
            } else {
              agent(this).showDialog();
            }
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            agent(this).trigger('add.agent_favorite');
          },
          'add.agent_favorite': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              if (!item_data['buy_list_item'] || item_data['buy_list_item'].length < 1) {
                agent.showMessage('�듭뀡�� �좏깮�댁＜�몄슂');
                return;
              }
              if (item_data['buy_list_item']) {
                var favorite_array = agent.local('agent_favorite') ? JSON.parse(agent.local('agent_favorite')) : [];
                favorite_array = typeof favorite_array == 'object' && favorite_array instanceof Array ? favorite_array : [];
                for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                  var unique = true;
                  for (var j = 0; j < favorite_array.length; j++) {
                    if (item_data['buy_list_item'][i]['goods_code'] == favorite_array[j]['goods_code']) {
                      favorite_array[j]['quantity'] = Number(favorite_array[j]['quantity']) + Number(item_data['buy_list_item'][i]['quantity']);
                      unique = false;
                      break;
                    }
                  }
                  if (unique) {
                    favorite_array.push(item_data['buy_list_item'][i]);
                  }
                }
                agent.local('agent_favorite', JSON.stringify(favorite_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['favorite'] = JSON.stringify(favorite_array);
                agent().api(sync_param);
              } else {
                var favorite_array = agent.local('agent_favorite') ? JSON.parse(agent.local('agent_favorite')) : [];
                favorite_array = typeof favorite_array == 'object' && favorite_array instanceof Array ? favorite_array : [];
                var unique = true;
                for (var j = 0; j < favorite_array.length; j++) {
                  if (data['goods_code'] == favorite_array[j]['goods_code']) {
                    favorite_array[j]['quantity'] = Number(favorite_array[j]['quantity']) + Number(data['quantity']);
                    unique = false;
                    break;
                  }
                }
                if (unique) {
                  favorite_array.push(data);
                }
                agent.local('agent_favorite', JSON.stringify(favorite_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['favorite'] = JSON.stringify(favorite_array);
                agent().api(sync_param);
              }
              agent(this).addClass('on');
            }
          },
          'remove.agent_favorite': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              if (data['buy_list_item']) {
                var favorite_array = agent.local('agent_favorite') ? JSON.parse(agent.local('agent_favorite')) : [];
                favorite_array = typeof favorite_array == 'object' && favorite_array instanceof Array ? favorite_array : [];
                var remake_favorite_array = [];
                for (var i = 0; i < favorite_array.length; i++) {
                  var unique = true;
                  for (var j = 0; j < data['buy_list_item'].length; j++) {
                    if (favorite_array[i]['goods_code'] == data['buy_list_item'][j]['goods_code']) {
                      unique = false;
                      break;
                    }
                  }
                  if (unique) {
                    remake_favorite_array.push(favorite_array[i]);
                  }
                }
                agent.local('agent_favorite', JSON.stringify(remake_favorite_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['favorite'] = JSON.stringify(remake_favorite_array);
                agent().api(sync_param);
              } else {
                var favorite_array = agent.local('agent_favorite') ? JSON.parse(agent.local('agent_favorite')) : [];
                favorite_array = typeof favorite_array == 'object' && favorite_array instanceof Array ? favorite_array : [];
                var remake_favorite_array = [];
                for (var i = 0; i < favorite_array.length; i++) {
                  if (favorite_array[i]['goods_code'] != data['goods_code']) {
                    remake_favorite_array.push(favorite_array[i]);
                  }
                }
                agent.local('agent_favorite', JSON.stringify(remake_favorite_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['favorite'] = JSON.stringify(remake_favorite_array);
                agent().api(sync_param);
              }
              agent(this).removeClass('on');
            }
            return false;
          },
        },
      },
      'add_cart': {
        '_setting_type': 'replace',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'go_cart',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              var goods_code = data['goods_code'];
              var cart_array = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
              cart_array = typeof cart_array == 'object' && cart_array instanceof Array ? cart_array : [];
              for (var i = 0; i < cart_array.length; i++) {
                if (cart_array[i]['goods_code'] == goods_code) {
                  // agent(this).addClass('on');
                }
              }
            }
          },
          'click.agent_field': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            agent(this).trigger('add.agent_cart');
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            if (agent(this).dataAttribute('link')) {
              agent(this).link();
            }
          },
          'add.agent_cart': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              if (!item_data['buy_list_item'] || item_data['buy_list_item'].length < 1) {
                agent.showMessage('�듭뀡�� �좏깮�댁＜�몄슂');
                return;
              }
              if (item_data['category'] != '87' && item_data['point_total'] > agent.config('member_point')) {
                agent.showMessage('�ъ씤�멸� 遺�議깊빀�덈떎');
                return;
              }
              // if (agent.config('buy_unique_goods87') && item_data['category'] == '87') {
              //   agent.showMessage('酉고떚 �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
              //   return;
              // } else if (item_data['category'] == '87') {
              //   for (var i = 0; i < item_data['buy_list_item'].length; i++) {
              //     if (item_data['category'] == '87' && item_data['buy_list_item'][i]['quantity'] > 1) {
              //       agent.showMessage('酉고떚 �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
              //       return;
              //     }
              //   }
              // }
              cart_array = typeof cart_array == 'object' && cart_array instanceof Array ? cart_array : [];
              if (item_data['buy_list_item']) {
                var cart_array = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
                for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                  var unique = true;
                  for (var j = 0; j < cart_array.length; j++) {
                    if (item_data['buy_list_item'][i]['goods_code'] == cart_array[j]['goods_code'] && item_data['buy_list_item'][i]['option_name'] == cart_array[j]['option_name']) {
                      var cart_item_quantity = cart_array[j]['quantity'] && !isNaN(cart_array[j]['quantity']) ? Number(cart_array[j]['quantity']) : 1;
                      var buy_list_item_quantity = item_data['buy_list_item'][i]['quantity'] && !isNaN(item_data['buy_list_item'][i]['quantity']) ? Number(item_data['buy_list_item'][i]['quantity']) : 1;
                      cart_array[j]['quantity'] = cart_item_quantity + buy_list_item_quantity;
                      unique = false;
                      break;
                    }
                  }
                  if (unique) {
                    cart_array.push(item_data['buy_list_item'][i]);
                  }
                }
                agent.local('agent_cart', JSON.stringify(cart_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['cart'] = JSON.stringify(cart_array);
                agent().api(sync_param);
              } else {
                var cart_array = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
                cart_array = typeof cart_array == 'object' && cart_array instanceof Array ? cart_array : [];
                var unique = true;
                for (var j = 0; j < cart_array.length; j++) {
                  if (item_data['goods_code'] == cart_array[j]['goods_code'] && item_data['buy_list_item'][i]['option_name'] == cart_array[j]['option_name']) {
                    cart_array[j]['quantity'] = Number(cart_array[j]['quantity']) + Number(item_data['quantity']);
                    unique = false;
                    break;
                  }
                }
                if (unique) {
                  cart_array.push(item_data);
                }
                agent.local('agent_cart', JSON.stringify(cart_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['cart'] = JSON.stringify(cart_array);
                agent().api(sync_param);
              }
              agent(this).addClass('on');
            }
            agent(this).showDialog();
          },
          'remove.agent_cart': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              if (data['buy_list_item']) {
                var cart_array = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
                cart_array = typeof cart_array == 'object' && cart_array instanceof Array ? cart_array : [];
                var remake_cart_array = [];
                for (var i = 0; i < cart_array.length; i++) {
                  var unique = true;
                  for (var j = 0; j < data['buy_list_item'].length; j++) {
                    if (cart_array[i]['goods_code'] == data['buy_list_item'][j]['goods_code']) {
                      unique = false;
                      break;
                    }
                  }
                  if (unique) {
                    remake_cart_array.push(cart_array[i]);
                  }
                }
                agent.local('agent_cart', JSON.stringify(remake_cart_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['cart'] = JSON.stringify(remake_cart_array);
                agent().api(sync_param);
              } else {
                var cart_array = agent.local('agent_cart') ? JSON.parse(agent.local('agent_cart')) : [];
                cart_array = typeof cart_array == 'object' && cart_array instanceof Array ? cart_array : [];
                var remake_cart_array = [];
                for (var i = 0; i < cart_array.length; i++) {
                  if (cart_array[i]['goods_code'] != data['goods_code'] && cart_array[i]['option_name'] != data['option_name']) {
                    remake_cart_array.push(cart_array[i]);
                  }
                }
                agent.local('agent_cart', JSON.stringify(remake_cart_array));
                var sync_param = {};
                sync_param['_action'] = 'sync_data';
                sync_param['_action_type'] = 'submit';
                sync_param['cart'] = JSON.stringify(remake_cart_array);
                agent().api(sync_param);
              }
              agent(this).removeClass('on');
            }
            return false;
          },
        },
      },
      'share': {
        '_setting_type': 'replace',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'share',
        '_event': {
          'click.agent_share': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var data = agent(this).setting('item_body').setting('data');
              var item_idx = data['idx'];
              var share_facebook_url = '//www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(agent.config('page_url') + 'sub_detail&idx=' + item_idx);
              var share_twitter_url = '//twitter.com/intent/tweet?text=TEXT&url=' + encodeURIComponent(agent.config('page_url') + 'sub_detail&idx=' + item_idx);
              agent('.share_fb').setting({
                'share_url': share_facebook_url,
                '_event': {
                  'click.agent_share': function(event) {
                    window.open(agent(this).setting('share_url'), '_blank');
                  }
                },
              });
              agent('.share_tw').setting({
                'share_url': share_twitter_url,
                '_event': {
                  'click.agent_share': function(event) {
                    window.open(agent(this).setting('share_url'), '_blank');
                  }
                },
              });
              Kakao.init(agent.config('kakao_app_key'));
              agent('.share_kakao').setting({
                'share_data': {
                  'objectType': 'feed',
                  'content': {
                    'title': data['goods_name'],
                    'description': 'SOLRX',
                    'imageUrl': agent.config('root_url') + data['image0'],
                    'link': {
                      'mobileWebUrl': agent.config('page_url') + 'sub_detail&idx=' + data['idx'],
                      'webUrl': agent.config('page_url') + 'sub_detail&idx=' + data['idx']
                    }
                  },
                  'buttons': [{
                    'title': '�뱀쑝濡� 蹂닿린',
                    'link': {
                      'mobileWebUrl': agent.config('page_url') + 'sub_detail&idx=' + data['idx'],
                      'webUrl': agent.config('page_url') + 'sub_detail&idx=' + data['idx']
                    }
                  }, ]
                },
                '_event': {
                  'click.agent_share': function(event) {
                    agent.log(Kakao.Link.sendDefault);
                    // Kakao.Story.share({
                    //   url: 'https://developers.kakao.com',
                    //   text: 'JUDITH LEIBER MALL'
                    // });
                    Kakao.Link.sendDefault(agent(this).setting('share_data'));
                  }
                },
              });
  
              // band
              // var param = 'create/post?text=' + encodeURIComponent('蹂대궪 硫붿떆吏�');
  
              // if (navigator.userAgent.match(/android/i)) {
              //   setTimeout(function() {
              //     location.href = 'intent://' + param + '#Intent;package=com.nhn.android.band;end';
              //   }, 100);
              // } else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
              //   setTimeout(function() {
              //     location.href = 'itms-apps://itunes.apple.com/app/id542613198?mt=8';
              //   }, 200);
              //   setTimeout(function() {
              //     location.href = 'bandapp://' + param;
              //   }, 100);
              // }
              agent(this).showDialog();
            }
          },
        },
      },
      'remove_favorite_item': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '��젣�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            agent(this).showDialog();
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            var data = agent(this).setting('item_body').setting('item_body').setting('data');
            var item_data = agent(this).setting('item_body').setting('data');
            var checkbox_value = agent(this).prop('checked');
            var list_item_index = agent(this).setting('item_body').setting('list_item_index');
            data['checkbox_all'] = checkbox_value;
            if (data['favorite_list_item']) {
              var remake_favorite_list_item = [];
              var buy_list_item = [];
              for (var i = 0; i < data['favorite_list_item'].length; i++) {
                if (i == list_item_index) {
                  continue;
                }
                data['checkbox_all'] = data['checkbox_all'] && data['favorite_list_item'][i]['checkbox'];
                if (data['favorite_list_item'][i]['checkbox']) {
                  buy_list_item.push(data['favorite_list_item'][i]);
                }
                remake_favorite_list_item.push(data['favorite_list_item'][i]);
              }
              data['buy_list_item'] = buy_list_item;
              data['favorite_list_item'] = remake_favorite_list_item;
            }
            data = _common.makeBuyListData(data);
            agent(this).setting('item_body').setting('item_body').setting('data', data).itemRendering();
  
            agent.local('agent_favorite', JSON.stringify(data['favorite_list_item']));
            var sync_param = {};
            sync_param['_action'] = 'sync_data';
            sync_param['_action_type'] = 'submit';
            sync_param['favorite'] = JSON.stringify(data['favorite_list_item']);
            agent().api(sync_param);
          },
        },
      },
      'remove_cart_item': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '��젣�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            agent(this).showDialog();
            return false;
          },
          'positive_callback.agent_dialog': function(event) {
            var data = agent(this).setting('item_body').setting('item_body').setting('data');
            var item_data = agent(this).setting('item_body').setting('data');
            var checkbox_value = agent(this).prop('checked');
            var list_item_index = agent(this).setting('item_body').setting('list_item_index');
            data['checkbox_all'] = checkbox_value;
            if (data['cart_list_item']) {
              var remake_cart_list_item = [];
              var buy_list_item = [];
              for (var i = 0; i < data['cart_list_item'].length; i++) {
                if (i == list_item_index) {
                  continue;
                }
                data['checkbox_all'] = data['checkbox_all'] && data['cart_list_item'][i]['checkbox'];
                if (data['cart_list_item'][i]['checkbox']) {
                  buy_list_item.push(data['cart_list_item'][i]);
                }
                remake_cart_list_item.push(data['cart_list_item'][i]);
              }
              data['buy_list_item'] = buy_list_item;
              data['cart_list_item'] = remake_cart_list_item;
            }
            data = _common.makeBuyListData(data);
            agent(this).setting('item_body').setting('item_body').setting('data', data).itemRendering();
  
            agent.local('agent_cart', JSON.stringify(data['cart_list_item']));
            var sync_param = {};
            sync_param['_action'] = 'sync_data';
            sync_param['_action_type'] = 'submit';
            sync_param['cart'] = JSON.stringify(data['cart_list_item']);
            agent().api(sync_param);
          },
        },
      },
      'buy_cart_item': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '�곹뭹�� 二쇰Ц�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            agent(this).showDialog();
          },
          'positive_callback.agent_dialog': function(event) {
            var buy_list = [];
            var data = agent(this).setting('item_body').setting('data');
            buy_list.push(data);
            agent.session('agent_buy_list', JSON.stringify(buy_list));
            agent(this).link();
          },
        },
      },
      'buy_select': {
        '_setting_type': 'replace',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '�좏깮 �곹뭹�� 二쇰Ц�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            agent(this).showDialog();
          },
          'positive_callback.agent_dialog': function(event) {
            var data = agent(this).setting('item_body').setting('data');
            agent.session('agent_buy_list', JSON.stringify(data['buy_list_item']));
            agent(this).link();
          },
        },
      },
      'buy_all': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'dialog': 'confirm',
        'string_dialog_message_ko': '�꾩껜 �곹뭹�� 二쇰Ц�섏떆寃좎뒿�덇퉴?',
        '_event': {
          'click.agent_buy': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              if (item_data['buy_list_item'].length > 0) {
                agent(this).showDialog();
              } else {
                agent.showMessage('�곹뭹�� �놁뒿�덈떎.');
              }
            }
          },
          'positive_callback.agent_dialog': function(event) {
            if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('data')) {
              var item_data = agent(this).setting('item_body').setting('data');
              var unique_goods_count = 0;
              var unique_goods87_count = 0;
              if (agent.config('buy_unique_goods') && agent.config('buy_unique_goods') != '' && agent.config('buy_unique_goods') != 'false') {
                if (moment(agent.config('buy_unique_goods'), 'YYYY-MM-DD HH:mm:SS').isValid()) {
                  var buy_unique_goods_datetime = moment(agent.config('buy_unique_goods'), 'YYYY-MM-DD HH:mm:SS');
                  buy_unique_goods_datetime = buy_unique_goods_datetime.add(30, 'day');
                  var now_datetime = moment();
                  if (buy_unique_goods_datetime.isSameOrAfter(now_datetime)) {
                    unique_goods_count = 1;
                  }
                } else {
                  agent.showMessage('媛��� �꾨줈紐⑥뀡 �쒗뭹 寃�利앹뿉 臾몄젣媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�댁＜�몄슂.');
                  return;
                }
              }
              if (agent.config('buy_unique_goods87')) {
                unique_goods87_count = 1;
              }
              for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                if (item_data['buy_list_item'][i]['category'] == '55') {
                  unique_goods_count++;
                }
                if (unique_goods_count > 1) {
                  agent.showMessage('媛��� �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
                  return;
                }
                if (item_data['buy_list_item'][i]['category'] == '87') {
                  unique_goods87_count++;
                }
                // if (unique_goods87_count > 1) {
                //   agent.showMessage('酉고떚 �꾨줈紐⑥뀡 �쒗뭹�� 1�몃떦 1媛쒕쭔 援ъ엯 媛��ν빀�덈떎.');
                //   return;
                // }
              }
              if (item_data['buy_list_item']) {
                agent.session('agent_buy_list', JSON.stringify(item_data['buy_list_item']));
                // } else if (item_data['buy_list_all_items']) {
                //   agent.session('agent_buy_list', JSON.stringify(item_data['buy_list_all_items']));
              }
              agent(this).link();
            }
          },
        },
      },
      'point': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        'string_empty_ko': '�먮ℓ媛�瑜� �낅젰�댁＜�몄슂',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            if (item_data['goods_name'] == 'kmc �ъ꽦 �ㅽ궓耳��� 5醫� �명듃' || item_data['goods_name'] == 'kmc �ъ꽦 �대젋吏�+�⑥꽦 �ㅽ궓�좊꼫/濡쒖뀡 3醫� �명듃') {
              agent(this).setDisplayValue(0);
              agent(this).parents('.point-inner').hide();
            }
            if (item_data['category'] == '87' && agent.config('mode') != 'admin') {
              agent(this).setDisplayValue(0);
            }
          },
        }
      },
      'buy_quantity': {
        '_setting_type': 'default',
        'field_display_type': 'number',
        'string_empty_ko': '援щℓ �섎웾�� �낅젰�댁＜�몄슂',
      },
      'stock_quantity': {
        '_setting_type': 'default',
        'field_display_type': 'number',
        'string_empty_ko': '�ш퀬 �섎웾�� �낅젰�댁＜�몄슂',
      },
      'price_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'price_subtotal_10': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.ceil({point}*{quantity}/10)',
        'field_display_type': 'cash',
      },
      'price_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'point_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent.getPageRequest('p') == 'sub_detail' || agent.getPageRequest('p') == 'order_02payment' || agent.getPageRequest('p') == 'cart') {
              var item_data = agent(this).setting('item_body').setting('data');
              if (item_data['category'] == '87' && agent.config('mode') != 'admin') {
                agent(this).setDisplayValue(0);
              }
            }
          },
        }
      },
      'point_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent.getPageRequest('p') == 'sub_detail' || agent.getPageRequest('p') == 'order_02payment' || agent.getPageRequest('p') == 'cart') {
              var item_data = agent(this).setting('item_body').setting('data');
              var point_total = 0;
              var buy_list_item = item_data['buy_list_item'];
              for (var i = 0; i < buy_list_item.length; i++) {
                if (buy_list_item[i]['category'] != '87') {
                  point_total = point_total + buy_list_item[i]['point_subtotal'];
                }
              }
              agent(this).setDisplayValue(String(point_total).toCashString());
            }
          },
        }
      },
      'tax': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.round({price}*{quantity}*{tax_rate})/100',
        'field_display_type': 'cash',
      },
      'tax_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'tax_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'point_tax': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.round({point}*{quantity}*{point_tax_rate})/100',
        'field_display_type': 'cash',
      },
      'point_tax1': {
        '_setting_type': 'default',
        'field_type': 'eval',
        'field_value': 'Math.round({point}*20/100)',
        'field_display_type': 'cash',
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            if (item_data['category'] == '55') {
              var point_tax1 = Math.round(Number(item_data['point']) * 20 / 100);
              agent(this).setDisplayValue(String(point_tax1).toCashString());
            }
            if (item_data['category'] == '58' && item_data['goods_name_en'] != undefined) {
              agent(this).setDisplayValue(item_data['goods_name_en']);
            }
          },
        }
      },
      'point_tax_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'point_tax_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'billing_address_full_name': {
        '_setting_type': 'default',
        'string_empty_ko': '援щℓ�� �대쫫�� �낅젰�댁＜�몄슂',
      },
      'billing_address_zip_code': {
        '_setting_type': 'default',
        'string_empty_ko': '援щℓ�� �고렪踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_address': {
        '_setting_type': 'default',
        'string_empty_ko': '援щℓ�� 二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'billing_address_road': {
        '_setting_type': 'default',
        'string_empty_ko': '援щℓ�� 二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'shipping_address_full_name': {
        '_setting_type': 'default',
        'string_empty_ko': '諛쏅뒗 遺� �대쫫�� �낅젰�댁＜�몄슂',
      },
      'shipping_address_zip_code': {
        '_setting_type': 'default',
        'string_empty_ko': '諛쏅뒗 遺� �고렪踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'shipping_address': {
        '_setting_type': 'default',
        'string_empty_ko': '諛쏅뒗 遺� 二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'shipping_address_road': {
        '_setting_type': 'default',
        'string_empty_ko': '諛쏅뒗 遺� 二쇱냼瑜� �낅젰�댁＜�몄슂',
      },
      'copy_billing_address_to_shipping_address': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'change.agent_field': function(event) {
            if (agent(this).is('input[type="checkbox"]')) {
              if (agent(this).prop('checked')) {
                agent('[data-r-field="shipping_address_full_name"]').setDisplayValue(agent('[data-r-field="billing_address_full_name"]').eq(0).getDisplayValue());
                agent('[data-r-field="shipping_address_phone"]').setHiddenValue(agent('[data-r-field="billing_address_phone"]').eq(0).getHiddenValue()).trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_telephone"]').setHiddenValue(agent('[data-r-field="billing_address_telephone"]').eq(0).getHiddenValue()).trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_mobile"]').setHiddenValue(agent('[data-r-field="billing_address_mobile"]').eq(0).getHiddenValue()).trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_email"]').setHiddenValue(agent('[data-r-field="billing_address_email"]').eq(0).getHiddenValue()).trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_zip_code"]').setDisplayValue(agent('[data-r-field="billing_address_zip_code"]').eq(0).getDisplayValue());
                agent('[data-r-field="shipping_address"]').setDisplayValue(agent('[data-r-field="billing_address"]').eq(0).getDisplayValue());
                agent('[data-r-field="shipping_address_road"]').setDisplayValue(agent('[data-r-field="billing_address_road"]').eq(0).getDisplayValue());
                agent('[data-r-field="shipping_address_line1"]').setDisplayValue(agent('[data-r-field="billing_address_line1"]').eq(0).getDisplayValue());
              } else {
                agent('[data-r-field="shipping_address_full_name"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_phone"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_telephone"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_mobile"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_email"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_zip_code"]').setDisplayValue('');
                agent('[data-r-field="shipping_address"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_road"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_line1"]').setDisplayValue('');
              }
            }
          },
        },
      },
      'copy_config_to_shipping_address': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'change.agent_field': function(event) {
            if (agent(this).is('input[type="checkbox"]')) {
              if (agent(this).prop('checked')) {
                agent('[data-r-field="shipping_address_full_name"]').setDisplayValue(agent.config('name'));
                agent('[data-r-field="shipping_address_phone"]').setHiddenValue(agent.config('phone')).trigger('field_rendering_callback.agent_field');;
                agent('[data-r-field="shipping_address_telephone"]').setHiddenValue(agent.config('telephone')).trigger('field_rendering_callback.agent_field');;
                agent('[data-r-field="shipping_address_mobile"]').setHiddenValue(agent.config('mobile')).trigger('field_rendering_callback.agent_field');;
                agent('[data-r-field="shipping_address_email"]').setHiddenValue(agent.config('email')).trigger('field_rendering_callback.agent_field');;
                agent('[data-r-field="shipping_address_zip_code"]').setDisplayValue(agent.config('zip_code'));
                agent('[data-r-field="shipping_address"]').setDisplayValue(agent.config('address'));
                agent('[data-r-field="shipping_address_road"]').setDisplayValue(agent.config('road_address'));
                agent('[data-r-field="shipping_address_line1"]').setDisplayValue(agent.config('address_line1'));
              } else {
                agent('[data-r-field="shipping_address_full_name"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_phone"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_telephone"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_mobile"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_email"]').setHiddenValue('').trigger('field_rendering_callback.agent_field');
                agent('[data-r-field="shipping_address_zip_code"]').setDisplayValue('');
                agent('[data-r-field="shipping_address"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_road"]').setDisplayValue('');
                agent('[data-r-field="shipping_address_line1"]').setDisplayValue('');
              }
            }
          },
        },
      },
      'agreement_terms_of_buy': {
        '_setting_type': 'default',
        'string_empty_ko': '援щℓ�쎄��� �숈쓽�댁＜�몄슂',
      },
      'billing_card0_number': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card0_expire_month': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card0_expire_year': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card0_auth_number': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰��깅줉�곸쓽 �앸뀈�붿씪 �먮뒗 踰뺤씤踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card0_password': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 鍮꾨�踰덊샇 �� 2�먮━瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card0_payment_price': {
        '_setting_type': 'default',
        'string_empty_ko': '寃곗젣 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'billing_card1_number': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card1_expire_month': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card1_expire_year': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card1_auth_number': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰��깅줉�곸쓽 �앸뀈�붿씪 �먮뒗 踰뺤씤踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card1_password': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 鍮꾨�踰덊샇 �� 2�먮━瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card1_payment_price': {
        '_setting_type': 'default',
        'string_empty_ko': '寃곗젣 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'billing_card2_number': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card2_expire_month': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card2_expire_year': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'billing_card2_auth_number': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰��깅줉�곸쓽 �앸뀈�붿씪 �먮뒗 踰뺤씤踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card2_password': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 鍮꾨�踰덊샇 �� 2�먮━瑜� �낅젰�댁＜�몄슂',
      },
      'billing_card2_payment_price': {
        '_setting_type': 'default',
        'string_empty_ko': '寃곗젣 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_number': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_expire_month': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_expire_year': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 �좏슚 湲곌컙�� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_auth_number': {
        '_setting_type': 'default',
        'string_empty_ko': '二쇰��깅줉�곸쓽 �앸뀈�붿씪 �먮뒗 踰뺤씤踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_password': {
        '_setting_type': 'default',
        'string_empty_ko': '移대뱶 鍮꾨�踰덊샇 �� 2�먮━瑜� �낅젰�댁＜�몄슂',
      },
      'member_billing_card0_payment_price': {
        '_setting_type': 'default',
        'string_empty_ko': '寃곗젣 湲덉븸�� �낅젰�댁＜�몄슂',
      },
      'order_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{order_status}': '��湲�',
          '{order_status}==0': '��湲�',
          '{order_status}==11': '二쇰Ц痍⑥냼',
          '{order_status}==19': '二쇰Ц痍⑥냼',
          '{order_status}==51': '二쇰Ц�뺤젙',
          '{order_status}==52': '湲곗뾽寃곗젣�꾨즺',
          '{order_status}==100': '二쇰Ц�꾨즺',
        },
      },
      'payment_status': {
        '_setting_type': 'default',
        'field_key': 'payment_status',
        'field_replace_ko': {
          '{payment_status}==-1': '痍⑥냼',
          '!{payment_status}': '��湲�',
          '{payment_status}==0': '��湲�',
          '{payment_status}==100': '�꾨즺',
        },
      },
      'payment_date': {
        '_setting_type': 'default',
        'field_key': 'payment_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'payment_time': {
        '_setting_type': 'default',
        'field_key': 'payment_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'owner_confirm_status': {
        '_setting_type': 'default',
        'field_key': 'owner_confirm_status',
        'field_replace_ko': {
          '!{owner_confirm_status}': '�뺤씤��湲�',
          '{owner_confirm_status}==0': '�뺤씤��湲�',
          '{owner_confirm_status}==51': '�뺤씤',
          '{owner_confirm_status}==100': '泥섎━�꾨즺',
        },
      },
      'shipping_status': {
        '_setting_type': 'default',
        'field_key': 'shipping_status',
        'field_replace_ko': {
          '!{shipping_status}': '諛곗넚��湲�',
          '{shipping_status}==0': '諛곗넚��湲�',
          '{shipping_status}==51': '諛곗넚以�',
          '{shipping_status}==52': '諛곗넚以�鍮꾩쨷',
          '{shipping_status}==100': '諛곗넚�꾨즺',
        },
      },
      'event_start_date': {
        '_setting_type': 'default',
        'field_key': 'event_start_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'event_end_date': {
        '_setting_type': 'default',
        'field_key': 'event_end_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'shipping_date': {
        '_setting_type': 'default',
        'field_key': 'shipping_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'YYYY-MM-DD',
      },
      'shipping_time': {
        '_setting_type': 'default',
        'field_key': 'shipping_datetime',
        'field_display_type': 'datetime',
        'datetime_format': 'HH:mm:SS',
      },
      'payment_shipping_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{payment_status}': '寃곗젣�ㅽ뙣',
          '{payment_status}==51': '�낃툑��湲�',
          '{payment_status}==100': '諛곗넚��湲�',
          '{payment_status}==100 && {shipping_status}==52': '諛곗넚以�鍮꾩쨷',
          '{payment_status}==100 && {shipping_status}==51': '諛곗넚以�',
          '{payment_status}==100 && {shipping_status}==100': '諛곗넚�꾨즺',
        },
      },
      'order_shipping_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{order_status}==11': '二쇰Ц痍⑥냼',
          '{order_status}==19': '二쇰Ц痍⑥냼',
          '{order_status}==21': '援먰솚�붿껌',
          '{order_status}==29': '援먰솚�꾨즺',
          '{order_status}==31': '諛섑뭹�붿껌',
          '{order_status}==39': '諛섑뭹�꾨즺',
          '{order_status}==41': '�섎텋�붿껌',
          '{order_status}==49': '�섎텋�꾨즺',
          '!{shipping_status}': '諛곗넚��湲�',
          '{shipping_status}==52': '諛곗넚以�鍮꾩쨷',
          '{shipping_status}==51': '諛곗넚以�',
          '{shipping_status}==100': '諛곗넚�꾨즺',
        },
      },
      'cancel_order': {
        '_setting_type': 'default',
        'field_display': '!{shipping_status} && {created_date}=={today} && {order_status}==51',
        'do_not_submit': true,
        'set': 'order_status=11',
        'dialog': 'confirm',
        'string_dialog_message_ko': '二쇰Ц�� 痍⑥냼�섏떆寃좎뒿�덇퉴?',
        'string_no_selection_ko': '�좏깮�� ��ぉ�� �놁뒿�덈떎.',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
          },
          'field_rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            if (!item_data['created_datetime']) {
              agent(this).remove();
              return;
            }
            var created_datetime = moment(item_data['created_datetime']);
            var start_datetime = moment().startOf('day');
            start_datetime = start_datetime.subtract(7, 'day');
            var end_datetime = moment().endOf('day');
            // var b = moment().add(1, 'day');
  
            var remove_this = false;
            if (start_datetime.isSameOrBefore(created_datetime) && end_datetime.isSameOrAfter(created_datetime) && (!item_data['shipping_status'] || item_data['shipping_status'] < 10)) {
              agent(this).show();
            } else {
              agent(this).remove();
              remove_this = true;
            }
            if (!remove_this && item_data['buy_list_item']) {
              for (var i = 0; i < item_data['buy_list_item'].length; i++) {
                if (item_data['buy_list_item'][i]['shipping_status'] && Number(item_data['buy_list_item'][i]['shipping_status']) > 50) {
                  remove_this = true;
                  break;
                }
              }
            }
            if (remove_this) {
              agent(this).remove();
            }
          },
          'click.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            var created_datetime = moment(item_data['created_datetime']);
            var start_datetime = moment().startOf('day');
            start_datetime = start_datetime.subtract(7, 'day');
            var end_datetime = moment().endOf('day');
            if (start_datetime.isSameOrBefore(created_datetime) && end_datetime.isSameOrAfter(created_datetime) && (!item_data['shipping_status'] || item_data['shipping_status'] < 10)) {
              if (agent(this).string('dialog_message')) {
                agent(this).showDialog();
              }
              if (agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_posts/i) != null) {
                // case inner posts
                agent(this).showDialog();
              } else if (agent(this).setting('item_body') && agent(this).setting('item_body') && agent(this).setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
                // case list action button
                var selected_checkbox = agent(this).setting('item_body').find('[data-r-field="checkbox"]:checked');
                if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
                  agent.showMessage(agent(this).string('no_selection'));
                } else {
                  agent(this).showDialog();
                }
              } else if (agent(this).setting('item_body') && agent(this).setting('item_body').setting('item_body') && agent(this).setting('item_body').setting('item_body').dataAttribute('role') && String(agent(this).setting('item_body').setting('item_body').dataAttribute('type')).match(/_list/i) != null) {
                // case inner item
                agent(this).showDialog();
              }
            }
          },
          'positive_callback.agent_dialog': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            var update_data = {};
            update_data['_action'] = 'order_posts'
            update_data['_action_type'] = 'submit';
            update_data['_mode'] = 'update';
            update_data['_idx'] = item_data['idx'];
            update_data['_set'] = agent(this).setting('set');
            update_data['_callback'] = function(data) {
              location.reload();
            };
            agent().api(update_data);
          },
        },
      },
      'grand_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'item_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'discount_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'shipping_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'shipping_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'payment_method': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{payment_method}=="credit"': '�좎슜移대뱶',
          '{payment_method}=="member_credit"': '�쒗쑕�좎슜移대뱶',
          '{payment_method}=="bank"': '臾댄넻��',
          '{payment_method}=="real_time_bank_transfer"': '�ㅼ떆媛꾩씠泥�',
          '{payment_method}=="virtual_account_transfer"': '媛��곴퀎醫�',
          '{payment_method}=="cellphone"': '�대��곌껐��',
        },
      },
      'coupon_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{coupon_status}': '誘몃벑濡�',
          '{coupon_status}==0': '�ъ슜媛���',
          '{coupon_status}==1': '�ъ슜媛���',
          '{coupon_status}==-1': '�ъ슜�꾨즺',
        },
      },
      'discount_price': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'coupon': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{coupon}=="auto"': '�먮룞',
          '{coupon}=="select"': '�좏깮',
          '{coupon}=="large"': '����',
        },
      },
      'coupon_use': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{coupon_use}=="pc"': 'PC�꾩슜',
          '{coupon_use}=="mobile"': '紐⑤컮�쇱쟾��',
          '{coupon_use}=="all"': 'PC+紐⑤컮��',
        },
      },
      'event_select': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{event_select}=="join"': '�뚯썝媛��낆텞��',
          '{event_select}=="birth"': '�앹씪異뺥븯',
          '{event_select}=="first_buy"': '泥� 援щℓ 異뺥븯',
        },
      },
      'coupon_type': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{coupon_type}=="product"': '寃곗젣湲덉븸�좎씤',
          '{coupon_type}=="delivery"': '諛곗넚鍮꾪븷��',
        },
      },
      'sale_type': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{sale_type}=="price"': '�뺤븸�좎씤',
          '{sale_type}=="rate"': '�뺣쪧�좎씤',
        },
      },
      'score': {
        '_setting_type': 'default',
        'field_display_type': 'score',
      },
      'posts_status': {
        '_setting_type': 'default',
        'field_key': 'posts_status',
        'field_replace_ko': {
          '{posts_status}==-11': '鍮꾨�湲�',
          '{posts_status}==-1': '寃뚯떆以묒�',
          '{posts_status}==0': '寃뚯떆',
        },
      },
      'print_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{print_status}': '�쒖옉��湲�',
          '{print_status}==0': '�쒖옉��湲�',
          '{print_status}==100': '�쒖옉�꾨즺 (諛쒗뻾媛���)',
        },
      },
      'gift_card_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{gift_card_status}': '誘몃벑濡�',
          '{gift_card_status}==0': '誘몃벑濡�',
          '{gift_card_status}==51': '�먮ℓ',
          '{gift_card_status}==100': '�깅줉�꾨즺',
        },
      },
      'gift_card_point': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'gift_card_serial_code': {
        '_setting_type': 'default',
        'field_type': 'regexp',
        'field_regexp_from': '([A-Za-z0-9]{5})([A-Za-z0-9]{5})([A-Za-z0-9]{5})([A-Za-z0-9]{5})',
        'field_regexp_to': '$1-$2-$3-$4',
      },
      'order_download': {
        '_setting_type': 'default',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).setting('item_body').loadItemData({ '_mode': 'download' });
            var page_request = {};
            page_request['link_new_tab'] = true;
            page_request['_action'] = 'download_excel';
            agent.link(page_request);
          },
        },
      },
      'gift_card_items_download': {
        '_setting_type': 'default',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).setting('item_body').loadItemData({ '_mode': 'download', '_field': 'gift_card_items' });
            var page_request = {};
            page_request['link_new_tab'] = true;
            page_request['_action'] = 'download_excel';
            agent.link(page_request);
          },
        },
      },
      'goods_items_download': {
        '_setting_type': 'default',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).setting('item_body').loadItemData({ '_mode': 'download' });
            var page_request = {};
            page_request['link_new_tab'] = true;
            page_request['_action'] = 'download_excel';
            agent.link(page_request);
          },
        },
      },
      'statistics_download': {
        '_setting_type': 'default',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).setting('item_body').loadItemData({ '_mode': 'download' });
            var page_request = {};
            page_request['link_new_tab'] = true;
            page_request['_action'] = 'download_excel';
            agent.link(page_request);
          },
        },
      },
      'contact_us_status': {
        '_setting_type': 'default',
        'field_key': 'contact_us_status',
        'field_replace_ko': {
          '!{contact_us_status}': '吏덈Ц',
          '{contact_us_status}==0': '吏덈Ц',
          '{contact_us_status}==1': '�듬��꾨즺',
          '{contact_us_status}==2': '�ъ쭏臾�',
        },
      },
      'register_status': {
        '_setting_type': 'default',
        'field_key': 'member_status',
        'field_replace_ko': {
          '!{member_status}': '��湲�',
          '{member_status}==0': '��湲�',
          '{member_status}==10': '�뱀씤',
          '{member_status}==20': '�뱀씤',
          '{member_status}==30': '�뱀씤',
          '{member_status}==40': '�뱀씤',
          '{member_status}==50': '�뱀씤',
        },
      },
      'member_type': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{member_type}=="CM"': '留대쾭',
          '{member_type}=="BZ"': '�좊━�ㅽ듃',
        },
      },
      'bank_code': {
        '_setting_type': 'default',
        'string_empty_ko': '���� 肄붾뱶瑜� �낅젰�댁＜�몄슂',
      },
      'bank_account': {
        '_setting_type': 'default',
        'string_empty_ko': '怨꾩쥖 踰덊샇瑜� �낅젰�댁＜�몄슂',
      },
      'bank_account_owner': {
        '_setting_type': 'default',
        'string_empty_ko': '�덇툑二� �대쫫�� �낅젰�댁＜�몄슂',
      },
      'bank_account_owner_birthday': {
        '_setting_type': 'default',
        'string_empty_ko': '�덇툑二� �앹씪�� �낅젰�댁＜�몄슂',
      },
      'pv': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'pv_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'pv_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'cmprice': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'cmprice_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'cmprice_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'bzprice': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'bzprice_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'bzprice_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'mbprice': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'mbprice_total': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'mbprice_subtotal': {
        '_setting_type': 'default',
        'field_display_type': 'cash',
      },
      'participation_list_items': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
      },
      'completion_of_participation_request': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            if (agent(this).setting('item_body')) {
              var item_data = agent(this).setting('item_body').setting('data');
              agent(this).hide();
              if (item_data['participation_list_items']) {
                for (var i = 0; i < item_data['participation_list_items'].length; i++) {
                  if (item_data['participation_list_items'][i]['member_idx'] == agent.config('member_idx')) {
                    agent(this).show();
                    break;
                  }
                }
              }
            }
          },
        },
      },
      'participation_request': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        'string_dialog_message_ko': '�좎껌�섏떆寃좎뒿�덇퉴?',
        'set': 'participation_request=true',
        '_event': {
          'init_member_field_callback.agent_field': function(event) {
            agent(this).addClass('agent_cursor_pointer');
            if (agent(this).setting('item_body')) {
              var item_data = agent(this).setting('item_body').setting('data');
              if (item_data['participation_status'] == 1) {
                agent(this).show();
              } else {
                agent(this).hide();
              }
              if (item_data['participation_list_items']) {
                for (var i = 0; i < item_data['participation_list_items'].length; i++) {
                  if (item_data['participation_list_items'][i]['member_idx'] == agent.config('member_idx')) {
                    agent(this).hide();
                    break;
                  }
                }
              }
            }
            if (agent(this).dataAttribute('link') || agent(this).dataAttribute('dialog')) {
              agent(this).setting(_common.initSetting['common_fields']['show_detail']);
            } else {
              agent(this).setting(_common.initSetting['common_fields']['update_action']);
            }
          },
        },
      },
      'payment_type': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{payment_type}': '�쇳븨紐�',
          '{payment_type}=="user_van_point"': '媛�留뱀젏',
        },
      },
      'approve_status': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '!{approve_status}': '�뱀씤',
          '{approve_status}==-1': '�뱀씤��湲�',
          '{approve_status}==0': '�뱀씤',
          '{approve_status}==1': '�뱀씤',
        },
      },
      'registration_number_type': {
        '_setting_type': 'default',
        'field_replace_ko': {
          '{registration_number_type}==0': '媛쒖씤�ъ뾽��',
          '{registration_number_type}==1': '踰뺤씤�ъ뾽��',
        },
      },
      'store_download_excel': {
        '_setting_type': 'default',
        '_event': {
          'click.agent_field': function(event) {
            agent(this).setting('item_body').loadItemData({ '_mode': 'download' });
            var page_request = {};
            page_request['link_new_tab'] = true;
            page_request['_action'] = 'download_excel';
            agent.link(page_request);
          },
        },
      },
      'member0_id': {
        '_setting_type': 'default',
        'do_not_submit': true,
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            var item_data = agent(this).setting('item_body').setting('data');
            if (item_data['member1_data']) {
              agent(this).setDisplayValue('愿�由ъ뾽泥�');
            }
          },
        },
      },
      'shipping_group': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            _common.shipping_group_item = _common.shipping_group_item ? _common.shipping_group_item : agent('.pop_shippingfee_item').clone(true, true);
            var list_item_data = agent(this).setting('item_body').setting('data');
            var shipping_group = agent.config('shipping_group') ? agent.config('shipping_group') : [];
            agent('.pop_shippingfee').html('');
            if (shipping_group.length == 0) {
              var shipping_group_item = {};
              shipping_group_item['shipping_group_name'] = '';
              shipping_group_item['shipping_group_count'] = 0;
              shipping_group.push(shipping_group_item);
              agent.config('shipping_group', shipping_group);
            }
            for (var i = 0; i < shipping_group.length; i++) {
              var clone_shipping_group_item = _common.shipping_group_item.clone(true, true);
              agent('.pop_shippingfee').append(clone_shipping_group_item);
              clone_shipping_group_item.find('.shipping_group_name').val(shipping_group[i]['shipping_group_name']);
              clone_shipping_group_item.find('.shipping_group_count').val(shipping_group[i]['shipping_group_count']);
              clone_shipping_group_item.find('.shipping_group_name').on('change', function(event) {
                _common.makeShippingGroup();
              });
              clone_shipping_group_item.find('.shipping_group_count').on('change', function(event) {
                _common.makeShippingGroup();
              });
            }
          },
        },
      },
      'shipping_group_select': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'field_rendering_callback.agent_field': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            _common.shipping_group_item = _common.shipping_group_item ? _common.shipping_group_item : agent('.pop_shippingfee_item').clone(true, true);
            var list_item_data = agent(this).setting('item_body').setting('data');
            var shipping_group = agent.config('shipping_group') ? agent.config('shipping_group') : [];
            for (var i = 0; i < shipping_group.length; i++) {
              if (shipping_group[i]['shipping_group_name']) {
                var option_el = '<option value="' + i + '">' + shipping_group[i]['shipping_group_name'] + '</option>';
                agent(this).append(option_el);
                agent(this).on('change', function(event) {
                  var option_index = agent(this).val();
                  var shipping_group_ee = agent.config('shipping_group') ? agent.config('shipping_group') : [];
                  var shipping_group_name = shipping_group_ee[option_index]['shipping_group_name'];
                  var shipping_group_count = shipping_group_ee[option_index]['shipping_group_count'];
                  agent('[data-r-field="shipping_group_name"]').text(shipping_group_name);
                  agent('[data-r-field="shipping_group_count"]').text(shipping_group_count);
                });
              }
            }
            if (list_item_data['shipping_group_name']) {
              var options = agent(this).find('option');
              for (var j = 0; j < options.length; j++) {
                if (options.eq(j).text() == list_item_data['shipping_group_name']) {
                  options.eq(j).prop('selected', true);
                }
              }
            }
          },
        },
      },
      'shipping_group_create': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'click': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var shipping_group = agent.config('shipping_group') ? agent.config('shipping_group') : [];
            var shipping_group_item = {};
            shipping_group_item['shipping_group_name'] = '';
            shipping_group_item['shipping_group_count'] = 0;
            shipping_group.push(shipping_group_item);
  
            agent.config('shipping_group', shipping_group);
            agent('[data-r-field="shipping_group"]').trigger('field_rendering_callback.agent_field');
          },
        },
      },
      'shipping_group_delete': {
        '_setting_type': 'default',
        'field_display_type': 'keep',
        'do_not_submit': true,
        '_event': {
          'click': function(event) {
            var caller = event.target || event.srcElement;
            if (!agent(this).is(caller)) {
              return;
            }
            var shipping_group_check = agent('.shipping_group_check');
            for (var i = 0; i < shipping_group_check.length; i++) {
              if (shipping_group_check.eq(i).prop('checked')) {
                shipping_group_check.eq(i).parents('.pop_shippingfee_item').remove();
              }
            }
            _common.makeShippingGroup();
          },
        },
      },
    },
    'common_posts': {
      '_setting_type': 'default',
      '_event': {
        'init_item_callback.agent_item': function(event) {
          agent(this).bindElements('member_fields').filter('[data-r-field="sales_date"]').initWidget('datepicker');
          agent(this).bindElements('member_fields').filter('[data-r-field="start_date"]').initWidget('datepicker');
          agent(this).bindElements('member_fields').filter('[data-r-field="end_date"]').initWidget('datepicker');
          agent(this).bindElements('member_fields').filter('[data-r-field="birthday"]').initWidget('datepicker');
          agent(this).bindElements('member_fields').filter('[data-r-field="address"]').initWidget('dialog', 'address');
          agent(this).bindElements('member_fields').filter('[data-r-field="juso"]').initWidget('dialog', 'juso');
          agent(this).bindElements('member_fields').filter('[data-r-field="road_address"]').initWidget('dialog', 'juso');
          agent(this).bindElements('member_fields').filter('[data-r-field="jibun_address"]').initWidget('dialog', 'juso');
        },
        'update_posts.agent_item': function(event, data) {
          if (data && data['set']) {
            var item_data = agent(this).setting('data');
            // TODO
            var api_param = {};
            api_param['_action_type'] = 'submit';
            api_param['_mode'] = 'update';
            api_param['_set'] = data['set'];
            api_param['_idx'] = item_data['idx'];
            api_param['_callback'] = function(data) {
              agent.reload();
            };
            agent(this).api(api_param);
          }
        },
      },
    },
    'common_posts_fields': {
  
    },
    'common_detail': {},
    'common_detail_fields': {},
    'common_list': {
      '_setting_type': 'default',
      '_event': {
        'update_list.agent_item': function(event, data) {
          var idx_string = '';
          var selected_checkbox = agent(this).find('[data-r-field="checkbox"]:checked');
          if (selected_checkbox.length < 1 && agent(this).string('no_selection')) {
            agent.showMessage(agent(this).string('no_selection'));
          } else {
            for (var i = 0; i < selected_checkbox.length; i++) {
              var item_data = selected_checkbox.eq(i).setting('item_body').setting('data');
              idx_string = idx_string ? idx_string + ',' + item_data['idx'] : item_data['idx'];
            }
          }
          if (data && data['set'] && idx_string) {
            var item_data = agent(this).setting('data');
            // TODO
            var api_param = {};
            api_param['_action_type'] = 'submit';
            api_param['_mode'] = 'update';
            api_param['_set'] = data['set'];
            api_param['_idx'] = idx_string;
            api_param['_callback'] = function(data) {
              data['callback_element'].request('_action_type', 'load').loadItemData();
              if (data['callback_element'].setting('refresh')) {
                agent.reload();
              }
            };
            agent(this).api(api_param);
          }
        },
      },
    },
    'common_list_fields': {
      'flag_best': {
        'field_display': '{flag_best}',
        'field_display_type': 'keep',
      },
      'flag_hot': {
        'field_display': '{flag_hot}',
        'field_display_type': 'keep',
      },
      'flag_new': {
        'field_display': '{flag_new}',
        'field_display_type': 'keep',
      },
      'flag_md': {
        'field_display': '{flag_md}',
        'field_display_type': 'keep',
      },
  
    },
  };
  
  _common.makeBuyListData = function(request_buy_list) {
    if (typeof request_buy_list != 'object') {
      return request_buy_list;
    }
    var buy_list_data = {};
    var buy_list = [];
    if (request_buy_list['buy_list_item']) {
      buy_list_data = request_buy_list;
      buy_list = request_buy_list['buy_list_item'];
    } else {
      buy_list = request_buy_list;
    }
    buy_list_data['length_of_list'] = buy_list.length;
    buy_list_data['quantity_total'] = 0;
    buy_list_data['shipping_total'] = 0;
    buy_list_data['tax_total'] = 0;
    buy_list_data['point_tax_total'] = 0;
    buy_list_data['price_total'] = 0;
    buy_list_data['option_price_total'] = 0;
    buy_list_data['pv_total'] = 0;
    buy_list_data['rv_total'] = 0;
    buy_list_data['bzprice_total'] = 0;
    buy_list_data['cmprice_total'] = 0;
    buy_list_data['mbprice_total'] = 0;
    buy_list_data['point_total'] = 0;
    buy_list_data['option_point_total'] = 0;
    buy_list_data['grand_total'] = 0;
    buy_list_data['order_title'] = '';
    buy_list_data['member_price_total'] = 0;
    buy_list_data['member10_price_total'] = 0;
    buy_list_data['member20_price_total'] = 0;
    cs(buy_list_data);
    if (buy_list_data['length_of_list'] > 0 && typeof buy_list[0] == 'object') {
      buy_list_data['order_title'] = agent.checkProperty(buy_list, 0, 'goods_name');
      if (String(buy_list_data['order_title']).length > 16) {
        buy_list_data['order_title'] = String(buy_list_data['order_title']).substr(0, 13) + '...';
      }
      for (var i = 0; i < buy_list.length; i++) {
        var quantity = buy_list[i]['quantity'] ? Number(buy_list[i]['quantity']) : 1;
        quantity = quantity < 1 ? 1 : quantity;
        buy_list[i]['quantity'] = quantity;
        buy_list[i]['quantity_subtotal'] = quantity;
        buy_list_data['quantity_total'] = buy_list_data['quantity_total'] + buy_list[i]['quantity_subtotal'];
  
        buy_list[i]['shipping_price'] = buy_list[i]['shipping_price'] ? Number(buy_list[i]['shipping_price']) : 0;
        buy_list[i]['shipping_subtotal'] = buy_list[i]['shipping_price'];
  
        buy_list[i]['pv'] = buy_list[i]['pv'] ? Number(buy_list[i]['pv']) : 0;
        buy_list[i]['pv_subtotal'] = buy_list[i]['pv'] * quantity;
        buy_list_data['pv_total'] = buy_list_data['pv_total'] + buy_list[i]['pv_subtotal'];
  
        buy_list[i]['rv'] = buy_list[i]['rv'] ? Number(buy_list[i]['rv']) : 0;
        buy_list[i]['rv_subtotal'] = buy_list[i]['rv'] * quantity;
        buy_list_data['rv_total'] = buy_list_data['rv_total'] + buy_list[i]['rv_subtotal'];
  
        buy_list[i]['bzprice'] = buy_list[i]['bzprice'] ? Number(buy_list[i]['bzprice']) : 0;
        buy_list[i]['bzprice_subtotal'] = buy_list[i]['bzprice'] * quantity;
        buy_list_data['bzprice_total'] = buy_list_data['bzprice_total'] + buy_list[i]['bzprice_subtotal'];
  
        buy_list[i]['cmprice'] = buy_list[i]['cmprice'] ? Number(buy_list[i]['cmprice']) : 0;
        buy_list[i]['cmprice_subtotal'] = buy_list[i]['cmprice'] * quantity;
        buy_list_data['cmprice_total'] = buy_list_data['cmprice_total'] + buy_list[i]['cmprice_subtotal'];
  
        buy_list[i]['mbprice'] = buy_list[i]['mbprice'] ? Number(buy_list[i]['mbprice']) : 0;
        buy_list[i]['mbprice_subtotal'] = buy_list[i]['mbprice'] * quantity;
        buy_list_data['mbprice_total'] = buy_list_data['mbprice_total'] + buy_list[i]['mbprice_subtotal'];
  
        var point = buy_list[i]['point'] ? Number(buy_list[i]['point']) : 0;
        if (buy_list[i]['option_point'] !== undefined && buy_list[i]['option_point'] !== '') {
          point = Number(buy_list[i]['option_point']);
        }
        buy_list[i]['point_subtotal'] = point * quantity;
        buy_list_data['point_total'] = buy_list_data['point_total'] + buy_list[i]['point_subtotal'];
  
        var member20_price = buy_list[i]['member20_price'] ? Number(buy_list[i]['member20_price']) : 0;
        // do not use buy_list[i]['member20_price'] = buy_list[i]['member20_price'];
        // undefined is nessasary
        buy_list[i]['member20_price_subtotal'] = member20_price * quantity;
        buy_list_data['member20_price_total'] = buy_list_data['member20_price_total'] + buy_list[i]['member20_price_subtotal'];
  
        var member10_price = buy_list[i]['member10_price'] ? Number(buy_list[i]['member10_price']) : 0;
        buy_list[i]['member10_price_subtotal'] = member10_price * quantity;
        buy_list_data['member10_price_total'] = buy_list_data['member10_price_total'] + buy_list[i]['member10_price_subtotal'];
  
        // buy_list[i]['price'] = buy_list[i]['price'] ? Number(buy_list[i]['price']) : 0;
        buy_list[i]['price'] = 0;
        if (buy_list[i]['option_price'] !== undefined && buy_list[i]['option_price'] !== '') {
          price = Number(buy_list[i]['option_price']);
        }
        if (agent.config('member_status') > 20 && buy_list[i]['member20_price'] !== undefined) {
          buy_list[i]['price'] = member20_price;
        } else if (agent.config('member_status') > 10 && buy_list[i]['member10_price'] !== undefined) {
          buy_list[i]['price'] = member10_price;
        }
        buy_list[i]['price_subtotal'] = buy_list[i]['price'] * quantity;
        buy_list_data['price_total'] = buy_list_data['price_total'] + buy_list[i]['price_subtotal'];
  
        if (buy_list[i]['category'] == '55') {
          buy_list[i]['tax_subtotal'] = Math.ceil(buy_list[i]['price_subtotal'] * 20 / 100);
          buy_list[i]['point_tax_subtotal'] = Math.ceil(buy_list[i]['point_subtotal'] * 20 / 100);
        } else if (buy_list[i]['flag_pri']) {
          buy_list[i]['tax_subtotal'] = 0;
        } else {
          buy_list[i]['tax_subtotal'] = Math.ceil(buy_list[i]['price_subtotal'] * 20 / 100);
          buy_list[i]['point_tax_subtotal'] = Math.ceil(buy_list[i]['point_subtotal'] * 20 / 100);
        }
        buy_list_data['tax_total'] = buy_list_data['tax_total'] + buy_list[i]['tax_subtotal'];
  
        buy_list_data['point_tax_total'] = buy_list_data['point_tax_total'] + buy_list[i]['point_tax_subtotal'];
      }
      buy_list_data['shipping_group'] = {};
      for (var i = 0; i < buy_list.length; i++) {
        if (buy_list[i]['use_shipping_group'] && buy_list[i]['use_shipping_group'] !== 'false' && buy_list[i]['shipping_group_name']) {
          var shipping_group_name = buy_list[i]['shipping_group_name'];
          var shipping_group_count = buy_list[i]['shipping_group_count'] ? Number(buy_list[i]['shipping_group_count']) : 1;
          if (!buy_list_data['shipping_group'][shipping_group_name]) {
            buy_list_data['shipping_group'][shipping_group_name] = {};
          }
          buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] = buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] ? buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] : 0;
          buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] = buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] + buy_list[i]['quantity_subtotal'];
  
          buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'] = buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'] ? buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'] : 0;
          var c_co_count = Math.ceil(buy_list_data['shipping_group'][shipping_group_name]['include_shipping_group_count'] / shipping_group_count);
          c_co_count = c_co_count - buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'];
          if (c_co_count > 0) {
            buy_list_data['shipping_total'] = buy_list_data['shipping_total'] + (c_co_count * buy_list[i]['shipping_price']);
            buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'] = buy_list_data['shipping_group'][shipping_group_name]['set_shipping_group_calc'] + c_co_count;
            buy_list[i]['shipping_subtotal'] = c_co_count * buy_list[i]['shipping_price'];
          } else {
            buy_list[i]['shipping_subtotal'] = 0;
          }
        } else if (buy_list[i]['shipping_price_type'] && buy_list[i]['shipping_price_type'] == '20' && buy_list[i]['minimum_price_with_free_shipping']) {
          if (buy_list_data['price_total'] < Number(buy_list[i]['minimum_price_with_free_shipping'])) {
            buy_list[i]['shipping_subtotal'] = buy_list[i]['shipping_subtotal'];
          } else {
            buy_list[i]['shipping_subtotal'] = 0;
          }
          if (agent.config('calculate_shipping') == 'each') {
            buy_list_data['shipping_total'] = buy_list_data['shipping_total'] + buy_list[i]['shipping_subtotal'];
          } else {
            buy_list_data['shipping_total'] = buy_list_data['shipping_total'] < buy_list[i]['shipping_subtotal'] ? buy_list[i]['shipping_subtotal'] : buy_list_data['shipping_total'];
          }
        } else if (buy_list[i]['shipping_price_type'] && buy_list[i]['shipping_price_type'] == '10') {
          buy_list[i]['shipping_price'] = 0;
        } else {
          buy_list[i]['shipping_subtotal'] = buy_list[i]['shipping_subtotal'];
          if (agent.config('calculate_shipping') == 'each') {
            buy_list_data['shipping_total'] = buy_list_data['shipping_total'] + buy_list[i]['shipping_subtotal'];
          } else {
            buy_list_data['shipping_total'] = buy_list_data['shipping_total'] < buy_list[i]['shipping_subtotal'] ? buy_list[i]['shipping_subtotal'] : buy_list_data['shipping_total'];
          }
        }
      }
    }
    if (buy_list.length > 1 && agent.config('locale') == 'ko') {
      buy_list_data['order_title'] = buy_list_data['order_title'] + ' �� ' + (buy_list.length - 1) + '嫄�';
    }
    if (agent.config('calculate_grand_total') == 'with_tax') {
      buy_list_data['grand_total'] = buy_list_data['price_total'] + buy_list_data['shipping_total'] + buy_list_data['tax_total'] + buy_list_data['point_tax_total'];
    } else {
      buy_list_data['grand_total'] = buy_list_data['price_total'] + buy_list_data['shipping_total'];
    }
    buy_list_data['buy_list_item'] = buy_list;
  
    if (!buy_list_data['total_count']) {
      buy_list_data['total_count'] = buy_list.length;
    }
    if (!buy_list_data['count']) {
      buy_list_data['count'] = buy_list.length;
    }
    if (buy_list_data['buy_list_item'][0]['goods_code'] == 'SO201912034210' || buy_list_data['buy_list_item'][0]['goods_code'] == 'SO201912031710') {
      buy_list_data['grand_total'] = buy_list_data['buy_list_item'][0]['cost'];
      buy_list_data['point_tax_total'] = buy_list_data['buy_list_item'][0]['cost'];
    }
    return buy_list_data;
  };
  
  function onYouTubeIframeAPIReady() {
    var video_id = agent('#video0').dataAttribute('video_id');
    var video_width = agent('#video0').width();
    var video_height = agent('#video0').height();
    _common.video0_player = new YT.Player('video0', {
      height: video_width,
      width: video_height,
      videoId: video_id,
      events: {
        'onReady': _common.onPlayerReady,
        'onStateChange': _common.onPlayerStateChange
      }
    });
    if (String(video_id).match(/youtube.com\//) != null) {
      _common.video0_player.loadVideoByUrl(video_id).playVideo();
    }
  };
  
  _common.onPlayerReady = function(event) {
    event.target.playVideo();
  };
  
  _common.onPlayerStateChange = function(event) {
    if (event.data == YT.PlayerState.PLAYING && !_common.video0_done) {
      //setTimeout(stopVideo, 6000);
      _common.video0_done = true;
    }
  }
  
  _common.stopVideo = function() {
    _common.video0_player.stopVideo();
  }
  
  _common.makeShippingGroup = function() {
    var shipping_group = [];
  
    var shipping_group_name = agent('.shipping_group_name');
    for (var i = 0; i < shipping_group_name.length; i++) {
      var shipping_group_item = {};
      shipping_group_item['shipping_group_name'] = shipping_group_name.eq(i).val();
      shipping_group_item['shipping_group_count'] = shipping_group_name.eq(i).parent().find('.shipping_group_count').val();
      shipping_group.push(shipping_group_item);
    }
  
    var sync_param = {};
    sync_param['_action'] = 'sync_data';
    sync_param['_action_type'] = 'submit';
    sync_param['shipping_group'] = JSON.stringify(shipping_group);
    agent().api(sync_param);
    agent.config('shipping_group', shipping_group);
  }