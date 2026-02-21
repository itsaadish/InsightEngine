const PrismaRepository = require('../repositories/PrismaRepository');
const AuthService = require('../services/auth.service');
const AnalyticsService = require('../services/analytics.service');

// Abstracted Dependency Injection Container
// Here we wire concrete Database Implementations to Business Logic Services
// Adhering to Dependency Inversion (SOLID) - Services do not depend on Prisma directly.

const adminUserRepository = new PrismaRepository('adminUser');
const teacherRepository = new PrismaRepository('teacher');
const activityRepository = new PrismaRepository('activity');

const authService = new AuthService(adminUserRepository);
const analyticsService = new AnalyticsService(teacherRepository, activityRepository);

module.exports = {
  authService,
  analyticsService
};
