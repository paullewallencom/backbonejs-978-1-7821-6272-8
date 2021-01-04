(function($){

  // Define new model object
  var InvoiceItemModel = Backbone.Model.extend({

  });

  // Define new collection object
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
  });

  $(document).ready(function () {
    //==========================================================================
    // Collection instance creation example.
    var invoiceItemCollection = new InvoiceItemCollection([
      {description: 'Wooden Toy House', price: 22, quantity: 3},
      {description: 'Farm Animal Set', price: 17, quantity: 1},
    ]);


    //==========================================================================
    // Iterate through a collection.

    var descriptions_txt = '';

    invoiceItemCollection.each(function(model, index, list) {
      descriptions_txt += descriptions_txt ? ', ' : '';
      descriptions_txt += model.get('description');
    });

    descriptions_txt; // Wooden Toy House, Farm Animal Set

    //==========================================================================
    // Checking every mpodel to match a specific condition
    var every_multiple = invoiceItemCollection.every(function(model) {
      return model.get('quantity') > 1;
    });
    every_multiple; // false


    // Checking any mpodel to match a specific condition
    var some_multiple = invoiceItemCollection.some(function(model) {
      return model.get('quantity') > 1;
    });
    some_multiple; // true

    //==========================================================================
    // Map example
    var amounts = invoiceItemCollection.map(function(model) {
      return model.get('quantity') * model.get('price');
    });

    amounts; // [66, 77]

    // Reduce example
    var count = invoiceItemCollection.reduce(function(memo, model) {
      return memo + model.get('quantity');
    }, 0);

    count; // 4

    // Another reduce example.
    var total_amount = _.reduce(amounts, function(memo, val) {
      return memo + val;
    }, 0);

    total_amount; // 83

    //==========================================================================
    // Chain example: calculate total amount with map-reduce
    var amount = invoiceItemCollection
      .chain()
      .map(function(model) {
        return model.get('quantity') * model.get('price');
      })
      .reduce(function(memo, val) {
        return memo + val;
      })
      .value(); // 83

    //==========================================================================
    // Pluck an attribute from collection models.
    var descriptions = invoiceItemCollection.pluck("description");
    descriptions; // ["Wooden Toy House", "Farm Animal Set"]


    //==========================================================================
    // SortBy comparator example.

    invoiceItemCollection = new InvoiceItemCollection([
      {description: 'Wooden Toy House', price: 22, quantity: 3},
      {description: 'Farm Animal Set', price: 17, quantity: 1},
      {description: 'Farmer Figure', price: 8, quantity: 1},
      {description: 'Toy Tractor', price: 15, quantity: 1}
    ]);

    invoiceItemCollection.comparator = function(model) {
      return model.get("price");
    };

    invoiceItemCollection.sort();

    invoiceItemCollection.pluck("price"); // [8, 15, 17, 22]


    //==========================================================================
    // Sort comparator example.

    invoiceItemCollection.comparator = function(m1, m2) {
      return m1.get("description").length - m2.get("description").length;
    };

    invoiceItemCollection.sort();

    invoiceItemCollection.pluck("description");
    // ["Toy Tractor", "Farmer Figure", "Farm Animal Set", "Wooden Toy House"]

    //==========================================================================
    // Seach models in collection.

    var result = invoiceItemCollection.where({quantity: 1});

    // Result is just a list of models, so let's create new collection.
    var resultCollection = new InvoiceItemCollection(result);

    resultCollection.pluck('quantity'); // [1, 1, 1]
  });
})(jQuery);
