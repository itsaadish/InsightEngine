const { NotFoundError } = require('../utils/errors/AppError');

class AnalyticsService {
  constructor(teacherRepository, activityRepository) {
    this.teacherDb = teacherRepository;
    this.activityDb = activityRepository;
  }

  _buildActivityFilter(filters = {}) {
    const { grade, subject, timeframe, teacher_id } = filters;
    const where = {};

    if (teacher_id) where.teacher_id = teacher_id;
    if (grade) where.grade = grade.toString();
    if (subject) where.subject = { contains: subject, mode: 'insensitive' };

    if (timeframe) {
      const now = new Date();
      let startDate;
      if (timeframe === 'week') {
        startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (timeframe === 'month') {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (timeframe === 'year') {
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      }
      if (startDate) {
        where.created_at = { gte: startDate };
      }
    }

    return where;
  }

  async getOverview(filters) {
    const where = this._buildActivityFilter(filters);
    const totalTeachers = await this.teacherDb.count();
    
    const activities = await this.activityDb.groupBy({
      by: ['activity_type'],
      _count: { activity_type: true },
      where
    });

    const breakdown = { lesson: 0, quiz: 0, assessment: 0, total: 0 };
    activities.forEach(item => {
      const type = item.activity_type.toLowerCase();
      if (type.includes('quiz')) breakdown.quiz += item._count.activity_type;
      else if (type.includes('assessment') || type.includes('question paper')) breakdown.assessment += item._count.activity_type;
      else breakdown.lesson += item._count.activity_type;
      breakdown.total += item._count.activity_type;
    });

    return { totalTeachers, activities: breakdown };
  }

  async getTrends(filters) {
    const where = this._buildActivityFilter(filters);
    const allActivities = await this.activityDb.findMany({
      where,
      select: { activity_type: true, created_at: true },
      orderBy: { created_at: 'asc' }
    });

    const trends = {};
    allActivities.forEach(act => {
      const dateStr = act.created_at.toISOString().split('T')[0];
      if (!trends[dateStr]) {
        trends[dateStr] = { date: dateStr, lesson: 0, quiz: 0, assessment: 0 };
      }
      const type = act.activity_type.toLowerCase();
      if (type.includes('quiz')) trends[dateStr].quiz += 1;
      else if (type.includes('assessment') || type.includes('question paper')) trends[dateStr].assessment += 1;
      else trends[dateStr].lesson += 1;
    });

    return Object.values(trends).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async getTeachers() {
    return this.teacherDb.findMany({
      orderBy: { teacher_name: 'asc' }
    });
  }

  async getTeacherAnalytics(teacher_id, filters = {}) {
    const where = this._buildActivityFilter({ ...filters, teacher_id });
    
    const teacher = await this.teacherDb.findUnique({
      where: { teacher_id },
      include: { 
        activities: { 
          where,
          orderBy: { created_at: 'desc' } 
        } 
      }
    });

    if (!teacher) {
      throw new NotFoundError('Teacher not found');
    }

    // Get all metadata for teacher (all subjects/grades they teach, regardless of current filter)
    const allTeacherActivities = await this.activityDb.findMany({
      where: { teacher_id },
      select: { subject: true, grade: true }
    });

    const subjects = [...new Set(allTeacherActivities.map(a => a.subject))];
    const grades = [...new Set(allTeacherActivities.map(a => a.grade))].sort((a, b) => a - b);

    const breakdown = { lesson: 0, quiz: 0, assessment: 0, total: 0 };
    teacher.activities.forEach(item => {
      const type = item.activity_type.toLowerCase();
      if (type.includes('quiz')) breakdown.quiz += 1;
      else if (type.includes('assessment') || type.includes('question paper')) breakdown.assessment += 1;
      else breakdown.lesson += 1;
      breakdown.total += 1;
    });

    return { 
      teacher: {
        ...teacher,
        teachingMetadata: { subjects, grades }
      }, 
      breakdown 
    };
  }
}

module.exports = AnalyticsService;
