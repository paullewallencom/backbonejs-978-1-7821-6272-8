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
      ], function(val, key) {
        return '<td>' + val + '</td>'
      }));

      return this;
    },

    initialize: function() {

      // Bind callback to destroy event of the model.
      this.listenTo(this.model, 'destroy', this.destroy, this);
    },

    destroy: function() {
      this.remove();
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
      _.each(this.collection.models, function(model, key) {
        this.append(model);
      }, this);

      return this;
    },

    initialize: function() {

      // Bind callback to add event of the collection.
      this.listenTo(this.collection, 'add', this.append, this);
    },

    // Add invoice item row to the table.
    append: function(model) {
      $(this.el).append(
        new InvoiceItemView({ model: model }).render().el
      );
    }
  });

  // Define view with add new item button.
  var InvoiceItemListControlsView = Backbone.View.extend({
    render: function() {
      var html = '<br><input id="add" type="button" value="Add" id>' +
      ' <input id="remove" type="button" value="Remove">';

      $(this.el).html(html);

      return this;
    },

    // Handle HTML events.
    events: {
      'click #add': 'addNewInvoiceItem',
      'click #remove': 'removeInvoiceItem',
    },

    // Handle keyboard events.
    keyboardEvents: {
      'shift+n': 'addNewInvoiceItem',
      'shift+d': 'removeInvoiceItem',
    },

    // Add button handler.
    addNewInvoiceItem: function() {
      var description = prompt('Enter item description', '');
      var price = prompt('Enter item price', '0');
      var quantity = prompt('Enter item quantity', '1');

      this.collection.add([{
        description: description,
        price: price,
        quantity: quantity
      }]);
    },

    // Remove button handler.
    removeInvoiceItem: function() {
      var position = prompt('Enter position of item to remove', '');

      model = this.collection.at(position);
      model.destroy();
    }
  });

  // Define new view to render whole page.
  var InvoiceItemListPageView = Backbone.View.extend({

    // Render whole page view.
    render: function() {
      $(this.el).html(new InvoiceItemListView({ collection: this.collection }).render().el);
      $(this.el).append(new InvoiceItemListControlsView({ collection: this.collection }).render().el);
    }
  });


  $(document).ready(function () {

    // Create and initialize collection instance with data.
    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
    ]);

    // Create whole page view instance and render it.
    new InvoiceItemListPageView({
      collection: invoiceItemCollection,
      el: 'body'
    }).render();
  });

})(jQuery);
