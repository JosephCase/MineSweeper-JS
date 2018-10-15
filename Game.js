class Game {
    constructor(htmlContainer, size = 10, bombChance = 0.1, onEnd = null) {
        this.htmlContainer = htmlContainer;
        this.size = size;
        this.bombChance = bombChance;
        this.ended = false;
        this.field = this.createField(this.cellClickHandler.bind(this), this.size, this.bombChance);
        this.onEnd = onEnd;
        this.field1d = this.field.reduce((acc, item) => [...acc, ...item], []); //create a linear, 1 dimensional array of all cells
        this.draw();
    }
     
    createField(cellClickHandler, size, bombChance) {

        let field = [];

        for (let x = 0; x < size; x++) {
            let column = [];
            for (let y = 0; y < size; y++) {
                const hasMine = Math.random() < bombChance;
                const cell = new Cell(x, y, hasMine, 0, (hasMine) => cellClickHandler(x, y, hasMine));
                column = [...column, cell];
            }
        
            field = [...field, column];
            
        }

        return field;
    }
    
    cellClickHandler(x, y, hasMine) {

        if(this.ended) return;
        
        this.revealCell(x,y);

        if(hasMine) {
            this.lose();
        } else if(this.isComplete()) {
            this.win();
        }

        this.draw();

    }

    revealCell(x,y) {

        const cell = this.getCell(x,y);
        const adjacentMineCount = this.countAdjacentMines(x,y);

        cell.reveal(adjacentMineCount);

        if(adjacentMineCount === 0) this.revealAdjacent(x,y);

    }

    revealAdjacent(x,y) {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                let cell = this.getCell(i,j);
                if(cell && !cell.hasMine && !cell.open) this.revealCell(i,j);
            }
        }
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
        if(!this.field[x] || !this.field[y]) return null;
        return this.field[x][y];
    }

    isComplete() {
        return this.field1d.every((elem) => (
            elem.open === true || elem.hasMine === true
        ))
    }

    revealAll() {
        this.field1d.forEach(cell => {
            if(!cell.open && cell.hasMine) {
                cell.reveal();
            }
        })
    }

    lose() {
        this.revealAll();
        this.ended = true;
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
        
        // put the cells on the dom - could probably do this better.
        this.htmlContainer.innerHTML = '';
        this.field.forEach(column => column.forEach(cell => {
            this.htmlContainer.appendChild(cell.draw());
        }))
    }
}






