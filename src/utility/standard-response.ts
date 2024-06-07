
export type StandardReponse = {
    error: boolean,
    message: string,
    statusCode: number,
    data: any
}

export const customResponse = (message: string,statusCode: number,data?: any): StandardReponse => {

    return {
        error: statusCode >= 400,
        message: message,
        statusCode: statusCode,
        data: data,
    }
}

