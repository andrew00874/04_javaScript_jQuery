// 1. 강아지사진 클릭하지 않아도 랜덤으로 1장 보이게 설정
// https://dog.ceo/api/breeds/image/random
// https://api.thecatapi.com/v1/images/search

let curr = 1;
let arr = new Array(); // 고양이 이미지 URL을 저장할 배열

$(function () {
  // 강아지 사진 로딩
  randomDog();
  $("#dogResult").click(randomDog);

  // 첫 고양이 사진 로딩
  showCat(curr);

  // 이전 버튼
  $("#prevBtn").click(function () {
    if (curr > 1) {
      curr--;
      showCat(curr); // showCat 함수 호출
    } else {
      alert("첫번째 페이지 입니다.");
    }
  });

  // 다음 버튼
  $("#nextBtn").click(function () {
    curr++;
    showCat(curr); // showCat 함수 호출
  });
});

// 강아지 사진을 가져오는 함수 (기존과 동일)
function randomDog() {
  $("#dogResult").html('<div class="loading">로딩 중입니다...🐶</div>');
  $.get("https://dog.ceo/api/breeds/image/random").done((res) => {
    $("#dogResult").html(`<img src="${res.message}">`);
  });
}

// 고양이 사진을 가져오고 표시하는 통합 함수
function showCat(page) {
  $("#pageInfo").html(`페이지 ${page}`);

  // ✅ 배열에 현재 페이지의 이미지가 이미 있는지 확인
  if (arr[page - 1]) {
    // 이미지가 있으면 API 요청 없이 바로 보여주기
    console.log(`페이지 ${page}: 저장된 이미지 로드`);
    $("#catResult").html(
      `<div class="cat-card"><img src="${arr[page - 1]}"></div>`
    );
  } else {
    // 이미지가 없으면 API로 새로 요청
    console.log(`페이지 ${page}: 새 이미지 API 요청`);
    $("#catResult").html('<div class="loading">로딩 중입니다...😺</div>');
    $.get("https://api.thecatapi.com/v1/images/search").done((res) => {
      const newUrl = res[0].url;
      // 💡 API 응답이 온 후에 배열에 저장하고 화면에 표시
      arr[page - 1] = newUrl;
      $("#catResult").html(`<div class="cat-card"><img src="${newUrl}"></div>`);
      console.log("현재 배열 상태:", arr);
    });
  }
}
