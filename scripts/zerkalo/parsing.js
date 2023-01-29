import { createButton } from "./button.js"

export const parsingAnnounce = (mainBlock) => {
    const announce = mainBlock.querySelector('.b-general')
    const linkAnnounce = mainBlock.querySelector('.header_link').href
    const newsAnnounce = announce.querySelector('._title').textContent
    const button = createButton('Перейти к новости', linkAnnounce)
    return { newsAnnounce: newsAnnounce, button: button }
}

export const parsingNewsBlock = (title) => {
    const textNews = title.textContent
    const linkNews = title.closest('a').href
    const button = createButton('Перейти к новости', linkNews)

    return { textNews: textNews, button: button }
}
