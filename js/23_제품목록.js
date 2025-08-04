$(function () {
  displayProducts();
  $("#delete-btn").click(deleteProducts);
});

function displayProducts() {
  // 1. localStorage에서 상품 목록을 가져옵니다. (없을 경우 빈 배열 '[]' 사용)
  const productList = JSON.parse(localStorage.getItem("productList") || "[]");

  // 만약 표시할 상품이 없다면 메시지를 보여주고 함수를 종료합니다.
  if (productList.length === 0) {
    $("#product-grid").html("<p>등록된 상품이 없습니다.</p>");
    return;
  }

  // 2. map()을 사용해 각 상품 데이터를 HTML 문자열로 변환합니다.
  const productHtml = productList
    .map((product) => {
      // 이 부분의 HTML 구조는 원하는 디자인에 맞게 자유롭게 수정하세요.
      return `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price}원</p>
                </div>
            </div>
        `;
    })
    .join(""); // 3. 배열로 만들어진 각 HTML 문자열을 하나로 합칩니다.

  // 4. 생성된 전체 HTML을 #product-grid 내부에 삽입합니다.
  $("#product-grid").html(productHtml);
}

function deleteProducts(e){
    e.preventDefault();

    if(confirm("정말 모든 제품을 삭제하시겠습니까? ")){
        localStorage.removeItem("productList");
        //화면 새로고침
        alert("모든 상품이 삭제되었습니다.");
        location.reload(); // 현재페이지 새로고침 window 생략 가능
    }

}