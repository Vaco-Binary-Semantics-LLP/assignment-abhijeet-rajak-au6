const AppError = require("../utils/appErrorHandler");

module.exports = {
    async createOne(Model, payload) {
      try {
        return Model.create({ ...payload });
      } catch (err) {
        new AppError(err.message, 500);
      }
    },
    async modifyOne(Model, set, condition) {
      try {
        return Model.updateOne({ ...condition }, { ...set }, { new: true });
      } catch (err) {
        new AppError(err.message, 500);
      }
    },
    async getOne(Model, query, attributes = "") {
      try {
        return Model.findOne(query, attributes);
      } catch (err) {
        new AppError(err.message, 500);
      }
    },
    async getAll(Model, page, limit, attributes) {
      try {
        const pageNo = page * 1 || 0;
        limit = limit * 1 || 0;
        const skip = (pageNo - 1) * limit;
  
        return Model.find({}).skip(skip).limit(limit).select(attributes);
      } catch (err) {
        new AppError(err.message, 500);
      }
    },
}
