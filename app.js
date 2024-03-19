var restify = require('restify');
var errs = require('restify-errors');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

function cal(operator, x, y) {
    let answer;
    switch (operator) {
        case "+":
            answer = parseFloat(x) + parseFloat(y);
            break;
        case "-":
            answer = parseFloat(x) - parseFloat(y);
            break;
        case "*":
            answer = parseFloat(x) * parseFloat(y);
            break;
        case "/":
            if (y == "0") {
                answer = "Divide by zero";
                break;
            } else {
                answer = parseFloat(x) / parseFloat(y);
                break;
            }
        default:
            answer = "Invalid Operator";
    }
    return answer;
}

server.post('/calculator', function (req, res, next) {
    let cal_res = cal(req.body.operator, req.body.x, req.body.y);

    if (cal_res == "Divide by zero") {
        return next(new errs.BadRequestError("Divide by zero"));
    } else if (cal_res == "Invalid Operator") {
        return next(new errs.BadRequestError("Invalid operator"));
    } else {
        const obj = { value: cal_res }
        res.send(obj);
        return next();
    }
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = cal;