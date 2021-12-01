import { FunctionManager } from "../../dev/FunctionManager";
import { IFunction } from "../../dev/interfaces/function.interface";

export class Handler implements IFunction<string> {
    get(manager: FunctionManager): string {
        manager.setStatus(200);
        return 'Hello World'
    }
}