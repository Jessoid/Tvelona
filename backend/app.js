//модуль http для работы с HTTP-протоколом
const http = require('http');

const PORT = 3000;

//создание сервера
const server = http.createServer((req, res) => {
    console.log('Serve request');
//создание страницы
    /*res.setHeader('Content-Type', 'text/html');

    res.write('<head><link rel="stylesheet" href="#"</head>');
    res.write('<h1>Hello!</h1>');
    res.write('<p>My Name is Tvelona</p>');*/

    res.setHeader('Content-Type', 'application/json');

    const data = JSON.stringify([
        {name: 'Aljona', age: 45}
    ]);

    res.end(data);
});

//код используется для прослушивания входящих соединений на сервере
server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});