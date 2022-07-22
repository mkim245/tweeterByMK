//count number of tweet characters
$(document).ready(function () {
  console.log("document is read");
  $('#tweet-text').on('input', function (event) {
    let countChar = $(this).val().length;
    let countRemainChar = 140 - countChar;
    console.log(countRemainChar);
    $('#countNumber').text(function () {
      if (countRemainChar < 0) {
        $('#countNumber').css("color", "red");
      } else {
        $('#countNumber').css("color", "black");
      }
      return countRemainChar;
    });
  });
});