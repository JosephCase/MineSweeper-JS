class Cell {
    constructor(x, y, hasMine = false, adjacentMines = 0, clickHandler) {
        this.x = x;
        this.y = y;
        this.hasMine = hasMine;
        this.adjacentMines = null;
        this.open = false;
        this.clickHandler = clickHandler;
        this.clicked = false;
    }
    reveal(adjacentMines = 0) {
        Object.assign(this, {open: true, adjacentMines});
    }
    onClick() {
        this.clicked = true;
        this.clickHandler(this.hasMine);
    }
    draw() {
        let htmlCell = document.createElement('p');

        
        htmlCell.classList.add('cell');
        if(this.open) {
            htmlCell.classList.add('open');

            if(this.hasMine) {
                htmlCell.classList.add('mine');
                if(this.clicked === true) htmlCell.classList.add('boom')

                htmlCell.innerText = 'x';
            } else {
                if(this.adjacentMines !== 0) {
                    htmlCell.innerText = this.adjacentMines;
                    htmlCell.dataset.adjMines = this.adjacentMines;
                }
            }
        }
            
        htmlCell.addEventListener('click', () => this.onClick());
    
        return htmlCell;
    }
    
}