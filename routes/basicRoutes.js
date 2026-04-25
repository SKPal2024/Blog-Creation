const express = require('express');
const blogControllers = require('../controllers/blogControllers');
const router = express.Router();

/** create new blog post */
router.get('/create', blogControllers.blog_create_get);

/** blog routes */
router.get('/', blogControllers.blog_index);

/** set up new blog POST method handler function */
router.post('/', blogControllers.blog_create_post);

/** get the specified blog by its _id 
 * @description it should use semi-colon (`:`) to indicate it's a route parameter
*/
router.get('/:id', blogControllers.blog_details);

/** delete the specified `_id` blog */
router.delete('/:id', blogControllers.blog_delete);

module.exports = router;