import { createHmac } from 'crypto';
import { randomBytes } from 'crypto';


class gameBot {

    secretKey = '';
    hmac = '';
    moveVariants = [];
    move = 0;

    setMoveVariants(...moves) {
        this.moveVariants = [...moves];
    }

    getRandomMove() {
        this.setRandomMove();
        this.generateHMAC(this.moveVariants[this.move]);
        return [this.hmac, this.moveVariants[this.move]];
    }

    getSecretKey() {
        return this.secretKey;
    }

    setRandomMove() {
        this.move = 1 + Math.floor(Math.random() * moveVariants.length)
    }

    generateHMAC(word) {
        this.secretKey = randomBytes(256).toString('hex');
        this.hmac = createHmac('sha512', buf).update(word).digest('hex');
    }
}

export const bot = new gameBot;