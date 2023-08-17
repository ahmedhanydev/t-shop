class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
    excludesFields.forEach((field) => {
      delete queryStringObj[field];
    });
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      const query = {};
      if (modelName === "Products") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { titleAr: { $regex: this.queryString.keyword } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
          { descriptionAr: { $regex: this.queryString.keyword } },
        ];
      } else {
        query.$or = [
          { name: { $regex: this.queryString.keyword, $options: "i" } },
          { nameAr: { $regex: this.queryString.keyword } },
        ];
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit; // 3 * 5

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    //next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }

    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
