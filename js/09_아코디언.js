$(".faq-item").click(function () {
  /* 
    순수 JS 에서는 
    querySelector() 를 사용했을 때는 맨 앞에 존재하는 tag나 id나 class를 선택
    querySelectorAll() 를 사용했을 때는 해당하는 모든 tag나 id나 class 담아놓은 상태
    jQuery $(선택자) -> 기본적으로 querySelectorAll() 상태
    페이지에 존재하는 모든 class="faq-answer" 를 선택한 상태
    $(this) = 현재 클릭된 .faq-item 을 의미 / JS 에서 현재 이벤트가 발생한 요소

    A.not(B) : 선택된 요소들에서 특정 요소들을 제외하는 메서드 (A에서 B를 제외하겠다.)

    $(".faq-answer")         -> 모든 FAQ 답변 선택
    .not($(this).children()) -> 현재 클릭된 항목은 제외하고
    .slideUp()               -> 모두 닫기 처리

    jQuery 는 JS를 사용하던 개발자가 JS를 사용하며 느낀 불편함을 해소하기 위해 만든 라이브러리
    불편함 최소화 목적 -> 다양한 방식으로 개발자가 원하는 기능을 동작할 수 있도록 무궁무진한 메서드 존재
    */
  $(".faq-answer").not($(this).children()).slideUp();
  $(this).children(".faq-answer").slideToggle();
});
