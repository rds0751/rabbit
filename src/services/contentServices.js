import { httpConstants } from '../constants';
import { BASE_URL2 } from '../reducers/Constants';

export const uploadDocs = async data => {
  console.log('run uploadocs');
  const form_data = new FormData();

  form_data.append('folderName', data.folderName);
  form_data.append('createdBy', data.createdBy);
  form_data.append('attachment', data.attachment);

  const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
    method: httpConstants.METHOD_TYPE.POST,
    // headers: {
    //   'Content-Type': httpConstants.CONTENT_TYPE.MULTIPART_FORM_DATA,
    // },
    body: form_data,
  });
  const result = await res.json();
  console.log(result);
};

export const getCollection = async () => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/collections`);
    const result = await res.json();
    const collectionData = result.responseData;
    return collectionData;
  } catch (err) {
    console.log(err);
  }
};
