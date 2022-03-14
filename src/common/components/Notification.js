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


function Notification() {
  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(user, "srinivas")
    getNotificationListById(user?.loggedInUser?._id).then((response) =>
      setNotifications(response)
    );
  }, []);
  // console.log("notifications", notifications);
  console.log(notifications, "<<<<notifications");
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
      document.body.style.overflow = !isOpenNoti ? "hidden" : "visible";
  }

 
  return (
    <div style={{ display: isOpenNoti ? null : "none" }} className="main-cont">
      {/* ------------ */}
      <div className="empty_div" onClick = {() => handleChange()}></div>
      <div className="noti-outer">
        <h3 className="notification-text">Notification</h3>
          <div className="all-noti">
            {notifications.map((curElem) => {
              const { addedOn, type, userId } = curElem;
              return (
                <div className="single-noti">
                  <div className="single-noti-inner ">
                    <img
                      src={profile}
                      width="24px"
                      height="24px"
                      className="noti-image"
                    />
                    <div className="noti-text">
                      <span>
                        {(String(userId).length >= 7) ? (!userId ? " " : (String(userId).substring(0, 8) + "...")) : (String(userId) === undefined ? "" : userId)}
                      </span>&nbsp;{type}&nbsp;your item.
                    </div>
                  </div>

                  <div className="time">{addedOn}</div>
                </div>
              );
            })}
          </div>
      </div>

      {/* ------------------ */}

    
    </div>
  );
}
export default Notification;
