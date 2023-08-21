const BooksModel = require('../model/Books')
const books = new BooksModel()

const storeBooks = async (req,res) => {
    try {
        let imageBase64 = ''; // Initialize imageBase64

        if (req.file) {
          const imageFile = req.file; // Get the uploaded image file
          imageBase64 = imageFile.buffer.toString('base64');
        }

        
        const dataToInsert = {
            "Book Cover":imageBase64 ? imageBase64 : '',
            "Book title": req.body.BookTitle,
            "Book Description": req.body.BookDescription,
            "Author" : req.body.Author,
            "Ratings": "",
            "Category" : "",
            "Publish Date": req.body.datePublished,
            "added By": "",
            "Comments" : {}
        }
        
        await books.insertOne(dataToInsert)

        res.setHeader('Content-Type', 'application/json')
           .status(200)
           .json({message: 'successfully Inserted'});

      } catch (err) {
          console.error('Error fetching data from MongoDB:', err);
          res.status(500)
            .json({ error: `Internal server error: ${err}` });
      }
}

const getAllBooks = async (req,res) => {
    const getAllBooks = await books.getAllBooks()

    res.setHeader('Content-Type', 'application/json')
           .status(200)
           .send(getAllBooks);
}

module.exports = {storeBooks,getAllBooks}