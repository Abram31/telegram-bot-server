import axios from 'axios';
export const request = async ()=> {
    const data = await axios.get('https://www.zerkalo.io/')
    return data
}