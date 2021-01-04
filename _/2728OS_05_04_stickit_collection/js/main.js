(function($){

  // Define new model.
  var InvoiceModel = Backbone.Model.extend({

  });

  // Define new view.
  var InvoiceView = Backbone.View.extend({

    // Define class name of view element.
    className: 'invoice-item-view',

    // Bind HTML elements to the view model.
    bindings: {
      'select#items': {
        observe: 'status',

        // Define additional options for select element.
        selectOptions: {

          // You can return regular Backbone collection or an array of objects.
          collection: function() {
            return [{name: null, label: '- Status-'}, {name: 'in_progress', label: 'In Progress'}, {name: 'complete', label: 'Complete'}];
          },

          // Set the path to the label value for select options within the collection of objects.
          labelPath: 'label',

          // Define the path to the values for select options within the collection of objects.
          valuePath: 'name'
        }
      }
    },

    // Render view.
    render: function() {
      var html = 'Status: <select id="items"></select>';

      // Set html for the view element using jQuery.
      $(this.el).html(html);

      // Here binding occurs.
      this.stickit();

      return this;
    },
  });

  $(document).ready(function () {
    // Create model instance.
    var invoiceModel = new InvoiceModel({
      status: 'in_progress'
    });

    // Append views to the body element.
    $('body').append(new InvoiceView({ model: invoiceModel }).render().el);
  });

})(jQuery);
