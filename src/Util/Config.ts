const PROD = 'https://reqres.in';
const QA = 'https://reqres.in/';
let baseUrl = process.env.REACT_APP_ENVIRONMENT === 'PROD' ? PROD : QA;

if(process.env.BASEURL){
  baseUrl = process.env.BASEURL;
}

export default baseUrl;
