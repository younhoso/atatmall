agent.fn.extend({
    initDialog: function() {
      var type = '';
      if (arguments.length == 0 && this.setting('type')) {
        type = String(this.setting('type'));
      } else if (arguments.length == 1) {
        type = String(arguments[0]);
      }
      if (type) {
        this.dataAttribute('type', type);
        this.initItem().setting(_dialog.initSetting['common']).prepareMemberFieldsSettings(_dialog.initSetting['common_field']).setMemberFields().initMemberFields();
      }
    },
  
    showDialog: function() {
      var dialog_string = this.dataAttribute('dialog') ? this.dataAttribute('dialog') : this.setting('dialog');
  
      // TODO
      if (agent('[data-r-role="dialog"][data-r-type="' + dialog_string + '"]').is(':visible')) {
        return;
      }
  
      if (agent('[data-r-role="dialog"][data-r-type="' + dialog_string + '"]').length < 1) {
        log(dialog_string + ' is not exists. check config.');
        return this;
      }
      var dialog = agent('[data-r-role="dialog"][data-r-type="' + dialog_string + '"]').eq(0);
      dialog.setting('on_open_dialog_element', this);
      var bind_field = dialog.bindElement('field');
      bind_field.filter('input').setDisplayValue('');
      if (dialog.bindElement('field').filter('[data-r-field="title"]').length > 0 && this.string('dialog_title')) {
        dialog.bindElement('field').filter('[data-r-field="title"]').setDisplayValue(this.string('dialog_title'));
      } else if (this.string('dialog_title')) {
        dialog.bindElement('title').setDisplayValue(this.string('dialog_title'));
      }
      if (dialog.bindElement('field').filter('[data-r-field="message"]').length > 0 && this.string('dialog_message')) {
        dialog.bindElement('field').filter('[data-r-field="message"]').setDisplayValue(this.string('dialog_message'));
      } else {
        dialog.find('[data-r-field="message"]').setDisplayValue(this.string('dialog_message'));
      }
      if (this.dataAttribute('dialog_width')) {
        dialog.css('width', this.dataAttribute('dialog_width'));
      } else if (dialog.dataAttribute('dialog_width')) {
        dialog.css('width', dialog.dataAttribute('dialog_width'));
      }
      if (this.dataAttribute('dialog_height')) {
        dialog.css('height', this.dataAttribute('dialog_height'));
      } else if (dialog.dataAttribute('dialog_height')) {
        dialog.css('height', dialog.dataAttribute('dialog_height'));
      }
      var dialog_width = dialog.width();
      var dialog_height = dialog.height();
      var dialog_z_index = 99001 + agent('[data-r-role="dialog"]:visible').length;
      var dialog_background_z_index = 99000 + agent('[data-r-role="dialog"]:visible').length;
      var dialog_top = '50%';
      var dialog_left = '50%';
      var dialog_margin_left = -dialog_width / 2.0 + (agent('[data-r-role="dialog"]:visible').length * 40);
      var dialog_margin_top = -dialog_height / 2.0 + (agent('[data-r-role="dialog"]:visible').length * 40);
      if (dialog_string == 'message' || dialog_string == 'confirm') {
        dialog_z_index = 99999;
        dialog_background_z_index = 99998;
      }
      if (this.dataAttribute('dialog_left')) {
        dialog_left = this.dataAttribute('dialog_left');
        dialog_margin_left = 0;
      } else if (dialog.dataAttribute('dialog_left')) {
        dialog_left = dialog.dataAttribute('dialog_left');
        dialog_margin_left = 0;
      }
      if (this.dataAttribute('dialog_top')) {
        dialog_top = this.dataAttribute('dialog_top');
        dialog_margin_top = 0;
      } else if (dialog.dataAttribute('dialog_top')) {
        dialog_top = dialog.dataAttribute('dialog_top');
        dialog_margin_top = 0;
      }
      var dialog_positon = dialog.dataAttribute('dialog_position') ? dialog.dataAttribute('dialog_position') : 'fixed';
  
      var dialog_background_width = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
      var dialog_background_height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  
      var dialog_background = agent('<div class="agent_dialog_background"></div>');
      dialog_background.css({
        'width': dialog_background_width,
        'height': dialog_background_height,
        'z-index': dialog_background_z_index,
      });
  
      dialog_background.on('click tap scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (agent.config('device') == 'mobile' && agent(this).setting('dialog')) {
          // agent(this).setting('dialog').dismissDialog();
        }
        return false;
      });
  
      agent('body').append(dialog_background);
      dialog.setting('dialog_background', dialog_background);
      dialog_background.setting('dialog', dialog);
  
      // 'margin-top': -(dialog_height / 2.0) + (agent('[data-r-role="dialog"]:visible').length * 40),
      // TODO shynomore
      // 'left': '0',
      // 'top': '0',
      // 'right': '0',
      // 'bottom': '0',
      // 'width': '100%',
      // 'height': '100%',
      // 'overflow': 'scroll',
      // '-webkit-overflow-scrolling': 'touch'
      if (agent.config('device') == 'mobile') {
        dialog.attr('beforeScrollY', window.scrollY);
        dialog.css({
          'position': dialog_positon,
          'left': dialog_left,
          'top': dialog_top,
          'margin-left': dialog_margin_left,
          'margin-top': dialog_margin_top,
          'z-index': dialog_z_index,
        }).show();
      } else {
        dialog.css({
          'position': dialog_positon,
          'left': dialog_left,
          'top': dialog_top,
          'margin-left': dialog_margin_left,
          'margin-top': dialog_margin_top,
          'z-index': dialog_z_index,
        }).show();
      }
      if (dialog.bindElement('field').filter('[data-r-field="positive"]').length > 0) {
        dialog.bindElement('field').filter('[data-r-field="positive"]').focus();
      }
  
      return this;
    },
  
    dismissDialog: function() {
      if(agent.getPageRequest('p') == 'admin_product_list' && agent('[data-r-role="dialog"]:visible').find('[data-r-field="message"]').text() == '파일이 업로드 되었습니다.') {
        agent.reload();
      }
      if (this.dataAttribute('role') == 'dialog') {
        if (this.setting('dialog_background')) {
          this.setting('dialog_background').remove();
        }
        this.hide();
      } else {
        if (agent('[data-r-role="dialog"]:visible').setting('dialog_background')) {
          agent('[data-r-role="dialog"]:visible').setting('dialog_background').remove();
        }
        agent('[data-r-role="dialog"]:visible').hide();
      }
  
      if (agent(this).is('[beforeScrollY]')) {
        agent('html, body').animate({
          scrollTop: agent(this).attr('beforeScrollY')
        }, 0);
        agent(this).removeAttr('beforeScrollY');
      }
  
      return this;
    },
  });
  
  agent().initPlugin(function() {
    agent('[data-r-role="dialog"]').setting({
      '_setting_type': 'default',
      'type': null,
    });
    for (var i = 0; i < agent('[data-r-role="dialog"]').length; i++) {
      agent('[data-r-role="dialog"]').eq(i).initDialog(agent('[data-r-role="dialog"]').eq(i).setting('type'));
    }
  });
  
  _dialog.initSetting = {
    'common': {
      '_setting_type': 'default',
      '_event': {
        '_setting_type': 'replace',
        'cancel.agent_dialog': function(event, data) {
          event.preventDefault();
          agent(this).dismissDialog();
          agent(this).setting('on_open_dialog_element').trigger('cancel_callback.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback.agent_dialog', agent(this));
          if (_common.video0_player) {
            _common.video0_player.stopVideo();
          }
          var type_string = agent(this).dataAttribute('type');
          agent(this).setting('on_open_dialog_element').trigger('cancel_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          return false;
        },
        'positive.agent_dialog': function(event, data) {
          agent(this).dismissDialog();
          agent(this).setting('on_open_dialog_element').trigger('positive_callback.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback.agent_dialog', agent(this));
          var type_string = agent(this).dataAttribute('type');
          agent(this).setting('on_open_dialog_element').trigger('positive_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          return false;
        },
        'neutral.agent_dialog': function(event, data) {
          event.preventDefault();
          agent(this).dismissDialog();
          agent(this).setting('on_open_dialog_element').trigger('neutral_callback.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback.agent_dialog', agent(this));
          var type_string = agent(this).dataAttribute('type');
          agent(this).setting('on_open_dialog_element').trigger('neutral_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          return false;
        },
        'negative.agent_dialog': function(event, data) {
          event.preventDefault();
          agent(this).dismissDialog();
          agent(this).setting('on_open_dialog_element').trigger('negative_callback.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback.agent_dialog', agent(this));
          var type_string = agent(this).dataAttribute('type');
          agent(this).setting('on_open_dialog_element').trigger('negative_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          agent(this).setting('on_open_dialog_element').trigger('dismiss_callback_on_' + type_string + '_dialog.agent_dialog', agent(this));
          return false;
        },
      },
    },
    'common_field': {
      'cancel': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          '_setting_type': 'replace',
          'click.agent_field': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body')) {
              agent(this).setting('item_body').trigger('cancel.agent_dialog');
              agent(this).setting('item_body').trigger('dismiss.agent_dialog');
            }
            return false;
          },
        },
      },
      'positive': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          'click.agent_field': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body')) {
              agent(this).setting('item_body').trigger('positive.agent_dialog');
              agent(this).setting('item_body').trigger('dismiss.agent_dialog');
            }
            return false;
          },
        },
      },
      'neutral': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          '_setting_type': 'replace',
          'click.agent_field': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body')) {
              agent(this).setting('item_body').trigger('neutral.agent_dialog');
              agent(this).setting('item_body').trigger('dismiss.agent_dialog');
            }
            return false;
          },
        },
      },
      'negative': {
        '_setting_type': 'default',
        'do_not_submit': true,
        'field_display_type': 'keep',
        '_event': {
          '_setting_type': 'replace',
          'click.agent_field': function(event) {
            event.preventDefault();
            if (agent(this).setting('item_body')) {
              agent(this).setting('item_body').trigger('negative.agent_dialog');
              agent(this).setting('item_body').trigger('dismiss.agent_dialog');
            }
            return false;
          },
        },
      },
    },
  };
  