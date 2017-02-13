//IIFE Statement Containing Viewport Object
(function($,viewport) {
  $(document).ready(function() {
    // On every load & resize, run commands to ensure responsive layout
    $(window).on("load resize", function() {
      // Change .photo-label width to img.width()
      $(".photo-label").css("width",($("img",".square").width() + "px"));

      if(viewport.is("xs")) {
        // Change font size on xs
        $(".photo-label").css("font-size","25px");
      }
      else {
        // Undo xs styles
        $(".photo-label").css("font-size","30px");
      }
      // For xs and sm, make labels visible & reorder
      if(viewport.is("<md")) {
        $("#family-history").remove().insertBefore($("#john"));
        $(".photo-label").css("opacity", ".7");
        $(".square").hover(
          function(){
            $(".photo-label", this).css("opacity",".7");
          },
          function(){
            $(".photo-label", this).css("opacity",".7");
          });
      }
      else {
        // For md and lg, make labels visible on hover only & reorder
        $("#family-history").remove().insertBefore($("#contact"));
        $(".photo-label").css("opacity", "0");
        $(".square").hover(
        function(){
          $(".photo-label", this).css("opacity",".7");
        },
        function(){
          $(".photo-label", this).css("opacity","0");
        });
      }
    })
  });
})(jQuery,ResponsiveBootstrapToolkit);

// ekko Lightbox JS
$(document).ready(function() {
  $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
});
