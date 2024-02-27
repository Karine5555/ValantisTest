import moment from 'moment';
var md5 = require('js-md5');

export const BASE_URL = 'http://api.valantis.store:40000';

export default {
    filterProducts: async (params, filters) => {
        let needFilter = false;
        Object.values(filters).map((item) => {
            if(item) {
                needFilter = true
            }
            return item;
        });
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'X-Auth': md5(`Valantis_${moment().format('yyyyMMDD')}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "action": needFilter ? "filter" : "get_ids",
                "params": needFilter ? filters : params
            }),
        });

        const {result} = await response.json()

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'X-Auth': md5(`Valantis_${moment().format('yyyyMMDD')}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "action": "get_items",
                "params": {"ids": result}
            }),
        });

        return await res.json();

    }
}