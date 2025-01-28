import express from 'express';
import dotenv from 'dotenv'
import { User } from './models/user';
import setupSwagger from './swaggerConfig';
import usersController from './controllers/usersController';
import businessController from './controllers/businessController';
import servicesController from './controllers/serviceController'
import meetingsController from './controllers/meetingsController';
dotenv.config()
const port=process.env.PORT||8000
const app= express();
app.use(express.json());
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// });
setupSwagger(app);
app.use('/users', usersController);
app.use('/business', businessController);
app.use('/services', servicesController);
app.use('/meetings', meetingsController);


app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}/docs`);

});




// import express from 'express';
// import dotenv from 'dotenv'
// import sequelize from './dataAccess/dataAccess'
// import { User } from './models/user';
// import setupSwagger from './swaggerConfig';
// import usersController from './controllers/usersController';
// dotenv.config()
// const port=process.env.PORT||8000
// const app= express();
// // sequelize.sync({ force: true }).then(() => {
// //   console.log('Database & tables created!');
// // });
// app.use(express.json());

// setupSwagger(app);
// app.use('/users', usersController);

// app.listen(port, async () => {
//     console.log(`Server is running at http://localhost:${port}/docs`);

// });
// sequelize.authenticate().then(async () => {
//   await Users.sync();
//   const newUser = await Users.create({
//       userName: "aa",
//       userPassword:"12345",
//       userToken: "ddd"
//   });
// });