var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox to avoid real payments
    'client_id': 'AXFC5Npdm0A96AhIZBmp9mPurF02e01EfyIQ1izbRrgyWadT6dbh92X313iJbHvfvcI5kZLQmzVqZuBK',
    'client_secret': 'EKqi4tfCU14G-tnFRS7FmqnUpCJOc-8hF4GTTHPGlQ2YMmak2hJjd6LnpCfJxU0rH06N5pz0uNE67tjt'
});

var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/crypto-data.json');
var ORDERS_FILE = path.join(__dirname, 'src/assets/js/components/order-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//PAYPAL PAYMENT

function createPayReq(amount) {
    return JSON.stringify({
        'intent': 'sale',
        'redirect_urls': {
            'return_url': 'http://localhost:3000/process',
            'cancel_url': 'http://localhost:3000/cancel'
        },
        'payer': {
            'payment_method': 'paypal'
        },
        'transactions': [{
            'amount': {
                'total': amount,
                'currency': 'EUR'
            },
            'description': 'This is the payment transaction description.'
        }]
    });
}




app.get('/process', function (req, res) {
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            if (payment.state == 'approved') {
                res.send('payment completed successfully');
            } else {
                res.send('payment not successful');
            }
        }
    });
});


app.get('/cancel', function (req, res) {
    res.redirect('localhost:8080');
});



//HTTP REQUESTS 


app.post('/api/product/paypal', function (req, res) {
    var product = req.body.product;
    var amount = req.body.amount;

    paypal.payment.create(createPayReq(), function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            var links = {};
            payment.links.forEach(function (linkObj) {
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            })
    
            if (links.hasOwnProperty('approval_url')) {
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    });
});


app.get('/api/products', function (req, res) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/transaction/:id', function (req, res) {
    fs.readFile(ORDERS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var json = JSON.parse(data);
        var orders = json.filter(function (order) {
            return order.cryptocurrency_id == req.params.id;
        });
        res.json(orders);
    });
});

app.get('/api/productsid', function (req, res) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var json = JSON.parse(data);
        var ids = json.map(function (product) {
            return product.id;
        });
        res.json(ids);
    });
});


app.get('/api/product/:id', function (req, res) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for (var i = 0; i <= json.length; i++) {
            if (json[i]['id'] == req.params.id) {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.post('/api/product/create', function (req, res) {

    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        var newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: req.body.price,
        };
        products.push(newProduct);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(products);
        });
    });
});

// app.patch('/api/product/edit/:id', function (req, res) {
//     fs.readFile(PRODUCTS_FILE, function (err, data) {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }
//         var products = JSON.parse(data);

//         for (var i = 0; i <= products.length; i++) {
//             if (products[i]['id'] == req.params.id) {
//                 var product = products[i];
//                 product.name = req.body.name;
//                 product.price = req.body.price;

//                 // products.splice(i, 1);
//                 // products.push(product);

//                 products.splice(i, 1, product)

//                 //CHANGE DONE -> Line 101 & 102 -> 104

//                 fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function (err) {
//                     if (err) {
//                         console.error(err);
//                         process.exit(1);
//                     }
//                     res.json(products);
//                 });
//                 break;
//             }
//         }
//     });
// });

// app.delete('/api/product/delete/:id', function (req, res) {
//     fs.readFile(PRODUCTS_FILE, function (err, data) {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }
//         var products = JSON.parse(data);

//         for (var i = 0; i <= products.length; i++) {
//             if (products[i]['id'] == req.params.id) {
//                 products.splice(i, 1);

//                 fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function (err) {
//                     if (err) {
//                         console.error(err);
//                         process.exit(1);
//                     }
//                     res.json(products);
//                 });
//                 break;
//             }
//         }
//     });
// });


app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
