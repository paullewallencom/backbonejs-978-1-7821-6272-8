
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

    // Define tag name.
    tagName: 'tr',

    // Define default view mode.
    renderCallback: 'renderViewMode',

    // Render the view.
    render: function() {
      this[this.renderCallback]();

      return this;
    },

    // Render the view in view mode.
    renderViewMode: function() {
     $(this.el).html(_.map([
        this.model.get('quantity'),
        this.model.get('description'),
        this.model.get('price'),
        this.model.calculateAmount(),
        '<button class="edit">Edit</button>'
      ], function(val, key){
        return '<td>' + val + '</td>'
      }));
    },

    // Render the view in edit mode.
    renderEditMode: function() {
      $(this.el).html(_.map([
        '<input class="quantity" value="' + this.model.get('quantity') + '">',
        '<input class="description" value="' + this.model.get('description') + '">',
        '<input class="price" value="' + this.model.get('price') + '">',
        this.model.calculateAmount(),
        '<button class="save">Save</button><button class="cancel">Cancel</button>'
      ], function(val, key){
        return '<td>' + val + '</td>'
      }));
    },

    // Map DOM events to the handlers.
    events: {
      'click button.edit': 'edit',
      'click button.save': 'save',
      'click button.cancel': 'cancel',
    },

    // Edit button click handler.
    edit: function() {
      this.renderCallback = 'renderEditMode';

      this.render();
    },

    // Save button click handler.
    save: function() {
      this.model.set({
        quantity: $(this.el).find('input.quantity').val(),
        description: $(this.el).find('input.description').val(),
        price: $(this.el).find('input.price').val(),
      });

      this.renderCallback = 'renderViewMode';

      this.render();
    },

    // Cancel button click handler.
    cancel: function() {
      this.renderCallback = 'renderViewMode';

      this.render();
    }
  });


  // Define new view to render a collection.
  var InvoiceItemListView = Backbone.View.extend({

    // Define tag name.
    tagName: 'table',
    className: 'invoice-item-view',

    // Render view.
    render: function() {

      $(this.el).empty();

      $(this.el).append(
        _.map(['Quantity', 'Description', 'Price', 'Total', 'Operations'], function(val, key){
          return '<th>' + val + '</th>'
        })
      );

      // Iterate through a collection.
      _.each(this.collection.models, function(model, index, list) {

        // Append collection view element with mode view elements.
        $(this.el).append(new InvoiceItemView({ model: model }).render().el);
      }, this);

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
