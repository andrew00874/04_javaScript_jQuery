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
  $("#btn9").click(selectAlbum);
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
  /*
filter()
배열 = 목록 = 리스트에서 조건에 맞는 것들만 골라내는 기능
배열.filter(조건함수)

data                     .     filter(      (user) =>                                 user.name == searchName)
url에서 가져온 데이터들   에서   걸러낼게요    하나씩 data를 꺼내서 user 변수이름으로 확인  user에서 name과  소비자가 검색한 이름과 일치하는 것들만

user 라는 변수이름에 담아둘게요.

data                                    : url 에서 가져온 데이터를 담고있는 변수이름
    .filter(                            : data에서 가져온 데이터들을 걸러내는 작업 진행
        (user) =>                       : 우선은 data = user 서로 가지고있는 리스트가 동일하지만
                                        : 추후 소비자가 찾는 이름과 user내에서 name 키로 일치하는 값만
                                        : user 변수이름에 담아놓기 설정
                user.name == searchName
)
*/
  $.get("https://jsonplaceholder.typicode.com/users")
    .done(function (data) {
      $("#result8").html(
        data
          .filter((user) => user.name == searchName)
          .map(
            (user) => `
        <p>${user.name}</p>
        <p>${user.email}</p>
        `
          )
      );
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
    .map((user) =>
        `<p>${user.name}</p>
         <p>${user.email}</p>
        `
    )
*/

function selectAlbum() {
  const albumId = $("#albumId").val(); //사용자가 선택한 value값 가져오기
  $.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=3`
  ).done(function (data) {
    $("#result9").html(
        //data.map 형태로 map 내부 변수이름 photo를 이용해서
        // select 선택을 진행할 때 filter를 사용해라 를 만날 수 있다.
        // 주소값에서 작성된 모든 데이터를 조회할 때는
        // filter를 굳이 사용하지 않아도 됨.
      data.map(
        (photo) =>
          `
         <strong> ${photo.title} </strong>
         <p> ${photo.url} </p>
        `
      )
    );
  });
}
