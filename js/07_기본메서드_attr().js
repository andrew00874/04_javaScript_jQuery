$(function () {
  $(".attrDiv").attr("style", "background-color : black");
  $("#changeImage").click(imgFn);
  $("#changeAlt").click(altFn);
  $("#changeLink").click(linkFn);
  $("#disableInput").click(disInputFn);
  $("#enableInput").click(enInputFn);
  $("#checkAttr").click(checkAFn);
  $("#checkProp").click(checkPFn);
  $("#setData").click(setDFn);
  $("#getData").click(getDFn);
});

function imgFn(e) {
  e.preventDefault();
  $("#moviePoster").attr("src", "../img/pumpkin.png");
}
function altFn(e) {
  e.preventDefault();
  $("#moviePoster").attr("alt", "호박");
}
function linkFn(e) {
  e.preventDefault();
  $("#link").attr("href", "https://google.com");
}
function disInputFn(e) {
  e.preventDefault();
  $("#textInput").attr("disabled", true);
}
function enInputFn(e) {
  e.preventDefault();
  $("#textInput").removeAttr("disabled");
  //   $("#textInput").attr("disabled", false);
}

/* 
.attr()
 HTML 코드에 써진 속성 초기값 그대로 보임
 속성을 설정할 때 변경 사항까지 작성해야함

.prop()
 사용자와 상호작용하며 현재 상태를 확인할 수 있음
*/

function checkAFn(e) {
  e.preventDefault();
  const checked = $("#checkbox").attr("checked");
  //attr로 속성변경을 원한다면
  //   $("#checkbox").attr("checked", "checked");
  //   $("#checkbox").attr("checked", true);
  //   $("#checkbox").attr("checked", "");
  // 로 속성설정을 변경하는 값까지 추가해야함
  alert(".attr()의 결과 : " + checked);
}
function checkPFn(e) {
  e.preventDefault();
  const checked = $("#checkbox").prop("checked");
  alert(".prop()의 결과 : " + checked);
}
function setDFn(e) {
  e.preventDefault();
  $("#dataElement").attr("data-id", "12345");
  alert("data-id 가 설정되었습니다.");
}
function getDFn(e) {
  e.preventDefault();
  const dataId = $("#dataElement").attr("data-id");
  alert("data-id : " + (dataId || "없음"));
}
