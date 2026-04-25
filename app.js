const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/basicRoutes');

/** creates an Express application */
const app = express();

/** connect to MongoDB */
//const dbURI = 'mongodb+srv://Surya:mnbv1234@ac-yzgewp9-shard-00-00.ywuejys.mongodb.net/blogDB?retryWrites=true&w=majority&authSource=admin&appName=nodetuts';
const dbURI =  'mongodb://Surya:mnbv1234@ac-yzgewp9-shard-00-00.ywuejys.mongodb.net:27017,ac-yzgewp9-shard-00-01.ywuejys.mongodb.net:27017,ac-yzgewp9-shard-00-02.ywuejys.mongodb.net:27017/BookStore?ssl=true&replicaSet=atlas-7mv2qn-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000) && console.log('connected to MongoDB'))
    .catch(err => console.log(err));

/** register view engine 
 * @note EJS templates are processed through the EJS view engine on the server - `server-side rendering`
*/
app.set('view engine', 'ejs');

/** use express framework built-in middleware function to serve static files */
app.use(express.static('public'));
/** use express framework built-in middleware function to parse incoming requests with urlencoded payloads and it's based on body-parser 
 * @description takes all the URL encoded data and passes that into an object that we can use on the request object (i.e. `req.body`)
 */
app.use(express.urlencoded({ extended: true }));
/** use morgan library to create a HTTP request logger middleware function */
app.use(morgan('dev'));

/** Routes HTTP GET requests to the specified path with the specified callback functions */
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

/** blog routes 
 * @description apply all of those router handlers in `/routes/basicRoutes.js` file
*/
app.use('/blogs', blogRoutes);

/** 404 page */
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
