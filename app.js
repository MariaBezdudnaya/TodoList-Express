require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"); // модуль Node.js, который позволит создать абсолютный путь к папке public
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (из документации)
const mongoUri = process.env.MONGODB_URI || "";
mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1); // завершение процесса при ошибке подключения к MongoDB
  }
);

app.set('view engine', 'ejs'); // настройки для отображения и шаблонизатор
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true })); // сообщаем Express использовать body-parser

app.use(methodOverride("_method")); // настройка для работы с HTTP-методами PUT, DELETE и PATCH

app.use(express.static(path.join(__dirname, "public"))); // создаём абсолютный путь к папке public, важно для подключения стилей

const todoRoutes = require("./routes/todoRoutes"); // импортируем маршруты
app.use("/todos", todoRoutes); // и подключаем их с использованием функции todoRoutes

app.get("/", (req, res) => { // запрос на получение данных, в параметрах маршрут к корневому каталогу и функция callback, которая обрабатывает запрос
  res.redirect("/todos"); // перенаправление на каталог todos
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
