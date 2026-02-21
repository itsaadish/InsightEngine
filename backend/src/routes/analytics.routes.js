const express = require('express');
const { getOverview, getTrends, getTeachers, getTeacherAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all analytics routes with auth middleware
router.use(authMiddleware);

router.get('/overview', getOverview);
router.get('/trends', getTrends);
router.get('/teachers', getTeachers);
router.get('/teachers/:teacher_id', getTeacherAnalytics);

module.exports = router;
