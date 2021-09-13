const router = require('express').Router()
const { myQuery } = require('../db');
const { usersOnly } = require('../middlewares/verify');



//getting quantity of orders
router.get('/orders', async (req,res)=>{
    try {
            const orders= await myQuery(`SELECT count(cart_id) as orders FROM orders`)
            res.send(orders)
 
    } catch (err) {
        res.status(500).send(err);
    }
})

//getting quantity of products
router.get('/products', async (req,res)=>{
    try {
            const products= await myQuery(`SELECT count(distinct id) as products FROM product`)
            res.send(products)
 
    } catch (err) {
        res.status(500).send(err);
    }
})

//getting cart details for user connected
router.get('/cart/:id', usersOnly, async (req,res)=>{
    try {
        const {user_id} = req.body
        const cart= await myQuery(`SELECT * from carts
        WHERE user_id = '${req.params.id}'`)
        console.log("cart user id is: ",user_id);
        console.log(req.params);
        console.log(req.params.id);
        res.send(cart)
    } catch (err) {
        res.status(500).send(err);
    }
})





module.exports = router 