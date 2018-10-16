class Interface {
    constructor(htmlElement) {

        this.htmlElement = htmlElement;
        this.game = null;

        this.htmlElement.querySelector("#replay").addEventListener('click', this.replay.bind(this));
        this.createNewGame();

    }

    createNewGame() {

        const board = this.htmlElement.querySelector("#board");
        const size = 10;
        const mineChance = 0.1;

        board.style.width = board.style.height = `${30 * size}px`;  // should this be done within the game?

        this.game = new Game(board, size, mineChance, this.handleGameEnd.bind(this));
        this.game.draw();
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
        this.createNewGame();
    }
}