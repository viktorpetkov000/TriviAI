$(function() {
  const socket = io();
  const btnCategory = $('#btn-category');
  const btnQuestion = $('#btn-question');
  const categoryDiv = $('#category');
  const questionDiv = $('#question');

  btnCategory.on('click', () => {
    socket.emit('getCategory');
  });

  btnQuestion.on('click', () => {
    socket.emit('getQuestion');
  });

  socket.on('category', data => {
    categoryDiv.html(JSON.stringify(data));
  });

  socket.on('question', data => {
    console.log(data);
    questionDiv.html(`
      <p>${data.results[0].question}</p>
      <ul>
        <li>${data.results[0].correct_answer}</li>
        ${data.results[0].incorrect_answers.map((answer) => `<li>${answer}</li>`).join("")}
      </ul>
    `);
  });
});