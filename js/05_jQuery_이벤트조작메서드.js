$(function () {
  $("#add").click(function () {
    $("#boxArea").append("<div class='box'>박스</div>");
  });

  $("#del").click(function () {
    $(".box:last").remove();
  });
});
