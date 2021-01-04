(function($){

  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({

  });

  // Define new view.
  var InvoiceItemView = Backbone.View.extend({
    
    // HTML element name, where to render a view.
    el: 'body',

    // Render view.
    render: function() {
      var html = 'Description: ' + this.model.get('description') + '. ' +
        'Price: ' + this.model.get('price') + '. ' +
        'Quantity: ' + this.model.get('quantity') + '.';

      // Set html for the view element using jQuery.
      $(this.el).html(html);
    }
  });


  $(document).ready(function () {

    // Create model instance.
    var invoiceItemModel = new InvoiceItemModel({
      description: 'Farmer Figure',
      price: 8,
      quantity: 1
    });

    // Create view instance.
    var invoiceItemView = new InvoiceItemView({
      
      // Pass model as a parameter to a view.
      model: invoiceItemModel
    });

    // Render view manually.
    invoiceItemView.render();
  });

})(jQuery);
