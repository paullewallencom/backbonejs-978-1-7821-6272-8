(function($){

  // Define new model.
  var BuyerModel = Backbone.NestedModel.extend({

  });

  $(document).ready(function () {
    //==========================================================================
    // Demonstrate working with nested attributes.

    // Create new model instance.
    buyerModel = new BuyerModel();

    // Set nested attributes with object syntax
    buyerModel.set({
      name: {
        first: 'John',
        last: 'Smith',
        middle: {
          initial: 'P',
          full: 'Peter'
        }
      }
    });

    // Set nested attribute with dot syntax.
    buyerModel.set({
      'name.title': 'Mr',
      'name.generation': 'II'
    });

    // Get nested attributes with dot syntax.
    buyerModel.get('name.middle.full'); // Peter
    buyerModel.get('name.middle'); // { full: 'Peter', initial: 'P }
    buyerModel.get('name.title'); // Mr


    //==========================================================================
    // Demonstrate working with nested array of attributes.

    // Ise object syntax.
    buyerModel.set({
      'addresses': [
        {city: 'Brooklyn', state: 'NY'},
        {city: 'Oak Park', state: 'IL'}
      ]
    });

    // Use Dot and  bracket syntax.
    buyerModel.set({
      'addresses[1].state': 'MI'
    });

    // Get nested attributes with dot syntax
    buyerModel.get('addresses[0].state'); // NY
    buyerModel.get('addresses[1].state'); // MI


    //==========================================================================
    // Add() and remove() methods example.
    buyerModel.add('addresses', {
      city: 'Seattle',
      state: 'WA'
    });

    buyerModel.get('addresses[2]'); // { city: 'Seattle', state: 'WA' }

    buyerModel.remove('addresses[1]');

    buyerModel.get('addresses').length; // 2


    //==========================================================================
    // Bind callback to an event.
    buyerModel.bind('change:addresses[0].city', function(model, value){ 
      console.log(value);
    });

    buyerModel.set('addresses[0].city', 'Chicago');
  });
})(jQuery);
