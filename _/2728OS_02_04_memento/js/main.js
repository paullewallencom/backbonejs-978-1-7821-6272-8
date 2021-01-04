(function($){

  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({

    // Extend model instance with memento instance.
    initialize: function() {
      _.extend(this, new Backbone.Memento(this));
    }
  });


  // Define new model.
  var AnotherInvoiceItemModel = Backbone.Model.extend({

    // Extend model instance with memento instance.
    // Ignore restoring of description attribute.
    initialize: function() {
      _.extend(this, new Backbone.Memento(this, {ignore: ["description"]}));
    }
  });


  $(document).ready(function () {
    //==========================================================================
    // Using store and restore.
    var invoiceItemModel = new InvoiceItemModel();
    invoiceItemModel.set('price', 10);
    
    // Save state and update value.
    invoiceItemModel.store();
    invoiceItemModel.set('price', 20);

    // Restore last state and get value.
    invoiceItemModel.restore();
    invoiceItemModel.get('price'); // 10


    //==========================================================================
    // States stack demo.
    var invoiceItemModel2 = new InvoiceItemModel();
    invoiceItemModel2.set('price', 10);

    // Save state and update value.
    invoiceItemModel2.store();
    invoiceItemModel2.set('price', 20);
    
    // Save state and update value.
    invoiceItemModel2.store();
    invoiceItemModel2.set('price', 30);

    // Restore last state and get value.
    invoiceItemModel2.restore();
    invoiceItemModel2.get('price'); // 20

    // Restore last state and get value.
    invoiceItemModel2.restore();
    invoiceItemModel2.get('price'); // 10


    //==========================================================================
    // Another stack demo.
    var invoiceItemModel3 = new InvoiceItemModel();
    invoiceItemModel3.set('price', 10);

    // Save state and update value.
    invoiceItemModel3.store();
    invoiceItemModel3.set('price', 20);
    
    // Save state and update value.
    invoiceItemModel3.store();
    invoiceItemModel3.set('price', 30);

    // Restore last state and get value.
    invoiceItemModel3.restart();
    invoiceItemModel3.get('price'); // 10


    //==========================================================================
    // Ignore attribute example.
    var invoiceItemModel4 = new AnotherInvoiceItemModel();
    invoiceItemModel4.set({
      price: 10,
      description: 'Wooden Toy House'
    });

    // Save state and update values.
    invoiceItemModel4.store();
    invoiceItemModel4.set({
      price: 20,
      description: 'Farm Animal Set'
    });

    // Restore last state and get values.
    invoiceItemModel4.restore();
    invoiceItemModel4.get('price'); // 10
    invoiceItemModel4.get('description'); // Farm Animal Set


    //==========================================================================
    // Another ignore attribute example.
    var invoiceItemModel5 = new InvoiceItemModel();
    invoiceItemModel5.set({
      price: 10,
      date: '2012-05-01'
    });

    // Save state and update values.
    invoiceItemModel5.store();
    invoiceItemModel5.set({
      price: 20,
      date: '2012-05-09'
    });

    // Restore last state and get values.
    invoiceItemModel5.restore({ignore: ["date"]});
    invoiceItemModel5.get('price'); // 10
    invoiceItemModel5.get('date'); // 2012-05-09
  });
})(jQuery);
