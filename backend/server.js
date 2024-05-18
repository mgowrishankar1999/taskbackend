import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"8008682003aA*",
    database:"user"
})


app.get('/', (req,res) =>{
    const sql = "SELECT * FROM userdetails";
    db.query(sql,(err,result) => {
        if(err)return res.json({message:"error inside server"})
        
        return res.json(result)
    })

})

app.post('/create', (req,res)=>{
    const sql = 'INSERT INTO userdetails (`name`,`email`,`phone`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone
    ]
    db.query(sql, [values],(err, data) => {
        if(err) return res.json("error")
            return res.json(data);
    })
})


app.put('/update/:id', (req,res)=>{
    const sql = 'UPDATE userdetails set `name` = ?, `email` = ? ,`phone` = ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone
    ]
    const id = req.params.id;
    db.query(sql, [...values,id],(err, data) => {
        if(err) return res.json("error")
            return res.json(data);
    })
})

app.delete('/student/:id', (req,res)=>{
    const sql = 'DELETE FROM userdetails WHERE id = ?';
    const id = req.params.id;
    
    db.query(sql, [id],(err, data) => {
        if(err) return res.json("error")
            return res.json(data);
    })
})


app.listen(8081, () => {
    console.log("Listening")
})