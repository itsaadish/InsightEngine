// Interface for Dependency Inversion
// All repository implementations must follow this contract
class IRepository {
  findUnique(query) { throw new Error('Method not implemented: findUnique'); }
  findFirst(query) { throw new Error('Method not implemented: findFirst'); }
  findMany(query) { throw new Error('Method not implemented: findMany'); }
  create(data) { throw new Error('Method not implemented: create'); }
  update(query) { throw new Error('Method not implemented: update'); }
  delete(query) { throw new Error('Method not implemented: delete'); }
  count(query) { throw new Error('Method not implemented: count'); }
  groupBy(query) { throw new Error('Method not implemented: groupBy'); }
}

module.exports = IRepository;
