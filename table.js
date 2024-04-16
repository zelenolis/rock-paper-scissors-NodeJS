

class newGameTable {
    table = [];
    newArgs = [];

    setTable(...args) {
        this.newArgs = [...args];
        const len = this.newArgs.length;
        for (let n = 0; n <= len; n++) {
            const newRow = [];
            newRow.fill(0, 0, len+1);
            this.table.push(newRow);
        }
        for (let i = 0; i <= len; i++) {
            for (let j = 0; j <= len; j++) {
                if (i === 0 && j === 0) {
                    this.table[0][0] = "v bot / player >";
                    continue
                }
                if (i === 0 && j > 0) {
                    this.table[i][j] = this.newArgs[j - 1];
                    continue
                }
                if (j === 0 && i > 0) {
                    this.table[i][j] = this.newArgs[i - 1];
                    continue
                }
                if (i === j) {
                    this.table[i][j] = "draw";
                    continue
                }
                if (i > j && (i - j - 1 >= (len - 1)/2) ) {
                    this.table[i][j] = "win";
                    continue
                }
                if (j > i && (j - i - 1 < (len - 1)/2) ) {
                    this.table[i][j] = "win";
                    continue
                }
                this.table[i][j] = "lose";
            }
        }
    }

    printTable() {
        console.table(this.table);
    }

    getWins(you, bot) {
        let b = this.newArgs.indexOf(you);
        let a = this.newArgs.indexOf(bot);
        return this.table[a + 1][b + 1];
    }
}

export const gameTable = new newGameTable;