var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var paypal = require('paypal-rest-sdk');
var uuidv4 = require('uuid').v4;    //UUID generator

paypal.configure({
    'mode': 'sandbox', //sandbox to avoid real payments (live)
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


//PAYPAL PAYMENT REQUESTS

app.get('/process', function (req, res) {
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };
    var product_id = req.query.product_id;
    var product = {};

    getProductById(product_id, function (response) {
        if (response) {
            product = response;
            paypal.payment.execute(paymentId, payerId, function (error, payment) {
                if (error) {
                    console.error(error);
                } else {
                    if (payment.state == 'approved') {
                        var order = {
                            'id': uuidv4(),
                            'paypal_transaction_id': payment.id,
                            'order_timestamp': payment.create_time,
                            'payer_info': payment.payer.payer_info,
                            'total_amount': payment.transactions[0].amount.total,
                            'currency': payment.transactions[0].amount.currency,
                            'product': product,
                        };

                        fs.readFile(ORDERS_FILE, function (err, data) {
                            if (err) {
                                console.error(err);
                                process.exit(1);
                            }

                            var json = [];
                            if (data.length !== 0) {
                                json = JSON.parse(data);
                            }

                            json.push(order);

                            fs.writeFile(ORDERS_FILE, JSON.stringify(json, null, 4), function (err) {
                                if (err) {
                                    console.error(err);
                                    process.exit(1);
                                }
                            });
                        });
                        res.redirect('http://localhost:8080/order-resume/' + order.id);  

                    } else {
                        res.send('payment not successful');
                    }
                }
            });
        } else {
            console.log("Error getting product by id");
        }
    });

});



app.get('/cancel', function (req, res) {
    res.redirect('http://localhost:8080');
});

// CREATE PAYMENT 

app.post('/api/buy/paypal', function (req, res) {
    var amount = req.body.amount;
    var product_id = req.body.product_id;
    console.log("Amount to be paid: " + amount);
    var reqPay = createPayReq(amount, product_id);

    paypal.payment.create(reqPay, function (error, payment) {
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
                console.log(links['approval_url'].href);
                res.send(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    });

});



//HTTP REQUEST

// GET ORDER BY ID

app.get('/api/order/:id', function (req, res) {

    getOrderById(req.params.id, function (err, order) {
        if (err) {
            res.status(500).send('Something gone wrong!');
            return;
        }
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Oh oh, not found...');
        }
    });
});


// GET ALL ORDERS OF A PRODUCT

app.get('/api/transaction/:id', function (req, res) {
    fs.readFile(ORDERS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        if (data.length > 0) {
            var json = JSON.parse(data);
            var orders = json.filter(function (order) {
                return order.product.id == req.params.id;
            });
            if (orders.length == 0) {
                res.status(404).send('Oh oh, not found...');
                return;
            }
            res.json(orders);
        } else {
            res.json([]);
        }

    });
});


// GET ALL IDS OF PRODUCTS SORTED BY ORDER
app.get('/api/productsid', function (req, res) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);
        var order = req.query.order;

        sortProducts(order, json, function (sortedIds) {
            res.json(sortedIds);
        });
    });
});


// GET PRODUCT BY ID
app.get('/api/product/:id', function (req, res) {
    getProductById(req.params.id, function (product) {
      if (product) {
        res.json(product);
      } else {
        res.status(404).send('Product not found');
      }
    });
  });
  
  app.get('/api/products', function (req, res) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        json = JSON.parse(data);
        res.json(json);
    });
});



// START SERVER

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});


// functions


function getProductById(id, callback) {
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            return callback(null); // Error al llegir el fitxer, es crida el callback amb valor nul
        }

        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            if (json[i]['id'] == id) {
                return callback(json[i]); // S'ha trobat el producte, es crida el callback amb el producte com a paràmetre
            }
        }

        return callback(null); // No s'ha trobat el producte, es crida el callback amb valor nul
    });
}

function sortProducts(order, products, callback) {
    products.sort(function (a, b) {
        return order === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price);
    });

    var ids = products.map(function (product) {
        return product.id;
    });

    callback(ids);
}

function getOrderById(id, callback) {
    fs.readFile(ORDERS_FILE, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        var orders = JSON.parse(data);
        var order = orders.find(function (order) {
            return order.id == id;
        });
        callback(null, order);
    });
}

//paypal function

function createPayReq(amount, product_id) {
    return JSON.stringify({
        'intent': 'sale',
        'redirect_urls': {
            'return_url': 'http://localhost:3000/process?product_id=' + product_id,
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
            'description': 'This is the payment transaction description.',

        }],

    });
}