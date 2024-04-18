import { createHmac } from 'crypto'
import { randomBytes } from 'crypto'

class secret {
    secret = ''

    setSecret() {
        this.secret = randomBytes(256).toString('hex')
    }

    getSecret() {
        return this.secret
    }
}

class hmac {
    hmac = ''

    setHmac(key, word) {
        this.hmac = createHmac('sha512', key).update(word).digest('hex')
    }

    getHmac() {
        return this.hmac
    }
}

export const secretKey = new secret()
export const hmacData = new hmac()
