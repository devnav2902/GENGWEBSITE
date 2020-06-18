// ======= function display local storage =======
function displayStorageLatest(){
    let exist = localStorage.getItem('latestWord');
    let storageItems;

    if(!exist){
        storageItems = null;
    }
    else {
        storageItems = JSON.parse(localStorage.getItem('latestWord'));
        
        if(isEmpty(storageItems)){
            items.innerHTML = `
            <!-- single customer -->
            <div class="col-11 mx-auto latestWord" style="color: lightblue;font-size:2rem">Latest word</div>
            <div class="col-11 mx-auto col-md-6 col-lg-12 active">
                <div class="card">
                    <div class="card-body">
                    <!-- customer name -->
                    <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Please enter a new word :</span><span id="word">Empty</span></h6>
                    <!-- end of customer name -->
                    </div>
                    <!-- end of card-body -->
                </div>
            </div>
            <!-- single customer -->`;
        }
        else {
            items.innerHTML = `
                <!-- single customer -->
                <div class="col-11 mx-auto latestWord" style="color: lightblue;font-size:2rem">Latest word</div>
                <div class="col-11 mx-auto col-md-6 col-lg-12 active">
                    <div class="card">
                        <div class="card-body">
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${storageItems['word']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${storageItems['mean']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${storageItems['detail']}</span></h6>
                        <!-- end of customer name --> 
                        </div>
                        <!-- end of card-body -->
                    </div>
                </div>
                <!-- single customer -->`;
        }
    }
    if(items.offsetHeight > 400){
        items.style.overflowY = 'scroll';
        items.style.height = '400px';
    }
    else{
        items.style.overflow = 'hidden';
        items.style.height = 'auto';
    }
}
// ======= show all word from local storage ======= 
function displayLocalStorage(){
    // empty input search and remove notification
    let inputSearch = document.querySelector('#input-search');
    inputSearch.value = '';

    //add hight for button clicked
    addHighlightButton('.filter-all');

    const find = document.querySelector('.showFIND');
    find.classList.remove('show');

    let exist = localStorage.getItem('wordList');
    let storageItems;

    if(!exist){
        storageItems = null;
    }
    else {
        // empty all word
        items.textContent = '';

        storageItems = JSON.parse(localStorage.getItem('wordList'));
        
        storageItems.forEach(item => {
            items.insertAdjacentHTML('beforeend',`
                <!-- single customer -->
                <div class="col-11 mx-auto col-md-6 col-lg-12 active">
                    <div class="card">
                        <div class="card-body">
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${item['word']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${item['mean']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${item['detail']}</span></h6>
                        <!-- end of customer name --> 
                        <div class="utilities">
                            <span class="icon_edit"><img src="images/edit.svg" class="editWord" alt=""><h2 class="edit" data-id="${item['id']}">edit</h2></span>
                            <span class="icon_important"><img src="images/important.svg" class="importantWord" alt=""><h2 class="edit" data-id="${item['id']}">important</h2></span>
                            <span class="icon_remove"><img src="images/delete.svg" class="removeWord" alt=""><h2 class="edit" data-id="${item['id']}">remove</h2></span>
                        </div>   
                        </div>
                        <!-- end of card-body -->
                    </div>
                </div>
                <!-- single customer -->
            `)
        })

        hideButtonImportant(storageItems);

    }
    
    
    if(items.offsetHeight >= 400){
        items.style.overflowY = 'scroll';
    }
    
    
}
// ======= show all word sorted from local storage =======
function displayStorageSorted(){
    addHighlightButton('.filter-alpha');

    // empty input search and remove notification
    let inputSearch = document.querySelector('#input-search');
    inputSearch.value = '';
    const find = document.querySelector('.showFIND');
    find.classList.remove('show');

    let exist = localStorage.getItem('wordList');
    let storageItems;

    if(!exist){
        storageItems = null;
    }
    else {
        items.textContent = '';

        storageItems = JSON.parse(localStorage.getItem('wordList'));
        let arrVoca = [];
        storageItems.forEach(item => {
            arrVoca.push(item);            
        })

        let wordSave = [];
        arrVoca.forEach(element => {
            wordSave.push(element['word']);
        })
        let arrayWordSorted = bubbleSortStr(wordSave);

        let objectSorted = arrayWordSorted.map((item,index) => {
            let mean = '';
            let detail = '';
            storageItems.forEach((element) => {                
                if(element['word'] === item){
                    mean = element['mean'];
                    detail = element['detail']
                    id = element['id']
                }
            })
            return {'word':item,'mean':mean,'detail':detail,'id': id};
        })
        
        // display item sorted UI
        objectSorted.forEach(item => {
            // console.log(item);
            
            items.insertAdjacentHTML('beforeend',`
                <!-- single customer -->

                <div class="col-11 mx-auto col-md-6 col-lg-12 active">
                    <div class="card">
                        <div class="card-body">
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${item['word']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${item['mean']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${item['detail']}</span></h6>
                        <!-- end of customer name --> 
                        <div class="utilities">
                            <span class="icon_edit"><img src="images/edit.svg" class="editWord" alt=""><h2 class="edit" data-id="${item['id']}">edit</h2></span>
                            <span class="icon_important"><img src="images/important.svg" class="importantWord" alt=""><h2 class="edit" data-id="${item['id']}">important</h2></span>
                            <span class="icon_remove"><img src="images/delete.svg" class="removeWord" alt=""><h2 class="edit" data-id="${item['id']}">remove</h2></span>
                        </div>   
                        </div>
                        <!-- end of card-body -->
                    </div>
                </div>
                <!-- single customer -->
            `)
        })

        hideButtonImportant(storageItems);
        
    }
    if(items.offsetHeight >= 400){
        items.style.overflowY = 'scroll';
    }
}
// ======= show important word list from local storage =======
function displayImportantWord(){
    let exist = localStorage.getItem('importantWord');
    let getWord;

    if(!exist){
        getWord = null;
    }
    else {
        // empty all word
        items.textContent = '';

        getWord = JSON.parse(localStorage.getItem('importantWord'));
        
        const importantDIV = document.querySelector('.content__importantWord');
        const listImpDIV  =document.querySelector('.importantList');
        importantDIV.classList.add('showDivImportant');
        listImpDIV.textContent = '';
        getWord.forEach(item => {
            listImpDIV.insertAdjacentHTML("beforeend",`
                <!-- single customer -->
                <div class="col-11 mx-auto col-md-6 col-lg-12">
                    <div class="card">
                        <div class="card-body">
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${item['word']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${item['mean']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${item['detail']}</span></h6>
                        <!-- end of customer name --> 
                        <div class="utilities">
                            
                            <span class="icon_important"><img src="images/delete.svg" class="removeWord" alt=""><h2 class="edit" data-id="${item['id']}">Remove</h2></span>
                        </div>   
                        </div>
                        <!-- end of card-body -->
                    </div>
                </div>
                <!-- single customer -->
            `);
        });
    }
}
// ======= show today word you has been added list from local storage =======
function displayTodayWord(){
    let exist = localStorage.getItem('wordList');
    let getWord;

    if(!exist){
        getWord = null;
    }
    else {
        // empty all word
        items.textContent = '';

        getWord = JSON.parse(exist);

        let today = getDateTime();

        let Date = today.indexOf(',');
        let getDate = today.slice(0,Date);

        // get word today
        let todayWord = getWord.filter(item => {
            let getTodayList = item['detail'];
            let date = getTodayList.indexOf(',');
            let getDateLocalStorage = getTodayList.slice(0,date);

            return getDate === getDateLocalStorage; 
        });
        
        items.innerHTML = '';
        todayWord.forEach(item => {
            items.insertAdjacentHTML("beforeend",`
                <!-- single customer -->
                <div class="col-11 mx-auto col-md-6 col-lg-12">
                    <div class="card">
                        <div class="card-body">
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-warning">Word :</span><span id="word" >${item['word']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize"><span class="badge badge-success ">Meaning :</span><span id="mean">${item['mean']}</span></h6>
                        <!-- end of customer name -->
                        <!-- customer name -->
                        <h6 class="text-capitalize mx-3"><span class="badge badge-primary mr-2">Details :</span><span id="detail">${item['detail']}</span></h6>
                        <!-- end of customer name -->   
                        </div>
                        <!-- end of card-body -->
                    </div>
                </div>
                <!-- single customer -->
            `);
        });
    }
}


// ======= show menu responsive =======
document.querySelector('.fa-bars').addEventListener('click',function(){
    document.querySelector('.show__menu').classList.add('showMenu');
})
document.querySelector('.closeMenu').addEventListener('click',function(){
    document.querySelector('.show__menu').classList.remove('showMenu');
})