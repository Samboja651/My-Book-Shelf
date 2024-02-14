const express = require('express');
const sqlite3 = require('sqlite3');
const {PrismaClient} = require('@prisma/client');
const bodyParser = require('body-parser');
 
const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());

app.get('/', async (req, res)=> {
    const bookstore = await prisma.BookStore.findMany();
    res.send(bookstore);
})

app.post('/newbook/:book/:status', async (req, res) => {
    const {book, status} = req.params;
    const newbook = await prisma.BookStore.create({
        data: {
            Book: book,
            Status: status
        },
    });
    // console.log(book, status)
    res.redirect('/');
})

app.delete('/delete/:id', async (req, res) =>{
    const id = req.params.id;
    const deletebook = await prisma.BookStore.delete({
        where: {
            id: Number(id)
        },
    });
    res.redirect('/');
})

app.put('/update/:id/:status', async (req, res) => {
    let {status, id} = req.params;
    const updateStatus = await prisma.BookStore.update({
        where: {
            id: Number(id),
        },
        data: {
            Status: status
        }
    });
    res.redirect('/')
})
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server active on http://localhost:${PORT}`);
});

