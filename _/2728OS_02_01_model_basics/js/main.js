(function($){

  // Define new model object
  var InvoiceItemModel = Backbone.Model.extend({

    // Define default attributes.
    defaults: {
      description: '',
      price: 0,
      quantity: 1,

      // Use function for multi line expression.
      date: function() {
        var date = new Date();

        // Returb attribute value.
        return 'date', date.toISOString();
      }()
    },

    // Set default values in initialize method.
    // Following method is run after the object is created.
    initialize: function() {

      // Check that attribute is not initialized yet.
      if (!this.has('date')) {
        //var date = new Date();

        // Set attribute value.
        //this.set('date', date.toISOString());
      }
    },

    // Calculate amount.
    calculateAmount: function() {
      return this.get('price') * this.get('quantity');
    }
  });

  $(document).ready(function () {
    //==========================================================================
    // Model instance creation example.

    var invoiceItemModel = new InvoiceItemModel({
      date: '2013-04-24',
      description: 'Wooden Toy House',
      price: 22,
      quantity: 3
    });

    //==========================================================================
    // Default values example.

    var invoiceItemModel2 = new InvoiceItemModel({
      description: 'Farm Animal Set',
      price: 17
    });

    invoiceItemModel2.get('date'); // 2012-05-01T10:3:42.617Z
    invoiceItemModel2.get('quantity'); // 1

    //==========================================================================
    // Set attribute example.

    // Set single model attribute.
    invoiceItemModel.set(invoiceItemModel.set('quantity', 5));

    // Set multiple model attributies.
    invoiceItemModel.set({
      quantity: 5,
      price: 10
    });


    //==========================================================================
    // Get attribute example.

    var quantity = invoiceItemModel.get('quantity');
    var price = invoiceItemModel.get('price');


    //==========================================================================
    // Remove attribute example.

    // Remove arbitrary model attribute.
    invoiceItemModel.unset('quantity');

    // Remove all model attributes.
    invoiceItemModel.clear();


    //==========================================================================
    // Check if attribute exists example.

    if (!invoiceItemModel.has('quantity')) {
      console.log('Quantity attribute does not exists!')
    }

    //==========================================================================
    // Output escaped HTML example.

    var hacker = new Backbone.Model({
      name: "<script>alert('xss')</script>"
    });
    var escaped_name = hacker.escape('name'); // &lt;script&gt;alert(&#x27;xss&#x27;)&lt;&#x2F;script&gt;
    console.log(escaped_name);

    //==========================================================================
    // Working with indentifies example.

    // For new objects id is undefined unless you set it manually.
    invoiceItemModel.id = Math.random().toString(36).substr(2);
    var id = invoiceItemModel.id;
    var cid = invoiceItemModel.cid;
  });

})(jQuery);
