import { NotFoundException } from "@nestjs/common";

export function responseHandler(modelObject) {
    if (!modelObject) {
        throw new NotFoundException()
    }
    return modelObject
}