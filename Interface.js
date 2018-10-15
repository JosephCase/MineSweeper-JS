class Interface {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.htmlElement.querySelector("#replay").addEventListener('click', this.replay.bind(this));

        this.initGame();

    }

    initGame() {
        const board = this.htmlElement.querySelector("#board");
        const size = Math.floor(Math.random() * 10) + 5;

        this.game = new Game(board, size, 0.1, this.handleGameEnd.bind(this));
        board.style.width = board.style.height = `${30 * size}px`;
    }

    handleGameEnd(success) {
        if (success) {
            this.showWin();
        } else {
            this.showLose();
        }
    }

    showWin() {
        this.htmlElement.classList.add('win');
    }
    showLose() {
        this.htmlElement.classList.add('loss');
    }

    replay() {
        this.htmlElement.classList.remove('win', 'loss');
        this.initGame();
    }
}