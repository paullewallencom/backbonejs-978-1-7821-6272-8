
(function($){

  $(document).ready(function () {

  	// Create global variable within jQuery object.
    $.tpl = {}

    $('script.template').each(function(index) {

      // Load template from DOM.
      $.tpl[$(this).attr('id')] = _.template($(this).html());

      // Remove template from DOM.
      $(this).remove();
    });
  });

})(jQuery);
