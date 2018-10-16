(function($) {
  $.fn.previewArtifactCard = function(repeat) {
    function processElement($element, options) {
      repeat = repeat || true;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      var html = "<span>";
      html += "<i class='fa fa-globe d-icon d-icon-globe'></i>";
      html += "<span class='relative-time'></span>";
      html += "</span>";

      $element
        .html(html)
        .attr("title", 'titulo')
        .attr("data-tooltip", 'conteudo')
        .addClass("cooked-card");

      if (repeat) {
        this.timeout = setTimeout(function() {
          processElement($element, options);
        }, 10000);
      }
    }

    return this.each(function() {
      var $this = $(this);

      var options = {};
      //options.format = $this.attr("data-format");

      processElement($this, options);
    });
  };
})(jQuery);
