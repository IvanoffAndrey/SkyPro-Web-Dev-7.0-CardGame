class CardGame {
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('Передан не HTMLElement');
        }

        this.element = element;
        this.difficulty = '';
       
        this.start();
    }

    start() {
        this.element.innerHTML = '';

        const startWindow = document.createElement('div');
        startWindow.classList.add('game__start-window');

        const header = document.createElement('h1');
        header.classList.add('game__header');
        header.textContent = 'Выбери сложность';

        const menuDifficulty = document.createElement('div');
        menuDifficulty.classList.add('game__menu-difficulty');
        for(let i = 1; i <= 3; i++) {
            let buttonDifficulty = document.createElement('button');
            buttonDifficulty.classList.add('difficulty');
            buttonDifficulty.textContent = `${i}`;
            buttonDifficulty.setAttribute('data-difficulty', `${i}`);
            menuDifficulty.appendChild(buttonDifficulty);
        }
        let buttonsDifficulty = menuDifficulty.querySelectorAll('.difficulty');
        
        const startButton = document.createElement('button');
        startButton.classList.add('game__start-button');
        startButton.textContent = 'Старт';

        const warning = document.createElement('p');
        warning.textContent = 'Выберите сложность';
        warning.classList.add('warning', 'warning_hidden');

        startWindow.appendChild(header);
        startWindow.appendChild(menuDifficulty);
        startWindow.appendChild(startButton);
        startWindow.appendChild(warning);
        this.element.appendChild(startWindow);

        menuDifficulty.addEventListener('click', (event) => {
            const target = event.target;
            this.difficulty = target.dataset.difficulty;
            console.log(this.difficulty);

            buttonsDifficulty.forEach((button) => {
                if(button.dataset.difficulty == this.difficulty) {
                    button.classList.add('difficulty_active');
                    warning.classList.add('warning_hidden');
                } else {
                    button.classList.remove('difficulty_active');
                }
            })
        })

        startButton.addEventListener('click',() => {
            if((this.difficulty === '') || (this.difficulty === undefined)) {
                warning.classList.remove('warning_hidden');
            } else {
                this.gameWindow();
            }
        });
    }

    gameWindow(){
        console.log('игра');
        this.element.innerHTML = '';
    }
}