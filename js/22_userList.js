$(function() {
    showUsers();
})

function showUsers(){
    // localStorage에서 모든 데이터를 담을 수 있는 리스트 변수이름 생성

    const users =[]; //localStorage에 저장된 정보를 목록 형태로 users 내부에 저장할 것

    // username, userpw 가 있으면 배열에 추가


    const username = localStorage.getItem('username');
    const userpw = localStorage.getItem('userpw');

    if (username && userpw) {
        users.push({
            id: username,
            pw: userpw,
        });
    }

    //사용자 중 회원수 표시 users.length
    //사용자가 없으면 users.length === 0 no-users 볼 수 있음!
    //map 사용해서 HTML 로 소비자가 유저 리스트 목록을 확인할 수 있도록 설정

    const userHTML = users.map(
        u =>
            `
        <div class="user-item">
            <div class="user-id">아이디 : ${u.id}</div>
            <div class="user-pw">비밀번호 : ${u.pw}</div>

        </div>
        `
    );

    $("#user-list").html(userHTML);
}