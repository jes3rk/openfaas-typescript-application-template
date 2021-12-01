import { Request, Response } from "express";
import { IFunction } from "./interfaces/function.interface";

export class FunctionManager {
    private _status: number;
    // private _headers: Request['headers'];
    private _body: Request['body'];
    private _response: any;

    constructor(private readonly _handler: IFunction) {
        this._status = 200;
    }

    get response() {
        return this._response || {};
    }

    get status() {
        return this._status;
    }

    getBody() {
        return this._body;
    }

    setStatus(status: number): FunctionManager {
        this._status = status;
        return this;
    }

    async handleRequest(request: Request) {
        this._body = request.body;
        this._response = await this._handler.get(this);
    }
}