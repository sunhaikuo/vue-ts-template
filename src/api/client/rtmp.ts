import axios from 'axios'
export async function getRtmpInfo() {
    return await axios.get('http://localhost:7000/data')
}
