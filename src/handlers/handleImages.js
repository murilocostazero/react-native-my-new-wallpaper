import ReactNativeBlobUtil from 'react-native-blob-util';
import API_KEY from '../api-key';

export async function fetchGetImagesByQuery(query) {
    return new Promise((resolve, reject) => {
        ReactNativeBlobUtil.fetch('GET', `https://api.pexels.com/v1/search?query=${query}&per_page=20`, {
            Authorization: API_KEY,
        })
            .then((res) => {
                let status = res.info().status;

                if (status == 200) {
                    let json = res.json();
                    return resolve(json);
                } else {
                    return reject({ success: false });
                }
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                console.error(errorMessage);
            })
    });
}

export async function fetchGetImages() {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    const page = Math.floor(Math.random() * (max - min + 1)) + min;

    return new Promise((resolve, reject) => {
        ReactNativeBlobUtil.fetch('GET', `https://api.pexels.com/v1/curated?page=${page}&per_page=20`, {
            Authorization: API_KEY,
        })
            .then((res) => {
                let status = res.info().status;

                if (status == 200) {
                    let json = res.json();
                    return resolve(json);
                } else {
                    return reject({ success: false });
                }
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                console.error(errorMessage);
            })
    });
}

export async function fetchGetSingleImage(imageId) {
    return new Promise((resolve, reject) => {
        ReactNativeBlobUtil
            .config({
                fileCache: true,
                appendExt : 'png'
            })
            .fetch('GET', `https://api.pexels.com/v1/photos/${imageId}`, {
                Authorization: API_KEY,
            })
            .then((res) => {
                return resolve(res.json());
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                console.error(errorMessage);
            })
    });
}