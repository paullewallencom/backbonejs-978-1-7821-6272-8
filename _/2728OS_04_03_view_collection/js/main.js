(function($){

  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({

  });

  // Define new collection object
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
  });

  // Define new view.
  var InvoiceItemListView = Backbone.View.extend({

    // HTML element name, where to render a view.
    el: 'body',

    // Render view.
    render: function() {
      var html = '';

      _.each(this.collection.models, function(model, index, list) {    
        var item_html = 'Description: ' + model.get('description') + '. ' +
          'Price: ' + model.get('price') + '. ' +
          'Quantity: ' + model.get('quantity') + '.';
        html = html + '<li>' + item_html + '</li>';
      });

      html = '<ul>' + html + '</ul>';

      // Set html for the view element using jQuery.
      $(this.el).html(html);
    }
  });


  $(document).ready(function () {

    // Create and initialize collection instance with data.
    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);

    // Create view instance.
    var invoiceItemListView = new InvoiceItemListView({

      // Pass model as a parameter to a view.
      collection: invoiceItemCollection
    });

    // Render view manually.
    invoiceItemListView.render();

  });

})(jQuery);
