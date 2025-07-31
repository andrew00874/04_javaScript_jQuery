// jQuery 이벤트 처리와
// 기능명칭으로 분류하여 기능 호출하기

$(function () {
  $("#btn1").click(문제1번기능);
  $("#btn2").click(userInfo);
  $("#btn3").click(quote);
  $("#btn4").click(loading);
  $("#btn5").click(errorHandle);
  $("#btn6").click(listing);
});
// let url_num = Math.floor(Math.random() * 100) + 1;
// let url_fetch = "https://jsonplaceholder.typicode.com/posts/" + url_num;

function 문제1번기능() {
  $.get("https://jsonplaceholder.typicode.com/posts/1", function (result) {
    $("#result1").html(`
                <div class="success">
                    <strong>게시물 제목 : </strong>${result.title}
                </div>
            `);
  });
}

function userInfo() {
  const ui = $("#userId").val();
  $.get(`https://jsonplaceholder.typicode.com/users/${ui}`)
    .done(function (data) {
      if (!data.id || !data) {
        $("#result2").html(`
                <div class="error">해당 사용자를 찾을 수 없습니다.</div>
                `);
        return;
      }
      $("#result2").html(`
                <div class="success">
                <strong>이름 : </strong>${data.name}<br>
                <strong>이메일 : </strong>${data.email}<br>
                <strong>전화번호 : </strong>${data.phone}<br>
                </div>
                `);
    })
    .fail(function () {
      $("#result2").html(
        `<div class="error">
            해당 사용자를 찾을 수 없습니다. (404 error 발생)
            주소 자체에 접속이 안되는 상황
         </div>
        `
      );
    });
  // 1. 데이터를 무사히공가져오는데 성공 .done()
  // 2. 아예 주소로 접근 자체가 불가능한 에러 상태일 떄 .fail()
}

function quote() {
  $.get("https://api.quotable.io/random")
    .done(function (quote) {
      if (!quote) {
        $("#result3").html(`
            <div class="error">
                오류발생
            </div>
        `);
        return;
      }
      $("#result3").html(`
        <div class="success">
            <blockquote>오늘의 명언 : ${quote.content} </blockquote>
            <strong>저자 : ${quote.author}</strong>
        </div>
        `);
    })
    .fail(function () {
      $("#result3").html(
        `<div class="error">
              404 not found
          </div>
          `
      );
    });
}

function loading() {
  $("#result4").html('<div class="loading">로딩 중입니다...</div>');
  $.get("https://jsonplaceholder.typicode.com/posts/1/comments")
    .done(function (comments) {
      $("#result4").empty();
      if (!comments) {
        $("#result4").html(`
            <div class="error">
                오류 발생
            </div>    
        `);
        return;
      }
      $("#result4").html(`
        <div class="success">
            댓글 ${comments.length} 개를 불러왔습니다. <br>
            첫번째 댓글 : ${comments[0].body}
        </div>
        `);
    })
    .fail(
      //error가 발생했을 때도 매개변수 파라미터 자리에 data라는
      //변수이름을 사용해도 되지만 암묵룰
      //err나 xhr같은 명칭 사용
      function (err) {
        $("#result4").empty();
        $("#result4").html(`
        <div class="error">
            ${err.status} ${err.statusText}
        </div>
        `);
      }
    );
}

function errorHandle() {
  $.get("https://jsonplaceholder.typicode.com/posts/999999").fail(function (
    err
  ) {
    $("#result5").html(`
              <div class="error">
                  <strong>${err.status} ${err.statusText}</strong>
              </div>
              `);
  });
}

function listing() {
  $.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .done(function (list) {
      if (!list) {
        $("#result6").html(
          `<div class="error">데이터에 오류가 있습니다.</div>`
        );
      }
      for (let i = 0; i < list.length; i++) {
        $("#result6").append(
          `<div class="success">${i}. ${list[i].body}</div><br>`
        );
      }
    })
    .fail(function (err) {
      $("#result6").html(`
        <div class="error">
            <strong>${err.status} ${err.statusText}</strong>
        </div>
        `);
    });
}

function myIP() {}
