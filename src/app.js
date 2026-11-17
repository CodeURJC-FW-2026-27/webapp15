import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import router from './router.js';
import fs from 'node:fs';



/* CREATION OF UPLOADS FOLDER IF NON EXISTENT */
try {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
} catch (err) {
  console.error(err);
}


/* COPY OF DATABASE INITIAL FILES ONTO UPLOADS FOLDER*/
const filesList = fs.readdirSync('./public/resources/database_initials/images');

for (let file of filesList) {
  let sourcePath = './public/resources/database_initials/images/' + file;
  let destinationPath = './uploads/' + file;

  if (!fs.existsSync(destinationPath)) {
    fs.copyFileSync(sourcePath, destinationPath);
  }
}



const app = express();


app.use(express.static('./public'));
app.use("/uploads", express.static('uploads'));


app.set('view engine', 'html');
app.engine('html', mustacheExpress(), ".html");
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => console.log('Web ready in http://localhost:3000/'));