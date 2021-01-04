(function($){

  // Define new model.
  var InvoiceModel = Backbone.Model.extend({
    
    // Define workflow states.
    workflow: {

      // Define initial state.
      initial: 'draft',

      // Define state transitions.
      events: [
        { name: 'issue', from: 'draft', to: 'issued' },
        { name: 'payout', from: 'issued', to: 'paid' },
        { name: 'cancel', from: 'draft', to: 'canceled' },
        { name: 'cancel', from: 'issued', to: 'canceled' },
      ]
    },

    initialize: function() {
      // Extend model instance with workflow instance.
      // Set attribute name which contains status.
      _.extend(this, new Backbone.Workflow(this, {attrName: 'status'}));

      // Bind reaction on event when status changes from draft to any.
      this.bind('transition:from:draft', function() {
        this.set('createdDate', new Date().toISOString());
      });

      // Bind reaction on event when status changes from any to paid.
      this.bind('transition:to:paid', function() {
        this.set('payoutDate', new Date().toISOString());
      });
    }
  });
  

  // Create new model.
  var HumanModel = Backbone.Model.extend({
    
    // Define first workflow.
    mood_workflow: {

      // Define initial state.
      initial: 'happy',

      // Define state transitions.
      events: [
        { name: 'disappoint', from: 'happy', to: 'said' },
        { name: 'gladden', from: 'said', to: 'happy' },
      ]
    },

    // Define second workflow.
    state_workflow: {

      // Define initial state.
      initial: 'wake',

      // Define state transitions.
      events: [
        { name: 'dropoff', from: 'wake', to: 'dream' },
        { name: 'wakeup', from: 'dream', to: 'wake' },
      ]
    },

    initialize: function() {
      // Extend model instance with workflow instance.
      // Define multuple workflows
      _.extend(this, new Backbone.Workflow(this, {}, [
        { name: 'mood_workflow', attrName: 'mood_workflow_state' },
        { name: 'state_workflow', attrName: 'state_workflow_sate' }
      ]));
      
      // Bind reaction for the mood_workflow
      this.bind('transition:from:mood_workflow:happy', function() {
        //
      });

      // Bind reaction for the state_workflow_sate
      this.bind('transition:to:state_workflow_sate:dream', function() {
        //
      });
    }
  });

  $(document).ready(function () {
    //==========================================================================
    // Change workflow example.
    var invoiceModel = new InvoiceModel();
    invoiceModel.get('status'); // draft

    invoiceModel.triggerEvent('issue');
    invoiceModel.get('status'); // issued

    invoiceModel.triggerEvent('payout');
    invoiceModel.get('status') // paid


    //==========================================================================
    // Bound event triggering example.
    var invoiceModel = new InvoiceModel();
    invoiceModel.get('status'); // draft

    invoiceModel.triggerEvent('issue');
    invoiceModel.get('status'); // issued
    invoiceModel.get('createdDate'); // 2012-05-01T12:00:10.234Z

    invoiceModel.triggerEvent('payout');
    invoiceModel.get('status') // paid
    invoiceModel.get('payoutDate'); // 2012-05-01T12:00:10.238Z


    //==========================================================================
    // Multuple workflows example
    var humanModel = new HumanModel();

    humanModel.get('mood_workflow_state'); // happy
    humanModel.get('state_workflow_sate'); // wake

    humanModel.triggerEvent('disappoint', 'mood_workflow');
    humanModel.triggerEvent('dropoff', 'state_workflow');

    humanModel.get('mood_workflow_state'); // said
    humanModel.get('state_workflow_sate'); // dream
  });
})(jQuery);
