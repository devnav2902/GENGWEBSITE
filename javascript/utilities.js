// function utilities test,filter,learning,inportant
icons.forEach(icon => {
    icon.addEventListener('click',function(event){

        // handle for filter when to click icon              
        if(event.target.classList.contains('utilities')){
            
            // show div items
            items.style.display = 'block';
            // remove div important
            const importantDIV = document.querySelector('.content__importantWord');
            importantDIV.classList.remove('showDivImportant');
            // remove div test
            const testDIV = document.querySelector('.content__test');
            testDIV.classList.remove('showNotifiTest');

            contentRight.style.display = 'flex';
            group_input.style.display = 'none';

            const turnon = document.querySelector('.turnon');
            turnon.classList.add('show');

            // display amount word when click utilities
            let amount = countWord();
            const amountDIV = document.querySelector('.filter .amount');
            amountDIV.textContent = amount;
        }
        else if(event.target.classList.contains('learning')){
            // remove div important
            const importantDIV = document.querySelector('.content__importantWord');
            importantDIV.classList.remove('showDivImportant');
            // remove quiz test
            const contentTest = document.querySelector('.content__test');
            contentTest.classList.remove('showNotifiTest');

            const alert = document.querySelector('.alert');
            alert.classList.remove('show');
            // remove highlight
            const highlight = document.querySelectorAll('.filter');
            highlight.forEach(item => {
                item.classList.remove('clicked');
            })
            const inputSearch = document.querySelector('#input-search');
            inputSearch.classList.remove('clicked');

            // hide div utilities
            const turnon = document.querySelector('.turnon');
            turnon.classList.remove('show');

            contentRight.style.display = 'block';
            group_input.style.display = 'flex';

            displayStorageLatest();

            items.style.display = 'block';
        }
        else if(event.target.classList.contains('important')) {
            // remove quiz test
            const contentTest = document.querySelector('.content__test');
            contentTest.classList.remove('showNotifiTest');

            contentRight.classList.add('hideItem');
            const divRightTool = document.querySelector('.turnon');
            group_input.style.display = 'none';
            divRightTool.classList.remove('show');
            displayImportantWord();

            items.style.display = 'none'
        }
        
    })
})
// ======= events filter =======
document.querySelector('.filter-all').addEventListener('click',displayLocalStorage);
document.querySelector('.filter-alpha').addEventListener('click',displayStorageSorted);
document.querySelector('.filter-today').addEventListener('click',displayTodayWord);
// ======= even clicked input word and mean (highlight form) =======
document.querySelector('#input-search').addEventListener('click',function(){
    displayLocalStorage();

    const filterButton = document.querySelectorAll('.filter-bar .filter');
    filterButton.forEach((element)=>{
        element.classList.remove('clicked');
    })
    this.classList.add('clicked');

})
document.querySelector('#input-word').addEventListener('click',function(){
    document.querySelector('#input-mean').classList.remove('clicked');
    this.classList.add('clicked');
})
document.querySelector('#input-mean').addEventListener('click',function(){
    document.querySelector('#input-word').classList.remove('clicked');
    this.classList.add('clicked');
})

// ======= function remove important word from word important list
document.querySelector('.content__importantWord').addEventListener('click',removeImportantWord);
function removeImportantWord(event){
    const iconRemove = event.target;
    let idWord = parseInt(event.target.nextElementSibling.dataset.id);

    if(event.target.classList.contains('removeWord')){
        document.querySelector('.showAlert').classList.add('showDivEdit');   
        
        // if click accept
        document.querySelector('.accept').addEventListener('click',function(){
            const parent = iconRemove.parentElement.parentElement.parentElement.parentElement.parentElement;
            parent.remove();
            const importantList = document.querySelector('.importantList');

            // check empty importantWord
            let exist = localStorage.getItem('importantWord');
            let getWord;
        
            getWord = JSON.parse(exist);
            let restWord = getWord.filter(word => word['id'] !== idWord);
        
            localStorage.setItem('importantWord',JSON.stringify(restWord));
            // add title for important word list if list empty
            const alert = document.querySelector('.alertImportant');
            if(importantList.children.length === 0){
                alert.textContent = 'Empty List';
                alert.classList.add('importantTitleColor');
            }
            else {
                alert.classList.remove('importantTitleColor');
            }
            
            // after click ok remove alert
            document.querySelector('.showAlert').classList.remove('showDivEdit');   
        })
        // if click cancel remove alert
        document.querySelector('.cancelRemove').addEventListener('click',function(){
            document.querySelector('.showAlert').classList.remove('showDivEdit');   
        })

    }    
}

