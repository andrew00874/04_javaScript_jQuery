$(function () {
    $("#doSearch").click(getPuuid);
    $("#top3").click(getMastery);
    $("#clipBoard").click(doCopy);
})

const apiKey = "RGAPI-ea3a472b-9056-4f4a-bac8-0f70dbbf2ac0"; // 실제 사용 시에는 보안에 유의

function doCopy() {
  // 1. jQuery로 'myPuuid' ID를 가진 요소를 선택합니다.
  const $myPuuidElement = $('#myPuuid');

  if ($myPuuidElement.length) {
    // 2. .text() 메소드를 사용해 요소의 텍스트 값을 가져옵니다.
    const textToCopy = $myPuuidElement.text();

    // 3. navigator.clipboard.writeText를 사용해 클립보드에 복사합니다.
    // 이 부분은 표준 JavaScript API를 사용하는 것이 가장 효율적입니다.
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // 복사 성공 시
        alert('ID가 클립보드에 복사되었습니다!');
      })
      .catch(err => {
        // 복사 실패 시
        console.error('클립보드 복사 실패:', err);
        alert('복사에 실패했습니다.');
      });
  } else {
    console.error("'myPuuid' ID를 가진 요소를 찾을 수 없습니다.");
  }
}

function getPuuid() {
    const gameName = $("#gameName").val();
    const tag = $("#Tag").val();
    $.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}?api_key=${apiKey}`)
        .done((data) => {
            $("#myPuuid").html(`${data.puuid}`);
        });
}

// champion.json 데이터를 { championId: championData } 형태로 변환해주는 헬퍼 함수
function createChampionIdMap(championData) {
    const idMap = {};
    // championData.data 객체의 각 챔피언에 대해 반복
    for (const key in championData.data) {
        const champion = championData.data[key];
        // champion.key(챔피언 ID)를 키로 사용해 맵에 저장
        idMap[champion.key] = champion;
    }
    return idMap;
}

function getMastery() {
    const puuid = $("#myid").val();
    if (!puuid) {
        alert("Puuid를 입력해주세요.");
        return;
    }

    const masteryApiUrl = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`;
    const championJsonUrl = '../json/champion.json'; // 저장해 둔 파일 경로

    $("#mastery-display").empty().html("<p>데이터를 불러오는 중입니다...</p>");

    // 두 개의 GET 요청을 동시에 보냅니다.
    $.when(
        $.get(masteryApiUrl),
        $.get(championJsonUrl)
    ).done(function(masteryResponse, championResponse) {
        // masteryResponse와 championResponse는 배열 형태로 응답을 받습니다. 
        // 실제 데이터는 첫 번째 요소에 들어있습니다.
        const masteryData = masteryResponse[0];
        const championJson = championResponse[0];
        
        // 챔피언 ID를 키로 하는 맵을 생성합니다.
        const championMap = createChampionIdMap(championJson);
        const ddragonVersion = championJson.version; // 이미지 경로에 사용할 버전

        $("#mastery-display").empty(); // "불러오는 중" 메시지 제거
        const top3 = masteryData.slice(0, 3);

        if (top3.length === 0) {
            $("#mastery-display").html("<p>해당 유저의 챔피언 숙련도 정보가 없습니다.</p>");
            return;
        }

        $.each(top3, function(index, mastery) {
            // 숙련도 정보의 championId를 사용해 챔피언 맵에서 정보를 찾습니다.
            const championInfo = championMap[mastery.championId];
            if (!championInfo) return; // 챔피언 정보를 찾지 못하면 건너뜁니다.
            
            const lastPlay = new Date(mastery.lastPlayTime).toLocaleDateString('ko-KR');
            const championImage = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${championInfo.image.full}`;

            const masteryHtml = `
        <tr>
            <td>${index + 1} 위</td>
            <td><img src="${championImage}" alt="${championInfo.name}" class="champion-icon"></td>
            <td>${championInfo.name}</td>
            <td>${mastery.championLevel}레벨</td>
            <td>${mastery.championPoints.toLocaleString(                                )}점</td>
            <td>${lastPlay}</td>
        </tr>
            `;
            
            $("#mastery-display").append(masteryHtml);
        });

    }).fail(function(error) {
        console.error("데이터 요청 실패:", error);
        $("#mastery-display").html("<p>데이터를 불러오는 데 실패했습니다. Puuid, API 키 또는 파일 경로를 확인해주세요.</p>");
    });
}

// `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puid}/ids?start=0&count=3&api_key=${apiKey}`

// function getRec3()