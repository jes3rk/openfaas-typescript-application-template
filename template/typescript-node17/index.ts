import express, { request, Request } from 'express';
import bodyParser from 'body-parser';
import {Handler} from './src/function/handler';
import { FunctionManager } from './dev/FunctionManager';

const app = express()

const defaultMaxSize = '100kb' // body-parser default

app.disable('x-powered-by');

const rawLimit = process.env.MAX_RAW_SIZE || defaultMaxSize
const jsonLimit = process.env.MAX_JSON_SIZE || defaultMaxSize

app.use(function addDefaultContentType(req, res, next) {
    if(!req.headers['content-type']) {
        req.headers['content-type'] = "text/plain"
    }
    next()
})

if (process.env.RAW_BODY === 'true') {
    app.use(bodyParser.raw({ type: '*/*' , limit: rawLimit }))
} else {
    app.use(bodyParser.text({ type : "text/*" }));
    app.use(bodyParser.json({ limit: jsonLimit}));
    app.use(bodyParser.urlencoded({ extended: true }));
}

app.use(async (reqest, response) => {
    const handler = new FunctionManager(new Handler());
    await handler.handleRequest(request);
    return response.status(handler.status).send(handler.response);
})

const port = process.env.http_port || 3000;

app.listen(port, () => {
    console.log(`Process listening on port: ${port}`)
});