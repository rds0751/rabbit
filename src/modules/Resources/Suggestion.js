import React, { useState } from "react";
import "../../assets/styles/suggestion.css";
import { addSuggestion } from "../../services/contentMicroservice";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
function Suggestion() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    detail: "",
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const [checkButtonStatus, setCheckButtonStatus] = useState(true);
  const PostSuggestion = () => {
    const { email, title, detail } = formData;
    console.log(formData, "<<<formData");
    if (email == "" || title == "" || detail == "") {
      toast.error("Fill All Fields");
      return null;
    }
    const checkMail = validateEmail(email);
    if (!checkMail) {
      toast.error("Invalid Email");
      return null;
    }

    addSuggestion(formData, (res) => {
      console.log(res);
      toast.success("Suggestion Sent");
      setFormData({ email: "", title: "", detail: "" });
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (formData.email != "" && formData.title != "" && formData.detail != "") {
      setCheckButtonStatus(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="suggestion-body ">
        <div className="suggestion suggestionmob">
          <h4 className="make-suggestion">Make a Suggestion</h4>
          <div className="form-box">
            <div className="form-inner">
              <div className="">
                <label for="email" className="label-key">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="sugg-input"
                  placeholder="Write your email address"
                />
              </div>
              <div className="">
                <label for="pwd" className="label-key">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="sugg-input"
                  placeholder="A short descriptive title"
                />
              </div>
              <label for="comment" className="label-key">
                Detail
              </label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="sugg-input text-area"
                rows="4"
                placeholder="Write comment"
              ></textarea>
              <div className="butt-outer">
                <button
                  onClick={PostSuggestion}
                  // type="submit"
                  className="send-button"
                  style={{
                    opacity: checkButtonStatus ? 0.8 : 1,
                  }}
                  disabled={checkButtonStatus}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suggestion;
