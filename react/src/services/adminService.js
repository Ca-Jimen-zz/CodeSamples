import axios from 'axios'
import {API_HOST_PREFIX, onGlobalSuccess, onGlobalError} from "./serviceHelpers";

let getAnalytics = (searchBy, date) => {

    const config = {
        method: 'GET',
        url: API_HOST_PREFIX + `/api/admin/analytics/data?dateStart=${date.yearStart}&dateEnd=${date.yearEnd}&filterBy=${searchBy}`,
        withCredentials: true,
        crossDomain: true,
        headers: {"Content-Type": "application/json"}
    }

    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}


export { getAnalytics }