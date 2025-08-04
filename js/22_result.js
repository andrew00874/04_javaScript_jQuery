$(function () {
  // localStorage 에서 데이터 가져오기
  // setItem 안에서 ("첫 번 째", "") 첫 번 째 큰 따옴표 내부에 있는 명칭을 그대로 작성!!!!
  const username = localStorage.getItem("username");
  const userpw = localStorage.getItem("userpw");

  // 데이터가 있으면 표시

  if (username) {
    $("#result-id").text(username);
  } else {
    $("#result-id").text("회원가입에서 작성한 아이디를 찾을 수 없습니다.");
  }

  if (userpw) {
    $("#result-pw").text(userpw);
  } else {
    $("#result-pw").text("회원가입에서 작성한 비밀번호를 찾을 수 없습니다.");
  }
});
