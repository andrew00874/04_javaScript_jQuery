$("#logout_fn").hide();

$(function () {
  $("#login_fn").click(function (e) {
    e.preventDefault(); //submit 잠시 멈춤 -> 정규식이나 비밀번호 아이디 일치하는지 확인하고 제출
    const username = $("#userId").val();
    const userPw = $("#userPw").val();

    $.get("../json/data.json", function (data) {
      console.log("성공적으로 json에서 가져온 데이터 확인하기 : ", data);
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
    });
  });
  $("#logout_fn").click(function (e) {
    e.preventDefault();
    $("#login_fn").show();
    $("#logout_fn").hide();
    $("#result").html("로그아웃이 완료되었습니다!");
  });
});
