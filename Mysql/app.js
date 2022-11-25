const express= require('express');
const mysql=require('mysql');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080; 
const app = express ();
app.use(bodyParser.json());

var conexion = mysql.createConnection({
    host:'localhost',
    database:'maxisoft',
    user:'root',
    password:''
})

app.get('/servicio',(req,res)=>{ 
    const sql = 'SELECT * FROM servicios';
    conexion.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results);
        }else{
            res.send('Not result')
        }
    })
})
app.get('/servicio/:id_servicio',(req,res)=>{ 
    const {id_servicio} = req.params
    const sql = `SELECT * FROM servicios WHERE id_servicio = ${id_servicio}`
    conexion.query(sql,(error,result)=>{
        if(error) throw error;
        if(result.length>0){
            res.json(result);
        }else{
            res.send('Not result')
        }
    })
})





app.post('/add',(req,res)=>{
    const sql ='INSERT INTO servicios SET ?';
    const servicioObj = {
        id_servicio :req.body.id_servicio,
        nombre: req.body.nombre,
        estado:req.body.estado
    }

conexion.query(sql,servicioObj,error=>{
    if(error) throw error ;
    res.send('Nuevo Servicio Creado')

})

})

app.put('/update/:id_servicio',(req,res)=>{
    const{id_servicio} = req.params;
    const{nombre, estado}=req.body;
    const sql = `UPDATE servicios set nombre = '${nombre}', estado ='${estado}' 
    WHERE id_servicio=${id_servicio}`
    conexion.query(sql, error=>{
        if(error) throw error ;
        res.send('Servicio Actualizado')
    
    })
})

app.delete ('/delete/:id_servicio',(req,res)=>{
  const {id_servicio}=req.params;
  const sql = `DELETE FROM servicios WHERE id_servicio = ${id_servicio}`;
  conexion.query(sql, error=>{
    if(error) throw error ;
    res.send('Servicio Eliminado')

})
})
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("CONEXION EXITOSA");
    }
})

app.listen(PORT, ()=>console.log(`Server  running on port ${PORT}`))