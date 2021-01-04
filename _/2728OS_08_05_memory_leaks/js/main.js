  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({
    calculateAmount: function() {
      return this.get('price') * this.get('quantity');
    },

    constructor: function InvoiceItemModel() {
      InvoiceItemModel.__super__.constructor.apply(this, arguments);
    }
  });


  // Define new collection object
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel,

    constructor: function InvoiceItemCollection() {
      InvoiceItemCollection.__super__.constructor.apply(this, arguments);
    }
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
      // this.model.on('destroy', this.destroy, this);
      this.listenTo(this.model, 'destroy', this.destroy, this);
    },

    destroy: function() {
      this.remove();
    },

    constructor: function InvoiceItemView() {
      InvoiceItemView.__super__.constructor.apply(this, arguments);
    }
  });


  // Define new view to render a collection.
  var InvoiceItemTableView = Backbone.View.extend({

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
      // this.collection.on('add', this.append, this);
      this.listenTo(this.collection, 'add', this.append, this);
    },

    // Add invoice item row to the table.
    append: function(model) {
      var view = new InvoiceItemView({ model: model });

      $(this.el).append(
        view.render().el
      );

      view.listenTo(this, 'clear', this.remove);
    },

    constructor: function InvoiceItemTableView() {
      return InvoiceItemTableView.__super__.constructor.apply(this, arguments);
    },

    remove: function() {
      this.trigger('clear');
      return InvoiceItemTableView.__super__.remove.apply(this, arguments);
    }
  });

  // Define view with add new item button.
  var ControlsView = Backbone.View.extend({
    render: function() {
      var html = '<br><input id="addModel" type="button" value="Add model">' +
        ' <input id="removeModel" type="button" value="Remove model">' +
        ' <input id="removeTableView" type="button" value="Remove table view">';

      $(this.el).html(html);

      return this;
    },


    // Handle HTML events.
    events: {
      'click #addModel': 'addNewInvoiceItemModel',
      'click #removeModel': 'removeInvoiceItemModel',
      'click #removeTableView': 'removeInvoiceItemTableView',
    },

    // Add button handler.
    addNewInvoiceItemModel: function() {
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
    removeInvoiceItemModel: function() {
      var position = prompt('Enter position of item to remove', '');

      model = this.collection.at(position);
      model.destroy();
    },

    removeInvoiceItemTableView: function() {
      this.options.invoiceItemTableView.remove();
      delete this.options.invoiceItemTableView;
    },

    constructor: function ControlsView() {
      ControlsView.__super__.constructor.apply(this, arguments);
    }
  });

  // Create and initialize collection instance with data.
  var invoiceItemCollection = new InvoiceItemCollection([
    { description: 'Wooden Toy House', price: 22, quantity: 3 },
    { description: 'Farm Animal Set', price: 17, quantity: 1 },
  ]);

  invoiceItemTableView = new InvoiceItemTableView({ collection: invoiceItemCollection });
  $('body').append(invoiceItemTableView.render().el);
  $('body').append(new ControlsView({
    collection: invoiceItemCollection,
    invoiceItemTableView: invoiceItemTableView
  }).render().el);