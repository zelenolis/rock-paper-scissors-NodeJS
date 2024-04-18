class newGameTable {
    table = []
    newArgs = []
    tableForPrint = []

    setTable(...args) {
        this.newArgs = [...args]
        const len = this.newArgs.length
        for (let n = 0; n <= len; n++) {
            const newRow = []
            newRow.fill(0, 0, len + 1)
            this.table.push(newRow)
        }
        for (let i = 0; i <= len; i++) {
            for (let j = 0; j <= len; j++) {
                if (i === 0 && j === 0) {
                    this.table[0][0] = 'v bot / player >'
                    continue
                }
                if (i === 0 && j > 0) {
                    this.table[i][j] = this.newArgs[j - 1]
                    continue
                }
                if (j === 0 && i > 0) {
                    this.table[i][j] = this.newArgs[i - 1]
                    continue
                }
                if (i === j) {
                    this.table[i][j] = 'draw'
                    continue
                }
                if (i > j && i - j - 1 >= (len - 1) / 2) {
                    this.table[i][j] = 'win'
                    continue
                }
                if (j > i && j - i - 1 < (len - 1) / 2) {
                    this.table[i][j] = 'win'
                    continue
                }
                this.table[i][j] = 'lose'
            }
        }
        this.formatTable()
    }

    formatTable() {
        let longest = this.table[0][0].length
        for (let i = 0; i < this.newArgs.length; i++) {
            if (this.newArgs[i].length > longest) {
                longest = this.newArgs[i].length
            }
        }
        for (let i = 0; i < this.table.length; i++) {
            this.tableForPrint.push(['-'.repeat(longest * this.table[0].length + this.table[0].length)])
            let newRow = []
            for (let j = 0; j < this.table[0].length; j++) {
                let l = this.table[i][j].length
                let d = Math.round((longest - l) / 2)
                let newItem = '|' + ' '.repeat(d) + this.table[i][j] + ' '.repeat(d)
                if (j + 1 == this.table[0].length) {
                    newItem += '|'
                }
                newRow.push(newItem)
            }
            this.tableForPrint.push(newRow)
        }
        this.tableForPrint.push(['-'.repeat(longest * this.table[0].length + this.table[0].length - 1)])
    }

    printTable() {
        this.tableForPrint.forEach((val) => {
            let str = val.join('')
            console.log(str)
        })
    }

    getWins(you, bot) {
        let b = this.newArgs.indexOf(you)
        let a = this.newArgs.indexOf(bot)
        let result = this.table[a + 1][b + 1]
        if (result === 'win') {
            return '\x1b[32m' + result + '\x1b[0m\n'
        }
        if (result === 'lose') {
            return '\x1b[31m' + result + '\x1b[0m\n'
        }
        return result
    }
}

export const gameTable = new newGameTable()
