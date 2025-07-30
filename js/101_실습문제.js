$(document).ready(function () {
  // ========================================
  // 여기에 jQuery 코드를 작성하세요
  // ========================================

  // 과제 1: 사용자 가져오기
  // HINT: $.get("https://randomuser.me/api/", function(data) { ... })
  // HINT: const user = data.results[0]; 로 사용자 데이터 추출
  // HINT: showUser(user); 함수 호출하여 사용자 표시

  $("#getUser").click(function () {
    // 여기에 사용자 가져오기 코드 작성
    $.get("https://randomuser.me/api/", function (data) {
      const user = data.results[0];
      if (user) {
        $("#userCard").html(showUser(user)).fadeIn(300);
      } else {
        showLoading();
      }
    });
  });

  // 과제 2: 사용자 지우기
  // HINT: $("#userCard").fadeOut(300); 로 카드 숨김
  // HINT: showEmptyState(); 호출하여 빈 상태 표시

  $("#clearUser").click(function () {
    // 여기에 사용자 지우기 코드 작성
    $("#userCard").fadeOut(300);
    showEmptyState();
  });

  // ========================================
  // 도우미 함수들 (수정하지 마세요)
  // ========================================

  // 사용자 정보 표시 함수
  function showUser(user) {
    const userHtml = `
                    <img src="${
                      user.picture.large
                    }" alt="프로필" class="user-avatar">
                    <div class="user-name">${user.name.first} ${
      user.name.last
    }</div>
                    <div class="user-info"><strong>이메일:</strong> ${
                      user.email
                    }</div>
                    <div class="user-info"><strong>전화:</strong> ${
                      user.phone
                    }</div>
                    <div class="user-info"><strong>성별:</strong> ${
                      user.gender === "male" ? "남성" : "여성"
                    }</div>
                    <div class="user-info"><strong>나이:</strong> ${
                      user.dob.age
                    }세</div>
                    <div class="user-info"><strong>국가:</strong> ${
                      user.location.country
                    }</div>
                `;

    $("#userCard").html(userHtml).fadeIn(300);
    hideEmptyState();
  }

  // 로딩 표시
  function showLoading() {
    $("#loadingMessage").show();
    $("#emptyState").hide();
  }

  // 로딩 숨김
  function hideLoading() {
    $("#loadingMessage").hide();
  }

  // 빈 상태 표시
  function showEmptyState() {
    $("#emptyState").show();
  }

  // 빈 상태 숨김
  function hideEmptyState() {
    $("#emptyState").hide();
  }
});
