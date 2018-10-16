class Cell {
    constructor(hasMine = false, adjacentMines = null, clickHandler) {
        this.hasMine = hasMine;
        this.adjacentMines = adjacentMines;
        this.open = false;
        this.clickHandler = clickHandler;
        this.htmlElement = this.createHtmlElement();
    }
    reveal(adjacentMines = 0, clicked = false) {
        this.open = true;
        this.adjacentMines = adjacentMines;
        this.updateHtmlElement(clicked);
    }
    onClick() {
        this.clickHandler();
    }
    updateHtmlElement(clicked) {

        const { htmlElement } = this; 
        htmlElement.classList.add('open');

        if(this.hasMine) {
            htmlElement.classList.add('mine');
            if(clicked === true) htmlElement.classList.add('boom')

            htmlElement.innerText = 'x';
        } else {
            if(this.adjacentMines !== 0) {
                htmlElement.innerText = this.adjacentMines;
                htmlElement.dataset.adjMines = this.adjacentMines;
            }
        }
    }
    createHtmlElement() {
        const htmlCell = document.createElement('p');
        htmlCell.classList.add('cell');
        htmlCell.addEventListener('click', () => this.onClick());
        return htmlCell;
    }
    
}