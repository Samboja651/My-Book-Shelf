# My-Book-Shelf
This API uses the four main http methods, GET, POST, PUT and DELETE.

The API simulates the following operations done on a book shelf,
>
>>getting a book \
adding a book \
replacing a book \
permanently removing a book from the shelf.

Routes for the operations are

>`GET` all books available in the shelf `/` \
>
>`GET` a book by id    `/:id` \
>
>`POST` add a new book `/newbook/:book/:status` \
>
>`PUT` update reading status of a book `/update/:id/:status` \
>
>`DELETE` permanently remove a book from the shelf `/delete/:id`\

