import React from "react";

function Suggestion() {
  return (
    <>
      <div className="row mt-5">
        <div className="col-sm-5 col-12 col-xs-12 offset-3">
          <h4>Make a Suggestion</h4>
          <div className="suggestion-form-box">
            <form className="suggestion-form border p-4 mt-5">
              <div className="mb-3 mt-3">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
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
                  type="password"
                  className="form-control bg-light"
                  placeholder="A short description title"
                  name="pswd"
                />
              </div>
              <label for="comment">Detail</label>
              <textarea
                className="form-control bg-light"
                rows="4"
                name="text"
                placeholder="Write comment"
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary offset-9 mt-4 w-25 disabled"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suggestion;
