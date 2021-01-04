(function($){

  // Define new model.
  var BuyerModel = Backbone.Model.extend({
    schema: {
      username: {
        validators: [{ type: 'required' }]
      },

      email: {
        type: 'Text',
        validators: [
          { type: 'required', message: 'Email field is required' },
          'email'
        ]
      },

      password: {
        type: 'Password',
        validators: [{
          type: 'match',
          field: 'passwordConfirm',
          message: 'Passwords must match!'
        }, 'required']
      },

      passwordConfirm: {
        type: 'Password',
        validators: [{ type: 'required' }]
      }
    },

    validate: function(attrs) {
      var errs = {};

      if (this.usernameTaken(attrs.username)) {
        errs.username = 'The username is taken'
      }

      if (!_.isEmpty(errs)) return errs;
    },

    usernameTaken: function(username) {
      return true;
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