// ======= event click cancel when form accept appear =======
document.querySelector('.cancel').addEventListener('click',()=>{
    const divEdit = document.querySelector('.editWordMean');
    divEdit.classList.remove('showDivEdit');
})

// ======= function utilities (edit,remove,important); =======

items.addEventListener('click',event => {    
           
    if(event.target.classList.contains('editWord')){
        editWord(event.target);
    }
    else if(event.target.classList.contains('removeWord')){
        removeWord(event.target);
    }
    else if(event.target.classList.contains('importantWord')){        
        importantWord(event.target);
    }
});
// ======= function edit word =======
function editWord(e){

    const divEdit = document.querySelector('.editWordMean');
    divEdit.classList.add('showDivEdit');
    
    const idWord = parseInt(e.nextElementSibling.dataset.id);
    console.log(idWord);
    
    let getWord = JSON.parse(localStorage.getItem('wordList'));
    
    let restID = getWord.filter(item => item['id'] !== idWord);

    let sameID = getWord.filter(item => item['id'] === idWord);    

    const changeWord = document.getElementById('changeWord');
    const changeMean = document.getElementById('changeMean');

    changeWord.value = sameID[0]['word'];
    changeMean.value = sameID[0]['mean'];

    // event click accept edit word or cancel
    document.querySelector('.acceptBUTTON').addEventListener('click',function(event){
        
        let newWord = changeWord.value; 
        let newMean = changeMean.value;

        let objectWord = {
            'word': newWord,
            'mean': newMean,
            'detail': `Edited ${getDateTime()}`,
            'id': idWord
        }
        
        // empty local storage (wordList) and add restID to wordlist empty after add word edited
        storageItems = restID;
        localStorage.setItem('wordList',JSON.stringify(storageItems));
        setLocalStorage(objectWord);
        // update local storage (latestWord)
        vocaLatest = objectWord;
        localStorage.setItem('latestWord',JSON.stringify(vocaLatest));

        const divEdit = document.querySelector('.editWordMean');
        divEdit.classList.remove('showDivEdit');


        displayLocalStorage();        
    })
}
// ======= event for search word =======
inputSearch.addEventListener('keyup',findWord);

// ======= clock =======
(function(){
	var actualizarHora = function(){
		// Obtenemos la fecha actual, incluyendo las horas, minutos, segundos, dia de la semana, dia del mes, mes y año;
		var fecha = new Date(),
			horas = fecha.getHours(),
			ampm,
			minutos = fecha.getMinutes(),
			segundos = fecha.getSeconds(),
			diaSemana = fecha.getDay(),
			dia = fecha.getDate(),
			mes = fecha.getMonth(),
			year = fecha.getFullYear();

		// Accedemos a los elementos del DOM para agregar mas adelante sus correspondientes valores
		var pHoras = document.getElementById('horas'),
			pAMPM = document.getElementById('ampm'),
			pMinutos = document.getElementById('minutos'),
			pSegundos = document.getElementById('segundos'),
			pDiaSemana = document.getElementById('diaSemana'),
			pDia = document.getElementById('dia'),
			pMes = document.getElementById('mes'),
			pYear = document.getElementById('year');

		
		// Obtenemos el dia se la semana y lo mostramos
		var semana = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		pDiaSemana.textContent = semana[diaSemana];

		// Obtenemos el dia del mes
		pDia.textContent = dia;

		// Obtenemos el Mes y año y lo mostramos
		var meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		pMes.textContent = meses[mes];
		pYear.textContent = year;

		// Cambiamos las hora de 24 a 12 horas y establecemos si es AM o PM

		if (horas >= 12) {
			horas = horas - 12;
			ampm = 'PM';
		} else {
			ampm = 'AM';
		}

		// Detectamos cuando sean las 0 AM y transformamos a 12 AM
		if (horas == 0 ){
			horas = 12;
		}

		// Si queremos mostrar un cero antes de las horas ejecutamos este condicional
		// if (horas < 10){horas = '0' + horas;}
		pHoras.textContent = horas;
		pAMPM.textContent = ampm;

		// Minutos y Segundos
		if (minutos < 10){ minutos = "0" + minutos; }
		if (segundos < 10){ segundos = "0" + segundos; }

		pMinutos.textContent = minutos;
		pSegundos.textContent = segundos;
	};

	actualizarHora();
	var intervalo = setInterval(actualizarHora, 1000);
}())