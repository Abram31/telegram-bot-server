import TelegramApi from "node-telegram-bot-api"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const TOKEN = process.env.REACT_APP_TOKEN
const bot = new TelegramApi(TOKEN, { polling: true })

const commands = {
    start: '/start',
    info: '/info'
}

bot.setMyCommands([{ command: commands.start, description: 'Welcom' }, { command: commands.info, description: 'User information' }])


bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    console.log(text);
    if (text === commands.start) {
        await bot.sendMessage(chatId, `Hello my baby, ${msg.chat.first_name}!`)
        return bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/256/7.webp')
    }
    if (text === commands.info) {
        return bot.sendMessage(chatId, msg.chat.id)
    }
    return bot.sendMessage(chatId, 'I don\'t understand you')
})
console.log(process.env.REACT_APP_TOKEN)