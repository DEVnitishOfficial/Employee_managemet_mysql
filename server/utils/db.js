import mysql from 'mysql'

const dbConnection = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"root",
    password:"",
    database:"employee_management"
})

dbConnection.connect((error) => {
    if(error){
        console.log("Got error while connnection mysql db",error)
    }else{
        console.log('mysql database connected successfully')
    }
})

export default dbConnection