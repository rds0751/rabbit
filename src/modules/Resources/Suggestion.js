import React, { useState } from "react";
import "../../assets/styles/Notification.css";
import { addSuggestion } from "../../services/contentMicroservice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
function Suggestion() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    detail: "",
  });
  const [checkButtonStatus, setCheckButtonStatus] = useState(true);
  const PostSuggestion = () => {
    const { email, title, detail } = formData;
    console.log(formData, "<<<formData");
    if (email == "" || title == "" || detail == "") {
      toast.error("Fill All Fields");
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
      <div className="row mt-5">
        <div className="col-sm-5 col-12 col-xs-12 offset-3 suggestionmob">
          <h4>Make a Suggestion</h4>
          <div className="suggestion-form-box suggestionmob1">
            <div className="suggestion-form border p-4 mt-5">
              <div className="mb-3 mt-3">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control bg-light"
                  placeholder="Write your email address"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label for="pwd" className="form-label">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control bg-light"
                  placeholder="A short description title"
                />
              </div>
              <label for="comment">Detail</label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control bg-light"
                rows="4"
                placeholder="Write comment"
              ></textarea>
              <button
                onClick={PostSuggestion}
                // type="submit"
                className="btn btn-primary offset-9 mt-4 w-25 "
                disabled={checkButtonStatus}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suggestion;
