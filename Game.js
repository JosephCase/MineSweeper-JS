class Game {
    constructor(htmlContainer, size = 10, mineChance = 0.1, onEnd = null) {
        this.htmlContainer = htmlContainer;
        this.size = size;
        this.mineChance = mineChance;
        this.ended = false;
        this.mineField = this.createMineField(this.cellClickHandler.bind(this), this.size, this.mineChance);
        this.onEnd = onEnd;
        this.isCompleteDebounced = this.debounce(this.isComplete.bind(this), 1);
    }
     
    createMineField(cellClickHandler, size, mineChance) {

        let grid = [];

        for (let x = 0; x < size; x++) {
            let column = [];
            for (let y = 0; y < size; y++) {
                const hasMine = Math.random() < mineChance;
                const cell = new Cell(hasMine, 0, () => cellClickHandler(x, y, hasMine));
                column = [...column, cell];
            }
        
            grid = [...grid, column];
            
        }

        return grid;
    }
    
    cellClickHandler(x, y, hasMine) {

        if(this.ended) return;
        
        this.revealCell(x,y,true);

        if(hasMine) {
            this.lose();
        }

    }

    revealCell(x,y, clicked = false) {

        const cell = this.getCell(x,y);
        const adjacentMineCount = this.countAdjacentMines(x,y);

        cell.reveal(adjacentMineCount, clicked);

        if(adjacentMineCount === 0) this.revealAdjacent(x,y);

        this.isCompleteDebounced();

    }

    debounce(func, delay) {
        let inDebounce;
        return function() {
            clearTimeout(inDebounce)
            inDebounce = setTimeout(func, delay)
        }
    }

    revealAdjacent(x,y) {
        setTimeout(() => {
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    let cell = this.getCell(i,j);
                    if(cell && !cell.hasMine && !cell.open) this.revealCell(i,j);
                }
            }
        })
    }

    countAdjacentMines(x, y) {
        let mineCount = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                let cell = this.getCell(i,j);
                if(cell && cell.hasMine) mineCount++;
            }
        }
        return mineCount;
    }

    getCell(x, y) {
        if(!this.mineField[x] || !this.mineField[y]) {
            return null;
        }
        return this.mineField[x][y];
    }

    getMineField1d() {
        return this.mineField.reduce((acc, item) => [...acc, ...item], []);
    }

    isComplete() {
        if(this.getMineField1d().every((elem) => (
            elem.open === true || elem.hasMine === true
        ))) {
            this.win();
        }
    }

    revealMines() {
        this.getMineField1d().forEach(cell => {
            if(!cell.open && cell.hasMine) {
                cell.reveal();
            }
        })
    }

    lose() {
        this.ended = true;
        this.revealMines();
        if(this.onEnd) {
            this.onEnd(false);
        } else {
            setTimeout(() => alert('You Lose'), 500);
        }
    }
    win() {
        this.ended = true;
        if(this.onEnd) {
            this.onEnd(true);
        } else {
            setTimeout(() => alert('You Win'), 500);
        }
    }

    draw() {
        this.htmlContainer.innerHTML = '';
        this.getMineField1d().forEach(cell => {
            this.htmlContainer.appendChild(cell.htmlElement);
        })
    }
}






