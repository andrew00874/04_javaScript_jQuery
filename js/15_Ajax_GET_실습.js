// jQuery 이벤트 처리와
// 기능명칭으로 분류하여 기능 호출하기

$(function () {
  $("#btn1").click(문제1번기능);
  $("#btn2").click(userInfo);
  $("#btn3").click(quote);
  $("#btn4").click(loading);
  $("#btn5").click(errorHandle);
  $("#btn6").click(listing);
  $("#btn7").click(userList);
  $("#btn8").click(search_name);
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
        return;
      }
      //   for (let i = 0; i < list.length; i++) {
      //     $("#result6").append(
      //       `<div class="success">${i}. ${list[i].body}</div><br>`
      //     );
      //   }
      //data가 배열 = 목록 = 리스트 형태로 다수 존재할 경우
      //data.map() 배열 형태를 하나씩 꺼내서 나열하는 메서드

      $("#result6").html(list.map((i) => `<p><strong>${i.title}</strong></p>`));
    })
    .fail(function (err) {
      $("#result6").html(`
        <div class="error">
            <strong>${err.status} ${err.statusText}</strong>
        </div>
        `);
    });
}

// function myIP() {
//   $.get("https://httpbin.org/ip")
//     .done(function (IP) {
//       if (!IP) {
//         $("#result7").html(`
//                 <div class="error">
//                     에러가 발생했습니다.
//                 </div>
//             `);
//         return;
//       }
//       $("#result7").html(`
//             <div class="success">
//                 <strong>My IP : ${IP.origin}</strong>
//             </div>
//         `);
//     })
//     .fail(function (err) {
//       $("#result7").html(`
//         <div class="error">
//             ${err.status} ${err.statusText}
//         </div>
//         `);
//     });
// }

function userList() {
  $.get("https://jsonplaceholder.typicode.com/users")
    .done(function (data) {
      $("#result7").html(
        data.map(
          (user) =>
            `<p>유저 이름 : ${user.name}</p> <p>유저 이메일 : ${user.email}</p> <hr>`
        )
      );
    })
    .fail(function (err) {
      $("#result7").html(
        `<div class=error>
            ${err.status} ${err.statusText}
        </div>`
      );
    });
}

function search_name() {
  // 1. input에서 검색할 이름을 가져옵니다.
  const searchName = $("#searchName").val();

  // 입력값이 없으면 함수를 종료합니다.
  if (!searchName) {
    $("#result8").html('<div class="error">검색할 이름을 입력하세요.</div>');
    return;
  }

  $.get("https://jsonplaceholder.typicode.com/users")
    .done(function (userList) {
      // 2. userList 배열을 filter로 순회합니다.
      // user.name에 검색어가 포함되어 있는지 확인합니다. (대소문자 무시)
      const foundUsers = userList.filter(function (user) {
        return user.name.toLowerCase().includes(searchName.toLowerCase());
      });

      // 3. 검색 결과를 화면에 표시합니다.
      $("#result8").empty(); // 이전 결과 지우기

      if (foundUsers.length > 0) {
        // 4. 일치하는 사용자를 찾은 경우
        $("#result8").append("<h4>검색 결과:</h4>");
        foundUsers.map(function (user) {
          $("#result8").append(
            `<div class="success">이름 : ${user.name}<br>이메일 : ${user.email}<br>전화번호 : ${user.phone})</div>`
          );
        });
      } else {
        // 5. 일치하는 사용자를 찾지 못한 경우
        $("#result8").html(
          '<div class="error">일치하는 사용자가 없습니다.</div>'
        );
      }
    })
    .fail(function (err) {
      $("#result8").html(`
        <div class="error">
            ${err.status} ${err.statusText}
        </div>
        `);
    });
}

/* 
    data.filter((user) => user.name == searchName)
    .map(user) =>
        `<p>${user.name}</p>
         <p>${user.email}</p>
        `
*/