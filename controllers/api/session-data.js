const router = require('express').Router();


router.get('/', (req, res) => {
    // Get session data
    const sessionData = req.session;
    
    // Send the session data as JSON response
    res.json(sessionData);
});

module.exports = router;