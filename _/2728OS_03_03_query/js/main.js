(function($){
  // Define new model object
  var BuyerModel = Backbone.Model.extend({
    fullName: function() {
      return (this.get('firstName')) + " " + (this.get('lastName'));
    }
  });

  // Define new collection object
  var BuyerCollection = Backbone.QueryCollection.extend({
    model: BuyerModel
  });

  $(document).ready(function () {
    var buyerCollection = new BuyerCollection([
      {firstName: 'John', lastName: 'Smith'},
      {firstName: 'John', lastName: 'Doe'},
      {firstName: 'Joe', lastName: 'Bloggs'}
    ]);

    var result = buyerCollection.query({ firstName: 'John' });

    // Result is just a list of models, so let's create new collection.
    var resultCollection = new BuyerCollection(result);

    resultCollection.pluck('firstName'); // ["John", "John"]


    //==========================================================================
    // Custom callback demo.

    result = buyerCollection.query({
      firstName: {$cb: function(attr){ return attr.charAt(0) === 'J';}}
    });

    // Result is just a list of models, so let's create new collection.
    resultCollection = new BuyerCollection(result);

    resultCollection.pluck('firstName'); // ["John", "John", "Joe"]


    //==========================================================================
    // Element match operator demo.

    var buyerCollection2 = new BuyerCollection([
      {firstName: 'John', lastName: 'Smith', places: [
        {'city': 'Brooklyn', 'state': 'New York'},
        {'city': 'Alexandria', 'state': 'New York'},
        {'city': 'Alexandria', 'state': 'Minnesota'}
      ]},
      {firstName: 'Joe', lastName: 'Bloggs', places: [
        {'city': 'Alexandria', 'country': 'Egypt'},
        {'city': 'Amsterdam', 'country': 'Netherlands'},
        {'city': 'Donetsk', 'country': 'Ukraine'}
      ]},
      {firstName: 'Joe', lastName: 'Doe', places: [
        {'city': 'London', 'country': 'United Kingdom'},
        {'city': 'Paris', 'country': 'France'},
        {'city': 'Copenhagen', 'country': 'Denmark'}
      ]}
    ]);

    result = buyerCollection2.query({
      places: {
        $elemMatch: {
          city: /Alexandria/i
        }
      }
    });
    resultCollection = new BuyerCollection(result);
    resultCollection.pluck('lastName'); // ["Smith", "Bloggs"]

    result = buyerCollection2.query({
      places: {
        $elemMatch: {
          state: { $has: true }
        }
      }
    });

    resultCollection = new BuyerCollection(result);
    resultCollection.pluck('lastName'); // ["Smith"]


    //==========================================================================
    // Computed operator demo.
    result = buyerCollection.query({
      fullName: { $computed: 'Joe Bloggs' }
    });
    result[0].fullName(); // Joe Bloggs


    //==========================================================================
    // Sorting example.

    result = buyerCollection.query(
      { firstName: {$like: 'John'} },
      { sortBy: 'lastName', order: 'desc' }
    );
    resultCollection = new BuyerCollection(result);
    resultCollection.pluck('lastName'); // ["Smith", "Doe"]
  });

})(jQuery);
