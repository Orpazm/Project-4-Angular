const { myQuery } = require('../db');



async function createCart(id){
    console.log("function works");
    await myQuery(`UPDATE carts SET status= "closed" WHERE user_id="${id}"`)
    const cart = await myQuery(`INSERT INTO carts (user_id) VALUES ("${id}") `)
    return cart.insertId
}





module.exports= {createCart}