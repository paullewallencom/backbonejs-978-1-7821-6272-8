(function($){

  // Define model and form schema.
  var InvoiceModel = Backbone.Model.extend({
    schema: {
      referenceNumber: { type: 'Text'},

      date: { type: 'Date'},

      status: {
        type: 'Select',
        options: [
          { val: 'draft', label: 'Draft' },
          { val: 'issued', label: 'Issued' },
          { val: 'paid', label: 'Paid' },
          { val: 'canceled', label: 'Canceled' }
        ]
      },

      paidDate: { type: 'Date' },
    }
  });

  var InvoiceForm = Backbone.Form.extend({

    // Override initialize method.
    initialize: function() {

      // Call parent method.
      InvoiceForm.__super__.initialize.apply(this, arguments);

      // Bind change status change event to the update callback.
      this.on('status:change', this.update);
    },

    // Update dependent fields based on other fields values. 
    update: function(form, editor) {
      if (form.fields.status.editor.getValue() == 'paid') {
        form.fields.paidDate.$el.show();
      }
      else {
        form.fields.paidDate.$el.hide();  
      }
    },

    // Override render method.
    render: function() {

      // Call parent method. 
      InvoiceForm.__super__.render.apply(this, arguments);

      // Esnure dependent are shown properly.
      this.update(this);

      return this;
    },
  });

  $(document).ready(function () {

    // Create form instance.
    var invoiceForm = new InvoiceForm({ model: new InvoiceModel() });

    // Append form to the HTML body.
    $('body').append(invoiceForm.render().el);
  });

})(jQuery);
