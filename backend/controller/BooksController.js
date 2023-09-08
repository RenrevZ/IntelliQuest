const books = require('../model/Books')
let fs = require('fs');
let path = require('path');
const multer  = require('multer')
require('dotenv').config()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + file.originalname + fileExtension);
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
          // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(req.file.originalname);
          const generatedFilename = req.file.fieldname + '-' + req.file.originalname+ fileExtension;
          
          const dataToInsert = {
            "BookCover": process.env.APP_URL +'uploads/'+ generatedFilename,
            "BookGenre": req.body.genreSelected,
            "BookTitle": req.body.BookTitle,
            "BookSubtitle": req.body.BooksubTitle,
            "BookDescription": req.body.BookDescription,
            "Author": req.body.Author,
            "Ratings": "",
            "Category": "",
            "PublishDate": req.body.datePublished,
            "AddedBy": "",
            "Comments": {},
          }

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
    const getAllBooks = await books.aggregate([
      {
        $unwind: "$BookGenre" // Deconstruct the BookGenre array
      },
      {
        $group: {
          _id: "$BookGenre",
          books: { $push: "$$ROOT" } // Push the entire document into an array
        }
      }
    ]);

    res.setHeader('Content-Type', 'application/json')
       .status(200)
       .send(getAllBooks);
}

const getSingleBook = async (req,res) => {
    try{
      const singleBook = await books.findById(req.params.id);

      if (!singleBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.setHeader('Content-Type', 'application/json')
        .status(200)
        .send(singleBook);
    }catch(err){
      console.error('Error fetching a single book:', err);
      res.status(404).json({ error: 'There was an error fetching the book' });
    }
}

const addToFav = async(req,res) => {
  try{
    const singleBook = await books.updateOne(
                        { _id: req.body.BookID },
                        {
                          $set: { isFav:true },
                        }
                      );

    if (!singleBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ message : 'successfully added book to favorite'});
  }catch(err){
    console.error('Error fetching a single book:', err);
    res.status(404).json({ error: 'There was an error fetching the book' });
  }
}


const fetchFav = async (req,res) => {
  try{
      const Favbooks = await books.aggregate([
        {
          $match: {
            isFav: true 
          }
        },
        {
          $unwind: "$BookGenre" 
        },
        {
          $group: {
            _id: "$BookGenre",
            books: { $push: "$$ROOT" } 
          }
        }
      ]);

      res.setHeader('Content-Type', 'application/json')
        .status(200)
        .send(Favbooks);
  }catch(error){
    res.status(404).json({ error: error.message })
  }
}

const SearchBooks = async (req,res) => {
    try{
      const book = await books.aggregate([
        {
          $match: {
            BookTitle: {
              $regex: req.body.search,  // Search term from req.body
              $options: 'i'  // 'i' for case-insensitive
            }
          }
        },
        {
          $unwind: "$BookGenre" 
        },
        {
          $group: {
            _id: "$BookGenre",
            books: { $push: "$$ROOT" } 
          }
        }
      ]);

      res.setHeader('Content-Type', 'application/json')
        .status(200)
        .send(book);
  }catch(error){
    res.status(404).json({ error: error.message })
  }
}

module.exports = {storeBooks,
                  getAllBooks,
                  getSingleBook,
                  addToFav,
                  fetchFav,
                  SearchBooks
                }