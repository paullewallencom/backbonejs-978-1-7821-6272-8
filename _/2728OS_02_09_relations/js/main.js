(function($){
  //==========================================================================
  // One-to-one relationship demo.

  // Define new model object.
  var UserModel = Backbone.RelationalModel.extend({

  });

  // Define new model object.
  var BuyerModel = Backbone.RelationalModel.extend({

    // Define one-to-one relationship.
    relations: [
      {
        // Relationship type
        type: Backbone.HasOne,

        // Relationship key in BuyerModel.
        key: 'user',

        // Related model.
        relatedModel: UserModel,

        // Define reverse relationship.
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'buyer'
        }
      }
    ]
  });


  $(document).ready(function () {
    //==========================================================================
    // One-to-one relationship demo.

    var userModel1 = new UserModel({
      login: 'jsmith',
      email: 'jsmith@example.com'
    });

    var buyerModel1 = new BuyerModel({
      firstName: 'John',
      lastName: 'Smith',
      user: userModel1
    });

    buyerModel1.get('user').get('email'); // jsmith@example.com
    userModel1.get('buyer').get('lastName'); // Smith


    //==========================================================================
    // One-to-one relationship another demo.

    var buyerModel2 = new BuyerModel({
      id: 'b1',
      firstName: 'John',
      lastName: 'Smith',
      user: {
        login: 'jsmith',
        email: 'jsmith@example.com'
      }
    });

    buyerModel2.get('user').get('email'); // jsmith@example.com
    buyerModel2.get('user').get('buyer').get('lastName'); // Smith

  });
})(jQuery);
