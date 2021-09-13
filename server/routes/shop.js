const router = require('express').Router()
const { myQuery } = require('../db');
const { usersOnly, adminsOnly, usersAndAdmins } = require('../middlewares/verify');

//showing the user his cart items
router.get('/cartitems/:id',usersOnly, async (req,res)=>{
    try {
        const {user_id} = req.params.id

        const items= await myQuery(`SELECT cartitems.id, product.id as product_id, product.img, carts.id as cart_id,
        date_created, product.product_name, quantity, price*quantity as total_price FROM carts INNER JOIN
        cartitems ON carts.id = cartitems.cart_id INNER JOIN product ON cartitems.product_id = product.id
        WHERE user_id = "${req.params.id}" AND status = 'open'`)
        res.json(items)
        console.log(user_id);
        console.log(req.params.id);
        console.log(items);
    } catch (err) {
        res.status(500).send(err);
    }
})

//getting searched product
router.get('/searched/:prod', usersAndAdmins, async (req,res)=>{
    try {
            const product= await myQuery(`SELECT * from product where product_name LIKE "%${req.params.prod}%" `)
            console.log("my searched products are:" , product);
            res.send(product)
    } catch (err) {
        res.status(500).send(err);
    }
})

//getting all the categories
router.get('/category', usersAndAdmins, async (req,res)=>{
    try {
        const allCategories = await myQuery(`SELECT * from category`)
        res.json(allCategories)
        console.log(allCategories);
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

//showing products by their categories
router.get('/products/:id', usersAndAdmins, async (req,res)=>{
    try {
        const products = await myQuery(`SELECT * from product where category_id = "${req.params.id}"`)
        console.log("params type is ", req.params.id);
        console.log("prod is ", products);
        res.json(products)
    } catch (err) {
        res.status(500).send(err)
    }
})

//adding product to cart
router.post('/', usersOnly, async (req,res)=>{
    try {
        const {product_id, quantity, cart_id, user_id} = req.body

        // check quantity is at least 1
        if (quantity < 1 ) {
         return res.status(400).send({err:"quantity can't be 0 or less"});
        }

        //check if item already exists in cart
        const itemInCart= await myQuery(`SELECT * FROM cartItems WHERE product_id = ${product_id} AND cart_id = ${cart_id} `)
        if (itemInCart.length>0){
            await myQuery(`UPDATE cartItems SET quantity = quantity + ${quantity} where product_id = ${product_id}`)
        }else{
            const cartItems= await myQuery(`INSERT INTO cartItems (product_id, quantity, cart_id) 
            VALUES (${product_id}, ${quantity}, ${cart_id})`)
        }

        const items= await myQuery(`SELECT cartitems.id, product.id as product_id, product.img, carts.id as cart_id,
        date_created, product.product_name, quantity, price*quantity as total_price FROM carts INNER JOIN
        cartitems ON carts.id = cartitems.cart_id INNER JOIN product ON cartitems.product_id = product.id
        WHERE user_id = "${user_id}" AND status = 'open'`)
        res.json(items)
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

//deleting product from cart
router.delete('/:id',usersOnly, async (req,res)=>{
    try {
        const deletedItems= await myQuery(`DELETE from cartItems WHERE id = ${req.params.id} `)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
        console.log(req.params.id);
    }
})

//deleting all products from cart
router.delete('/all/:id',usersOnly, async (req,res)=>{
    try {
        const cartItems= await myQuery(`DELETE from cartItems WHERE cart_id = ${req.params.id}`)
        console.log("cart id is: ",req.params.id);
        res.send()
        // res.json(cartItems)
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

//getting final price for user's cart
router.get('/finalPrice/:id', usersOnly, async (req,res)=>{
    try {
        const finalPrice= await myQuery(`SELECT SUM(price*quantity) as finalPice FROM carts INNER JOIN
        cartitems ON carts.id = cartitems.cart_id INNER JOIN product ON cartitems.product_id = product.id 
        WHERE user_id = "${req.params.id}" AND status = 'open'`)
        res.json(finalPrice)
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

//admin adding products
router.post('/add',adminsOnly, async (req,res)=>{
    try {
        const {product_name, category_id, price, img} = req.body
        if(!product_name || !category_id || !price || !img){
            res.status(400).send({err:"You must fill all fields in order to add a product"})
        }else{
            const newProducts= await myQuery(`INSERT into product (product_name, category_id, price, img)
            VALUES ("${product_name}",${category_id},${price},"${img}")`)
            res.status(201).send()
        }
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

//admin changing products
router.put('/change',adminsOnly, async (req,res)=>{
    try {
        const {id, product_name, category_id, price, img} = req.body
        const prod= await myQuery(`UPDATE product set product_name= "${product_name}",
        category_id= ${category_id}, price= ${price}, img= "${img}" WHERE id= ${id}`)
        console.log(id);
        console.log(req.params.id);
        console.log(prod);
        res.send()
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})






module.exports = router 