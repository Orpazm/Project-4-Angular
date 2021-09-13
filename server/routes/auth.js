const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { myQuery } = require('../db');
const {createCart}= require('../dependencies/createCart')

  router.post("/register", async (req, res) => {
    try {
      const { id, email, password } = req.body;
      // check missing info
      if (!id || !email || !password ) {
        return res.status(400).send({err:"missing some info"});
        }
      // check if id taken
        const user= await myQuery(`SELECT * from users WHERE id = '${id}'`)
        console.log(user);
        console.log(user.length);
          if(user.length >0){
            return res.status(400).send({err:"Id already exists"})
        }
        // check if email taken
        const mail= await myQuery(`SELECT * FROM users WHERE email = '${email}'`)
        console.log(mail);
        console.log(mail.length);
          if(mail.length >0){
            return res.status(400).send({err:"Email already exists"})
        }
        //check if id contains letters
        if(id.match(/[^0-9]/)){
          return res.status(400).send({err:"Id is a numeric field, please enter digits only"})
        }
        // check if id is not valid
          if(id.length !=9){
            return res.status(400).send({err:"Id is not valid, has to be 9 digits"})
        }
        //check if email is not valid
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          return res.status(400).send({err:"email address is not valid"})
        }
      // encrypt the password
      const hashedPass = await bcrypt.hash(password, 10);
      // save the user
      const data = await myQuery(`INSERT INTO users (id,email,password) 
      VALUES ("${id}","${email}","${hashedPass}")`)
     res.status(200).send({id:data.insertId});
    } catch (err) {
      res.status(500).send(err);
      console.log(err)
    }
  });

  router.put("/register", async (req, res) => {
    try {
      const {id, city, street, name, surname } = req.body;
      // check missing info
      if (!city || !street || !name || !surname ) {
        return res.status(400).send({err:"missing some info"});
        }
      // update the user
      const data = await myQuery(`UPDATE users SET city="${city}", street="${street}",
      name="${name}", surname="${surname}" WHERE id="${id}"`)
      console.log(data);
      //assign a cart
     const cartId=  await createCart(id)
     console.log(cartId);
     res.status(201).send({data, cartId});
    } catch (err) {
      res.status(500).send(err);
      console.log(err)
    }
  })

  router.post("/login", async (req,res)=>{
    try {
     const { email, password} = req.body
     const users= await myQuery(`SELECT * FROM users WHERE email = '${email}'`)
     //check missing info
     if (!email || !password){
         res.status(400).send({ err:"missing email or password" })
     }
     //user not found
     if (users.length == 0){
             return res.status(400).send({err:"user not found"})
     }
     //password doesn't match
     const isPasswordCorrect= await bcrypt.compare(password, users[0].password)
     if (! isPasswordCorrect){
             return res.status(400).send({err:"wrong password"})
         }
     //save to token
     console.log(users[0]);
     const token = jwt.sign({
         id: users[0].id,
         email: users[0].email,
         name: users[0].name,
         role: users[0].role,
         city: users[0].city,
         street: users[0].street
     }, process.env.TOKEN_SECRET,
      {
          expiresIn:"60m"
     })
     //getting cart_id for user
     console.log("users id is: ", users[0].id);
     const cart_id= await myQuery(`SELECT id as cart_id FROM carts WHERE user_id = '${users[0].id}' AND status = "open"`)

     //getting the user his order dates
     const order_date = await myQuery(`SELECT order_date FROM orders WHERE user_id = '${users[0].id}' `)

     res.send({token, cart_id, order_date})
    } catch (err) {
       res.status(500).send(err)
    }
})





module.exports = router 