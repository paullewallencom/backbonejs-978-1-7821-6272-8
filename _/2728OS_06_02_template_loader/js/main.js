(function($){

  $(document).ready(function () {

    // Define new model.
    var InvoiceItemModel = Backbone.Model.extend({

    });

    // Define new collection object
    var InvoiceItemCollection = Backbone.Collection.extend({
      model: InvoiceItemModel
    });

    // Define new view.
    var InvoiceItemListView = Backbone.View.extend({

      // HTML element name, where to render a view.
      tagName: 'ul',

      // Render view.
      render: function() {

        // Render template and set html for the view element using jQuery.
        this.$el.html($.tpl['items']({
          items: this.collection.toJSON(),
          itemTemplate: $.tpl['item']
        }));

        return this;
      }
    });

    // Create and initialize collection instance with data.
    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);

    // Create view instance, render it and set as body value.
    $('body').html(new InvoiceItemListView({ collection: invoiceItemCollection }).render().el);
  });

})(jQuery);
