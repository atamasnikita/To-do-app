let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.buttonadd__main'),
    todo = document.querySelector('.plashka__list'),
    timer = document.querySelector('.timer__value'),
    ButtonTimer = document.querySelector('.add__timeButton'),
    ArrowUp = document.querySelector(".arrow__up"),
    ArrowDown = document.querySelector(".arrow__down"),
    timerValue = document.querySelector('.timer__value'),
    timerButton = document.querySelector('.timer__button'),
    clockButton = document.querySelector('.clock__button'),
    dateChoice = document.querySelector('.head-date__choise'),
    dateNumbers = document.querySelector('.numbersdate'),
    dateTitle = document.querySelector('.header__title-mini'),
    buttonMenu = document.querySelector('.menu_button'),
    arrowPrev = document.querySelector('.arrows__prev'),
    arrowNext = document.querySelector('.arrows__next'),
    current__month = document.querySelector('.current__month'),
    timerWindow = document.querySelector('.timer__window');
// переменные для таймера
    let sdf;
    let time = 0; 
    let minutes = 0;
    let seconds = 0;
    let asd;
    let dateNow = new Date();
// массивы задач и дат
    let tasks = [];
    let dateArr = [];
    let month;
// переменные для дат
    let countTaskDate = 0;
    
    function sendNotification(title, options) {
        // Проверим, поддерживает ли браузер HTML5 Notifications
        if (!("Notification" in window)) {
        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
        }
        
        // Проверим, есть ли права на отправку уведомлений
        else if (Notification.permission === "granted") {
        // Если права есть, отправим уведомление
        var notification = new Notification(title, options);
        
        function clickFunc() {}
        
        notification.onclick = clickFunc;
        }
        
        // Если прав нет, пытаемся их получить
        else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
        // Если права успешно получены, отправляем уведомление
        if (permission === "granted") {
        var notification = new Notification(title, options);
        
        } else {
        alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
        }
        });
        } else {
        // Пользователь ранее отклонил наш запрос на показ уведомлений
        // В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
        }
    }
    
    //смотрим даты
    buttonMenu.addEventListener('click', function(){
        const dateTitle = document.querySelector('.head-date-list');
        dateTitle.classList.toggle('head-date__choise__visib');
        arrowPrev.classList.toggle('head-date__choise__visib');
        arrowNext.classList.toggle('head-date__choise__visib');
    })

    arrowNext.addEventListener('click', function(){
        if(countTaskDate<(dateArr.length-4)*50 && dateArr.length>4){
            dateChoice.style.transform = `translate3d(-${countTaskDate + 50}px, 0px, 0px)`;
            dateChoice.style.transition = 'transform .5s';
            countTaskDate = countTaskDate + 50;
            console
        }
    });
    arrowPrev.addEventListener('click', function(){
        if(countTaskDate>0){
            dateChoice.style.transform = `translate3d(${50 - countTaskDate}px, 0px, 0px)`;
            dateChoice.style.transition = 'transform .5s';
            countTaskDate = countTaskDate - 50;
        }
        
    })

    //рендер при загрузке страницы
    if(localStorage.getItem('tasks') && localStorage.getItem('datefilter')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        dateArr = JSON.parse(localStorage.getItem('datefilter'));
        console.log(tasks);
        tasks.forEach(function(task){
            if(dateNow.getDate() == task.dayget){
                const cssClass = task.done ? 'plashka__list--done' : 'plashka__list__label';
                const taskHTML =`
                    <div id ="${task.id}" data-date = "${task.dayget}" class="plashka__super_puper">
                        <li  class="plashka__list__proba">
                            <span contenteditable="true" class="${cssClass}">${task.text}</span>
                        <li>
                        <div class = "Buttons">
                                <button type="button" data-action ="done" class="Button-done"></button>
                                <button type="button" data-action ="delete" class="Button-delete"></button>
                        </div>
                    </div>`;
                    todo.insertAdjacentHTML('beforeend', taskHTML);
            }
        })
        dateArr.forEach(function(dates){
            dateHTML =`
            <p class = "numbersdate">${dates}</p>`;
            dateChoice.insertAdjacentHTML('beforeend', dateHTML);
        })
        current__month.innerText =localStorage.getItem('month');
    }

    //слушаем даты и рендерим по дате
    dateChoice.addEventListener('click', function(event){
        let filterNumb = event.target;
        let count = Number(filterNumb.innerText);
        console.log(count);
        const nonActive = document.querySelectorAll(`[data-date=${CSS.escape(count)}]`);
        const nonActives = document.querySelectorAll("[data-date]");
        for(let i = 0; i < nonActives.length; i++){
            nonActives[i].parentNode.removeChild(nonActives[i]);
            console.log(nonActive);
        };
        tasks.forEach(function(task){
            if(task.dayget == count){
                const cssClass = task.done ? 'plashka__list--done' : 'plashka__list__label';
                const taskHTML =`
                <div id ="${task.id}" data-date = "${task.dayget}" class="plashka__super_puper">
                    <li  class="plashka__list__proba">
                        <span contenteditable="true" class="${cssClass}">${task.text}</span>
                    <li>
                    <div class = "Buttons">
                            <button type="button" data-action ="done" class="Button-done"></button>
                            <button type="button" data-action ="delete" class="Button-delete"></button>
                    </div>
                </div>`;
                todo.insertAdjacentHTML('beforeend', taskHTML); 
                console.log(task.dayget); 
            }
            
        })

    })
    
    
    
    clockButton.addEventListener('click', function(){
        timerWindow.classList.toggle('timer__window--clock'); 
        clearInterval(asd);
        time = 0;
        minutes = 0;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = 0;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    });

    ArrowUp.addEventListener('click', function(){
        time = time + 300;
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    });

    ArrowDown.addEventListener('click', function(){
        if(time<=0 || time <300){

        }else{
        time = time - 300;
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    }
    });

    timerButton.addEventListener('click', function(){
            asd = setInterval(timers, 1000);
            
    });

    function timers(){
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds; 
        timer.innerHTML = `${minutes}:${seconds}`;
        time --;
        if(time<=0){
            clearInterval(asd);
            sendNotification('Время вышло!', {
                body: 'Статус задачи',
                icon: 'icon.jpg',
                dir: 'auto'
                });
        }
    }
