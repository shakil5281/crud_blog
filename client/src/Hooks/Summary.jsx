import React from 'react'
import axios from 'axios'
import { getToken } from '../helper/SessonStorage'

const AxiosHeader = { headers: { "token": getToken() } }
const Summary = () => {

    const [summary, setsummary] = React.useState([])

    const SummaryCount = async() =>{
        try{
            const {data} = await axios.get('/summary',AxiosHeader)
            setsummary(data.summary)
        }catch(err){
            console.log(err)
        }
    }


    React.useEffect(()=>{
        SummaryCount()
    },[])

    return summary;

}

export default Summary