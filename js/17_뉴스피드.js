$(function () {
  뉴스불러오기();
  $("#loadBtn").click(news_filter);
});

// select value 값에 적당한 데이터만 선택해서 검색하기 설정
// input && category -> 검색이 일치하는 데이터만 조회하기
$("#search").val();
function news_filter() {
  const category = $("#categoryFilter").val();
  const searchTerm = $("#search").val().toLowerCase().trim(); // 소문자로 변환하고 양쪽 공백 제거

  $.get("../json/news.json").done(function (data) {
    const filteredData = data.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const searchMatch = item.title.toLowerCase().includes(searchTerm);
      return categoryMatch && searchMatch;
    });
    $("#newsContainer").html(
      filteredData.map(
        (item) =>
          `
        <div class="news-card">
            <div class="news-title">${item.title}</div>
            <div class="news-content">${item.content}</div>
        </div>
    `
      )
    );
  });
}

function 뉴스불러오기() {
  $.get("../json/news.json").done(function (data) {
    $("#newsContainer").html(
      data.map(
        (i) => `
                    <div class="news-card">
                        <div class="news-title"> ${i.title}</div>
                        <div class="news-content"> ${i.content}</div>
                    </div>
                    `
      )
    );
  });
}
