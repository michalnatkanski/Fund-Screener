import { Funds } from "../../types";


async function getData() {
    const url = `http://0.0.0.0:3000`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const wrapPromise = (promise: Promise<Funds>) => {
    let status = "pending";
    let result: Funds | any;
    
    let suspender = promise.then(
        (r) => {
            status = 'success';
            result = r;
        },
        (e) => {
            status = 'error';
            result = e;
        }
    );
    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    }
}

export const fetchData = () => {
    return wrapPromise(getData());
};

