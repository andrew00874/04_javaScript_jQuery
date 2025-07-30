// 사용자 샘플 데이터
// DB -> JAVA -> 프론트엔드로 데이터를 가져오거나
// 프론트엔드 -> Java -> DB 에서 소비자가 요청한 데이터가 존재하는지 확인
// 존재한다면 DB -> Java -> 프론트엔드로 데이터를 전달 / 없으면 전달할 것이 없음
$("#logout_fn").hide();

$(function () {
  // 로그인 버튼을 클릭했을 때 ajax를 작동!
  $("#login_fn").click(function (e) {
    // 1. 버튼 제출 방지
    e.preventDefault(); //submit 잠시 멈춤 -> 정규식이나 비밀번호 아이디 일치하는지 확인하고 제출
    const username = $("#userId").val();
    const userPw = $("#userPw").val();
    $.ajax({
      url: "../json/data.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("성공적으로 json에서 가져온 데이터 확인하기 : ", data);
        /*
        javascript 에서 [] . 으로 데이터를 주고 받을 떄의 차이
        
        users[username] = username의 변수의 값이 admin인 속성을 찾을 때 사용
        -> users 안에 username 이라는 변수 이름으로 가져온 값이 존재하는가??

        users.username = 속성명이 고정된 문자열 일 때 사용
        -> users 안에 username이라는 id가 존재하는가?
        
        예를 들어 username.value 값으로 admin 이 들어왔을 경우
        users[abc] -> users[admin] 으로 변경되어 admin과 일치하는 아이디를 검색
        */

        /*         
        const user = data.users[username];
        if (user && user.password == userPw) {
          $("#result").html(
            `로그인성공! 환영합니다. ${data.users[username].name}님.`
          );
          $("#result").css("borderColor", "green");
          $("#login_fn").hide();
          $("#logout_fn").show();
        } else {
          $("#result").html("일치하는 아이디나 비밀번호가 없습니다.");
          $("#result").css("borderColor", "red");
        }
      } */
        const user = data.users[username];
        if (user) {
          if (user.password == userPw) {
            $("#result").html(
              `로그인성공! 환영합니다. ${data.users[username].name}님.`
            );
            $("#result").css("borderColor", "green");
            $("#login_fn").hide();
            $("#logout_fn").show();
          } else {
            $("#result").html("일치하는 비밀번호가 없습니다.");
            $("#result").css("borderColor", "red");
          }
        } else {
          $("#result").html("일치하는 아이디가 없습니다.");
          $("#result").css("borderColor", "red");
        }
      },
      error: function () {
        alert("데이터 가져오는데 실패했습니다.");
      },
    });
  });
  $("#logout_fn").click(function (e) {
    //로그아웃을 진행할 경우
    //로그인기능 show보여주기
    //로그아웃기능 hide숨기기 설정
    e.preventDefault();
    $("#login_fn").show();
    $("#logout_fn").hide();
    $("#result").html("로그아웃이 완료되었습니다!");
  });
});
