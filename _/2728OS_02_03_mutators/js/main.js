(function($){

  // Define new model.
  var BuyerModel = Backbone.Model.extend({

    // Use mutators.
    mutators: {

      // Introduce virtual attribute.
      fullName: {
        get: function () {
          return this.firstName + ' ' + this.lastName;
        },
        set: function (key, value, options, set) {
          var names = value.split(' ');
          this.set('firstName', names[0], options);
          this.set('lastName', names[1], options);
        }
      },

      // Override existing attribute.
      vip: {
        get: function() {
          return this.vip === true ? 'VIP' : 'Regular';
        },
        set: function (key, value, options, set) {
          set(key, value === 'VIP', options);
        }
      }
    }
  });


  $(document).ready(function () {
    //==========================================================================
    // Demonstrate getter of virtual attribute.

    var buyerModel = new BuyerModel();
    buyerModel.set({
      firstName: 'John',
      lastName: 'Smith'
    });

    buyerModel.get('fullName'); // John Smith
    buyerModel.get('firstName'); // John
    buyerModel.get('lastName'); // Smith


    //==========================================================================
    // Demonstrate setter of virtual attribute.

    var buyerModel2 = new BuyerModel()
    buyerModel2.set('fullName', 'Joe Bloggs');

    buyerModel2.get('fullName'); // Joe Bloggs
    buyerModel2.get('firstName'); // Joe
    buyerModel2.get('lastName'); // Bloggs


    //==========================================================================
    // Demonstrate overridden getter and setter.

    var buyerModel3 = new BuyerModel();
    buyerModel2.set({
      fullName: 'Mister X',
      vip: 'VIP'
    });

    buyerModel2.get('vip'); // VIP
    buyerModel2.attributes.vip; // true


    //==========================================================================
    // Handling Mutators event.

    buyerModel3.bind('mutators:set:fullName', function (a, b, c, d) {
       console.log('mutators:set:fullName is triggered');
    });

    buyerModel3.set({
      fullName: 'Mister Y'
    });

  });
})(jQuery);