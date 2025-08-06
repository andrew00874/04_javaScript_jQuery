$(function () {
  $("#signup").click(signup);
  $("#goToLogin").click(gotoLogin);
});

function signup() {
  hideMessages();

  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  const users = JSON.parse(localStorage.getItem("gbUsers") || "[]");

  newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password,
    createAt: new Date().toLocaleString("ko-KR"),
  };

  //Uncaught TypeError: Failed to execute 'setItem' on 'Storage':
  //  2 arguments required, but only 1 present.
  // setItem() 내부 파라미터 (=매개변수)가 2개가 들어가야 하는데 오직
  // 1개만 들어가서 storage저장에 문제가 발생함

  //추가된 데이터를 localStorage에 업로드
  users.push(newUser);
  localStorage.setItem("gbUsers", JSON.stringify(users));
  alert("회원가입이 완료되었습니다.");
}

function hideMessages() {}

function gotoLogin() {
  window.open("login.html", "_blank", "width=450, height=600");
  window.location.href = "index.html";
}
