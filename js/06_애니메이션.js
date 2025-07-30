$(function () {
  $("#openModal").click(function () {
    // HINT: #modalOverlay를 fadeIn(300)으로 나타내세요
    $("#modalOverlay").fadeIn(300);
  });

  $("#closeModal").click(function () {
    // HINT: #modalOverlay를 fadeOut(300)으로 사라지게 하세요
    $("#modalOverlay").fadeOut(300);
  });

  $("#modalOverlay").click(function (e) {
    // HINT: e.target이 자기 자신일 때만 닫기 (이벤트 버블링 방지)
    if (e.target === this) {
      $(this).fadeOut(300);
    }
  });
});

// 문제 2: 탭 메뉴
$(".tab-btn").click(function () {
  // HINT: data-tab 속성값을 가져와서
  const targetTab = $(this).data("tab");

  $(".tab-btn").removeClass("active");
  $(this).addClass("active");
  // HINT: 모든 탭 버튼에서 active 클래스 제거 후 현재 클릭한 버튼에 추가
  $(".tab-content").slideUp();
  $("#" + targetTab).slideDown();
  // HINT: 모든 .tab-content를 slideUp 하고, 해당 탭만 slideDown
});
