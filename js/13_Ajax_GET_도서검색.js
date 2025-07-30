/*
// bookTitle author 검색 초기화 result
$(function () {
  $("#도서검색").click(function () {
    //Json 파일에서 도서 데이터 가져오기
    $.get("../json/books.json", function (data) {
      // data 에서 length를 활용해서 총 몇권의 도서가 존재하는지 확인
      const bookCnt = Object.keys(data.books).length;
      $("#result").html(`
                    <div> 총 ${bookCnt} 권의 도서가 존재합니다. </div>
                `);
      // 1. bookTitle 로 도서 값 val() 가져오기
      // 2. author 로 저자 값 val() 가져오기
      const bookTitle = $("#bookTitle").val();
      const author = $("#author").val();
      if (data.books[bookTitle]) {
        // 책 제목이 존재한다면
        if (author === data.books[bookTitle].author) {
          $("#result").removeClass("error");
          $("#result").addClass("success");
          $("#result").html(`
                            <div class="book-info">
                                <h3>도서 찾기 성공!</h3>
                                <p><strong>제목 : ${bookTitle}</strong></p>
                                <p><strong>저자 : ${author}</strong></p>
                                <p><strong>가격 : ${data.books[bookTitle].price} 원</strong></p>
                            `);
        }
      } else {
        // 책 제목이 존재하지 않는다면
        $("#result").removeClass("success").addClass("error");
        $("#result").html(`
          <p>찾으시는 책이 없습니다. 총 ${bookCnt}권의 도서 중 다시 검색해주세요.</p>
        `);
      }
    });
  });
});
*/
$(function () {
  $("#도서검색").click(function () {
    // Json 파일에서 도서 데이터 가져오기
    $.get("../json/books.json", function (data) {
      // 1. 검색어 가져오기 (앞뒤 공백은 trim()으로 제거)
      const searchTitle = $("#bookTitle").val().trim();
      const searchAuthor = $("#author").val().trim();
      const totalBooks = Object.keys(data.books).length;
      //                        -> 객체의 key 목록을 문자열 배열로 반환
      // 만약 검색어가 둘 다 비어있으면 함수 종료
      if (!searchTitle && !searchAuthor) {
        $("#result").html(
          `<div>검색어를 입력해주세요. <br>총 ${totalBooks}권의 책이 존재합니다.</div>`
        );

        $("#result").removeClass("success").addClass("error");
        return;
      }

      // 2. 검색을 위해 객체를 배열로 변환
      const allBooks = Object.values(data.books);
      //                      -> 객체의 값 목록을 배열로 반환

      // 3. 'filter'를 사용해 제목 또는 저자에 검색어가 포함된 모든 책 찾기
      const foundBooks = allBooks.filter(function (book) {
        // 둘 중 하나의 조건만 만족해도 true를 반환 (|| -> OR 연산자)
        // searchTitle이 비어있지 않고, book.title에 포함되는 경우
        const titleMatch = searchTitle && book.title.includes(searchTitle);
        // searchAuthor가 비어있지 않고, book.author에 포함되는 경우
        const authorMatch = searchAuthor && book.author.includes(searchAuthor);

        return titleMatch || authorMatch;
      });

      // 4. 검색 결과에 따라 다른 내용 출력
      if (foundBooks.length > 0) {
        // ✅ 검색된 책이 있을 경우
        $("#result").removeClass("error").addClass("success");

        // 찾은 책들의 목록을 HTML로 만들기
        const booksHtml = foundBooks
          .map(function (book) {
            return `<div class="book-item">
                    <p><strong>제목:</strong> ${book.title}</p>
                    <p><strong>저자:</strong> ${book.author}</p>
                    <p><strong>가격:</strong> ${book.price.toLocaleString()}원</p>
                  </div>`;
          })
          .join(""); // 각 HTML 조각을 하나의 문자열로 합치기

        $("#result").html(`
          <h3>🔍 총 ${foundBooks.length}권의 도서를 찾았습니다.</h3>
          ${booksHtml}
        `);
      } else {
        // ❌ 검색된 책이 없을 경우
        $("#result").removeClass("success").addClass("error");
        $("#result").html(
          `<p>일치하는 도서가 없습니다. 다시 검색해주세요.</p>`
        );
      }
    });
  });
});
