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
    },

    // Perform initialization tasks.
    initialize: function() {

      // On model change event trigger this.render() method.
      this.listenTo(this.model, 'change', this.render, this);
    },

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

    // Export model to be a global variable, so we can update
    // model values in a browser console  with a code like this:
    // invoiceItemModel.set('price', 10)
    window.invoiceItemModel = invoiceItemModel;
  });

})(jQuery);
