module.exports = Marionette.ItemView.extend({

  className: 'message',
  template: templates.message,

  onBeforeClose: function(){
    $(this.el).removeClass('show');
    setTimeout(function(){
      return true;
    });
  },

  onRender: function(){
    var self = this;
    setTimeout(function(){
      $(self.el).addClass('show');
    });
  }
});