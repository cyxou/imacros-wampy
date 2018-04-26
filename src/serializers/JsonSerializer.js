class JsonSerializer {

    constructor () {
        this.protocol = 'json';
        this.isBinary = true;
    }

    encode (data) {
        return JSON.stringify(data);
    }

    decode (data) {
        return new Promise(resolve => {
            resolve(JSON.parse(data));
        });
    }
}

const EXPORTED_SYMBOLS = ['JsonSerializer'];
