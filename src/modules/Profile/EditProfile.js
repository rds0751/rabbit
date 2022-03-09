import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
import { connect } from "react-redux";
import { BASE_URL2, WHITE_LABEL_TOKEN } from "../../reducers/Constants";
import { httpConstants } from "../../constants";
import { updateUserProfile } from "../../services";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/editProfile.css";
import { AuthToken } from "../../services/UserAuthToken";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Button = styled.button``;

function EditProfile(props) {
  const hiddenFileInput = useRef(null);
  const [desLength, setDesLength] = useState(0);
  const { user } = useSelector((state) => state);
  const [formData, setFormData] = useState({
    photo: user?.loggedInUser?.photo,
    userName: user?.loggedInUser?.userName,
    bio: user?.loggedInUser?.bio,
    portfolio: user?.loggedInUser?.portfolio,
  });
  const tempUrl =
    "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png";
  const [imageUrl, setImageUrl] = useState(tempUrl);
  console.log(user.loggedInUser, "<<<loggedin");
  // const photo = useRef(user?.loggedInUser?.photo);
  // const bio = useRef(user?.loggedInUser?.bio);
  // const userName = useRef(user?.loggedInUser?.userName);
  // const portfolio = useRef(user?.loggedInUser?.portfolio);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    let formData = new FormData();
    formData.append("folderName", "collections");

    formData.append("createdBy", `${user?.loggedInUser?._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
      // headers: AuthToken,
    });
    console.log(res, "<<<< res");
    const result = await res.json();
    if (result.success) {
      setFormData({ ...formData, photo: result.responseData });
    } else {
      toast.error("Unable to change image");
    }

    // else toast.error("")
    console.log(result);
    setImageUrl(result.responseData);
    // Edit.handleFile(fileUploaded);
  };
  useEffect(() => {
    console.log(localStorage.getItem(WHITE_LABEL_TOKEN), "<<<this is token");
    if (user.loggedInUser?.photo != "") {
      setImageUrl(user?.loggedInUser?.photo);
    }
    // setImageUrl()
    // photo.current = user?.loggedInUser?.photo;
    // bio.current = user?.loggedInUser?.bio;
    // userName.current = user?.loggedInUser?.userName;
    // portfolio.current = user?.loggedInUser?.portfolio;
  }, []);
  function hasBlankSpaces(str) {
    return str.match(/^\s+$/) !== null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.loggedInUser, "<<user");
    const userName = formData.userName;
    if (userName.trim() == "") {
      toast.error("Username is required");
      return null;
    }
    if (/\s/.test(formData.userName)) {
      // It has any kind of whitespace
      toast.error("Username should not have space");
      return null;
    }

    const result = await updateUserProfile(formData, user?.loggedInUser?._id);
    console.log(result, "<<<<<< profile updated value");
    if (result.success) {
      toast.success("Profile Updated");
      window.location.reload(true);
    } else {
      toast.error("Error While updating ");
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name == "bio") {
      setDesLength(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="editProfileContainer container">
        <div className="editProfileTopHeading top-heading">
          <div className="editProfileHeadingTitle">
            <h3 className="title">
              Edit Profile
            </h3>
          </div>

          <h3 className=" input-heading generalsettingl">
            General Setting
          </h3>
        </div>
        <div className="chooseProfilePicContainer">
          <div className="chooseProfilePicInnerContainer ">
            <div className="editprofile-image">
              <img
                src={imageUrl}
              />
            </div>
            <div className="editprofile-button-outer">
              <Button
                onClick={handleClick}
                className=" btn-choose-file"
                // style={{ marginTop: "4em" }}
                // onChange={(e) => handleChange(e)}
              >
                <span className="poppins-normal font-14">Choose File</span>
              </Button>
            </div>

            <input
              type="file"
              className="edit-input-box"
              placeholder="Write your name"
              // name=""
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="editProfileFormContainer singlenft-form-box">
          <form className="suggestion-form " onSubmit={(e) => handleSubmit(e)}>
            <div className="">
              <label
                htmlFor="username"
                className=" label-heading"
              >
                username
              </label>
              <input
                type="text"
                className="editProfileFormContainerEachInput "
                name="userName"
                value={formData.userName}
                // value={userName.current}
                onChange={(e) => handleForm(e)}
              />
            </div>
            <div className="" style={{marginBottom:"28px"}}>
              <label htmlFor="comment" className="label-heading">
                Bio
              </label>
              <textarea
                className="editProfileFormContainerEachInput mb-0"
                rows="4"
                // name="text"
                name="bio"
                value={formData.bio}
                // value={userName.current}
                onChange={(e) => {
                  if (desLength < 1000) {
                    handleForm(e);
                  }
                }}
                placeholder="Write description"
                // onChange={(e) => (bio.current = e.target.value)}
              ></textarea>
              <div className="clearfix"></div>
              <span className="input-down-text">
                {desLength} of 1000 characters used
              </span>
            </div>
            <div className="">
              <label htmlFor="email" className="label-heading">
                Personal site or Portfolio
              </label>
              <input
                type="name"
                className="editProfileFormContainerEachInput form-control"
                placeholder="www.example.com"
                name="portfolio"
                value={formData.portfolio}
                // value={userName.current}
                onChange={(e) => handleForm(e)}
              />
            </div>
            <button type="submit" className=" editprofileSubmitButton ">
              <span className=" font-14 text-white">Update Profile</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user.loggedInUser,
  };
};

export default connect(mapStateToProps)(EditProfile);
// yash
