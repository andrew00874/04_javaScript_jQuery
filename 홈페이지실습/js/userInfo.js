$(function () {
  getUsers();
});

function getUsers() {
  $.get(`https://jsonplaceholder.typicode.com/users/`).done(function (data) {
    //모든 사용자를 map을 활용하여 리스트 목록 형태로 표시
    const userList = data
      .map(
        (users) =>
          `
            <p class="user-detail" onclick="getUserDetail(${users.id})">
                ${users.name} - ${users.id}
            </p>
        `
      )
      .join("");

    $("#userList").html(
      `
            <div class="success">
            <h3>전체 사용자 목록</h3>
            ${userList}
            </div>
        `
    );
  });
}

function getUserDetail(userId) {
  $("#userResult").html(
    '<div class="loading">사용자 상세 정보를 가져오는 중...</div>'
  );

  $.get(`https://jsonplaceholder.typicode.com/users/${userId}`).done(function (
    data
  ) {
    $("#userResult").html(`
                    <div class="success">
                        <div class="user-card">
                            <h3>👤 ${data.name} (ID: ${data.id})</h3>
                            <p><strong>사용자명:</strong> ${data.username}</p>
                            <p><strong>이메일:</strong> ${data.email}</p>
                            <p><strong>전화번호:</strong> ${data.phone}</p>
                            <p><strong>웹사이트:</strong> ${data.website}</p>
                            <p><strong>회사:</strong> ${data.company.name}</p>
                            <p><strong>회사 업무:</strong> ${data.company.catchPhrase}</p>
                            <p><strong>주소:</strong> ${data.address.street}, ${data.address.city}</p>
                            <p><strong>우편번호:</strong> ${data.address.zipcode}</p>
                        </div>
                    </div>
                `);
  });
}
$("#flush").click(() => {
  $("#userResult").html("");
});
