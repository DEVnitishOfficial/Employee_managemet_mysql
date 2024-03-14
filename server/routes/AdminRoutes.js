import express from "express";
import dbConnection from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const cookieOptions = {
  maxAge: 24 * 7 * 60 * 60 * 1000, // 7 day
  httpOnly: true,
  secure: true,
};

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

export { router as adminRouter };
