(function($){

  var InvoiceListView = Backbone.View.extend({
    render: function () {
      $(this.el).html('Displaying list of invoices.');
    }
  });


  var InvoicePageView = Backbone.View.extend({
    render: function () {
      $(this.el).html('Displaying invoice #' + this.id + '.');
    }
  });


  var Workspace = Backbone.Router.extend({
    routes: {
      // Default path.
      '': 'invoiceList',

      // Usage of static path.
      'invoice': 'invoiceList',

      // Usage of fragment parameter.
      'invoice/:id': 'invoicePage',

      // Usage of fragment parameters.
      'help/:topic/page:page': 'helpPage',

      // Usage of splat parameter.
      'download/*path': 'downloadPage'
    },

    // Shows list of invoices.
    invoiceList: function() {
      var invoiceListView = new InvoiceListView({
        el: 'body'
      });
      invoiceListView.render();
    },

    // Shows invoice page.
    invoicePage: function(id) {
      var invoicePageView = new InvoicePageView({
        el: 'body',

        // Pass parameter to the view.
        id: id
      });
      invoicePageView.render();
    },

    // Shows help page.
    helpPage: function(topic, page) {
      console.log(topic);
      console.log(page);
      // ...
    },

    // Performs file download.
    downloadPage: function(path) {
      console.log(path);
      // ...
    }
  });


  $(document).ready(function () {
    new Workspace();
    Backbone.history.start();
  });

})(jQuery);
