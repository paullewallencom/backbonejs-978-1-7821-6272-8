(function($){

  //==========================================================================
  // One-to-many relationship demo.

  // Define new model object.
  var InvoiceItemModel = Backbone.RelationalModel.extend({

  });

  // Define new collection object.
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
  });

  // Define new model object.
  var InvoiceModel = Backbone.RelationalModel.extend({

    // Define one-to-many relationship.
    relations: [{
      // Relationship type
      type: Backbone.HasMany,

      // Relationship key in BuyerModel.
      key: 'items',

      // Related model.
      relatedModel: InvoiceItemModel,

      // Collection to store related models.
      collectionType: InvoiceItemCollection,

      // Define reverse relationship.
      reverseRelation: {
        key: 'invoice'
      }
    }]
  });

  $(document).ready(function () {

    //==========================================================================
    // One-to-many relationship demo.

    var invoiceModel = new InvoiceModel({
      referenceNumber: '12345',
      date: '2012-09-01',
      items: [
        { description: 'Wooden Toy House', price: 22, quantity: 3 },
        { description: 'Farm Animal Set', price: 17, quantity: 1 }
      ]
    });

    invoiceModel.get('items').at(0).get('description'); // Wooden Toy House
    invoiceModel.get('items').at(0).get('invoice').get('referenceNumber'); // 12345

    // Add new model to a collection
    invoiceModel.get('items').add({
      description: 'Powerboat',
      price: 12,
      quantity: 1
    });

    invoiceModel.get('items').at(2).get('invoice') == invoiceModel; // true

    // Add new model
    invoiceItemModel = new InvoiceItemModel({
      description: 'Jet Ski',
      price: 12,
      quantity: 1,
      invoice: invoiceModel
    });

    invoiceModel.get('items').at(3).get('description'); // Jet Ski


    //==========================================================================
    // Export to JSON demo.

    JSON.stringify(invoiceModel.toJSON());

    /*
     * {
     *   "referenceNumber":"12345",
     *   "date":"2012-09-01",
     *   "items":[
     *     {"description":"Wooden Toy House","price":22,"quantity":3},
     *     {"description":"Farm Animal Set","price":17,"quantity":1},
     *     {"description":"Powerboat","price":12,"quantity":1},
     *     {"description":"Jet Ski","price":12,"quantity":1}
     *   ]
     * }
     */

    JSON.stringify(invoiceModel.get('items').at(0).toJSON());

    /*
     * {
     *   "description":"Wooden Toy House",
     *   "price":22,
     *   "quantity":3,
     *   "invoice":{
     *     "referenceNumber":"12345",
     *     "date":"2012-09-01",
     *     "items":[
     *       null,
     *       {"description":"Farm Animal Set","price":17,"quantity":1},
     *       {"description":"Powerboat","price":12,"quantity":1},
     *       {"description":"Jet Ski","price":12,"quantity":1}
     *     ]
     *   }
     * }
     */
  });
})(jQuery);
