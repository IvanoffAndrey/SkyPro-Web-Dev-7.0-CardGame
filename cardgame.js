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
        for (let i = 1; i <= 3; i++) {
            let buttonDifficulty = document.createElement('button');
            buttonDifficulty.classList.add('difficulty');
            buttonDifficulty.textContent = `${i}`;
            buttonDifficulty.setAttribute('data-difficulty', `${i}`);
            menuDifficulty.appendChild(buttonDifficulty);
        }
        let buttonsDifficulty = menuDifficulty.querySelectorAll('.difficulty');

        const startButton = document.createElement('button');
        startButton.classList.add('game__button', 'game__button_start');
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
                if (button.dataset.difficulty == this.difficulty) {
                    button.classList.add('difficulty_active');
                    warning.classList.add('warning_hidden');
                } else {
                    button.classList.remove('difficulty_active');
                }
            })
        })

        startButton.addEventListener('click', () => {
            if ((this.difficulty === '') || (this.difficulty === undefined)) {
                warning.classList.remove('warning_hidden');
            } else {
                this.gameWindow();
            }
        });
    }   

    gameWindow() {
        console.log('игра');
        this.element.innerHTML = '';
        this.element.classList.add('position-top');

        const menuGame = document.createElement('div');
        menuGame.classList.add('game__menu');

        const gameTime = document.createElement('div');
        gameTime.classList.add('game__time');

        const gameTimeTitles = document.createElement('div');
        gameTimeTitles.classList.add('game__time-titles');

        const gameTimeTitlesMin = document.createElement('div');
        gameTimeTitlesMin.classList.add('game__time-title', 'game__time-title_min');
        gameTimeTitlesMin.textContent = 'min';

        const gameTimeTitlesSec = document.createElement('div');
        gameTimeTitlesSec.classList.add('game__time-title', 'game__time-title_sec');
        gameTimeTitlesSec.textContent = 'sec';

        const gameTimeDigits = document.createElement('div');
        gameTimeDigits.classList.add('game__time-digits');
        gameTimeDigits.textContent = '00.00'

        gameTimeTitles.appendChild(gameTimeTitlesMin);
        gameTimeTitles.appendChild(gameTimeTitlesSec);
        gameTime.appendChild(gameTimeTitles);
        gameTime.appendChild(gameTimeDigits);

        const buttonPlayAgain = document.createElement('button');
        buttonPlayAgain.classList.add('game__button', 'game__button_play-again');
        buttonPlayAgain.textContent = 'Начать заново';

        menuGame.appendChild(gameTime);
        menuGame.appendChild(buttonPlayAgain);

        const cardField = document.createElement('div');
        cardField.classList.add('game__card-field');
        
        switch (this.difficulty) {
            case '1':
                for (let i = 1; i <= 6; i++) {
                    let card = document.createElement('div')
                    card.classList.add('game__card');
                    const cardBack = document.createElement('img');
                    cardBack.setAttribute('src', './img/back.svg');
                    card.appendChild(cardBack);
                    card.setAttribute('data-number', `${i}`);
                    cardField.appendChild(card);
                }
                break;
            case '2':
                for (let i = 1; i <= 12; i++) {
                    let card = document.createElement('div')
                    card.classList.add('game__card');
                    const cardBack = document.createElement('img');
                    cardBack.setAttribute('src', './img/back.svg');
                    card.appendChild(cardBack);
                    card.setAttribute('data-number', `${i}`);
                    cardField.appendChild(card);
                }
                break;
            case '3':
                for (let i = 1; i <= 18; i++) {
                    let card = document.createElement('div')
                    card.classList.add('game__card');
                    const cardBack = document.createElement('img');
                    cardBack.setAttribute('src', './img/back.svg');
                    card.appendChild(cardBack);
                    card.setAttribute('data-number', `${i}`);
                    cardField.appendChild(card);
                }
                break;
        }

        this.element.appendChild(menuGame);
        this.element.appendChild(cardField);

        buttonPlayAgain.addEventListener('click', () => {
            this.element.classList.remove('position-top');
            this.start()});
    }
}