$(function () {
  // .click() 내부에 함수를 작성할 때 : 기능명칭만 작성하고 () 제외
  // 특별히 메서드 내부에 함수를 작성하지 않고, 단독으로 함수를 작성할 때
  // 기능명칭();
  $("#loginBtn").click(loginCheck);
  $("#logoutBtn").click(logoutCheck);
});

$("#logoutBtn").hide();

function logoutCheck() {
  $(".form-group").show();
  $("#loginBtn").show();
  $("#logoutBtn").hide();
  $("#loginResult").html(`
        <div class="success">
            로그아웃이 완료되었습니다.
            </div>
        `);
  $("#username").val("");
  $("#password").val("");
  setTimeout(function () {
    $("#loginResult").fadeOut(500);
  }, 1000);
}
function loginCheck() {
  const username = $("#username").val();
  const password = $("#password").val();

  if (!username || !password) {
    $("#loginResult").html(
      `
            <div class="error"> 아이디와 비밀번호를 입력하세요. </div>
            `
    );
    return; //if문을 탈출한 후 아래에 작성한 코드를 실행하지 못하도록 돌려보내기 !!!
  }
  $.get("../json/userInfo.json").done((data) => {
    if (idPwCheck(data, username, password)) {
      //1. form-group 숨김처리, loginBtn -> 로그아웃 버튼으로 변경
      //2. 로그아웃 버튼 클릭했을 경우 form-group 보이고 로그인 버튼으로 변경
      $("#loginResult").html(
        `
           <div class="success">
               <p><strong>로그인성공!</strong></p>
               <p>${username}님, 환영합니다.</p>
           </div>
           `
      );
      setTimeout(function () {
        $("#loginResult").fadeOut(500);
      }, 1000);
      $(".form-group").hide();
      $("#loginBtn").hide();
      $("#logoutBtn").show();
    } else {
      $("#loginResult").show();
      $("#loginResult").html(
        `
               <div class="error"> 아이디와 비밀번호를 입력하세요. </div>
               `
      );
    }
  });
}

function idPwCheck(data, username, password) {
  return data.users[username] && data.users[username].password === password;
}
