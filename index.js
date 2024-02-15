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
    res.json({books: bookstore});
})

app.post('/newbook/:book/:status', async (req, res) => {
    const {book, status} = req.params;
    if(book.length > 50 || book.length < 2){
        res.status(510).send('Error!\nYour book looks suspicious, check again then retry');
    }
    else if(status.length > 15 || status.length < 2){
        res.status(510).send('Error!\nThe reading status is unsurpported');
    }
    else{
        const newbook = await prisma.BookStore.create({
            data: {
                Book: book,
                Status: status
            },
        });
        res.status(200).send('Book Successfully Added to Shelf');
    }
})

app.put('/update/:id/:status', async (req, res) => {
    let {status, id} = req.params;
    // validation
    if(status.length > 15 || status.length < 2){
        res.status(510).send('Error!\nThe reading status is unsurpported');
    }
    else if(id.length < 1 || id.length > 10 || Number(id) == NaN || Number(id) < 1){
        res.status(510).send("Error! Invalid ID")
    }
    else{
        const dbBookId = await prisma.BookStore.findUnique({
            where: {id: Number(id)},
            select: {id: true}
        });

        if(dbBookId == null){
            res.status(511).send("Failed!\nid not found")
        }
        else{
            const updateStatus = await prisma.BookStore.update({
                where: {
                    id: Number(id),
                },
                data: {
                    Status: status
                }
            });
            res.status(200).send('Success\nreading status has been updated')
        };
    };
});


app.delete('/delete/:id', async (req, res) =>{
    // validation
    const id = req.params.id;

    if(id.length < 1 || id.length > 10 || Number(id) == NaN || Number(id) < 1){
        res.status(510).send("Error! Invalid ID")
    }
    else{
        const dbBookId = await prisma.BookStore.findUnique({
            where: {id: Number(id)},
            select: {id: true}
        })

        if(dbBookId == null){
            res.status(511).send("Failed!\nid not found")
        }
        else{
            const deletebook = await prisma.BookStore.delete({
                where: {
                    id: Number(id)
                },
            });
            res.status(200).send('The Book has been deleted');
        }
    }
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server active on http://localhost:${PORT}`);
});

