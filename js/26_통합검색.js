$(function () {
  $("#searchBtn").click(searchFn);
  $("#searchInput").keydown((e) => {
    if (e.key == "Enter") {
      searchFn();
    }
  });
});

// searchFn 함수를 아래 코드로 교체하세요.
function searchFn() {
  $.get("../json/books.json").done((data) => {
    const searchInput = $("#searchInput").val().trim();
    const totalBooks = Object.keys(data.books).length;

    if (!searchInput) {
      $("#result").html(
        `<div>검색어를 입력해주세요.<br> 총 ${totalBooks}권의 책이 있습니다.`
      );
      return;
    }

    // 사용자가 입력한 검색어에 특수문자가 있을 경우를 대비해 처리해줍니다.
    const escapedInput = searchInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // 'i' 플래그로 대소문자 구분 없이 검색하는 정규식을 만듭니다.
    const searchRegex = new RegExp(escapedInput, "i");

    const allBooks = Object.values(data.books);
    const foundBooks = allBooks.filter(function (book) {
      // 정규식의 test() 메소드를 사용해 포함 여부를 확인합니다.
      return searchRegex.test(book.title) || searchRegex.test(book.author);
    });

    if (foundBooks.length > 0) {
      // 'gi' 플래그: 문자열 전체(g)에서 대소문자 구분 없이(i) 찾아서 바꾸기 위한 정규식
      const highlightRegex = new RegExp(escapedInput, "gi");

      const booksHtml = foundBooks
        .map(function (book) {
          // replace()와 정규식을 사용해 검색어를 <strong> 태그로 감쌉니다.
          // '$&'는 정규식과 일치한 원본 문자열(대소문자 포함)을 의미합니다.
          const highlightedTitle = book.title.replace(
            highlightRegex,
            (match) => `<strong>${match}</strong>`
          );
          const highlightedAuthor = book.author.replace(
            highlightRegex,
            (match) => `<strong>${match}</strong>`
          );

          return `<div class="book-item">
                    <p><strong>제목:</strong> ${highlightedTitle}</p>
                    <p><strong>저자:</strong> ${highlightedAuthor}</p>
                    <p><strong>가격:</strong> ${book.price.toLocaleString()} 원</p>
                  </div>`;
        })
        .join("");
      $("#result").html(booksHtml);
    } else {
      // 검색 결과가 없을 때의 처리
      $("#result").html(
        `<div>'${searchInput}'에 대한 검색 결과가 없습니다.</div>`
      );
    }
  });
}
