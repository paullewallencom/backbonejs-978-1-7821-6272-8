(function($){

  // Define new model object,
  var InvoiceModel = Backbone.Model.extend({

  });

  // Define new collection object
  var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel
  });

  // Define new view to render a model.
  var InvoiceView = Backbone.View.extend({
    tagName: 'li',

    render: function() {
      this.$el.html(
        'Invoice #' + this.model.get('referenceNumber') + ' - ' +
        '<a href="#invoice/' + this.model.cid + '">view details</a>'
      );

      return this;
    }
  });

  // Define new view to render a model.
  var InvoiceListView = Backbone.View.extend({
    render: function () {
      this.$el.html('<h1>Displaying all invoices</h1><ul></ul>');

      this.$('ul').append(
        _.map(this.collection.models, function(model, key) {
          return new InvoiceView({ model: model }).render().el;
        })
      );

      return this;
    }
  });

  // Define new view to render a collection.
  var InvoicePageView = Backbone.View.extend({
    render: function () {
      this.$el.html('<h1>Displaying invoice #' + this.model.get('referenceNumber') + '</h1>');
      this.$el.append('<p><a href="#invoice">View all invoices</a></p>');

      return this;
    }
  });


  // Define router object.
  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'invoiceList',
      'invoice': 'invoiceList',
      'invoice/:id': 'invoicePage',
    },

    // Initialize function run when Router object instance is created.
    initialize: function() {

      //  Create collection
      this.invoiceCollection = new InvoiceCollection([
        { referenceNumber: 1234},
        { referenceNumber: 2345},
        { referenceNumber: 3456},
        { referenceNumber: 4567}
      ]);
    },

    // Shows list of invoices.
    invoiceList: function() {
      this.changeView(new InvoiceListView({
        collection: this.invoiceCollection
      }));
    },

    // Shows invoice page.
    invoicePage: function(id) {
      this.changeView(new InvoicePageView({
        model: this.invoiceCollection.get(id)
      }));
    },

    // Changes page
    changeView: function(view) {
      if (this.currentView) {
        if (this.currentView == view) {
          return;
        }

        this.currentView.remove();
      }

      $('body').append(view.render().el);

      this.currentView = view;
    }
  });


  $(document).ready(function () {
    new Workspace();
    Backbone.history.start();
  });

})(jQuery);
