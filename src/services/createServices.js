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
  } catch (error) {
    console.log(error);
  }
};
