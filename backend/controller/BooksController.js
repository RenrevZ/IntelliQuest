const books = require('../model/Books')
let fs = require('fs');
let path = require('path');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

let upload = multer({ storage: storage }).single('BookCover');

const storeBooks = async (req,res) => {
    try {
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
          }
          console.log(req.body)
          const dataToInsert = {
            "Book Cover": {
              data: fs.readFileSync(req.file.path),
              contentType: 'image/png',
            },
            "Book Title": req.body.BookTitle,
            "Book Description": req.body.BookDescription,
            "Author": req.body.Author,
            "Ratings": "",
            "Category": "",
            "Publish Date": req.body.datePublished,
            "Added By": "",
            "Comments": {},
          };
    
          const insertBook = new books(dataToInsert);
    
          await insertBook.save(dataToInsert);
    
          res.setHeader('Content-Type', 'application/json').status(200).json({ message: 'Successfully Inserted' });
        });
      } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(400).json({ error: `Internal server error: ${err}` });
      }
};

const getAllBooks = async (req,res) => {
    const getAllBooks = await books.getAllBooks()

    res.setHeader('Content-Type', 'application/json')
       .status(200)
       .send(getAllBooks);
}

module.exports = {storeBooks,getAllBooks}