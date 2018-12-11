import axios, {AxiosRequestConfig} from "axios";
import {store} from "./store";

let api_path = "http://testsowa.pswbp.pl/capi.php";

export function sendRequest(requestData : any[]){
    return execute(
        axios.post(api_path, extendRequestWithAuth(requestData)),
        requestData.map(request => request[0])
    )
}

export function authenticate(login : string, password: string){
    return execute(
        axios.post(api_path, extendRequestWithAuth(
            [["AccountLink", [login, password, login, login]]]
        )),
        ["AccountLink"]
    )
}

function execute(requestPromise: Promise<any>, requestName : string[]): Promise<any> {
    return requestPromise
        .then((response : any)  => {
            let temp : {
                [x: string]: any
            } = {}

            response.data.forEach((value :any, index: any) => {

                if( temp[requestName[index]]) {
                    temp[requestName[index]] = [
                        ...temp[requestName[index]],
                        value.data
                    ]
                } else {
                    temp[requestName[index]] = [value.data]
                }
            })

	        console.log(temp);

	        return Promise.resolve(temp)
        })
        .catch((error)=>{
            console.log('error: ' + error)
            // if(response.status == 403) {
            //     alert("Bark Autentykacji")
            //     // store.dispatch(()=> {})
            // }
        })

}

function extendRequestWithAuth(requestData: any[]) {
    let request = {

        auth: [1,"urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda","#iqvbW!JhHch+TW._(+z","42699@lic528.sowa"],
        exec: [...requestData]

    }
    console.log("request", request);
    return request
}