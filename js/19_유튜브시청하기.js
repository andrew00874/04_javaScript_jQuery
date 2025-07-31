//검색버튼 무시 바로 나오는 영화 확인
// $.get()
//https://abhi-api.vercel.app/api/search/yts?text=heat+waves
// .done()

// results 결과에

// <p> 영화제목
// <p> 영화설명
// <img> 썸네일
// <p> 주소

// $(function () {
//   $.get("../json/youtube.json").done(function (data) {
//     const movie = data.result;
//     const moviesHtml = `
//             <div class="movie-card">
//               <img src="${movie.thumbnail}" alt="${movie.title} 썸네일">
//               <p><b>제목:</b> ${movie.title}</p>
//               <p><b>설명:</b> ${movie.description}</p>
//               <p><b>주소:</b> <a href="${movie.url}">링크</a></p>
//             </div>
//           `;
//     $("#results").html(moviesHtml);
//   });
// });

$("#searchButton").click(() => {
  const title = $("#searchInput").val().toLowerCase().trim();

  $.get("../json/youtube.json")
    .done(function (data) {
      // youtube.json의 최상위는 객체이므로, 실제 비디오 정보가 담긴 'result' 키에 접근합니다.
      const item = data.result;

      // 이전 검색 결과를 지웁니다.
      $("#results").empty();

      // item 객체가 존재하고, 그 제목이 검색어를 포함하는지 확인합니다.
      if (item && item.title.toLowerCase().includes(title)) {
        const cardHtml = `
            <div class="movie-card">
              <img src="${item.thumbnail}" alt="${item.title} 썸네일">
              <p><b>제목:</b> ${item.title}</p>
              <p><b>설명:</b> ${item.description}</p>
              <p><b>주소:</b> <a href="${item.url}" target="_blank">링크</a></p>
            </div>
          `;
        $("#results").html(cardHtml);
      } else {
        // 검색 결과가 없는 경우 메시지를 표시합니다.
        $("#results").html("<p>검색 결과가 없습니다.</p>");
      }
    })
    .fail(function () {
      $("#results").html("<p>파일을 불러오는 데 실패했습니다.</p>");
    });
});
