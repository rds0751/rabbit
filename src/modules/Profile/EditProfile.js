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
    const result = await res.json();
    if (result.success) {
      setFormData({ ...formData, photo: result.responseData });
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

  const handleSubmit = async (e) => {
    console.log(user.loggedInUser, "<<user");
    e.preventDefault();
    // const data = {
    //   userName: userName.current,
    //   bio: bio.current,
    //   portfolio: portfolio.current,
    //   photo: photo.current,
    //   userId: user?.loggedInUser?.userId,
    // };
    // console.log(data, "<<<data to send");
    const result = await updateUserProfile(formData, user?.loggedInUser?._id);
    console.log(result, "<<<<<< profile updated value");
    if (result.success) {
      toast.success("Profile Updated");
    } else {
      toast.error("Error While updating ");
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
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
      <div className="editProfileContainer container row mt-5">
        {/* <div className="col-sm-5 col-12 col-xs-12 offset-sm-3 form-responsive edit_profilemob"> */}
        <div className="editProfileTopHeading top-heading">
          <div className="editProfileHeadingTitle">
            <h4 className="create-nft-font ">Edit Profile</h4>
          </div>

          <h3 className=" font-15 font-weight-700 border-bottom pb-3">
            General Setting
          </h3>
        </div>
        <div className="chooseProfilePicContainer border-0">
          <div className="chooseProfilePicInnerContainer row border">
            <img
              className="rounded-circle img-fluid img-responsive"
              // src="https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              // alt="/"
              src={imageUrl}
            />
            <Button
              onClick={handleClick}
              className="btn btn-outline-primary btn-normal-size btn-choose-file"
              // style={{ marginTop: "4em" }}
              // onChange={(e) => handleChange(e)}
            >
              <span className="btn-text font-14">Choose File</span>
            </Button>

            <input
              type="file"
              className="form-control"
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
            <div className=" mb-3 mt-3">
              <label htmlFor="email" className="form-label input-heading">
                userName
              </label>
              <input
                type="name"
                className="editProfileFormContainerEachInput form-control"
                name="userName"
                value={formData.userName}
                // value={userName.current}
                onChange={(e) => handleForm(e)}
              />
            </div>
            <div className=" mb-3 mt-3">
              <label htmlFor="comment" className="input-heading pb-2">
                Bio
              </label>
              <textarea
                className="editProfileFormContainerEachInput form-control"
                rows="4"
                // name="text"
                name="bio"
                value={formData.bio}
                // value={userName.current}
                onChange={(e) => handleForm(e)}
                placeholder="Write description"
                // onChange={(e) => (bio.current = e.target.value)}
              ></textarea>
              <span className="text-secondary font-13">
                0 of 1000 characters used
              </span>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label input-heading">
                Personal site or Portfolio
              </label>
              <input
                type="name"
                className="editProfileFormContainerEachInput form-control bg-light"
                placeholder="www.example.com"
                name="portfolio"
                value={formData.portfolio}
                // value={userName.current}
                onChange={(e) => handleForm(e)}
              />
            </div>
            <button
              type="submit"
              className="editProfileFormContainerEachInput btn btn-primary mt-4 w-100"
            >
              <span className=" font-14 text-white">Update Profile</span>
            </button>
          </form>
        </div>
        {/* </div> */}
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
