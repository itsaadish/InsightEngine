const { analyticsService } = require('../di/container');
const ResponseFormatter = require('../utils/ResponseFormatter');
const logger = require('../config/logger');

const getOverview = async (req, res, next) => {
  try {
    const { grade, subject, timeframe } = req.query;
    const data = await analyticsService.getOverview({ grade, subject, timeframe });
    return ResponseFormatter.success(res, data, 'Overview fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTrends = async (req, res, next) => {
  try {
    const { grade, subject, timeframe } = req.query;
    const data = await analyticsService.getTrends({ grade, subject, timeframe });
    return ResponseFormatter.success(res, data, 'Trends fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTeachers = async (req, res, next) => {
  try {
    const data = await analyticsService.getTeachers();
    return ResponseFormatter.success(res, data, 'Teachers fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTeacherAnalytics = async (req, res, next) => {
  try {
    const { teacher_id } = req.params;
    const { subject, timeframe, grade } = req.query;
    const data = await analyticsService.getTeacherAnalytics(teacher_id, { subject, timeframe, grade });
    return ResponseFormatter.success(res, data, 'Teacher analytics fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getOverview, getTrends, getTeachers, getTeacherAnalytics };
