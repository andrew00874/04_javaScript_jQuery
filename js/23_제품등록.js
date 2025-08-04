$(function(){
    $(".register-btn").click(addProduct);
});

function addProduct(e){
    // 폼의 기본 제출 동작(새로고침 등)을 막습니다.
    e.preventDefault();

    // 1. 각 입력 필드에서 값을 가져옵니다. (HTML의 id와 일치해야 합니다)
    const productName = $("#productName").val();
    const productPrice = $("#productPrice").val();
    const productImg = $("#productImage").val();

    // 기존 상품 목록을 localStorage에서 가져옵니다. 없으면 빈 배열로 시작합니다.
    let productList = JSON.parse(localStorage.getItem("productList") || "[]");

    // 새 상품 정보를 객체 형태로 만듭니다.
    const newProduct = {
        name : productName,
        price : productPrice,
        image : productImg,
    };

    // 2. 상품 목록 배열에 새 상품 객체를 추가합니다.
    productList.push(newProduct);

    // 3. 배열을 다시 JSON 문자열 형태로 변환하여 localStorage에 저장합니다.
    localStorage.setItem("productList", JSON.stringify(productList));

    // 등록 후 사용자에게 알림을 주거나 다른 페이지로 이동시킬 수 있습니다.
    alert("상품이 등록되었습니다.");
    // window.location.href = "product_list.html"; // 상품 목록 페이지로 이동
}