// ======= guess picture =======

const guess_a = document.querySelector('.guess_a');
const guess_b = document.querySelector('.guess_b');
const guess_c = document.querySelector('.guess_c');
const guess_d = document.querySelector('.guess_d');
const showResultDiv = document.querySelector('.result_guess');
const contentAll = document.querySelector('.content_all');
const play = document.querySelector('.play');
const showAlert = document.querySelector('.showAlert');

let correctAnswer;
play.addEventListener('click',function(){
    showAlert.style.display = 'none';
    correctAnswer = nextPicture();
})
guess_a.addEventListener('click',chooseAnswer);
guess_b.addEventListener('click',chooseAnswer);
guess_c.addEventListener('click',chooseAnswer);
guess_d.addEventListener('click',chooseAnswer);

let countCorrect = 0;
let countInCorrect = 0;
let mark = 0;
let countNumberQuestion = 0;

let dataImage = 
    [
        'drink',
        'food',
        'happy',
        'home',
        'hurt',
        'outside',
        'sad',
        'scared',
        'school',
        'tired',
        'angry',
        'grandma'
    ];

let lengOfQuestion = dataImage.length;

// let correctAnswerFirst = nextPicture();
// console.log( nextPicture());

const maxNumber = document.querySelector('.maxNumber');
maxNumber.textContent = dataImage.length;
const currentNumber = document.querySelector('.currentNumber');


function chooseAnswer(event){   
    countNumberQuestion++;

    console.log(correctAnswer['result'],event.target.textContent);
    
    if(event.target.textContent === correctAnswer['result']){
        mark += 500;
        countCorrect++;
        showResult('correct');
        currentNumber.textContent = countNumberQuestion;
    }
    else {
        countInCorrect++;
        showResult('incorrect',correctAnswer['result']);
        currentNumber.textContent = countNumberQuestion;
    }

    const wordDivHide = document.querySelector('.word');

    wordDivHide.style.display = 'none';
    setTimeout(function(){
        // update answer next picture and show next picture
        correctAnswer = nextPicture();
        wordDivHide.style.display = 'flex';

    },1000)


    if(countNumberQuestion === lengOfQuestion){
        setTimeout(function(){
            showYourMark(mark,countCorrect,countInCorrect);
        },1000)
    }
}
function showYourMark(mark,countCorrect,countInCorrect){
    const yourMark = document.querySelector('.yourMark');
    yourMark.style.display = 'block';
    yourMark.innerHTML = `
    <div class="showResult">
        <span class="total">Total: <span class="score">${mark}</span></span>
        <span class="correct">Correct Answer: <span class="correctAns">${countCorrect}</span></span>
        <span class="incorrect">Incorrect Answer: <span class="incorrectAns">${countInCorrect}</span></span>
        <div class="exit">
            <span class="exitgame">
                <a href="index.html" class="returnPage">Exit Game
                </a>
            </span>
            <span class="continue">Play Game</span>
        </div>
    </div>
    `;

    const cont = document.querySelector('.continue');
    cont.addEventListener('click',runGame);
}

function nextPicture(){
    let nameAnswer = 
    [
        'drink',
        'food',
        'happy',
        'home',
        'hurt',
        'outside',
        'sad',
        'scared',
        'school',
        'tired',
        'angry',
        'grandma'
    ];



    const allAnswer = document.querySelectorAll('.guess');
    let arrayAnswer = [];
    allAnswer.forEach(item => arrayAnswer.push(item));

    
    const setImg = document.querySelector('.setImg');
    
    let randomNameImage = dataImage[random(dataImage)];

    // delete image has beed choose
    dataImage = dataImage.filter(item => item !== randomNameImage);
    
    setImg.src = `img/${randomNameImage}.jpg`;
    
    let randomCorrectAnswer = allAnswer[random(allAnswer)];
    randomCorrectAnswer.lastElementChild.textContent = randomNameImage;    

    let restAnswer = arrayAnswer.filter(item => item !== randomCorrectAnswer);
    
    // set answer 1

    let restImg = nameAnswer.filter(item => item !== randomNameImage );
    
    let answer_first = restImg[random(restImg)];    
    restAnswer[0].lastElementChild.textContent = answer_first;
    
    // set answer 2
    let restAnswerSecond = restImg.filter(item => item !== answer_first);

    let answer_second = restAnswerSecond[random(restAnswerSecond)];    
    restAnswer[1].lastElementChild.textContent = answer_second;
    // set answer 3
    let restAnswerThird = restAnswerSecond.filter(item => item !== answer_second);

    let answer_third = restAnswerThird[random(restAnswerThird)];    
    restAnswer[2].lastElementChild.textContent = answer_third;  

    return {"result" :randomNameImage};
}


function showResult(result,correctAnswer){
    // console.log(correctAnswer['result']);
    
    if(result === 'correct')
    {
        showResultDiv.style.display = 'block';
        document.querySelector('.correct_guess').classList.add('active');
        removeResult('.correct_guess');
    }
    else if(result === 'incorrect')
    {
        showResultDiv.style.display = 'block';
        document.querySelector('.incorrect_guess').classList.add('active');
        removeResult('.incorrect_guess');
        document.querySelector('.show_result').textContent = correctAnswer;
    }
}

function removeResult(nameDiv){
    setTimeout(function(){
        document.querySelector(`${nameDiv}`).classList.remove('active');
    },1000)
}

// ======= random element in array =======
function random(array){
    return Math.floor(Math.random()*array.length);
}

function runGame() {
    currentNumber.textContent = 0;
    
    countCorrect = 0;
    countInCorrect = 0;
    mark = 0;
    countNumberQuestion = 0;

    dataImage = 
    [
        'drink',
        'food',
        'happy',
        'home',
        'hurt',
        'outside',
        'sad',
        'scared',
        'school',
        'tired',
        'angry',
        'grandma'
    ];

    const yourMark = document.querySelector('.yourMark');
    yourMark.style.display = 'none';


    showAlert.style.display = 'flex';

}


