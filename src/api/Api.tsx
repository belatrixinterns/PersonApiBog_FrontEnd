import { toast } from "react-toastify";

class Api {
    static handleToastError(err: any) {
        const message = err.response.data.message;
        if (message)
            toast.error(message)
    }

    static handlePromiseResponse(promise: Promise<any>): Promise<any>{
        return promise.then(response => response.data)
    }
}

export default Api;