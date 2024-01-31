import{client} from '../utils/httpClient'

export const getAccounts = () => {
return  client.get('/asd/Accounts')
}

