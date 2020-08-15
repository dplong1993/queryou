const questionsList = document.querySelector(".questions_list");

const getQuestions = async () => {
    const res = await fetch('/api/queries');
    const data = await res.json();
    return data;
};

const populateQuestionsList = async () => {
  const { questions } = await getQuestions();
  for(let question of questions){
    const createdAt = new Date(question.createdAt);
    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    const timestamp = createdAt.toLocaleString("en-US", dateOptions);
    const questionLi = `
      <div class="question-holder">
        <div class="question">
          <div class="question-header">
            Question add · topicName
            <div class="hide_question-button">
              <svg width="24px" height="24px" viewBox="0 0 24 24"><g id="small_close" class="icon_svg-stroke" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke="#666666" stroke-width="1.5"><path d="M12,6 L12,18" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "></path><path d="M18,12 L6,12" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "></path></g></svg>
            </div>
          </div>
          <div class="question-content">
            ${question.content}
          </div>
          <div class="question-answer_info">
            <div class="question-answer_info-count">
              No answer yet
            </div>
            <div class="question-answer_info-timestamp">
              · ${timestamp}
            </div>
          </div>
          <div class="question-footer">
            <div class="answer-button">
              <svg id="answer" width="24px" height="24px" viewBox="0 0 24 24"><g id="answer" transform="translate(2.500000, 3.500000)" stroke="none" stroke-width="1.5" fill="none" fill-rule="evenodd"><g id="pen" transform="translate(9.000000, 9.000000) rotate(-315.000000) translate(-9.000000, -9.000000) translate(7.000000, -1.000000)"><path d="M2,8.8817842e-16 L2,8.8817842e-16 L2,8.8817842e-16 C3.1045695,6.85269983e-16 4,0.8954305 4,2 L4,16 L2.00256278,20 L0,16 L0,2 L0,2 C-1.35267774e-16,0.8954305 0.8954305,1.09108686e-15 2,8.8817842e-16 Z" id="pen_body" class="icon_svg-stroke" stroke="#2e69ff" stroke-linecap="round" stroke-linejoin="round"></path><polygon id="pen_tip" class="icon_svg-fill_as_stroke" fill="#666" transform="translate(2.000000, 18.750000) scale(1, -1) translate(-2.000000, -18.750000) " points="2 17.5 3.25 20 0.75 20"></polygon></g><path d="M12,16 L17,16 L17,11 M7,1 L2,1 L2,6" id="bg" class="icon_svg-stroke" stroke="#2e69ff" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
              <div class="button-text">
                Answer
              </div>
            </div>
          </div>
          <div class="Answer-form">
            <div class="User_info">
              User Info
            </div>
            <div class="Answer_Content">
              <textarea id="Answer-text" placeholder="Write your answer"></textarea>
            </div>
            <div class="Answer-form-footer">
              Button City
            </div>
          </div>
        </div>
      </div>`;
    questionsList.innerHTML += questionLi;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await populateQuestionsList();
});
