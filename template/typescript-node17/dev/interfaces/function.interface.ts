import { Request } from "express";
import { FunctionManager } from "../FunctionManager";

export interface IFunction<R = any> {
    get(manager: FunctionManager): R | Promise<R>;
}