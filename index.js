import readline from 'readline'
import { bot } from './bot.js'
import { gameTable } from './table.js'
import { secretKey, hmacData } from './secure.js'

const userArgs = process.argv.slice(2)

if (userArgs.length < 3 || userArgs.length % 2 === 0) {
    console.error(`\x1b[31mPlease pass an odd number of arguments greater than or equal to 3.\x1b[0m
For example: \x1b[33mnpm run start rock paper scissors\x1b[0m\n`)
    process.exit(0)
}

let botMove
let secret
let hmac

bot.setMoveVariants(...userArgs)
gameTable.setTable(...userArgs)

function newRound() {
    bot.setRandomMove
    botMove = bot.getRandomMove()
    secretKey.setSecret()
    secret = secretKey.getSecret()
    hmacData.setHmac(secret, botMove)
    hmac = hmacData.getHmac()
}

console.log(`\x1b[36mWelcome to the Game!\x1b[0m\n`)

async function mainLoop() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        let keepGoing = true
        while (keepGoing) {
            console.log(`Bot's HMAC: ${hmac}\n`)
            console.log('Available options:')
            userArgs.forEach((val, index) => {
                console.log(`${1 + index} - ${val}`)
            })
            console.log('0 - stop the game')
            console.log('? - help\n')
            const userInput = await new Promise((resolve) => {
                rl.question('> ', (input) => {
                    resolve(input)
                })
            })

            if (userInput === '?') {
                console.log(`\x1b[36mTable with all wins/lose variants:\x1b[0m\n`)
                gameTable.printTable()
            }

            if (userInput === '0') {
                keepGoing = false
                rl.close()
                process.exit(0)
            }

            if (!isNaN(+userInput)) {
                let you = userArgs[userInput - 1]
                let botm = botMove
                console.log(`Your move: ${you}`)
                console.log(`Bot's move: ${botm}\n`)
                console.log(`You ${gameTable.getWins(you, botm)}\n`)
                console.log(`Bot's secret: ${secret}\n`)

                console.log(`\x1b[36mNew Round!\x1b[0m\n`)
                newRound()
            } else {
                if (userInput !== '?') {
                    console.log('wrong input!')
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }
    process.exit(0)
}

newRound()
mainLoop()
