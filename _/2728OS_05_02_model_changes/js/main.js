(function($){
  $(document).ready(function () {

    // Create new model object instance.
    var model = new Backbone.Model({
      firstName: 'John',
      lastName: 'Doe',
      age: 20,
    });

    // Bind function to the change event.
    model.on('change', function(model) {

      // Check if the specific attribute has been changed since last change event.
      model.hasChanged("age"); // true
      model.hasChanged("firstName"); // false

      // Get changed attributes hash.
      model.changedAttributes(); // Object {age: 21}

      // Get value of previous attributes.
      model.previous('age'); // 20

      // Get hash of previous attributes.
      model.previousAttributes(); // Object {firstName: "John", lastName: "Doe", age: 20}

      console.log('1');
    });

    // Change model attributes.
    model.set('age', 21);

    // Using silent mode.
    model.set('age', 22, {silent: true});
    model.set({ age: 25}, {silent: true});
  });
})(jQuery);
