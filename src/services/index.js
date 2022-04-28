/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */
//export all services from index file -

import { httpConstants } from "../constants";
import { BASE_URL, BASE_URL2 } from "../reducers/Constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";

// export * from './user'

export const addWalletAddress = async (wallet_address) => {
  console.log('called wallet')
  try {
    const res = await fetch(`${BASE_URL}/api/v1/wallet-address`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address,
      }),
    });
    console.log(res, "<<<<datawalletaddress");
    const result = await res.json();
    const user = result.responseData;
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (data, userId) => {
  try {
    console.log(AuthToken,"<<<Auth");
    const res = await fetch(`${BASE_URL}/api/v1/user/${userId}`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: AuthToken,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result, "<<<result");
    return result;
  } catch (err) {
    console.log(err);
  }
};

// export {​​​​​​ default as ContentService }​​​​​​ from "./contentMicroservice";
// export {​​​​​​ default as BlockchainService }​​​​​​ from "./blockchainService";
