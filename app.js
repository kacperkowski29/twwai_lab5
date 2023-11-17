const service = require('./service');
const express = require('express');
const config = require('./config'); // dodając tę linię, trzeba pamiętać o stworzeniu pliku config.js
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

let chart1 = {"type":"line","data":{"labels":["January","February","March","April","May","June"],"datasets":[{"label":"My First dataset","backgroundColor":"rgb(255, 99, 132)","borderColor":"rgb(255, 99, 132)","data":[0,10,5,2,20,30,45]}]},"options":{}};

const temp = `Czas,Temperatura
2023-11-09 10:00:00,10
2023-11-09 11:00:00,13
2023-11-09 12:00:00,16
2023-11-09 13:00:00,18
2023-11-09 14:00:00,19
2023-11-09 15:00:00,19
2023-11-09 16:00:00,17`;

const products = [
   { name: 'Laptop', price: 1000 },
   { name: 'Smartphone', price: 500 },
   { name: 'Tablet', price: 300 }
];


const dataChart2 = service.convertData(temp);

const chart2 = JSON.stringify(dataChart2);

app.get('/', (request, response) => {
   response.render(__dirname + '/public/index.html', {subject: 'Technologie webowe w aplikacjach Internetu', chart1: JSON.stringify(chart1), chart2, products});
});

app.use(express.static('public'));


app.get('/:variant/:a/:b', (req, res) => {
   const variant = req.params.variant;
   const a = Number(req.params.a);
   const b = Number(req.params.b);
   let result;

   switch (variant) {
       case 'sum':
           result = a + b;
           break;
       case 'sub':
           result = a - b;
           break;
       case 'mul':
           result = a * b;
           break;
       case 'div':
           if (b !== 0) {
               result = a / b;
           } else {
               res.status(400).send('Division by zero is not allowed');
               return;
           }
           break;
       default:
           res.status(400).send('Invalid operation');
           return;
   }


   res.render(path.join(__dirname, 'public', 'result.html'), { result: result });
});

 

app.listen(config.port, function () {
   console.info(`Server is running at port ${config.port}`);
});