const mongoose = require('mongoose');

const connectDB = async (app) => {
    await mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    try {
        app.listen(process.env.PORT, console.log(`Connection to MongoDB and Server is running on http://localhost:${process.env.PORT}/`));
    } catch (err) {
        console.log(err);
    }

}

module.exports = connectDB