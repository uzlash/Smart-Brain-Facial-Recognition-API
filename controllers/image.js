const Clarifai = require('clarifai')

// initialize the Clarifai API with your api key. 
const app = new Clarifai.App({
    apiKey: 'dfdd0ec5b0574b3cab95e96c6c9792f8'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json("Unable to connect to API"))
}
   
const handleImage = (req, res, db) => {
    const {id} = req.body;
    // id1 = parseInt(id);
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}