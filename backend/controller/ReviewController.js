const reviews = require('../model/Reviews')

const storeReviews = async (req,res) => {
    try{
        const dataToInsert = {
            "BookId": req.body.BookId,
            "Rating":req.body.Rating,
            "Description":req.body.Description,
            "userID":req.body.userID
        }

        const insertReview = new reviews(dataToInsert)
        await insertReview.save(dataToInsert)
    }catch(err){
        console.error('Error storing data from MongoDB:', err);
        res.status(400).json({ error: `Internal server error: ${err}` });
    }
}

const getAllReviews = async (req,res) => {
    try{
      const bookReviews = await reviews.find({ BookId: req.params.id });

      if (!bookReviews) {
        return res.status(404).json({ error: 'Reviews not found' });
      }

      res.setHeader('Content-Type', 'application/json')
        .status(200)
        .send(bookReviews);
    }catch(err){
        console.error('Error fetching Reviews:', err);
        res.status(404).json({ error: 'There was an error fetching this book review'});
    }
}

module.exports = {storeReviews,getAllReviews}