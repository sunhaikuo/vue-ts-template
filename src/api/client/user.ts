import axios from 'axios'
export async function getData() {
    return await axios.get('http://localhost:7000/data')
}
