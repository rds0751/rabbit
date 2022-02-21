import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from '../../assets/images/img-format.png';
import { httpConstants } from '../../constants';
import { BASE_URL2 } from '../../reducers/Constants';
import { createCollection } from '../../services/createServices';

const Button = styled.button``;

function CreateNftCollections(props) {
  const { user } = useSelector(state => state);

  const name = useRef('');
  const description = useRef('');
  const imageUrl = useRef('');
  const coverUrl = useRef('');
  const blockchain = useRef('');
  const categoryId = useRef('');

  const hiddenFileInputImage = useRef(null);
  const hiddenFileInputBanner = useRef(null);

  const handleClickImage = event => {
    hiddenFileInputImage.current.click();
  };

  const handleClickBanner = event => {
    hiddenFileInputBanner.current.click();
  };

  const handleChangeImage = async event => {
    const fileUploaded = event.target.files[0];
    // props.handleFileImage(fileUploaded);

    let formData = new FormData();
    formData.append('folderName', 'collections');
    formData.append('createdBy', `${user.addUserData._id}`);
    formData.append('attachment', fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) imageUrl.current = result.responseData;
    console.log(result, '>>> image upload');
  };

  const handleChangeBanner = async event => {
    const fileUploaded = event.target.files[0];
    // props.handleFileBanner(fileUploaded);

    let formData = new FormData();
    formData.append('folderName', 'collections');
    formData.append('createdBy', `${user.addUserData._id}`);
    formData.append('attachment', fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) coverUrl.current = result.responseData;
    console.log(result, '>>> banner upload');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      coverUrl: coverUrl.current,
      imageUrl: imageUrl.current,
      name: name.current,
      description: description.current,
      blockchain: blockchain.current,
      addedBy: user.addUserData._id,
      // categoryId:categoryId.current,
    };
    const result = await createCollection(data);
    if (result.success) toast.success('Collection created');
    else toast.error(result.message);
    console.log(result, '>>> submit nftCollection');
  };

  return (
    <>
      <div
        className='container col-sm-6 col-12 col-xs-12 offset-sm-2'
        style={{ marginTop: '1rem' }}
      >
        <div className='top-heading'>
          <h4 className='create-nft-font'>Create your collection</h4>
        </div>
        <div className='create-nft-font1'>
          <label htmlFor='email' className='form-label mt-3'>
            Upload File*
          </label>
          <div className='card collection-nft-card'>
            <Button
              onClick={handleClickImage}
              style={{ border: 'none', backgroundColor: '#fff' }}
            >
              <img
                src={Image}
                style={{ width: '100px', color: '#366EEF', marginTop: '3em' }}
              />
            </Button>
            <input
              type='file'
              className='form-control'
              placeholder='Write your name'
              name='email'
              style={{ display: 'none' }}
              ref={hiddenFileInputImage}
              onChange={handleChangeImage}
            />
            <span
              className='text-dark text-center mt-2 font-13'
              style={{ flexDirection: 'row' }}
            >
              Drag & Drop or
              <Link to='/' style={{ textDecoration: 'none' }}>
                Browse
              </Link>
            </span>
          </div>
        </div>
        <div className='create-nft-font1'>
          <label htmlFor='email' className='form-label mt-3'>
            Upload Banner*
          </label>
          <div className='card banner-nft-card p-5 bannermob'>
            <Button
              onClick={handleClickBanner}
              style={{ border: 'none', backgroundColor: '#fff' }}
            >
              <img src={Image} style={{ width: '100px', color: '#366EEF' }} />
            </Button>
            <input
              type='file'
              className='form-control'
              style={{ display: 'none' }}
              ref={hiddenFileInputBanner}
              onChange={handleChangeBanner}
            />
            <span className='text-dark font-13 text-center mt-2'>
              Drag & Drop or
              <Link to='/' style={{ textDecoration: 'none' }}>
                Browse
              </Link>
            </span>
          </div>
        </div>
        <div className='singlenft-form-box'>
          <form
            className='suggestion-form  p-4'
            onSubmit={e => handleSubmit(e)}
          >
            <div className='mb-3 mt-3'>
              <label htmlFor='email' className='form-label input-heading'>
                Name*
              </label>
              <input
                type='name'
                className='form-control'
                name='email'
                placeholder='Write your name'
                onChange={e => (name.current = e.target.value)}
              />
            </div>
            <div className='mb-3 mt-3'>
              <label htmlFor='comment' className='input-heading pb-2'>
                Description*
              </label>
              <textarea
                className='form-control'
                rows='4'
                name='text'
                placeholder='Write description'
                onChange={e => (description.current = e.target.value)}
              ></textarea>
              <span className='text-secondary font-13'>
                0 of 1000 characters used
              </span>
            </div>
            <div className='mb-3 mt-3'>
              <label htmlFor='collection' className='input-heading'>
                Category
              </label>
              {/* <Link>Create</Link> */}
              <select className='form-select mt-3 font-13 text-secondary'>
                <option className='text-secondary'>Select Category</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className='mb-3 mt-3'>
              <label htmlFor='email' className='form-label input-heading'>
                blockchain*
              </label>
              <input
                type='name'
                className='form-control bg-light'
                placeholder='Ethereum'
                id='ethereum'
                onChange={e => (blockchain.current = e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary mt-4 w-100 '>
              Create
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default CreateNftCollections;
