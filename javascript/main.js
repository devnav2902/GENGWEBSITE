// DOM Content Loaded
const ui = new UI();

// window.addEventListener('load',function(){
//     ui.hidePreloader();
// });
setTimeout(function(){
        // window.addEventListener('load',function(){
            ui.hidePreloader();
        // });
},2000)

document.addEventListener("DOMContentLoaded",function(){
 

    // show quote when website loaded
    fetch("quotes.json")
            .then(res => res.json())
            .then(res => randomQuote(res));

    // after 1 minute random quote
    setInterval(()=>{
        fetch("quotes.json")
            .then(res => res.json())
            .then(res => randomQuote(res));
    },60000);

    // show latest word when open website
    displayStorageLatest();

    // add event submit (enter) and click (when user click button)
    group_input.addEventListener('click',function(event){       
        if(event.target.classList.contains('additem')){
            setItem();
        }
    });
    group_input.addEventListener('submit',setItem);
    
    // parallax effect
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);

    // appear bot sound
    const flicker = document.querySelector('.minium');
    let flickerBOT = setInterval(function(){
        flicker.classList.toggle('flicker');
    },1500);

    // click show bot
    minium.addEventListener('click',function(){
        divBotChat.classList.add('showBOT');
        this.style.display = 'none';
        // turn of flicker for bot
        flicker.classList.remove('flicker');
        clearInterval(flickerBOT);

        // bot talk 
        let talk = new Audio('sound/cutietalk.mp3');
        talk.play();    
    })

    // play audio when load page
    let welcome = new Audio('sound/Success-sound-effect.mp3');
    welcome.play();

});

function UI(){}
// hide preloader

UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display = 'none';
}

let vocaLatest = ''; // save object word
let saveWordAndMean = [];

const items = document.querySelector('.items');
const group_input = document.querySelector('.group_input');
const contentRight = document.querySelector('.content-right');
const inputSearch = document.querySelector('#input-search');
const icons = document.querySelectorAll('.icons');

