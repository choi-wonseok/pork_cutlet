$(document).ready(function () {
  $(document).scroll(function () {
    var maxHeight = $(document).height();
    var currentScroll = $(window).scrollTop() + $(window).height();

    if (maxHeight <= currentScroll + 100) {
      $.ajax({
        type: "get",
        url: "localhost/show",
        success: function (html, status) {
          // Append next contents
        },
      });
    }
  });
});
