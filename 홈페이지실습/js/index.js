$(function () {
    // .click() 내부에 함수를 작성할 때 : 기능명칭만 작성하고 () 제외
    // 특별히 메서드 내부에 함수를 작성하지 않고, 단독으로 함수를 작성할 때
    // 기능명칭();
  $("#loginBtn").click(loginCheck);
});

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

  $("#loginResult").html(
    `
            <div class="loading">로그인 중입니다...</div>
        `
  );

  if (
    (username === "admin" && password === "1234") ||
    (username === "user" && password === "1234")
  ) {
    $("#loginResult").html(
      `
        <div class="success">
            <p><strong>로그인성공!</strong></p>
            <p>${username}님, 환영합니다.</p>
        </div>
        `
    );
  } else {
    $("#loginResult").html(
      `
            <div class="error"> 아이디와 비밀번호를 입력하세요. </div>
            `
    );
  }
}
