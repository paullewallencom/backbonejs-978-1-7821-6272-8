(function($){

  // Define new view.
  var InvoiceItemView = Backbone.View.extend({
    
    // HTML element name, where to render a view.
    el: 'body',

    // Initialize view object values.
    initialize: function() {
      this.html = 'Description: Wooden Toy House. Price: $22. Quantity: 3.'
    },

    // Render view.
    render: function() {

      // Set html for the view element using jQuery.
      $(this.el).html(this.html);
    }
  });


  // Define new view.
  var InvoiceItemView2 = Backbone.View.extend({
    
    // Set tag name and it's atributes.
    tagName: 'p',
    className: 'item',
    attributes: {
      'align': 'left'
    },

    // Initialize view object values.
    initialize: function() {
      this.html = 'Farm Animal Set. Price: $17. Quantity: 1.'
    },

    // Render view.
    render: function() {

      // Set html for the view element using jQuery.
      $(this.el).html(this.html);
    }
  });

  $(document).ready(function () {
    //==========================================================================
    // View example.

    // Create new view instance.
    var invoiceItemView = new InvoiceItemView();

    // Render view manually.
    invoiceItemView.render();
    
    //==========================================================================
    // Another view example.

    // Create new view instance.
    var invoiceItemView2 = new InvoiceItemView2();

    invoiceItemView2.el; // <p align="left" class="item"></p>

    // Render view.
    invoiceItemView2.render();
    
    // Add rendered view to a body.
    $('body').append(invoiceItemView2.el);
  });

})(jQuery);
