$(function() {
  $("#test-button").on('click', getQuestion);
  function getQuestion() {
    $.ajax ({
      url: "/getQuestion",
      dataType: "json",
      success: function (data) {
        console.log('test');
        console.log(data);
        $("#question-container").html(`
          <p>${data.results[0].question}</p>
          <ul>
            <li>${data.results[0].correct_answer}</li>
            ${data.results[0].incorrect_answers.map((answer) => `<li>${answer}</li>`).join("")}
          </ul>
        `);
      }
    });
  }
});