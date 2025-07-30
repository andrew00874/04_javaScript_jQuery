//  price   검색기능   검색초기화   result
$(function () {
  // 과일 불러오기 클릭
  $("#검색기능").click(function () {
    $.get("../json/fruits.json", function (data) {
      console.log("data : ", data);
      console.log("data.length : ", data.length);
      /*
      처음 데이터가 시작할 때 [] 이면 .length 사용 가능!!!
      처음 데이터가 시작할 때 {} 이면 Object.keys() 데이터를 키나 값만 모은 후 length 처리 진행
      
      */
      const price = $("#price").val();

      for (let i = 0; i < data.length; i++) {
        if (price == data[i].price) {
          $("#result").html(`
            ${data[i].name} - ${data[i].price}
            `);
          break;
        } else {
          $("#result").html(`과일이 존재하지 않습니다.`);
        }
      }
    });
    //$.get 이용해서 JSON 파일에서 과일 데이터 가져오기
  });
  // 가격을 검색했을 때 가격에 해당하는 과일이 존재하는지 확인
  // 검색한 가격이 존재하지 않을 때 해당하는 가격의 과일은 존재하지 않습니다.
  // 검색한 가격에 해당하는 과일만 확인하기
});
