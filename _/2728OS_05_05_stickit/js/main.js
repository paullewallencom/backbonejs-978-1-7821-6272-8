(function($){
  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({

  });

  // Define new view.
  var InvoiceItemView = Backbone.View.extend({

    // Define class name of view element.
    className: 'invoice-item-view',

    // Bind HTML elements to the view model.
    bindings: {
      '#description': 'description',
      '#price': 'price',
      '#quantity': 'quantity'
    },

    // Render view.
    render: function() {
      var html = 'Description: <span id="description"></span>, ' +
        'Price:  <span id="price"></span>, ' +
        'Quantity:  <span id="quantity"></span>.';

      // Set html for the view element using jQuery.
      $(this.el).html(html);

      // Here binding occurs.
      this.stickit();

      return this;
    },
  });

  // Define new view.
  var InvoiceItemFormView = Backbone.View.extend({

    // Define class name of view element.
    className: 'invoice-item-form-view',

    // Bind HTML elements to the view model.
    bindings: {
      '#description': 'description',
      '#price': 'price',
      '#quantity': 'quantity'
    },

    // Render view.
    render: function() {
      var html = '<label>Description:</label><input type="text" id="description"></input><br>' +
        '<label>Price:</label><input type="text" id="price"></input><br>' +
        '<label>Quantity:</label><input type="text" id="quantity"></input><br>';

      // Set html for the view element using jQuery.
      $(this.el).html(html);

      // Here binding occurs.
      this.stickit();

      return this;
    },
  });


  $(document).ready(function () {
    // Create model instance.
    var invoiceItemModel = new InvoiceItemModel({
      description: 'Farmer Figure',
      price: 8,
      quantity: 1
    });

    // Append views to the body element.
    $('body').append(new InvoiceItemFormView({ model: invoiceItemModel }).render().el);
  });

})(jQuery);
