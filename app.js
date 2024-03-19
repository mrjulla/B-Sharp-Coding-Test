const restify = require('restify');
const errs = require('restify-errors');
const cal = require('./src/cal.js');

const server = restify.createServer({
    name: 'bsharp-quiz',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/calculator', function (req, res, next) {
    try {
        if (!req.body.operator || !req.body.x || !req.body.y) return next(new errs.BadRequestError("body required"));

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

    } catch (error) {
        return next(new errs.InternalServerError(error));
    }
});

server.listen(8080, function () {
    console.clear();
    console.log('%s listening at %s', server.name, server.url);
});