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
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);


    //==========================================================================
    // Another collection instance creation example.
    invoiceItemModel1 = new InvoiceItemModel({
      description: 'Wooden Toy House',
      price: 22,
      quantity: 3
    });

    invoiceItemModel2 = new InvoiceItemModel({
      description: 'Farm Animal Set',
      price: 17,
      quantity: 1
    });

    var invoiceItemCollection2 = new InvoiceItemCollection([
      invoiceItemModel1,
      invoiceItemModel2
    ]);


    //==========================================================================
    // Get model by index example.

    var model = invoiceItemCollection.at(2);
    model.get('description'); // Farmer Figure

    model.set('description', 'Superman Figure');
    invoiceItemCollection.at(2).get('description'); // Superman Figure

    //==========================================================================
    // Get an index by a model
    invoiceItemCollection.indexOf(model); // 2

    //==========================================================================
    // Get independent copy of a model
    var anotherModel = invoiceItemCollection.at(2).clone();
    anotherModel.set('description', 'Another Figure')
    invoiceItemCollection.at(2).get('description'); // Superman Figure



    //==========================================================================
    // Get model by id example.

    // Get mpdel by id. Here id is not initialized yet.
    model = invoiceItemCollection.get('4ryurtz3m5gn9udi');

    // Get model by cid.
    model = invoiceItemCollection.get('c4');
    model.get('description'); // Toy Tracktor

    //==========================================================================
    // Get collection length.

    var length = invoiceItemCollection.length; // 4
    model = invoiceItemCollection.at(length-1);
    model.get('description'); // Toy Tractor


    //==========================================================================
    // Add model example.

    // Add model
    invoiceItemCollection.add({
      description: 'Toy Track',
      price: 10,
      quantity: 1
    });

    // Add model at a specific index
    invoiceItemCollection.add(
      { description: 'Fisherman Hut', price: 15, quantity: 1 },
      { at: 0}
    );
    invoiceItemCollection.at(0).get('description'); // Fisherman Hut

    // Add multiple models
    invoiceItemCollection.add([
      { description: 'Powerboat', price: 12, quantity: 1 },
      { description: 'Jet Ski', price: 12, quantity: 1 }
    ]);

    //==========================================================================
    // Remove models example.

    // You can pass cids, ids or model objects to a following function().
    invoiceItemCollection.remove(['c0', 'c1', 'c2', 'c3']);

    //==========================================================================
    // Stacks and queues methods.

    model = new InvoiceItemModel({
      description: 'Toy Soldier',
      price: 20,
      quantity: 1
    });

    // Add model to the end of collection.
    invoiceItemCollection.push(model);

    // Remove and retrieve model from the end of collection.
    model = invoiceItemCollection.pop();

    // Add model to the begining of collection.
    invoiceItemCollection.unshift(model);

    // Remove and retrieve model from the begining of collection.
    model = invoiceItemCollection.shift();


    //==========================================================================
    // Replace collection with new models.

    invoiceItemCollection.reset([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 }
    ]);
  });
})(jQuery);
