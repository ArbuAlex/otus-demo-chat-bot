const { Telegraf } = require('Telegraf')
const fetch = require('node-fetch')
require('dotenv').config()

const DEVICE_URL = `https://dev.rightech.io/api/v1/objects/${process.env.DEVICE_ID}`
const FETCH_PARAMS = {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.RIC_TOKEN}`
    }
}
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.hears('Сразу', async (ctx) => {
    console.log('command sending...')
    response = await fetch(`${DEVICE_URL}/commands/turn_on`, FETCH_PARAMS)
    body = await response.json()
    if (!body.success){
        ctx.reply('Произошла ошибка, проверь, что не так...')
        console.log(body)
    } else {
        ctx.reply('Включил')
    }
})

bot.hears('Таймер', async (ctx) => {
    response = await fetch(`${DEVICE_URL}/automatons/${process.env.AUTOMATON_ID}/start`, FETCH_PARAMS)
    body = await response.json()
    if (!body.success){
        ctx.reply('Произошла ошибка, проверь, что не так...')
        console.log(body)
    } else {
        ctx.reply('Чайник включится через 10 минут')
    }
})

bot.launch()