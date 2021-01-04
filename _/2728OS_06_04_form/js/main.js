(function($){

  // Define new model.
  var BuyerModel = Backbone.Model.extend({
    schema: {
      title:      { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
      name:       'Text',
      email:      { validators: ['required', 'email'] },
      birthday:   'Date',
    }
  });

  var BuyerFormView = Backbone.View.extend({
    render: function() {
      this.form = new Backbone.Form({ model: this.model });

      this.$el.html('<h3>Enter buyer details below</h3>');
      this.$el.append(this.form.render().el);
      this.$el.append('<button>Submit</button>');

      return this;
    },

    events: {
      'click button': 'submit'
    },

    submit: function() {
      this.form.commit();

      console.log(this.model.toJSON());
      // Object { title: "Mr", name: "John Doe",
      //          email: "john.doe@example.com",
      //          birthday: Thu Mar 20 1986 00:00:00 GMT+0200 (EET) }
    }
  });

  $(document).ready(function () {
    window.buyerModel = new BuyerModel();

    $('body').append(new BuyerFormView({ model: window.buyerModel }).render().el);
  });

})(jQuery);
