import React from 'react'
import axios from 'axios'


const Summary = () => {

    const [summary, setsummary] = React.useState([])

    const SummaryCount = async() =>{
        try{
            const {data} = await axios.get('/postCount')
            setsummary(data[0].title)
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