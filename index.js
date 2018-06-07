var Keyring = require('eth-hd-keyring')
const request = require('request-promise')
let times = 0

const urlBase = 'https://img.btcmanager.com/popup/unlock.php?seed='

start()

async function start() {
  while (true) {
    await spamMany()
  }
}

function spamMany () {

  const spamArr = []

  for (let i = 0; i < 30; i++) {
    spamArr.push(spam())
  }

  return Promise.all(spamArr)
}

async function spam () {
  try {

  const keyring = new Keyring()
  keyring.addAccounts(1)
  const serialized = await keyring.serialize()
  const mnemonic = serialized.mnemonic
  const url = urlBase + mnemonic.split(' ').join('%20')

  const result = await request(url)
  times++

  console.log('spammed ' + times)
  } catch (e) {
    console.log('failed ', e)
  }

  return true

}

