import axios, {AxiosRequestConfig} from "axios";
import {store} from "./store";

let api_path = "http://testsowa.pswbp.pl/capi.php";

export function sendRequest(requestData : any){
    return execute(
        axios.post(api_path, requestData)
    )
}

export function authenticate(login : string, password: string){
    return execute(
        axios.post(api_path, extendRequestWithAuth({
            exec : ["AccountLink", [login, password, login, login]]
        }))
    )
}

function execute(requestPromise: Promise<any>): Promise<any> {
    return requestPromise
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(({response})=>{
            if(response.status == 403) {
                alert("Bark Autentykacji")
                // store.dispatch(()=> {})
            }
        })

}

function extendRequestWithAuth(requestData?: {exec : any[]}) {
    return {
        ...requestData,
        auth: [1,"urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda","#iqvbW!JhHch+TW._(+z","42699@lic528.sowa"]
    }
}