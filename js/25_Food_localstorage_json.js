$(function () {
  showAllFoodData();
  // 페이지 시작할 때 모든 저장 데이터 보여주기
  $("#addBtn").click(addFoodData);
  $("#searchBtn").click(searchFoodData);
  $("#showAllBtn").click(showAllFoodData);
  $("#clearAllBtn").click(clearAllFoodData);
});

/**
 *
 * @param {*} e : 파라미터에 대한 설명 작성 공간
 */
function addFoodData(e) {
  e.preventDefault();
  const foodName = $("#foodName").val().trim();
  const price = $("#price").val().trim();
  const category = $("#category").val().trim();
  // 기존 저장된 데이터가 localStorage 존재하는지 확인
  // 없으면 빈배열을 문자열로 가져오기 설정
  let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");

  const newFood = {
    foodName: foodName,
    price: price,
    category: category,
    createAt: new Date().toLocaleString("ko-KR"), // 저장시간 현재시간으로 한국기준 설정
  };
  // js 에서 foodList 목록에 newFood 데이터 맨 마지막에 추가
  foodList.push(newFood);
  // 추가된 foodList 를 localStorage 에 글자열로 변환하여 저장
  localStorage.setItem("foodList", JSON.stringify(foodList));
  // foodName price createAt 입력창 비우기
  $("#foodName, #price, #category").val("");

  // alert 로컬스토리지에 저장되었습니다. 띄우기
  alert("로컬스토리지에 저장되었습니다.");
}

function showAllFoodData(e) {
  /*
  showAllFoodData(e) : 행동이 들어왔을 때
                        행동에 대한 결과를 수행
     버튼이나 input 처럼 특정 행위가 없을 때는
     undefined (행동이 전달되지 않은 상태 / 단순 페이지 오픈상태)
 

  if (e) e.preventDefault();
    클릭과 같은 동작이 들어왔을 때 태그 속성을 멈추기위하여 설정

    if로 e.preventDefault() 를 감싸주지 않는다면
    지금과 같이
    페이지를 로딩하고, 데이터를 모두 보기 한 상태에서는 
    undefined.preventDefault() 가 되어 문제가 발생하므로
    아래 기능을 수행하지 못함
  
  
  */
  if (e) e.preventDefault(); //if 내부가 한 줄이므로 {} 생략

  // 순서를 지키지 않으면 loading 에서 특정 행위나 이벤트가 없을 때는
  // 내부 에러로 인하여 데이터가 보이지 않을 수 있다.
  // 그래서 변수를 선언하고 선언된 변수 이름을 사용할 때는 반드시 순서를 지킬 것
  let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");
  let html = `<h3>🍽️ 저장된 음식 목록 (총 ${foodList.length}개)</h3>`;

  for (let i = 0; i < foodList.length; i++) {
    html += `
      <div class="item-row">
        <div>
          <strong>🍽️ ${foodList[i].foodName}</strong><br>
          💰 가격: ${foodList[i].price}원<br>
          📂 카테고리: ${foodList[i].category}<br>
          📅 등록일: ${foodList[i].createAt}
        </div>
      </div>
    `;
  }

  $("#allData").html(html);
}
function clearAllFoodData(e) {
  // 실습코드 참조
  e.preventDefault();
  if (confirm("정말로 모든 음식 데이터를 삭제하시겠습니끼?")) {
    localStorage.removeItem("foodList");
  }
  alert("모든 음식 데이터가 삭제되었습니다.");
}

function searchFoodData(e) {
  e.preventDefault();
  let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");
  let html = `<h3>🍽️ 저장된 음식 조회결과</h3>`;
  const searchValue = $("#searchValue").val().trim();
  // 검색결과가 존재할 경우 검색결과 보여주기
  const searchFoodDatas = foodList.filter(
    (food) => food.foodName === searchValue
  );

  if (searchFoodDatas.length > 0) {
    html += searchFoodDatas
      .map(
        (f) => `
      <div class="item-row">
        ${f.foodName}
        </div>
      
      `
      )
      .join("");
  }

  $("#searchResult").html(html).show(); //display : none 를 볼 수있도록 설정하는 기능
}
