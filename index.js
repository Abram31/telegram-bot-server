import TelegramApi from "node-telegram-bot-api"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { request } from "./scripts/request.js"
import { JSDOM } from 'jsdom'
import { parsingAnnounce, parsingNewsBlock } from "./scripts/zerkalo/parsing.js"
import { commands } from "./scripts/commands.js"
dotenv.config()
const TOKEN = process.env.REACT_APP_TOKEN
const bot = new TelegramApi(TOKEN, { polling: true })

bot.setMyCommands([{ command: commands.start, description: 'Welcom' }, { command: commands.info, description: 'User information' }, { command: commands.zerkalo, description: 'zerkalo' }])


bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    if (text === commands.start) {
        await bot.sendMessage(chatId, `Hello my baby, ${msg.chat.first_name}!!!`)
        return bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/256/7.webp')
    }
    if (text === commands.info) {
        return bot.sendMessage(chatId, msg.chat.id)
    }
    if (text === commands.zerkalo) {
        const data = await request()
        const DOM = new JSDOM(data.data)
        const mainBlock = DOM.window.document.querySelector('.b-pod')
        const { newsAnnounce, button } = parsingAnnounce(mainBlock)
        bot.sendMessage(chatId, newsAnnounce, button)

        const topNewsBlock = mainBlock.querySelector(".b-topnews")
        const news = topNewsBlock.querySelectorAll("._title")
        news.forEach((title) => {
            const { textNews, button } = parsingNewsBlock(title)
            bot.sendMessage(chatId, textNews, button)
        })
        return;
    }
    return bot.sendMessage(chatId, 'I don\'t understand you')
})
console.log(process.env.REACT_APP_TOKEN)
