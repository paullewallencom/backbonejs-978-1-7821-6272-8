
(function($){
  $(document).ready(function () {

    // Binding callback to an event.
    object1 = {};
    _.extend(object1, Backbone.Events);
    var hello = function(msg) {
      alert("Hello " + msg);     
    }
    object1.on("handshake", hello);
    object1.trigger("handshake", "world!");

    // Binding callback to an event.
    object1.off("handshake", hello);
    object1.trigger("handshake", "man!");

    // ListenTo example
    object2 = {
        hello:  function(msg) {
          alert("Hello " + msg);     
        }
    };
    _.extend(object2, Backbone.Events);
    object2.listenTo(object1, 'handshake', object2.hello);
    object1.trigger("handshake", "brother!");
  });
})(jQuery);
