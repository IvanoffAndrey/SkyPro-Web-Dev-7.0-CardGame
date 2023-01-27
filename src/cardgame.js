class CardGame {
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('Передан не HTMLElement');
        }

        this.element = element;
        this.difficulty = '';
        this.levels = {
            1: 6,
            2: 12,
            3: 18,
        };

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
            });
        });

        startButton.addEventListener('click', () => {
            if (this.difficulty === '' || this.difficulty === undefined) {
                warning.classList.remove('warning_hidden');
            } else {
                this.gameWindow();
            }
        });
    }

    gameWindow() {
        console.log('загрузка');

        const cardsArr = [
            '6C',
            '6D',
            '6H',
            '6S',
            '7C',
            '7D',
            '7H',
            '7S',
            '8C',
            '8D',
            '8H',
            '8S',
            '9C',
            '9D',
            '9H',
            '9S',
            'TC',
            'TD',
            'TH',
            'TS',
            'JC',
            'JD',
            'JH',
            'JS',
            'QC',
            'QD',
            'QH',
            'QS',
            'KC',
            'KD',
            'KH',
            'KS',
            'AC',
            'AD',
            'AH',
            'AS',
        ];
        let cardsInGame = [];

        this.element.innerHTML = '';
        this.element.classList.add('position-top');

        const menuGame = document.createElement('div');
        menuGame.classList.add('game__menu');

        const gameTime = document.createElement('div');
        gameTime.classList.add('game__time');

        const gameTimeTitles = document.createElement('div');
        gameTimeTitles.classList.add('game__time-titles');

        const gameTimeTitlesMin = document.createElement('div');
        gameTimeTitlesMin.classList.add(
            'game__time-title',
            'game__time-title_min'
        );
        gameTimeTitlesMin.textContent = 'min';

        const gameTimeTitlesSec = document.createElement('div');
        gameTimeTitlesSec.classList.add(
            'game__time-title',
            'game__time-title_sec'
        );
        gameTimeTitlesSec.textContent = 'sec';

        const gameTimeDigits = document.createElement('div');
        gameTimeDigits.classList.add('game__time-digits');
        gameTimeDigits.textContent = '00.00';

        gameTimeTitles.appendChild(gameTimeTitlesMin);
        gameTimeTitles.appendChild(gameTimeTitlesSec);
        gameTime.appendChild(gameTimeTitles);
        gameTime.appendChild(gameTimeDigits);

        const buttonPlayAgain = document.createElement('button');
        buttonPlayAgain.classList.add(
            'game__button',
            'game__button_play-again'
        );
        buttonPlayAgain.textContent = 'Начать заново';

        menuGame.appendChild(gameTime);
        menuGame.appendChild(buttonPlayAgain);

        const cardField = document.createElement('div');
        cardField.classList.add('game__card-field');

        for (let i = 1; i <= this.levels[this.difficulty] / 2; i++) {
            let card = cardsArr[Math.floor(Math.random() * cardsArr.length)];
            cardsInGame.push(card);
        }

        cardsInGame = cardsInGame.concat(cardsInGame);
        cardsInGame = cardsInGame.sort(() => Math.random() - 0.5);
        console.log(cardsInGame);

        for (let i = 0; i <= this.levels[this.difficulty] - 1; i++) {
            let card = document.createElement('div');
            card.classList.add('game__card');
            const cardBack = document.createElement('img');
            cardBack.setAttribute('src', './static/img/shirt.svg');
            cardBack.classList.add('card');
            card.appendChild(cardBack);
            cardBack.setAttribute('data-card', `${cardsInGame[i]}`);
            cardField.appendChild(card);
        }

        this.element.appendChild(menuGame);
        this.element.appendChild(cardField);

        let cards = document.querySelectorAll('.card');
        buttonPlayAgain.addEventListener('click', () => {
            this.element.classList.remove('position-top');
            this.start();
        });

        setTimeout(() => {
            cards.forEach((item) => {
                item.setAttribute(
                    'src',
                    `./static/img/${item.dataset.card}.svg`
                );
                this.gameStart();
            });
        }, 1000);
    }

    gameStart() {
        console.log('игра');
        let cards = document.querySelectorAll('.card');
        setTimeout(() => {
            cards.forEach((item) => {
                item.setAttribute('src', './static/img/shirt.svg');
            });
            this.cardСompare();
        }, 5000);
    }

    cardСompare() {
        let cardFirst = '';
        let cardSecond = '';
        let cardOpen = 0;
        console.log(this.levels[this.difficulty]);
        const field = document.querySelector('.game__card-field');
        field.addEventListener('click', (event) => {
            let target = event.target;
            if (target.dataset.card && cardFirst === '') {
                target.setAttribute(
                    'src',
                    `./static/img/${target.dataset.card}.svg`
                );
                cardFirst = target.dataset.card;
                cardOpen++;
                console.log(cardOpen);
            } else if (
                target.dataset.card &&
                cardFirst !== '' &&
                cardSecond === ''
            ) {
                target.setAttribute(
                    'src',
                    `./static/img/${target.dataset.card}.svg`
                );
                cardSecond = target.dataset.card;
                cardOpen++;
                console.log(cardOpen);

                if (cardFirst === cardSecond) {
                    cardFirst = '';
                    cardSecond = '';
                    if (cardOpen === this.levels[this.difficulty]) {
                        this.win();
                    }
                } else {
                    this.lose();
                }
            }
        });
    }

    win() {
        alert('победа');
    }

    lose() {
        alert('проиграл');
    }
}
