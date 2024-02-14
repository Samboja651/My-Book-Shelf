const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
    await prisma.BookStore.create({
        data: {
            Book: 'The Intelligent Investor',
            Status: 'Reading'
        },
    });

    await prisma.BookStore.create({
        data: {
            Book: 'Think and Grow Rich',
            Status: 'Completed'
        },
    });

    await prisma.BookStore.create({
        data: {
            Book: 'On the Rock of Success',
            Status: 'Unread'
        },
    });

    await prisma.BookStore.create({
        data: {
            Book: 'Rich Dad Poor Dad',
            Status: 'Reading'
        },
    });

    await prisma.BookStore.create({
        data: {
            Book: 'The Life of an Eagle',
            Status: 'Completed'
        },
    });
};

main()
.catch(e =>{
    console.error(e);
    process.exit(1);
})
.finally(async() =>{
    await prisma.$disconnect();
});