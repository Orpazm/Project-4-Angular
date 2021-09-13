const router = require('express').Router()
const { myQuery } = require('../db');
const { usersOnly, usersAndAdmins } = require('../middlewares/verify');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const moment = require(`moment`);
moment().format();


//getting only blocked dates for orders
router.get('/blocked', usersAndAdmins, async (req, res) => {
    const blockedDateQuery = ` SELECT shipping_date FROM (
        SELECT 
            shipping_date, COUNT(*) AS orders_per_day
        FROM
            orders
        GROUP BY shipping_date
        HAVING orders_per_day >= 3 ) as blocked_dates`;
    try {
        const blockedOrdersDate = await myQuery(blockedDateQuery)
        res.send(blockedOrdersDate)
    } catch (err) {
        res.status(500).send(err);
    }
})


//posting order details for delivery
router.post('/', usersOnly, async (req, res) => {
    try {

        const { id, user_id, cart_id, final_price, shipping_city, shipping_street,
            shipping_date, order_date, last_card_digits, product_name, quantity, total_price } = req.body

        //checking if card number is between 14 and 16 digits
        if(last_card_digits<10000000000000 || last_card_digits > 9999999999999999 ){
            return res.status(400).send({err:"card number is not valid, has to between 14 and 16 digits"})
        }

        const order = await myQuery(`INSERT INTO orders (user_id, cart_id, final_price, shipping_city,
        shipping_street, shipping_date, last_card_digits) 
        VALUES ("${user_id}", ${cart_id}, ${final_price}, "${shipping_city}", "${shipping_street}",
        "${shipping_date}", RIGHT(${last_card_digits},4)) `)

        const items= await myQuery(`SELECT cartitems.id, product.id as product_id, product.img, carts.id as cart_id,
        date_created, product.product_name, quantity, price*quantity as total_price FROM carts INNER JOIN
        cartitems ON carts.id = cartitems.cart_id INNER JOIN product ON cartitems.product_id = product.id
        WHERE user_id = "${user_id}" AND status = 'open'`)

        const closeCart = await myQuery(`UPDATE carts SET status = "closed" WHERE id= ${cart_id}`)

        const newCart = await myQuery(`INSERT INTO carts (user_id) VALUES ("${user_id}")`)
     
console.log("closed cart: ", closeCart);
console.log(newCart);
        console.log(items);
        console.log(items[0].product_name);
            let ship_date = moment(`${shipping_date}`).format('DD-MM-yyyy');
            
            doc.pipe(fs.createWriteStream(`./invoices/${user_id}.pdf`))
             doc
            .fontSize(15)
            .text(`Thank you for shopping with us!`, 200)
            doc.moveDown()
            doc.text(`Order details: `, 100, 150)
            doc.moveDown()
            for (const item of items) {
                doc.text(`${item.quantity}  ${item.product_name}- ${item.total_price}€  `,100)
            }
            doc.moveDown()
            doc.text(`Total paid: ${final_price}€ `) 
            .text(`__________________________________`)
            doc.moveDown()
            doc.text(`Shipping details: `)
            doc.moveDown()
            doc.text(`${shipping_street} street, ${shipping_city}, Israel`)
            .text(``)
            .text(`Shipping date: ${ship_date} `);
             doc.end();
            res.send([order,closeCart, newCart])

    } catch (err) {
       console.log(err);
    }
})


module.exports = router