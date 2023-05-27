import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
})

/** api routes */
app.use('/api', router);

/** start server only when we have valid connection */
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Cannot connect to the server");
  }
}).catch(error => {
  console.log("Invalid database connection..!");
})





/** 
 * npm init -y
 * npm i express cors mongoose mongodb-memory-server multer nodemon
*/

/** 
 * changes below "main" prop.
 * mention "type": "module",
 * for use import instead require
 * @package.json file
*/

/**
 * npm i morgan
*/

/** 
 * changes within "scripts"
 * mention "start": "nodemon server.js",
 * for instead "test": "echo \"Error: no test specified\" && exit 1"
 * @package.json file
*/

/**
 * Install @extentions below mentioned:
 * Code Runner.Jun_Han
 * DotENV.Jun_Han
 * Atom One Dark Theme.Mahmoud_Ali
 * Thunder Client.Ranga_Vadhineni
*/

/**
 * npm i bcrypt jsonwebtoken
 * openssl rand -base64 32 => TXNQzh7dckQ/Kb7WXhw2IaYI/cHd7y7VRezaLHeW0Qs= => @config.js
*/

/**
 * made changes in #dependencies @gitignore file
*/

/** timings were @twoHour_4Miniute_8Seconds_plus */


