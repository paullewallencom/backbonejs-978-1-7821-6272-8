(function($){

  // Extend Backbone Model to support MongoDB Extended JSON. 
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

  // Create Polling collection
  var PollingCollection = Backbone.Collection.extend({
    polling: false,

    // Set default interval in seconds
    interval: 1,

    // Make all object methods to work from it's own context.
    initialize: function() {
      _.bindAll(this);
    },

    // Starts polling.
    startPolling: function(interval) {
      this.polling = true;

      if (interval) {
        this.interval = interval;
      }

      this.executePolling();
    },

    // Stops polling.
    stopPolling: function() {
      this.polling = false;
    },

    // Executs polling.
    executePolling: function() {
      this.fetch({ success: this.onFetch, error: this.onFetch });
    },

    // Runs recursion.
    onFetch: function() {
      setTimeout(this.executePolling, 1000 * this.interval)
    },
  });

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
  var InvoiceCollection = PollingCollection.extend({
    model: InvoiceModel,
    url: function() {
      return appConfig.baseURL + 'invoices' + appConfig.addURL;
    },
  });


  // Define new view to render a model.
  var InvoiceView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'li',

    // Define template.
    template: _.template('Invoice #<%= referenceNumber %>.'),

    // Render view.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    // Bind callback to the model events.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render, this);
      this.listenTo(this.model, 'destroy', this.remove, this);
    }
  });


  // Define new view to render a collection.
  var InvoiceListView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'ul',

    // Render view.
    render: function() {
      $(this.el).empty();

      // Append table  with a row.
      _.each(this.collection.models, function(model, key) {
        this.append(model);
      }, this);

      return this;
    },

    // Add invoice item row to the table.
    append: function(model) {
      $(this.el).append(
         new InvoiceView({ model: model }).render().el
      );
    },

    // Remove model from collection.
    remove: function(model) {
      model.trigger('destroy');
    },

    // Bind callbacks to the collection events.
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render, this);      
      this.listenTo(this.collection, 'add', this.append, this);
      this.listenTo(this.collection, 'remove', this.remove, this);
    },
  });


  $(document).ready(function () {

    // Create collection
    collection = new InvoiceCollection();

    // Create whole page view instance and render it.
    $('body').append('<h3>Invoices</h3>')
    $('body').append(new InvoiceListView({
      collection: collection,
    }).render().el);

    collection.startPolling();
  });

})(jQuery);
