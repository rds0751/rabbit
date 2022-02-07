import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";

// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Button = styled.button``;

function Edit_Profile(Edit) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    Edit.handleFile(fileUploaded);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-sm-5 col-12 col-xs-12 offset-sm-3 form-responsive edit_profilemob">
          <div className="top-heading">
            <h4 className="create-nft-font text-center">Edit Profile</h4>
            <h3
              className="font-15 font-weight-700 border-bottom pb-3"
              style={{ marginLeft: "-30px" }}
            >
              General Setting
            </h3>
          </div>
          <div className="card border-0">
            <div className="row border" style={{ display: "flex" }}>
              <div className="col-sm-4  col-12 col-md-6">
                <img
                  className="rounded-circle img-fluid img-responsive"
                  src="https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                  alt="/"
                />
              </div>
              <div className="col-sm-4 col-12 col-md-6">
                <Button
                  onClick={handleClick}
                  className="btn btn-outline-primary btn-normal-size btn-choose-file"
                  style={{ marginTop: "4em" }}
                >
                  <span className="btn-text font-14">Choose File</span>
                </Button>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Write your name"
                  name="email"
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="singlenft-form-box">
            <form className="suggestion-form ">
              <div className="mb-3 mt-3">
                <label for="email" className="form-label input-heading">
                  Username
                </label>
                <input type="name" className="form-control" name="email" />
              </div>
              <div className="mb-3 mt-3">
                <label for="comment" className="input-heading pb-2">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="text"
                  placeholder="Write description"
                ></textarea>
                <spna className="text-secondary font-13">
                  0 of 1000 characters used
                </spna>
              </div>
              <div className="mb-3 mt-3">
                <label for="email" className="form-label input-heading">
                  Personal site or Portfolio
                </label>
                <input
                  type="name"
                  className="form-control bg-light"
                  placeholder="www.example.com"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4 w-100">
                <span className="font-14 text-white">Update Profile</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit_Profile;
// yash
