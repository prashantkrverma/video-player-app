module.exports = {
    development: {
      port: process.env.PORT || 3000,
      mongourl: `${process.env.DB_HOST}+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f7suv.${process.env.DB_HOST}.net/${process.env.DB}?retryWrites=true&w=majority`,
      db: process.env.DB
    }
  };

  // `${process.env.DB_HOST}://127.0.0.1:27017/${process.env.DB}`,