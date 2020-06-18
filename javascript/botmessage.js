const divBotChat = document.querySelector('.botchat');
const content = document.querySelector('.allContent');
const messenger = document.querySelector('.messenger');
const leftDiv = document.querySelector('.left');
const rightDiv = document.querySelector('.right');
const formChat = document.querySelector('.formCHAT');
const botChat = document.querySelector('.botCHAT');
const textBotChat = document.querySelector('.textChatBot');
const userChat = document.querySelector('.userCHAT');
const textUserChat = document.querySelector('.textChatUser');
const formChatBot = document.querySelector('.formChatBot');
const ChatWithBot = document.querySelector('#ChatWithBot');
const sendMess = document.querySelector('.sendMess');
const minium = document.querySelector('.minium');

// sendMess.addEventListener('click',sendTextChat);
formChatBot.addEventListener('submit',sendTextChat);

function sendTextChat(event){
    event.preventDefault();

    let message = ChatWithBot.value;
    ChatWithBot.value = '';

    formChat.insertAdjacentHTML("beforeend",`
        <div class="userCHAT">
            <div class="avatarUSER">
                <p class="textChatUser">${message}</p>
                <img src="images/user.svg" class="avtUser" alt="">
            </div>
        </div>
    `);
    formChat.scrollBy(0, formChat.offsetHeight);
    
    setTimeout(function(){
        fetch("questionofbot.json")
            .then(item => item.json())
            .then(item => getDataBot(item));
    },2000)
}
    
function getDataBot(item){
    let dataJSON = item['question'];
    let messageBot = dataJSON[random(dataJSON)];
    
    formChat.insertAdjacentHTML("beforeend",`
        <div class="botCHAT">
            <div class="avatarBOT">
                <img src="images/bot.svg" class="avtBot" alt="">
                <p class="textChatBot">${messageBot['question']}</p>
            </div>
        </div>
    `);
    formChat.scrollBy(0, formChat.offsetHeight);    
}

rightDiv.addEventListener('click',function(event){
    divBotChat.classList.remove('showBOT');
    minium.style.display = 'flex';
})



