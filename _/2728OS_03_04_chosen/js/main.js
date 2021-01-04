(function($){
  // Define new model object.
  var IndividualContactModel = Backbone.Model.extend({
    name: function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }
  });

  // Define new model object.
  var OrganizationContactModel = Backbone.Model.extend({
    name: function() {
      return this.get('businessName') + ', ' + this.get('businessType');
    }
  });

  // Define new collection object.
  var ContactCollection = Backbone.Collection.extend({
    model: {

      // Pass chosen properties.
      chosen: {

        // Attribute that should contain model type.
        attr: 'type',

        // Default model class.
        defaults: IndividualContactModel,

        // Mappting attribute values to model classes.
        map: {
          individual: IndividualContactModel,
          organization: OrganizationContactModel
        }
      }
    }
  });

  $(document).ready(function () {
    //==========================================================================
    // Mapping property demo.

    var contactCollection = new ContactCollection([
      {
        firstName: 'John',
        lastName: 'Smith',
        type: 'individual'
      },
      {
        businessName: 'North American Veeblefetzer',
        businessType: 'LLC',
        type: 'organization'
      }
     ]);

     contactCollection.at(0) instanceof IndividualContactModel; //true
     contactCollection.at(0).name(); // John Smith

     contactCollection.at(1) instanceof OrganizationContactModel; //true
     contactCollection.at(1).name(); // North American Veeblefetzer, LLC     
  });
  
  
})(jQuery);
