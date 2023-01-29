export const createButton = (text, link) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: text, url: link }]
            ]
        })
    }
}