import express from "express";
import dbConnection from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from 'multer'
import bcrypt from 'bcrypt'
import path from 'path'

const router = express.Router();
const cookieOptions = {
  maxAge: 24 * 7 * 60 * 60 * 1000, // 7 day
  httpOnly: true,
  secure: true,
};

// admin login
router.route("/admin/adminlogin").post((req, res) => {
  const sql = "SELECT * from admin where email = ? and password = ? ";

  dbConnection.query(
    sql,
    [req.body.email, req.body.password],

    (err, result) => {
        console.log('result',result)
      if (err) return res.json({ loginStatus: false, Error: "query error" });

      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email },
          "admin_login_secret",
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, cookieOptions);
        return res.status(200).json({ 
          success:true,
          message : "admin loggedIn successfully",
          result
        })
      }else{
        return res.status(400).json({
           success: false,
           message: "wrong credentials" 
          })
      }
    }
  );
});

// add employee category
router.route("/admin/add_category").post((req,res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  dbConnection.query(sql,[req.body.category],(error,result) => {
    if(error){
      return (
        res.status(400)
        .json({
          success:false,
          message : `Got error from query, ${error}`
        })
      )
    }else{
      return(
        res.status(200)
        .json({
          success:true,
          message : "category created successfully",
          data : result
        })
      )
    }
  })
})

// fetch employee category details
router.route("/category").get((req,res) => {
  const sql = "SELECT * FROM category";
  dbConnection.query(sql,(error,result) => {
    if(error){
      return res.status(400)
      .json({
        success:false,
        message : `Got error from category query ${error}`
      })
    }else{
      return res.status(200)
      .json({
        success: true,
        message: "Fetched category data successfully",
        data : result
      })
    }
  })
})

// image upload of employee 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// add employee details
router.route("/admin/add_employee").post(upload.single('image'), (req, res) => {
  const sql = `INSERT INTO employee 
  (name,email,password, address, salary,image, category_id) 
  VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err){
        return res.status(400)
        .json({
          success:false,
          message:"Got error from hashing password"
        })
      }
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.address,
          req.body.salary, 
          req.file.filename,
          req.body.category_id
      ]
      dbConnection.query(sql, [values], (err, result) => {
          if(err){
            return res.status(400)
            .json({success:false,message:"Got error from sql query"})
          }else{
            return res.status(200)
            .json({success: true, message:"added employee successfully",data:result})
          }
          
      })
  })
})

// fetch employee details
router.route("/employee_details").get((req,res) => {
  const sql = "SELECT * FROM employee";
  dbConnection.query(sql,(error,result) => {
    if(error){
      return res.status(400)
      .json({
        success:false,
        message : `Got error from employee query ${error}`
      })
    }else{
      return res.status(200)
      .json({
        success: true,
        message: "Fetched category data successfully",
        data : result
      })
    }
  })
})

// fetch employee by id
router.route("/employee_details/:id").get((req,res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  dbConnection.query(sql,[id],(error,result) => {
    if(error){
      return res.status(400)
      .json({
        success:false,
        message : `Got error from employee_details by id query ${error}`
      })
    }else{
      return res.status(200)
      .json({
        success: true,
        message: "Fetched category data successfully",
        data : result
      })
    }
  })
})
 // update employee details
router.put('/admin/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
      Where id = ?`
  const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id
  ]
  dbConnection.query(sql,[...values, id], (error, result) => {
      if(error){
        return res.status(400)
        .json({
          success: false,
          message: "Error from edit employee sql query",error})
      }else{
      return res.status(200)
      .json({
        success: true, 
        message: "Employee details edited successfully",
        data : result
      
      })

      }
  })
})

// delete employee
router.delete('/admin/delete_employee/:id', (req,res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  dbConnection.query(sql,[id], (error, result) => {
      if(error){
        return res.status(400)
        .json({
          success: false, 
          message: `Got error while deleting the employee`
        })
      } else{
      return res.status(200)
      .json({
        success: true,
        message: "Employee deleted successfully",
        data : result
      })
      }
  })
})

export { router as adminRouter };
