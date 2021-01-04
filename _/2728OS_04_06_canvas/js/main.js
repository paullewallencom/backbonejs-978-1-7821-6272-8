
(function($){
  // Define new model.
  var InvoiceItemModel = Backbone.Model.extend({
    calculateAmount: function() {
      return this.get('price') * this.get('quantity');
    }
  });


  // Define new collection object.
  var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
  });

  // Define new view to render a model.
  var InvoiceItemView = Backbone.View.extend({

    // Initiaize default values
    initialize: function() {
      // Set box size
      this.w = 100;
      this.h = 75;

      // Set random position
      this.x = Math.random() * (this.options.canvasW - this.w);
      this.y = Math.random() * (this.options.canvasH - this.h);
    },

    // Render the view.
    render: function() {

      // Get canvas context from parameters.
      ctx = this.options.ctx;

      // Draw transparent box
      ctx.fillStyle = '#FF9000';
      ctx.globalAlpha = 0.1;
      ctx.fillRect(this.x, this.y, this.w, this.h);

      // Stroke the box
      ctx.strokeStyle = '#FF9900';
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.w, this.h);

      // Output text in the box
      ctx.fillStyle = '#009966';
      ctx.font = 'bold 12px Arial';
      var textX = this.x + 4,
          textY = this.y + 4,
          textMaxW = this.w - 8,
          lineHeight = 12;
      ctx.fillText(this.model.get('description'), textX, textY + lineHeight, textMaxW);
      ctx.fillText('Price: $' + this.model.get('price'), textX, textY + lineHeight*3, textMaxW);
      ctx.fillText('Quantity: ' + this.model.get('quantity'), textX, textY + lineHeight*4, textMaxW);
      ctx.fillText('Total: $' + this.model.calculateAmount(), textX, textY + lineHeight*5, textMaxW);

      return this;
    },
  });


  // Define new view to render a collection.
  var InvoiceItemListView = Backbone.View.extend({

    // Set a canvas as element tag name and define it's size.
    tagName: 'canvas',
    attributes: {
      width: 400,
      height: 200
    },

    // Render view.
    render: function() {

      // Get canvas context and it's size.
      var ctx = this.el.getContext("2d")
          canvasW = this.el.width,
          canvasH = this.el.height;

      // Clear canvas.
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Iterate through models in collection and render them.
      this.collection.each(function(model) {
        new InvoiceItemView({
          model: model,

          // Pass canvas context and it's size.
          ctx: ctx,
          canvasW: canvasW,
          canvasH: canvasH
        }).render();
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
