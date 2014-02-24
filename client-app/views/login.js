var mediator = require('../mediator');

module.exports = Marionette.ItemView.extend({

  className: 'login',
  template: templates.login,
  events: {
    'submit form' : 'submit'
  },

  submit: function(e){
    e.preventDefault(); e.stopPropagation();

    var username = $(this.el).find('input').val();
    $(this.el).removeClass('show');
    mediator.trigger('login', username);
  },

  onRender: function(){
    var self = this;
    setTimeout(function(){
      $(self.el).addClass('show');
    });
  }
});