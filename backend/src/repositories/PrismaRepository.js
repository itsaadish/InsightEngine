const IRepository = require('./IRepository');
const prisma = require('../prismaClient');

// Concrete repository using Prisma ORM
class PrismaRepository extends IRepository {
  constructor(modelName) {
    super();
    this.model = prisma[modelName];
  }

  async findUnique(query) {
    return this.model.findUnique(query);
  }

  async findFirst(query) {
    return this.model.findFirst(query);
  }

  async findMany(query) {
    return this.model.findMany(query);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(query) {
    return this.model.update(query);
  }

  async delete(query) {
    return this.model.delete(query);
  }
  
  async count(query) {
    return this.model.count(query);
  }

  async groupBy(query) {
    return this.model.groupBy(query);
  }
}

module.exports = PrismaRepository;
