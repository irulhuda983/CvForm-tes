import { Response } from "express";
import ApiError from "./apiError";

const HandleError = (error: any, res: Response): Response | void => {
    if (error instanceof ApiError) {
        return res.status(error.code).send({
            status: error.code,
            message: error.message,
            errors: error.errors.length > 0 ? error.errors : undefined,
        });
    }

    console.log(typeof error);
    if (typeof error == "string") {
        return res.status(500).json({ message: error });
    }

    let message = "Unkonwn Error";
    if (error instanceof Error) {
        message = error.message;
    }

    return res.status(500).send({ message: "Internal Server Error" });
};

export default HandleError;
