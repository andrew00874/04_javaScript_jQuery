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

// 문제 3: 프로그레스 바
// $("#startProgress").click(function () {
//   // HINT: .animate()로 width를 100%까지 변경하고
//   $("#progressBar").animate(
//     {
//       width: "100%",
//     },
//     2000,
//     function () {
//       $(this).text("100%");
//     }
//   );
// });

$("#startProgress").click(function () {
  // 1. 프로그레스 바 너비 애니메이션 실행
  $("#progressBar").animate(
    {
      width: "100%",
    },
    {
      duration: 2000, // 2초 동안 실행
    }
  );

  // 2. 숫자 카운팅 애니메이션 실행
  let counter = { progress: 0 }; // 시작 숫자
  $(counter).animate(
    {
      progress: 100, // 목표 숫자
    },
    {
      duration: 2000, // 너비 애니메이션과 동일한 시간 설정
      step: function (now) {
        // 애니메이션의 매 순간 'now' 변수에 현재 숫자가 전달됨
        // 소수점은 버리고 정수 부분만 텍스트로 표시
        $("#progressBar").text(Math.floor(now) + "%");
      },
    }
  );
});

$("#resetProgress").click(function () {
  // HINT: width를 0%로 리셋하고 텍스트도 "0%"로 변경
  $("#progressBar").css("width", "0%").text("0%");
});

// 문제 4: 3D 카드 플립
$("#flipCard").click(function () {
  // HINT: .toggleClass("flipped")를 사용해서 플립 효과
  $("#flipCard").toggleClass("flipped");
});

// 문제 5: 드롭다운 메뉴
/* 
.hover() : 마우스가 요소로 다가왔을 때 메서드(행동 == 기능)
.active(): 마우스로 요소를 선택했을 때 메서드(행동 == 기능)

$(선택자).hover(
  //기능 1번
  function(){
    마우스가 요소 위에 올라갔을 때 실행할 기능
  },
  //기능 2번
  function(){
    마우스가 요소 밖으로 나갔을 때 실행할 기능
  }
)
*/
$(".dropdown").hover(
  function () {
    // 마우스 올렸을 때
    // HINT: #dropdownMenu를 slideDown(200)
    $("#dropdownMenu").slideDown(200);
  },
  function () {
    // 마우스 벗어났을 때
    // HINT: #dropdownMenu를 slideUp(200)
    $("#dropdownMenu").slideUp(200);
  }
);