// ======= function input word and meaning sorted =======
function setItem(){
    event.preventDefault();    
    const inputWord = document.querySelector('#input-word');
    const inputMean = document.querySelector('#input-mean');
    
    const itemWord = inputWord.value.toLowerCase();
    const itemMean = inputMean.value.toLowerCase();

    if(itemWord === '' || itemMean === '')
    {
        showItem('Please fill into word form and meaning form',3000);
    }
    else{
        // add loading animate
        const loading = document.querySelector('.loading');
        loading.classList.add('showLoading');
        items.style.display = 'none';
        // remove loading
        setTimeout(()=>{
            loading.classList.remove('showLoading');
            items.style.display = 'block';

            // remove highlight form word and mean
            document.querySelector('#input-word').classList.remove('clicked');
            document.querySelector('#input-mean').classList.remove('clicked');

            showItem('Success !!!',2500);
            
            let success = new Audio('sound/addsuccess.wav');
            success.play();
        },2000)


        // increase and save into object word
        
        let exist = localStorage.getItem('countID');
        let countIdWord;
        if(exist){
            countIdWord = JSON.parse(exist);
        }
        else {
            countIdWord = 0;
        }
        countIdWord++;
        localStorage.setItem('countID',JSON.stringify(countIdWord));

        // console.log(countIdWord);
        let objectWord = {
            'word': itemWord,
            'mean': itemMean,
            'detail': getDateTime(),
            'id': countIdWord
        }
        // console.log(objectWord);
        
        vocaLatest = objectWord;
        localStorage.setItem('latestWord',JSON.stringify(vocaLatest));
        setLocalStorage(objectWord);

        // save id to localstorage

        items.innerHTML = `
            <!-- single customer -->
            <div class="col-11 mx-auto" style="color: lightblue;font-size:2rem">Latest word</div>
            <div class="col-11 mx-auto col-md-6 col-lg-12">
                <div class="card">
                    <div class="card-body">
                    <!-- customer name -->
                    <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${objectWord['word']}</span></h6>
                    <!-- end of customer name -->
                    <!-- customer name -->
                    <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${objectWord['mean']}</span></h6>
                    <!-- end of customer name -->
                    <!-- customer name -->
                    <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${objectWord['detail']}</span></h6>
                    <!-- end of customer name -->  
                    </div>
                    <!-- end of card-body -->
                </div>
            </div>
            <!-- single customer --> `;
        

        inputWord.value = '';
        inputMean.value = '';       
    }
   
}
// ======= show notification =======
function showItem(input,ms){
    const alert = document.querySelector('.alert');
    
    alert.classList.add('show');
    alert.textContent = input;

    setTimeout(()=>{
        alert.classList.remove('show');
    },ms);
}
// ======= function sorted array =======
function bubbleSortStr(arrayWord){
    let n = arrayWord.length;
    
    while(n !== 0) {
    let newn = 0;
        for(let i = 1; i < n; i++){
            if(arrayWord[i] < arrayWord[i - 1]) {
                let save = arrayWord[i];
                arrayWord[i] = arrayWord[i - 1];
                arrayWord[i - 1] = save;
                newn = i;
            }
        }
        n = newn;
    }
    return arrayWord;
}
// ======= function get datetime =======
function getDateTime(){
    let today = new Date();
    let date = today.toLocaleDateString();
    let time = today.toLocaleTimeString();
    // or date = today.toLocaleString()

    return `${date}, ${time}`;
}
// ======= function set local storage =======
function setLocalStorage(object){
    let storageItems;
    let exist = localStorage.getItem('wordList');
    if(exist){
        storageItems = JSON.parse(exist);
    }
    else {
        storageItems = [];
    }
    storageItems.push(object);
    localStorage.setItem('wordList',JSON.stringify(storageItems));
}
// ======= check empty object =======
function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
// ======= find word function =======
function findWord(){
        // displayLocalStorage();

        let inputSearch = document.querySelector('#input-search');
        let valueInput = inputSearch.value.toLowerCase();
        // console.log(itemAll);
        let itemAll = document.querySelectorAll('.items .active');

        itemAll.forEach(item => {    
            let parent = item.firstElementChild.firstElementChild;
            let word = parent.querySelector('#word').textContent.toLowerCase();
            if(word.indexOf(valueInput) !== -1){
                item.style.display = 'block';
            }
            else {
                item.style.display = 'none';
            }
        });

        checkEmpty(); 
}
// ======= check empty for filter's function =======
function checkEmpty(){
    let count = 0;
    
    const itemAll = document.querySelectorAll('.active');
    itemAll.forEach(item => {
        // console.log(item);
        if(item.style.display === 'block'){
            count++;
        }
    })
    
    const activeSearch = document.querySelector('.active-search');

    // show notification if can't find word
    const find = document.querySelector('.showFIND');
    if(count === 0){
        find.classList.add('show');
    }
    else {
        find.classList.remove('show');
    }
}
// ======= function important word =======
function importantWord(e){
    // after add this word to importantWord list => remove class => can't click
    e.classList.remove('importantWord');
    e.parentElement.style.opacity = 0.5;

    // get id word clicked important
    const idWord = parseInt(e.nextElementSibling.dataset.id);
    let addWordImportant;
    let exist = localStorage.getItem('wordList');
    let storageItems;
    
    storageItems = JSON.parse(exist);
    addWordImportant = storageItems.filter(word => word['id'] === idWord);
        
    let importantWord;
    if(localStorage.getItem('importantWord')){
        importantWord = JSON.parse(localStorage.getItem('importantWord'));
    }
    else {
        importantWord = [];
    }
    
    addWordImportant.forEach(object => importantWord.push(object))
    localStorage.setItem('importantWord',JSON.stringify(importantWord));

}
// ======= function remove word =======
function removeWord(e){

    document.querySelector('.showAlert').classList.add('showDivEdit');   
    
    // if click accept
    document.querySelector('.accept').addEventListener('click',function(){
        let parent = e.parentElement.parentElement.parentElement.parentElement;
        // let parentDIV = parent.parentElement;
        let idWord = parseInt(e.nextElementSibling.dataset.id); // get id word to remove in localstorage
        
        parent.parentElement.remove();
    
        // parse data from local storage
        let temp = JSON.parse(localStorage.getItem('wordList'));
        let latestWord = JSON.parse(localStorage.getItem('latestWord'));
        
        // find rest word with id different idWord
        let restItem = temp.filter(item => item['id'] !== idWord);    
        localStorage.setItem('wordList',JSON.stringify(restItem));
        
        // check empty localstorage of latestWord
        if(latestWord['id'] === idWord){
            let restItemLatest = {};
            localStorage.setItem('latestWord',JSON.stringify(restItemLatest));
        }
    
        // display amount word after you remove
        const amountFilter = document.querySelector('.filter .amount');
        let amount = countWord();
        if(amount !== 0){
            amountFilter.textContent = amount;
        }
        else {
            amountFilter.textContent = 0;
        }
        // update amount after remove        
        const amountTitle = document.querySelector('.title .amount');
        if(amountTitle !== null){
            amountTitle.textContent = amount;
        }
        
        // after click ok remove alert
        document.querySelector('.showAlert').classList.remove('showDivEdit');   
        
        if(items.offsetHeight >= 400){
            items.style.overflowY = 'scroll';
        }
        
    })
    // if click cancel remove alert
    document.querySelector('.cancelRemove').addEventListener('click',function(){
        document.querySelector('.showAlert').classList.remove('showDivEdit');   
    })

}
// ======= remove highlight button clicked =======
function addHighlightButton(button){
    const filterButton = document.querySelectorAll('.filter-bar .filter');
    filterButton.forEach((element)=>{
        element.classList.remove('clicked');
    })
    document.querySelector(`${button}`).classList.add('clicked');
    document.querySelector('#input-search').classList.remove('clicked');
}
// ======= function count word from localStorage and display amount =======
function countWord(){
    let exist = localStorage.getItem('wordList');
    let getData;
    let amount;
    if(exist){
        getData = JSON.parse(localStorage.getItem('wordList'));
        amount = 0;
        getData.forEach(item => {
            amount++;
        })
    }
    else {
        amount = 0;
    }
    
    return amount;
}
// ======= function get API for random quote use Fetch API =======
function randomQuote(res){
    let randomQuote = res[random(res)];

    const {
        text: quote,
        author: author
    } = randomQuote;
    
    const displayAuthor = document.querySelector('.author');
    const displayQuote = document.querySelector('.quote');

    displayAuthor.textContent = author;
    displayQuote.textContent = quote;
}
// ======= function hide button when to display storage =======
function hideButtonImportant(allWord){
    let existImportantWord = localStorage.getItem('importantWord');
    let tempImportantWord;
    if(existImportantWord){
        tempImportantWord = JSON.parse(localStorage.getItem('importantWord'));
    }
    else {
        tempImportantWord = [];
    }
    
    let idImportantWord = document.querySelectorAll('.items .importantWord');
    
    Array.from(idImportantWord).forEach(item => {        
        for(let i=0;i<tempImportantWord.length;i++){
            // console.log(tempImportantWord[i]);
            let elementOfButton = item.nextElementSibling;
            let intID = parseInt(elementOfButton.dataset.id);
            if(intID === tempImportantWord[i]['id']){
                elementOfButton.previousElementSibling.classList.remove('importantWord');
                elementOfButton.parentElement.style.opacity = 0.5;                
            }
        }
    });
}


