$(function () {
  // 1. 확인 버튼 클릭 시 중복 체크
  $("#check").click(function () {
    const email = $("#childEmail").val();

    let userList = JSON.parse(localStorage.getItem("users") || "[]");

    /*
    .includes() : 문자열이나 배열에서 특정 값이 포함되어 있는지 확인하는 메서드
                filter 보다 더 많이 검색에서 사용

    .filter() : 조건에 맞는 모든 요소를 배열로 반환      결과가 목록, 배열
                검색 / 수정 할 때 많이 사용 
                filter 는 배열로 데이터를 가져오기 때문에 
                .length 로 값이 한개라도 존재하는가 비교해야함
    
    .some()   : 조건에 맞는 요소가 하나라도 있으면 true   결과가 BOOLEAN

    .find()  : 조건에 맞는 첫 번째 요소만 반환

    */
    const isDup = userList.some((u) => u.email === email);

    //if (isDup.length > 0) {  filter 를 사용할 때는 length와 비교 필요
    if (isDup) {
      // 리스트에 해당하는 값이 존재하면 이미 true 이므로 추가 조건 작성 X
      $("#result").html(
        `<span style="color : red;">이미 사용중인 이메일입니다.</span>`
      );
      $("#send").prop("disabled", true);
    } else {
      $("#result").html(
        `<span style="color : green;">사용 가능한 이메일입니다.</span>`
      );
      $("#send").prop("disabled", false);
    }
    // - 결과 메시지 표시
    // - 중복되지 않으면 "사용하기" 버튼 활성화
  });

  // 2. 사용하기 버튼 클릭
  $("#send").click(function () {
    // 순수자바스크립트와 jquery랑 언제든지 혼용해서 사용 가능 하다.
    // 순수자바스크립트조합                                = jquery조합
    //opener.document.getElementById("inputEmail").value = $("#childEmail").val();

    // jquery 조합                                        = jquery 조합
    opener.$("#inputEmail").val($("#childEmail").val());
    window.close();
  });
});


/*
open   : 열다 / 무언가를 여는 행위

메인 html 에서 
  window.open("팝업창.html")
메인 html 에서 팝업창 html을 열어준다.


opener  : 열어준 것 / 개방자 / 오픈, 주최한 자

팝업창 html 을 열어준 메인 html 을 의미

opener.document.querySelector("선택자")
 opener          .document.querySelector("선택자")
나를열어준메인html.문서에서 .선택자에 해당하는 태그




opener.document.querySelector("#inputEmail").value           = document.querySelector("#childEmail").value
나를 열어준 signup.html 에서  아이디가 inputEmail 해당하는 값에 ↑ 현재emailCheck.html에서  childEmail 내에 작성한 값을
                                                             │
                                                             │
                                                       value 로 전달하겠다.
*/