//1번 : HTML 문서가 모두 준비되면, 중괄호 안에 코드를 실행하겠다.
$(function () {
  //2번 : id가 btn인 요소를 클릭했을 때, 실행될 함수를 정의하겠다.
  $("#btn").click(() => {
    //3번 : 텍스트를 변경 -> id가 title인 요소의 텍스트를 변경하겠따.
    $("#title").text("버튼이 클릭되었습니다!");
    //4번 : id가 description인 요소를 0.5초간 숨겼다
    // 다시 0.5초간 나타나는 메서드를 사용
    $("#description").fadeOut(500).fadeIn(500);
    //5번 : id가 box인 요소의 highlight요소를 추가하거나 제거하겠다.
    $("#box").toggleClass("highlight");
  });
});
