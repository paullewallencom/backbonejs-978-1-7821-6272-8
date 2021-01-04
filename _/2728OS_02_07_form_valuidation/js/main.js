(function($){

  // Define new model.
  var BuyerModel = Backbone.Model.extend({
    defaults: {
      name: '',
      age: ''
    },

    // Define validation criteria.
    validation: {
      name: {
        required: true
      },
      age: {
        min: 18
      }
    }
  });

  var BuyerModelFormView = Backbone.View.extend({

    // Bind Backbone.Validation to a view.
    initialize: function(){
      Backbone.Validation.bind(this);
    },

    // Define a template.
    template: _.template('\
      <form>\
        Enter name: <input name="name" type="text" value="<%= name %>"><br>\
        Enter age: <input name="age" type="text" value="<%= age %>"><br>\
        <input type="button" name="save" value="Save">\
      </form>\
    '),

    // Render view.
    render: function(){
      // Render template with model values.
      var html = this.template(this.model.toJSON());

      // Update html.
      $(this.el).html(html);
    },

    // Bind save callback click event.
    events: {
      'click [name~="save"]': 'save'
    },

    // Save callback.
    save: function(){

      // Update model properties.
      this.model.set({
        name: $('[name~="name"]').val(),
        age: $('[name~="age"]').val()
      }, { validate: true });
    }
  });

  $(document).ready(function () {
     // Create new model instance.
     var buyerModel = new BuyerModel();

     // Create new view instance.
     var buyerModelFormView = new BuyerModelFormView({
       model: buyerModel,
       el: 'body'
     });

     // Render view.
     buyerModelFormView.render();
  });
})(jQuery);
