(function($){

  // Define configuration.
  var appConfig = {
    baseURL: 'https://api.mongolab.com/api/1/databases/billing-app/collections/',
    addURL: '?apiKey=yGobEjzhT76Pjo9RaOLGfA89xCJXegpl'
  }

  //_.extend(Backbone.Model.prototype, Backbone.MongoModel.mixin);

  // Define invoice model.
  var InvoiceModel = Backbone.MongoModel.extend({
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

  $(document).ready(function () {
    var collection = new InvoiceCollection();

    // Update collection.
    collection.fetch({ success: function(collection) {
      //console.log(collection);
    }});
  });

})(jQuery);
