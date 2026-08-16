import type { NextFunction, Request, Response } from "express";
import type { RequestHandler } from "express-serve-static-core";

type HandlerFun = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export function asyncHandler(handlerFun: HandlerFun): RequestHandler {
    return (req, res, next) => {
        handlerFun(req, res, next).catch(next);
    };
}
