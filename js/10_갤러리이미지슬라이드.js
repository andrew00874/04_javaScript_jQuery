$(function () {
  let idx = 0;
  const width = 300;
  const image_q = $(".slide").length;

  /*
   left : -width * idx,
   첫 번째 이미지 (현재페이지 0)
   left : -300px * 0 = 0
   슬라이드 위치가 0 원래 위치에 존재

   두 번째 이미지 (현재페이지 1)
   left : -300px * 1 = -300px
   슬라이드 래퍼가 왼쪽으로 -300px 이동

   세 번재 이미지 (현재페이지 2)
   left : -300px * 2 = -600px
   슬라이드 래퍼가 왼쪽으로 -600px 이동
 */

  $("#next").click(function () {
    // 1. 현재 페이지가 이미지 총 갯수보다 적을 때
    if (idx < image_q - 1) {
      idx++;
      $(".slide-wrap").animate(
        {
          //0.5s 이미지 교체 왼쪽으로
          left: -width * idx,
        },
        500
      );
    }
  });

  $("#prev").click(function () {
    // 2. 이전 페이지가 0보다 클 때
    if (idx > 0) {
      idx--;
      $(".slide-wrap").animate(
        {
          left: width * idx,
        },
        500
      );
    }
  });
});
