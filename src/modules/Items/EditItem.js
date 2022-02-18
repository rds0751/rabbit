import React from 'react';
import image from '../../assets/images/1.jpg';
import NftNoBid from '../../assets/images/NftNoBid.png';
import share from '../../assets/images/share.png';
import leftArrow from '../../assets/images/leftArrow.png';
import UpArrow from '../../assets/images/UpArrow.png';
import info from '../../assets/images/info.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
// import { Button } from "@mui/material";
import '../../assets/styles/Leader.css';

import styled from 'styled-components';

const Button = styled.button``;

function EditItem(Collection) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // yasah

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    Collection.handleFile(fileUploaded);
  };
  return (
    <div className='editItem'>
      <div className='edititems'>
        <img src={leftArrow} alt='' />
        Edit Item
      </div>

      <div className='UploadFile row'>
        <label
          for='profilepic'
          className='form-label mt-3'
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            marginTop: '1rem',
          }}
        >
          Upload File*
        </label>
        <div
          className='card collection-nft-card'
          style={{ border: 'none', alignItems: 'center', marginLeft: '1.6rem' }}
        >
          <img
            src={image}
            style={{
              border: 'none',
              height: '9rem',
              width: '10rem',
              borderRadius: '1.2rem',
            }}
          />

          <input
            type='file'
            className='form-control'
            placeholder='Write your name'
            name='profilepic'
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
          <div
            onClick={handleClick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={UpArrow}
              alt=''
              style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.5rem' }}
            />
            <div style={{ fontSize: '0.7rem', color: '#366eff' }}>
              Replace File
            </div>
          </div>
        </div>

        {/* <div className=" row">
      <form id="addsound" method="post" enctype="multipart/form-data" action="">
          <div className="UploadFile">
        <div className="form-group row control-labelmob">
          <label
            for="profilepic"
            className=" control-label"
            style={{ fontSize: 14, fontWeight: "bold", marginBottom: "0.5rem", marginTop :"1rem" }}
          >
            Upload File*{" "}
            
          </label>
          <div className="" style={{padding:"0px"}}>
            <input
              type="image"
              name="thumb"
              id="thumb"
              // onchange="return check_file_size()"
              className="form-control"
              src={image}
              style={{
               
                border:"none",
                height: "9rem",
    width:"10rem",
    borderRadius: "1.2rem"
              }}
              placeholder="Drag & Drop or Browse"
            />
          </div>
        </div> */}

        {/* <img src={UpArrow} alt="" style={{width:"1.2rem", height:"1.2rem", marginTop:"0.5rem"}} />
            <div style={{fontSize:"0.7rem", color:"#366eff"}}>Replace File</div> */}
      </div>
      <form id='addsound' method='post' enctype='multipart/form-data' action=''>
        <div className='form-group row'>
          <label
            for='fname'
            className=' control-label'
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: '0.5rem',
              marginBottom: '0.3rem',
            }}
          >
            Name*:
          </label>
          <div className=''>
            <input
              type='text'
              name='sound_name'
              id='sound_name'
              required
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            for='fname'
            className=' control-label'
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: '0.5rem',
              marginBottom: '0.3rem',
            }}
          >
            Description*
          </label>
          <div className=''>
            <textarea
              type='text'
              name='sound_name'
              id='sound_name'
              required
              className='form-control'
              rows='3'
            />
            <span className='text-secondary font-13'>
              0 of 1000 characters used
            </span>
          </div>
        </div>
        {/* <div className="form-group">
  <label for="comment">Comment:</label>
  <textarea className="form-control" rows="5" id="comment"></textarea>
</div> */}
        <div className='form-group row'>
          <label
            for='fname'
            className=' control-label'
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: '0.5rem',
              marginBottom: '0.3rem',
            }}
          >
            Collection
          </label>
          <div className=''>
            <input
              type='text'
              name='sound_name'
              id='sound_name'
              required
              className='form-control'
              //   style={{ backgroundColor: "#f3f3f3" }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            for='fname'
            className=' control-label'
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: '0.5rem',
              marginBottom: '0.3rem',
            }}
          >
            Blockchain
          </label>
          <div className=''>
            <input
              type='text'
              name='sound_name'
              id='sound_name'
              required
              className='form-control'
              style={{ backgroundColor: '#f3f3f3' }}
            />
          </div>
        </div>
      </form>
      <div className='done'>
        <button
          type='button'
          className='btn btn-secondary'
          style={{ width: '30%', backgroundColor: '#366eef' }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default EditItem;
