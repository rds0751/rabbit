import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import "../../assets/styles/Notification.css";
import "../../assets/styles/noti.css";
import profile from "../../assets/images/profile.png";

import { Link } from "react-router-dom";
import { getNotificationListById } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import { ManageNotiSideBar, ManageWalletSideBar } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import moment from "moment";
import NotificationIcon from "../../assets/images/Notification.svg";

function Notification() {
  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);

  const { loggedInUser } = user;
  if (loggedInUser) {
    localStorage.setItem("userId", loggedInUser._id);
  }
  let userId = loggedInUser ? loggedInUser._id : localStorage.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    getNotificationListById(userId).then((response) =>
      setNotifications(response)
    );
  }, []);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = (e) => {
    dispatch(ManageNotiSideBar(!isOpenNoti));
    dispatch(ManageWalletSideBar(false));
    document.body.className = !isOpenNoti ? "overflow" : "overflow-hidden";
    // document.body.style.overflow = !isOpenNoti ? "hidden" : "visible";
  };

  const notifyData = notifications?.notificationObj;

  return (
    <div style={{ display: isOpenNoti ? null : "none" }} className="main-cont">
      {/* ------------ */}
      <div className="empty_div" onClick={() => handleChange()}></div>
      <div className="noti-outer">
        <h3 className="notification-text">Notification</h3>
        <div
          className="all-noti"
          style={{ display: notifyData?.length === 0 ? "none" : "block" }}
        >
          {console.log(notifications.notificationObj, "noti")}
          {notifyData?.map((curElem) => {
            const { addedOn, type, owner, content } = curElem;
            let addedOnTimeStamp = moment(addedOn).format("LT");

            return (
              <div className="single-noti">
                <div className="single-noti-inner ">
                  <img
                    src={owner.photo}
                    width="24px"
                    height="24px"
                    className="noti-image"
                  />
                  {type == "like" ? (
                    <div className="noti-text">
                      <a
                        style={{ textDecoration: "none" }}
                        href={"/user-profile/" + owner?._id}
                      >
                        <span style={{ color: "#366EEF" }}>
                          {String(owner.userName).length >= 7
                            ? !owner.userName
                              ? " "
                              : String(owner?.userName).substring(0, 8) + "..."
                            : String(owner?.userName) === ""
                            ? owner.wallet_address
                            : owner.userName}
                        </span>
                      </a>
                      &nbsp;{type}d&nbsp;your&nbsp;
                      <a
                        style={{ textDecoration: "none" }}
                        href={"/nft-information/" + content?._id}
                      >
                        <span style={{ color: "#366EEF" }}>{content.name}</span>
                      </a>
                    </div>
                  ) : type == "bid" ? (
                    <div className="noti-text">
                      <span>
                        You got new {type} from{" "}
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/user-profile/" + owner?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(owner.userName).length >= 7
                              ? !owner.userName
                                ? " "
                                : String(owner.userName).substring(0, 8) + "..."
                              : String(owner.userName) === ""
                              ? owner.wallet_address
                              : owner.userName}
                          </span>
                        </a>
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>you got new{type} from srinivas</span>
                    </div>
                  )}
                </div>

                <div className="time">{addedOnTimeStamp}</div>
              </div>
            );
          })}
          <br />
          {notifyData?.length > 0 ? (
            <footer style={{ display: "flex", justifyContent: "center" }}>
              <p className="end-noti">End of Notification</p>
            </footer>
          ) : null}
        </div>
        {notifyData?.length === 0 && (
          <div
            className="no-notification"
            style={{ display: notifyData?.length === 0 ? "block" : "none" }}
          >
            <img className="no-image" src={NotificationIcon}></img>
            <p className="no-notification">No notification found</p>
          </div>
        )}
      </div>

      {/* ------------------ */}
    </div>
  );
}
export default Notification;
