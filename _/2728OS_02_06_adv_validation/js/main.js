(function($){

  // Extend Model prototype with Validation mixin.
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  var Model = Backbone.Model.extend({
    validation: {
      age: {
        myValidator: 1 // uses your custom validator
      }
    }
  });

  // Define new model.
  var BuyerModel = Backbone.Model.extend({

    // Defining a validation criteria.
    validation: {
      name: {
        required: true
      },
      email: {
        pattern: 'email'
      }
    }
  });

  // Define new model.
  var BuyerModel2 = Backbone.Model.extend({
    validation: {
      type: {
        oneOf: ['person', 'organization']
      },
      age: {

        // Use custom validating function.
        fn: function(value, attr, computedState) {
          if (computedState.type === 'person' && !value) {
            return 'Age is required';
          };
        }
      }
    }
  });

  // Extending Backbone.Validation with custom validator.
  _.extend(Backbone.Validation.validators, {
    notOneOf: function(value, attr, customValue, model, computedState) {
      if (_.include(customValue, value)) {
        return attr + ' does not validates!';
      }
    }
  });

  // Define new model.
  var PixelModel = Backbone.Model.extend({
    validation: {
      color: {

        // Use custom validator.
        notOneOf: ['black', 'white']
      }
    }
  });

  // Extend Backbone.Validation with custom pattern.
  _.extend(Backbone.Validation.patterns, {
    phone: /^(\+\d)*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/
  });

  // Create new model.
  var BuyerModel3 = Backbone.Model.extend({
    validation: {
      phoneNumber: {

        // Use custom pattern.
        pattern: 'phone'
      }
    }
  });

  $(document).ready(function () {
    //==========================================================================
    // Demonstration of using Backbone.Validation.

    var buyerModel = new BuyerModel();

    // Set attributes alues which do not validate.
    buyerModel.set({
      email: 'http://example.com'
    });

    // Check if model is valid.
    buyerModel.isValid(); // false
    buyerModel.get('email'); // undefined


    //==========================================================================
    // Demonstration of using custom validating function.

    var buyerModel2 = new BuyerModel2();

    buyerModel2.set({
      type: 'person',
      age: '20'
    }, { validate: true });

    buyerModel2.isValid(); // true

    //==========================================================================
    // Demonstration of using custom validator.

    var pixelModel = new PixelModel();
    pixelModel.set({
      color: 'black'
    }, { validate: true });

    pixelModel.isValid(); // false

    //==========================================================================
    // Demonstration of using custom pattern.

    var buyerModel3 = new BuyerModel3();

    buyerModel3.set({
      phoneNumber: '+1(987)654-32-10'
    }, { validate: true });

    console.log(buyerModel3.isValid());
    buyerModel3.isValid(); // true
  });
})(jQuery);
