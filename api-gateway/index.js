const express = require("express");
const Axios = require("axios");
const cors = require("cors");


const app = express();
app.use(cors())
app.use(express.json())

const port = "9870";

const resource_url ="http://localhost:9000/trips";

app.get('/fetchData',(req,res)=>{
    Axios.get(resource_url).then(response=>{
        res.send(response.data)
    }).catch(err =>{
        console.log(err)
    })
})

app.get("/api:searchQuery",(req,res)=>{
    const keyword = req.params.searchQuery
    // console.log("backendData:"+keyword)
    // res.send("hello from server youjust send :"+keyword)
    Axios.get(resource_url)
    .then(response=>{
        const filterdata = response.data.filter((item)=>{
            return Object.values(item).join('').toLowerCase().includes(keyword.toLowerCase())
        })
        res.send(filterdata)
    })
    
    .catch(err => console.log(err))
})


app.get('/',(req,res)=>{
    res.sendStatus(200)
})

app.listen(port)
console.log("Api gateway running in:"+port);

