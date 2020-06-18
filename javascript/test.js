const testDIV = document.querySelector('.test');
const showAlertTest = document.querySelector('.showAlertTest');
const showDivTest = document.querySelector('.content__test');
const importantDIV = document.querySelector('.content__importantWord');
const removeDIV = document.querySelector('.turnon');
const quizTest = document.querySelector('.quizTest');
const showResultDiv = document.querySelector('.showAnswer');
const incorrect = document.querySelector('.incorrect');
const correct = document.querySelector('.correct');
const timeup = document.querySelector('.timeup');
const correctResult = document.querySelector('.timeupResult .correct');
const showResultTest = document.querySelector('.showResultTest');
const ExitTest = document.querySelector('.ExitTest');
// count time one sentence 
let count = 0;

const handleTestDiv = function(event){
    // remove div important
    importantDIV.classList.remove('showDivImportant');
    // remove div learning
    items.style.display = 'none';
    group_input.style.display = 'none';
    // remove div utilities
    removeDIV.classList.remove('show');
    // show notification for test
    showDivTest.classList.add('showNotifiTest');
    showAlertTest.style.display = 'block';
    // remove content right div
    contentRight.style.display = 'none';

} // ok

// event click test div
testDIV.addEventListener('click',handleTestDiv); // ok

const acceptButton = document.querySelector('.acceptTest');
acceptButton.addEventListener('click',accept);
const cancelButton = document.querySelector('.cancelTest');
cancelButton.addEventListener('click',cancelTest); // ok

// ======= function accept make test =======
function accept(){
    test();
    // hide popup confirm
    showAlertTest.style.display = 'none';
    // hide items utilites
    const contentLeft = document.querySelector('.content-left');
    contentLeft.style.display = 'none';
    // hide quote text
    const quote = document.querySelector('.random__Quote');
    quote.style.display = 'none';
}
// ======= function refuse make test =======
function cancelTest(){
    showAlertTest.style.display = 'none';
    showDivTest.classList.remove('showNotifiTest');
}
// ======= function test =======

// count question 1 2 3 4 ... 
let countQuestion = 0;
// calculator your mark
let yourMark = 0;
let countCorrectQuestion = 0;
let countIncorrectQuestion = 0;

