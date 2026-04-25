const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

/** Controllers
 * @description it will be the thing that forms the link between our `models` and `views`
 * @summary it seems like the middleman of that use `models` to get data and pass those data into `views` 
 */
const blog_index = (req, res) => {
    // `Model.find()` will find all of documents inside the `blog` collection and sort them with descending order
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('blogs/index', { title: 'All Blogs', blogs: result }))
        .catch(err => console.log(err));
};

const blog_details = (req, res) => {
    // using `req.params.id` because of we're using `:id` on the above
    const blogID = req.params.id;
    Blog.findById(blogID)
        .then(result => res.render('blogs/details', { blog: result, title: 'Blog Details' }))
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: 'Blog not found ...' });
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => console.log(err));
};

const blog_delete = (req, res) => {
    const blogID = req.params.id;
    // always use `Model.findOneAndDelete()` instead of `Model.findOneAndRemove()` unless you have a good reason not to.
    Blog.findByIdAndDelete(blogID)
        .then(result => res.json({ redirect: '/blogs' }))
        .catch(err => console.log(err));
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
};