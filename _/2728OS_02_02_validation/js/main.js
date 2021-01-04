(function($){

  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({

    // Define validation criteria.
    validate: function(attrs) {
      if (attrs.quantity <= 0) {
        return "quantity can't be negative or equal to zero";
      }
    }
  });

  $(document).ready(function () {

    // Initialize new model object.
    var invoiceItemModel = new InvoiceItemModel({
      description: 'Wooden Toy House',
      price: 10
    });

    //==========================================================================
    // Event handling example.

    // Trigger custom function on error event.
    invoiceItemModel.on("invalid", function(model, error) {
      console.log(error);
    });

    // Set value that is not valid.
    invoiceItemModel.set('quantity', -1, { validate: true });

    //==========================================================================
    // Another way of hanlding events example.

    var invoiceItemModel2 = new InvoiceItemModel({
      description: 'Animal Farm',
      price: 17
    });
    invoiceItemModel2.set({quantity: 0}, {
      invalid: function(model, error) {
        console.log(error);
      },
      validate: true
    });

    //==========================================================================
    // Manual validation example.
    var invoiceItemModel3 = new InvoiceItemModel({
      description: 'Wooden Toy House',
      price: 10,
      quantity: -5
    });

    invoiceItemModel3.isValid(); // false
  });

})(jQuery);
