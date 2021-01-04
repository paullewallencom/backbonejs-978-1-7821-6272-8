(function($){

  // Define invoice model.
  var InvoiceModel = Backbone.Model.extend({

  });

  // Define invoice collection.
  var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel
  });

  var TableView = Backbone.View.extend({
    initialize: function(columns, collection) {
      this.collection = collection;

      // Add a column with checboxes.
      columns = [{
        name: "",
        cell: "select-row",
        headerCell: "select-all",
      }].concat(columns)

      // Initialize new grid instance.
      this.grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection
      });

      this.clientSideFilter = new Backgrid.Extension.ClientSideFilter({
        collection: collection,
        placeholder: "Search by Ref #",
        fields: ['referenceNumber'],
        wait: 150
      });
    },

    // Render grid and add delete button.
    render: function() {
      this.$el.html(this.grid.render().$el);

      this.$el.append('<button class="delete">Delete</button>');

      this.$el.prepend(this.clientSideFilter.render().$el);

      return this;
    },

    // Assign event callbacks.
    events: {
      'click button.delete': 'delete'
    },

    // Delete callback.
    delete: function() {
      _.each(this.grid.getSelectedModels(), function (model) {
        model.destroy();
      });
    }
  });

  $(document).ready(function () {

    // Create a collection instance.
    var invoiceCollection = new InvoiceCollection();

    // Define grid column settings
    var columns = [
      {
        name: "referenceNumber",
        label: "Ref #",
        editable: false,
        cell: 'string'
      },
      {
        name: "date",
        label: "Date",
        cell: "date"
      },
      {
        name: "status",
        label: "Status",
        cell: Backgrid.SelectCell.extend({
          optionValues: [
            ['Draft', 'draft'],
            ['Issued', 'issued']
          ]
        })
      }
    ];

    // Add models into a collection.
    invoiceCollection.add([
      {
        referenceNumber: 'AB 12345',
        date: new Date().toISOString(),
        status: 'draft'
      },
      {
        referenceNumber: 'ZX 98765',
        date: new Date().toISOString(),
        status: 'issued'
      },
    ]);

    $('body').append(new TableView(columns, invoiceCollection).render().$el);

    // Start the application.
    Backbone.history.start();
  });

})(jQuery);
