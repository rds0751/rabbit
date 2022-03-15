import { httpConstants } from '../constants';
import { BASE_URL, BASE_URL2 } from '../reducers/Constants';

export const createSingleNft = async data => {
  try {
    const res = fetch(`${BASE_URL2}/api/v1/nft`, {
      method: httpConstants.METHOD_TYPE.POST,
      headers: {
        'Content-Type': httpConstants.CONTENT_TYPE.MULTIPART_FORM_DATA,
      },
      body: data,
    });
    const result = res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createCollection = async data => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/collections`, {
      method: httpConstants.METHOD_TYPE.POST,
      headers: {
        'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};