// Добавление задачи
    addButton.addEventListener('click', addTask);

// Удаление задачи
    todo.addEventListener('click', deleteTask);

//  Завершение задачи
    todo.addEventListener('click', doneTask);

    
    function addTask (event){
        event.preventDefault();
        
        if(addMessage.value == 0){
            
        } else{
            const taskText = addMessage.value;
            //Добавили объект с задачами
            let date = new Date();
            const newTask = {
                id: Date.now(),
                text: taskText,
                done: false,
                dayget: date.getDate(),
                getMonth: function ConvertToMonth(){
                    let arrMonth = ['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                    let currentMonth = date.getMonth();
                    let stringMonth = arrMonth[currentMonth];
                    return stringMonth;
                },
                getWeekDay: function ConvertToMonth(){
                }
            };
            tasks.push(newTask);
            console.log(newTask.getMonth());
            console.log(newTask.dayget);
            const cssClass = newTask.done ? 'plashka__list--done' : 'plashka__list__label';
            savetoLocalStorage()
            const taskHTML =`
            <div id ="${newTask.id}" data-date = ${newTask.dayget} class="plashka__super_puper">
                <li  class="plashka__list__proba">
                    <span contenteditable="true" class="${cssClass}">${newTask.text}</span>
                <li>
                <div class = "Buttons">
                        <button type="button" data-action ="done" class="Button-done"></button>
                        <button type="button" data-action ="delete" class="Button-delete"></button>
                </div>
            </div>`;
            todo.insertAdjacentHTML('beforeend', taskHTML); 
            // получение минут из задачи
            html = newTask.dayget;
            month = newTask.getMonth();
            if(dateArr.includes(html,0)){
                console.log('ничего не добавлеяем');
                
            }else{
                    dateArr.push(html);
                    console.log('добавляем новое значение');
                    dateHTML =`
                    <p class = "numbersdate">${html}</p>`;
                    dateChoice.insertAdjacentHTML('beforeend', dateHTML);
            }
            localStorage.setItem('month', month);
            current__month.innerText =localStorage.getItem('month');
            savetoLocalStorage();
        }
        addMessage.value ="";
        addMessage.focus();
    };

    function deleteTask (event){
        if (event.target.dataset.action === 'delete'){
        const parentNode =  event.target.closest('.plashka__super_puper');
        const id = parentNode.id;

        const deletDate = parentNode.dataset.date
        console.log(deletDate); 
        const index = tasks.findIndex(function(taskss){
            if(taskss.id == id){
                return true;
            }
        });
        // находим нужную задачу в массиве и удаляем дату
        let days = tasks[index].dayget;
        console.log(days);

        tasks.splice(index, 1);
        parentNode.remove();
        console.log(tasks.includes(deletDate));
        if(tasks.includes(deletDate)){
            console.log('них не делаем')
        }else{
            let index = dateArr.indexOf(Number(deletDate));
            console.log(index);

            dateArr.splice(index, 1);
            dateChoice.innerHTML = '';
            dateArr.forEach(function(dates){
                dateHTML =`<p class = "numbersdate">${dates}</p>`;
                dateChoice.insertAdjacentHTML('beforeend', dateHTML);
            })
        }
    }
        savetoLocalStorage()
    }
    function doneTask (event){
        
        if(event.target.dataset.action === 'done'){
            const parentNode = event.target.closest('.plashka__super_puper');
            const taskTitle = parentNode.querySelector('.plashka__list__label')
            taskTitle.classList.add('plashka__list--done');
            const id = parentNode.id;
            const index = tasks.find(function(task){
                if( task.id == id){
                    return true;
                }
            })
            console.log(index);
            index.done = true;
            savetoLocalStorage();
            clearInterval(asd);
            
        }
    }

    function savetoLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('datefilter', JSON.stringify(dateArr));
    }
