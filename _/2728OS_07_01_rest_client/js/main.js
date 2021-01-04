(function($){

  // Converting MongoDB Extended JSON into regular one.
  Backbone.Model.prototype.parse = function(resp, options) {
    if (_.isObject(resp._id))  {
      resp.id = resp._id.$oid;
      delete resp._id;
    }
    return resp;
  }
  Backbone.Model.prototype.toJSON = function() {
    var attrs = _.omit(this.attributes, 'id');
    if (!_.isUndefined(this.id))  {
      attrs._id = { $oid: this.id };
    }
    return attrs;
  }

  // Define configuration.
  var appConfig = {
    baseURL: 'https://api.mongolab.com/api/1/databases/billing-app/collections/',
    addURL: '?apiKey=yGobEjzhT76Pjo9RaOLGfA89xCJXegpl'
  }

  // Define invoice model.
  var InvoiceModel = Backbone.Model.extend({
    url: function() {
      if (_.isUndefined(this.id)) {
        return appConfig.baseURL + 'invoices' + appConfig.addURL;
      }
      else {
        return appConfig.baseURL + 'invoices/' + encodeURIComponent(this.id) + appConfig.addURL;
      }
    },
  });

  // Define invoice collection.
  var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel,

    url: function() {
      return appConfig.baseURL + 'invoices' + appConfig.addURL;
    },
  });


  // Define invoice list pane.
  var InvoiceListPane = Backbone.Layout.extend({

    // Returns selector for template.
    template: '#invoice-list-pane',

    // Set selector for template.
    serialize: function() {
      return { invoices: _.chain(this.collection.models) };
    },

    // Bind callbacks to collection event.
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
    }
  });


  // Define invoice pane.
  var InvoicePane = Backbone.Layout.extend({

    // Set selector for template.
    template: '#invoice-pane',

    // Returns data for template.
    serialize: function() {
      return { invoice: this.model };
    },

    // Bind callbacks to model events.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });


  // Define invoice pane.
  var EditInvoicePane = Backbone.Layout.extend({

    // Set selector for template.
    template: '#edit-invoice-pane',

    // Returns data for template.
    serialize: function() {

      // Create new model if no model is given.
      return { invoice:  _.isEmpty(this.model) ? new InvoiceModel() : this.model };
    },

    // Bind callbacks form events.
    events: {
      "click .submit": "save"
    },

    // Save model
    save: function() {
      var data = {
        referenceNumber: this.$el.find('.referenceNumber').val(),
        date: this.$el.find('.date').val(),
        status: this.$el.find('.status').val(),
      };

      var success = function(model, response, options) {
        window.workspace.navigate('#invoice/' + model.id, { trigger: true });
      };

      // Run appropriate method.
      if (_.isEmpty(this.model)) {
        this.collection.create(data, {success: success});
      }
      else {
        this.model.save(data, { success: success});
      }
    }
  });


  // Define invoice pane.
  var DeleteInvoicePane = Backbone.Layout.extend({

    // Set selector for template.
    template: '#delete-invoice-pane',

    // Returns data for template.
    serialize: function() {
      return { invoice: this.model };
    },

    // Bind callbacks to form events.
    events: {
      "click .submit": "delete"
    },

    // Delete model.
    delete: function() {
      this.model.destroy({ success: function(model, response) {
        window.workspace.navigate('#invoice', { trigger: true });
      }});
    }
  });

  // Define router object.
  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'invoicePage',
      'invoice': 'invoicePage',
      'invoice/add': 'addInvoicePage',
      'invoice/:id/edit': 'editInvoicePage',
      'invoice/:id/delete': 'deleteInvoicePage',
      'invoice/:id': 'invoicePage',
    },

    // Initialize function run when Router object instance is created.
    initialize: function() {

      // Create collection.
      this.collection = new InvoiceCollection();

      // Create new layout.
      this.layout = new Backbone.Layout({
          // Attach the layout to the main container.
          el: 'body',

          // Set template selector.
          template: '#layout',

          // Declaratively bind a nested View to the layout.
          views: {
            '#first-pane': new InvoiceListPane({ collection: this.collection }),
          },
      });

      // Render whole layout for the first time.
      this.layout.render();
    },

    // Page callbacks.
    invoicePage: function(id) {
      this.switchPane('InvoicePane', id);
    },
    addInvoicePage: function() {
      this.switchPane('EditInvoicePane', null);
    },
    editInvoicePage: function(id) {
      this.switchPane('EditInvoicePane', id);
    },
    deleteInvoicePage: function(id) {
      this.switchPane('DeleteInvoicePane', id);
    },

    // Switch second pane.
    switchPane: function(pane_name, id) {

      // Define panes array. This will allow use to create new object from string.
      var panes = {
        InvoicePane: InvoicePane,
        EditInvoicePane: EditInvoicePane,
        DeleteInvoicePane: DeleteInvoicePane
      };

      // Update collection.
      this.collection.fetch({ success: function(collection) {

        // Get model by id or take first model from collection.
        var model = _.isUndefined(id) ? collection.at(0) : collection.get(id);

        // Create new pane and pass model and collection.
        pane = new panes[pane_name] ({ model: model, collection: collection });

        // Render pane.
        pane.render();

        // Switch views.
        window.workspace.layout.removeView('#second-pane');
        window.workspace.layout.setView('#second-pane', pane);

      }, reset: true, data: {page: 2} });
    },
  });

  $(document).ready(function () {

    // Create the workspace.
    window.workspace = new Workspace();

    // Start the application.
    Backbone.history.start();
  });

})(jQuery);
