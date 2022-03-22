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


function Notification() {

  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);

  const { loggedInUser } = user;
  if (loggedInUser) { localStorage.setItem('userId', loggedInUser._id); }
  let userId = (loggedInUser) ? loggedInUser._id : localStorage.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user, "srinivas")
    getNotificationListById(userId).then((response) =>
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
      <div className="empty_div" onClick={() => handleChange()}></div>
      <div className="noti-outer">
        <h3 className="notification-text">Notification</h3>
        <div className="all-noti">
          {notifications.map((curElem) => {
            const { addedOn, type, owner } = curElem;
            let addedOnTimeStamp = moment(addedOn).format('LT')


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
                      <span style={{ color: "#366EEF" }}>
                        {(String(owner.userName).length >= 7) ? (!owner.userName ? " " : (String(owner.userName).substring(0, 8) + "...")) : (String(owner.userName) === "" ? "No_Name" : owner.userName)}
                      </span>&nbsp;{type}d&nbsp;your item.
                    </div>
                  ) : type == "bid" ? (
                    <div className="noti-text">
                      <span>
                        You got new {type} from <span style={{ color: "#366EEF" }}>
                          {(String(owner.userName).length >= 7) ? (!owner.userName ? " " : (String(owner.userName).substring(0, 8) + "...")) : (String(owner.userName) === "" ? "No_Name" : owner.userName)}
                        </span>
                      </span>
                    </div>
                  ) :
                    (
                      <div>
                        <span>
                          you got new{type} from srinivas
                        </span>
                      </div>
                    )}
                </div>

                <div className="time">{addedOnTimeStamp}</div>
              </div>
            );
          })}
        </div>
        {notifications.length === 0 && (<div>
          <h1>No Notifications Found</h1>
        </div>)}
      </div>

      {/* ------------------ */}


    </div >
  );
}
export default Notification;
