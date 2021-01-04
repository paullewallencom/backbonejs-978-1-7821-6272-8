
(function($){

  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({
    calculateAmount: function() {
      return this.get('price') * this.get('quantity');
    }
  });


  // Define new collection object
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
  });


  // Define new view to render a model.
  var InvoiceItemView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'tr',

    // Render view.
    render: function() {

      // Add cells to the table row.
      $(this.el).html(_.map([
        this.model.get('quantity'), this.model.get('description'),
        this.model.get('price'), this.model.calculateAmount(),
      ], function(val, key){
        return '<td>' + val + '</td>'
      }));

      return this;
    }
  });


  // Define new view to render a collection.
  var InvoiceItemListView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'table',

    // Define element class name.
    className: 'invoice-item-view',

    // Render view.
    render: function() {

      $(this.el).empty();

      // Append table with a table header.
      $(this.el).append($('<tr></tr>').html(
        _.map(['Quantity', 'Description', 'Price', 'Total'], function(val, key){
          return '<th>' + val + '</th>'
        })
      ));

      // Append table  with a row.
      $(this.el).append(
        _.map(this.collection.models, function(model, key) {
          return new InvoiceItemView({ model: model }).render().el;
        })
      );

      return this;
    }
  });


  // Define new view to render whole page.
  var InvoiceItemListPageView = Backbone.View.extend({

    // Render whole page view.
    render: function() {
      $(this.el).html(new InvoiceItemListView({ collection: this.collection }).render().el);
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

    // Create whole page view instance and render it.
    new InvoiceItemListPageView({
      collection: invoiceItemCollection,
      el: 'body'
    }).render();
  });

})(jQuery);
