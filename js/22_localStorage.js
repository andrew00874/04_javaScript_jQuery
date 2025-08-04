$(function(){
    $("a").click(signUp);
})

function signUp(){
    e.preventDefault(); // 기본링크 동작 방지
    // 제출하기 일시 정지 상태로
    // 아래 정규식, 데이터 저장 여부 등 과 같은 규정을
    // 모두 확인한 후 result.html 로 이동할 수 있도록 설정
    const username = $("username").val();
    const userpw = $("userpw").val();

    const userData = {
        username : username,
        password : userpw,
    }

    // json 저장할 때 사용 예정 DB에 저장할 때 나중에 등장! $.post()

    // localStorage 에 저장

    localStorage.setItem('username', username);
    localStorage.setItem('userpw', userpw);

    window.location.href = "22_result.html";
}