// ======= function test and show result when success =======
function test(){
    countQuestion++;
    
    const questionDIV = document.querySelector('.question');
    questionDIV.innerHTML = `
        <div class="questionNumber">
            <span><span class="number">${countQuestion}<span>. </span></san> The meaning of:</span> 
            <span class="ques"></span>
        </div>
        <div class="questionChoice">
            <div class="answer">A. <span data-answer="a" class="answer_a">heat</span></div>
            <div class="answer">B. <span data-answer="b" class="answer_b">break</span></div>
            <div class="answer">C. <span data-answer="c" class="answer_c">blue</span></div>
            <div class="answer">D. <span data-answer="d" class="answer_d">blond</span></div>
        </div>
        <div class="showAnswer">
            <div class="result correctResult">
                <img src="images/correct.svg" class="correct" alt="">
                <span class="correct"> Correct: </span>you got 500 Points!🐤🐤🙋
            </div>
            <div class="result incorrectResult">
                <img src="images/incorrect.svg" class="incorrect" alt="">
                <span class="incorrect">Incorrect: The correct answer is:</span>
                <span class="answerCorrect">"heat"</span> 
            </div>
            <div class="result timeupResult">
                <img src="images/timeup.svg" class="timeup" alt="">
                <span class="timeup">Time's up: The correct answer is:</span>
                <span class="answerCorrect">"heat"</span> 
            </div>
            <div class="optionTest">
                <span class="next">Next Question</span>
                <span class="exitTest">Exit Test</span>
            </div>
        </div>
    `

    quizTest.style.display = 'block';
    // cout time 1 question = 15s
    count = 15;
    const timeLeft = document.querySelector('.timeLeft');
    timeLeft.textContent = count;

    // show count question
    const countNumber = document.querySelector('.countNumber');    
    countNumber.textContent = countQuestion;

    const showResultDiv = document.querySelector('.showAnswer');

    // get list saved from local storage
    let word;
    let exist = localStorage.getItem('wordList');

    if(exist){
        word = JSON.parse(exist);
    }
    
    let getWordandMean = word.map(function(item){
        return {'word': item['word'], 'mean': item['mean']};
    });

    // get list word from JSON
    fetch("vocabulary.json")
    .then(item => item.json())
    .then(item => getDataJSON(item));

    // get list word and handler event click to answer
    function getDataJSON(item){
        let listWord = item['vocabulary'];
        // push your word list into word list array from json to random word and mean 
        getWordandMean.forEach(item => listWord.push(item));
        
        // random one question (get word and mean random)
        let wordAndMean = listWord[random(listWord)];
        
        let getWord = wordAndMean['word'];
        let getMean = wordAndMean['mean'];

        // display question and multi choice UI
        showQuestion(getWord);
        showAnswer(getMean);

        // ======= event click choice =======
        const answer_a = document.querySelector('.answer_a');
        const answer_b = document.querySelector('.answer_b');
        const answer_c = document.querySelector('.answer_c');
        const answer_d = document.querySelector('.answer_d');

        let clickHandler = function(event) {
            
            // check answer click if correct show alert correct 
            if(event.target.textContent === getMean && event.target.classList !== 'answer'){
                // calculator mark
                countCorrectQuestion++;
                yourMark+=500;

                // show result div
                const divResultCorrect = document.querySelector('.correctResult');
                divResultCorrect.style.display = 'block';
        
                showResultDiv.style.display = 'flex';

                
                let soundCorrect = new Audio('sound/Video-game-bonus-bell-sound-effect.mp3');
                soundCorrect.play();
            }
            else{
                countIncorrectQuestion++;
                
                // show result div
                const divResultInCorrect = document.querySelector('.incorrectResult');
                divResultInCorrect.style.display = 'block';
        
                // show incorrect div and correct answer
                const incorrectResult = document.querySelector('.incorrectResult .answerCorrect');
                
                showResultDiv.style.display = 'flex';
                incorrectResult.textContent = getMean; 


                let soundIncorrect = new Audio('sound/Error-message-sound-effect.mp3');
                soundIncorrect.play();
        
            }
            clearInterval(calTime); // if user click => stop coutdown

            if(countQuestion === 10){
                const nextQuestion = document.querySelector('.next');
                nextQuestion.style.display = 'none';
            }
            // stop click when use clicked
            answer_a.removeEventListener('click',clickHandler);
            answer_b.removeEventListener('click',clickHandler);
            answer_c.removeEventListener('click',clickHandler);
            answer_d.removeEventListener('click',clickHandler);
        } // ok

        answer_a.addEventListener('click',clickHandler);
        answer_b.addEventListener('click',clickHandler);
        answer_c.addEventListener('click',clickHandler);
        answer_d.addEventListener('click',clickHandler);
        
        // exit and show result
        const exitTest = document.querySelector('.exitTest');
        exitTest.addEventListener('click',exit); 

        const nextQuestion = document.querySelector('.next');
        nextQuestion.addEventListener('click',nextQA);

        let calTime = setInterval(()=>{
            count--;
            timeLeft.textContent = count;

            if(count === 0){

                countIncorrectQuestion++;

                timeLeft.textContent = 0;
                clearInterval(calTime);
                
                showResultTimeUp(getMean);

                // if time's up stop click
                answer_a.removeEventListener('click',clickHandler);
                answer_b.removeEventListener('click',clickHandler);
                answer_c.removeEventListener('click',clickHandler);
                answer_d.removeEventListener('click',clickHandler);
            }
        },1000);
        
    }
    
}
// ======= function show result  =======
function showYourResult(){
    // console.log(countQuestion);
    
    if(countQuestion > 10){

        const youResult = document.querySelector('.youResult');
        // const youAnswer = document.querySelector('.you__Answer');
        const correctNumber = document.querySelector('.correctNumber');
        const incorrectNumber = document.querySelector('.incorrectNumber');
        
        youResult.textContent = yourMark;
        correctNumber.textContent = countCorrectQuestion;
        incorrectNumber.textContent = countIncorrectQuestion; 

        showResultTest.style.display = 'block';
        quizTest.style.display = 'none';

        countQuestion = 0;

        let soundCorrect = new Audio('sound/New-high-score-sound-effect.mp3');
        soundCorrect.play();
    }
}
// ======= function show result if user click to exit =======
function showResultTimeUp(mean){
    // show result div
    
    if(countQuestion === 10){
        const nextQuestion = document.querySelector('.next');
        nextQuestion.style.display = 'none';
    }

    const divResultTimeUp = document.querySelector('.timeupResult');
    divResultTimeUp.style.display = 'block';

    const showResultDiv = document.querySelector('.showAnswer');
    showResultDiv.style.display = 'flex';

    const timeupResult = document.querySelector('.timeupResult .answerCorrect');
    timeupResult.textContent = mean; 

}
// ======= function show question =======
function showQuestion(ques){
    const question = document.querySelector('.ques');
    question.textContent = ques;
}
// ======= function show answer =======
function showAnswer(mean){
    const choice = document.querySelectorAll('.answer');
    
    let arrayChoice = [...choice];
    // console.log(arrayChoice);
    
    let setAnswerToChoice;
    setAnswerToChoice = random(arrayChoice);
    
    let saveChoice = arrayChoice[setAnswerToChoice];
    
    saveChoice.firstElementChild.textContent = mean;
    
    let arrayRestChoice = ['bất kì','xin chào','kế hoạch','hoạt động','lĩnh vực','phòng thủ','tấn công', 'xuất sắc','kinh doanh'];
    

    let restChoice = [];
    for(let i=0;i<arrayChoice.length;i++){
        if(arrayChoice[i] !== saveChoice){
            restChoice.push(arrayChoice[i]);
        }
    }
    
    
    //set answer for choice 1
    let randomChoiceFirst;
    randomChoiceFirst = arrayRestChoice[random(arrayRestChoice)];
    restChoice[0].firstElementChild.textContent = randomChoiceFirst;
    
    //set answer for choice 2
    let randomChoiceSecond = [];
    for(let i=0;i<arrayRestChoice.length;i++){
        if(arrayRestChoice[i] !== randomChoiceFirst){
            randomChoiceSecond.push(arrayRestChoice[i]);
        }
    }
    let secondChoice;
    secondChoice = randomChoiceSecond[random(randomChoiceSecond)];
    restChoice[1].firstElementChild.textContent = secondChoice;
    
    // set answer for choice 3
    let randomChoiceThird = [];
    for(let i=0;i<randomChoiceSecond.length;i++){
        if(randomChoiceSecond[i] !== secondChoice){
            randomChoiceThird.push(randomChoiceSecond[i]);
        }
    }
    let thirdChoice = randomChoiceThird[random(randomChoiceThird)];
    restChoice[2].firstElementChild.textContent = thirdChoice;
    
}
// ======= random element in array =======
function random(array){
    return Math.floor(Math.random()*array.length);
}
// ======= function working when user click exit. it will show result =======
function exit(){    
    let soundResult = new Audio('sound/New-high-score-sound-effect.mp3');
    soundResult.play();

    const timeLeft = document.querySelector('.timeLeft');
    timeLeft.textContent = '';

    const countNumber = document.querySelector('.countNumber');    
    countNumber.textContent = '';

    // hide div test
    quizTest.style.display = 'none';
    const question = document.querySelector('.question');
    question.innerHTML = '';

    showResultTest.style.display = 'block';
    showYourResult();

    const youResult = document.querySelector('.youResult');
    const correctNumber = document.querySelector('.correctNumber');
    const incorrectNumber = document.querySelector('.incorrectNumber');
    
    // show result
    youResult.textContent = yourMark;
    correctNumber.textContent = countCorrectQuestion;
    incorrectNumber.textContent = countIncorrectQuestion; 

    // show div result
    quizTest.style.display = 'none';

    // reset 
    countQuestion = 0;
    yourMark = 0;
    countCorrectQuestion = 0;
    countIncorrectQuestion = 0;

}
// ======= function handle if user click next question =======
function nextQA(){
    test();
}

// ======= event click for button exit when show result =======

ExitTest.addEventListener('click',function(){
    showResultTest.style.display = 'none';
    const contentLeft = document.querySelector('.content-left');
    const quote = document.querySelector('.random__Quote');
    showDivTest.classList.remove('showNotifiTest');

    if(document.querySelector("body").offsetWidth < 768){
        contentLeft.style.display = 'flex';
        // hide quote text
        quote.style.display = 'none';
    }
    else {
        contentLeft.style.display = 'block';
        // hide quote text
        quote.style.display = 'block';
    }
})











