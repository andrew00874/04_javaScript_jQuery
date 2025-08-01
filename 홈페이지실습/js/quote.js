$(function () {
  $("#getQuote").click(getQuote);
});

function getQuote() {
  $.get("https://api.quotable.io/random").done((data) => {
    $("#quoteResult").html(`
        <div class="success">
            <div class="quote-box">
                <h3> ${data.content} </h3>
                <p> ${data.author} </p>
            </div>
        </div>
        `)
  });
}
