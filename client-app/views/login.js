module.exports = Marionette.ItemView.extend({

  className: 'login',
  template: templates.login,

  onRender: function(){
    var self = this;
    setTimeout(function(){
      $(self.el).addClass('show');
    });
  }
});