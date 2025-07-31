let 현재페이지 = 1;

$(function () {
  pokeInfo(1);

  $("#prevBtn").click(() => {
    if (현재페이지 > 1) {
      현재페이지--;
      pokeInfo(현재페이지); //이전페이지로 가기
    } else {
      alert("마지막 페이지 입니다.");
    }
  });

  $("#nextBtn").click(() => {
    현재페이지++;
    pokeInfo(현재페이지); //이전페이지로 가기
  });
});

// range(시작, 끝-1){} 파이썬 메서드
function range(start, end) {
  /* 
    ...
    Array() : 배열 생성

    end - start + 1 = 10 - 1 + 1 = 10
            -> 10개의 배열을 생성하겠다. 소비자가 원하는 페이지의 번호의 배열

    .keys() : key들의 값으로 숫자를 넣겠다. 배열은 0부터 시작 [0,1,2, ... 7,8,9]
    .map((i) => i + start
            : 포켓몬 사이트는 0이 존재하지 않고 1부터 시작하기 떄문에 배열은 0이지만
              0번째에 1의 값이 들어가게 되는 것.
    
    */
  return [...Array(end - start + 1).keys()].map((i) => i + start);
}

function pokeInfo(page) {
  $("#pageInfo").html(`페이지 ${page}`);
  $("#pokemonContainer").html("");
  const startId = (page - 1) * 10 + 1;
  const ids = range(startId, startId + 9);
  ids.map((i) =>
    $.get(`https://pokeapi.co/api/v2/pokemon/${i}`).done(function (data) {
      $("#pokemonContainer").html(
        $("#pokemonContainer").html() +
          `
                      <img src="${data.sprites.front_default}">
                  `
      );
    })
  );
}
