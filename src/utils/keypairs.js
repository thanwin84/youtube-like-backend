import {generateKeyPairSync} from 'crypto'

const {privateKey, publicKey} = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
    }
})

export {
    privateKey,
    publicKey
}
