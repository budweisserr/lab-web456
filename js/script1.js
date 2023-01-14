var quizData = [
  {//Звичайний
    type: "normal",
    question: "How many ways to check the type of a variable in JavaScript?",
    answers: [
      "0",
      "infinity",
      "depends",
      "3"
    ],
    correct: "3",
  },

  {//З декількома відповідями
    type: "muliple choice",
    question: "What are the three main ways to declare a variable in JavaScript?",
    answers: [
      "var",
      "let",
      "const",
      "variable",
      "int",
      "set",
    ],
    correct: ["var", "let", "const"],
  },

  {//Вести текст
    type: "enter text",
    question: "How to send a value back to the calling code?",
    correct: "return value",
  },

  {//Ввести текст
    type: "enter text",
    question: "What are the four main data types in JavaScript?",
    correct: "number, string, boolean, object",
  },

  {//Ввести HTML-код
    type: "enter text",
    question: "Enter full name of JS:",
    correct: `JavaScript`,
  },

  {//Звичайний
    type: "normal",
    question: "How many ways to call a function in JavaScript?",
    answers: [
      "1",
      "2",
      "4",
      "depends",
    ],
    correct: "4",
  },

  {//З декількома відповідями
    type: "muliple choice",
    question: "How do you create a function in JavaScript?",
    answers: [
      "void function = new function()",
      "def myFunction(args)",
      "function myFunction(){}",
      "var myFunction = function(){}",
      "let myFunction = () => {}",
      "void* myFunction(args)",
    ],
    correct: ["function myFunction(){}", "var myFunction = function(){}", "let myFunction = () => {}"],
  },

  {//Випадаючий
    type: "select",
    question: "What are the three differences between a variable declared with var and let?",
    text: " var is %answer% <br><br> var can %answer% <br><br> var %answer% ",
    answers: [
      "is function scoped and let is block scoped",
      "is hoisted and let is not",
      "be re-declared and let cannot",
      "be restricted",
      "not a let",
      "is the same as let",
      "not compliance the result of code",
      "always const",
    ],
    correct: ["is function scoped and let is block scoped", "be re-declared and let cannot", "is hoisted and let is not"],
  },

  {//З декількома відповідями
    type: "muliple choice",
    question: "What are the three differences between a string and a number data type in JavaScript?",
    answers: [
      "Number allocates more memory than String",
      "String is a set of characters, and Number is a numeric value",
      "String consist of pointers to Number",
      "String has a length property, and Number does not",
      "Number has some references to char than String",
      "String is enclosed in single or double quotes, and Number is not",
    ],
    correct: ["String is a set of characters, and Number is a numeric value", "String is enclosed in single or double quotes, and Number is not", "String has a length property, and Number does not"],
  },

  {//Випадаючий
    type: "select",
    question: "How do you assign a value to a variable in JavaScript?",
    text: " variable = %answer% <br><br> var %answer% <br><br> let %answer%",
    answers: [
      "new var()",
      "(var*)malloc(sizeof(var))",
      "value",
      "variable = value",
      "int variable",
      "i dont know please let me be",
    ],
    correct: ["value", "variable = value", "variable = value"],
  }
];

const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".login_btn");
const overlay = document.querySelector(".overlay");
const submitBtn = document.querySelector(".submit_btn");
const quizInner = document.querySelector(".quiz_inner");
const header = document.querySelector(".header");
var headerContainer;
var taskContainer;
var loginInfo = {};
let score = 0;
let questionIndex = 0;

const bot_token = "1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk";
const chat_id = "-519873227";
const APIRequest = `https://api.telegram.org/bot${bot_token}/sendMessage`;

openModalBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

submitBtn.addEventListener("click", () => {
  submitBtn.onclick = checkAnswer;
  saveInfo();
  changeModal();
  shuffle(quizData);
  showQuestion();

}, { once: true });

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function saveInfo() {
  loginInputs = document.querySelectorAll(".login_input");
  for (i = 0; i < loginInputs.length; i++) {
    var element = loginInputs[i];
    var name = element.name;
    var value = element.value;
    if (name) {
      loginInfo[name] = value;
    }
  }
}

function changeModal() {
  quizInner.innerHTML =
    `<div class="header_container"></div>
    <div class="task_container">
      <ul class="quiz_list">
      </ul>
    </div>`;
  headerContainer = document.querySelector(".header_container");
  taskContainer = document.querySelector(".task_container");
  listContainer = document.querySelector(".quiz_list");
  submitBtn.innerHTML = 'Next';
  quizInner.style.display = 'block';
}

function clearPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function shuffle(array) {
  let j, temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace('%title%', quizData[questionIndex]['question']);
  headerContainer.innerHTML = title;

  if (quizData[questionIndex]['type'] === 'normal') {
    shuffle(quizData[questionIndex]['answers']);
    for (answerText of quizData[questionIndex]['answers']) {
      const questionTemplate =
        `<li>
            <label>
                <input value="%answer%" type="radio" class="answer" name="answer" />
                <span>%answer%</span>
            </label>
        </li>`
      const answerHtml = questionTemplate.replace('%answer%', answerText).replace('%answer%', answerText);
      listContainer.innerHTML += answerHtml;
    }
  }

  else if (quizData[questionIndex]['type'] === 'muliple choice') {
    shuffle(quizData[questionIndex]['answers']);
    for (answerText of quizData[questionIndex]['answers']) {
      const questionTemplate =
        `<li>
            <label>
                <input value="%answer%" type="checkbox" class="answer" name="answer" />
                <span>%answer%</span>
            </label>
        </li>`
      const answerHtml = questionTemplate.replace('%answer%', answerText).replace('%answer%', answerText);
      listContainer.innerHTML += answerHtml;
    }
  }

  else if (quizData[questionIndex]['type'] === 'enter text') {
    const answerHtml =
      `<li>
            <label>
                <input type="text" class="answer" name="answer" placeholder="Answer" />
            </label>
      </li>`
    listContainer.innerHTML = answerHtml;
  }

  else if (quizData[questionIndex]['type'] === 'select') {
    shuffle(quizData[questionIndex]['answers']);

    const selectTemplate = `<select class="quiz_select"></select>`;
    let textTemplate = quizData[questionIndex]['text'];
    for (i = 0; i < quizData[questionIndex]['answers'].length; i++) {
      textTemplate = textTemplate.replace('%answer%', selectTemplate);
    }
    const text = `<p class="select_text"> ${textTemplate}</p>`;
    listContainer.innerHTML = text;

    const selectContainer = taskContainer.querySelectorAll('.quiz_select');
    for (j = 0; j < selectContainer.length; j++) {
      selectContainer[j].innerHTML += `<option selected="selected" disabled="disabled">Select</option>`
      for (i = 0; i < quizData[questionIndex]['answers'].length; i++) {
        selectContainer[j].innerHTML += `<option>${quizData[questionIndex]['answers'][i]}</option>`;
      }
    }
  }
}

function checkAnswer() {
  if (quizData[questionIndex]['type'] === 'normal') {
    const checkedRadio = taskContainer.querySelector('input[type="radio"]:checked');

    const userAnswer = checkedRadio.value;

    if (userAnswer === quizData[questionIndex]['correct']) {
      score++;
    }
  }

  else if (quizData[questionIndex]['type'] === 'muliple choice') {
    const checkedCheckBox = Array.from(taskContainer.querySelectorAll('input[type="checkbox"]:checked'));
    let userAnswer = [];
    for (i = 0; i < checkedCheckBox.length; i++) {
      userAnswer[i] = checkedCheckBox[i].value;
    }

    if (JSON.stringify(quizData[questionIndex]['correct'].sort()) === JSON.stringify(userAnswer.sort())) {
      score++;
    }
  }

  else if (quizData[questionIndex]['type'] === 'enter text') {
    let userAnswer = taskContainer.querySelector('input[type="text"]');

    if (quizData[questionIndex]['correct'] === userAnswer.value) {
      score++;
    }
  }

  else if (quizData[questionIndex]['type'] === 'select') {
    const userAnswerTemplate = Array.from(taskContainer.querySelectorAll('.quiz_select'));
    let userAnswer = [];
    for (i = 0; i < userAnswerTemplate.length; i++) {
      userAnswer[i] = userAnswerTemplate[i].value;
    }

    if (JSON.stringify(quizData[questionIndex]['correct']) === JSON.stringify(userAnswer)) {
      score++;
    }
  }

  if (questionIndex !== 9) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
    sendResults();
  }
}

function showResults() {
  const headerTemplate = `<h2 class="title">Quiz completed!</h2>`;
  headerContainer.innerHTML = headerTemplate;

  const resultTemplate = `<h3 class="result_msg">%result%</h3>`;
  let result = `${loginInfo.name}, you have ${score} / 10`;
  const finalResult = resultTemplate.replace('%result%', result);
  taskContainer.innerHTML = finalResult;
  loginInfo.score = `${score}/10`;

  submitBtn.innerHTML = 'Send results';
  submitBtn.onclick = null;
}

function sendResults() {
  const stringResult = `**JS Quiz**\nName: ${loginInfo.name}\nGroup: ${loginInfo.group}\nScore: ${loginInfo.score}\nЛР JS2022`;

  submitBtn.addEventListener('click', () => {
    //send to Telegram
    axios.post(APIRequest, {
      chat_id: chat_id,
      text: stringResult
    })

    //send to Email
    Email.send({
      SecureToken : "f24b6b7b-e8e2-4106-8224-ac18f1213a46",
      To: "webkpi21@gmail.com",
      From: '"ТР-11 Грушовець Денис" <hrushovets.denys@lll.kpi.ua>',
      Subject: "Test Result",
      Body: stringResult,
    });
    alert("Your result has been sent:\n" + stringResult);
    history.go();
  }, { once: true });
}


