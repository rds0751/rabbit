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

function Notification() {
  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);
  // console.log(user?.loggedInUser?._id, "<<<< user data");
  // console.log(user?.loggedInUser?._id, "<<<< user data");

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

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}

  //   >
  //     <h4 className="head">Notification</h4>
  //     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  //       <ListItem alignItems="flex-start">
  //         <ListItemAvatar>
  //           <Avatar className="noti_img" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  //         </ListItemAvatar>
  //         <ListItemText className="notihead"
  //           primary="Brunch this weekend?"
  //           secondary={
  //             <React.Fragment>
  //               <Typography
  //                 sx={{ display: 'inline' }}
  //                 component="span"
  //                 variant="body2"
  //                 color="text.primary"
  //               >
  //                 Ali Connors
  //               </Typography >
  //               {" — I'll be in your neighborhood doing errands this…"}
  //             </React.Fragment>
  //           }
  //         />
  //       </ListItem>
  //     </List>

  //   </Box>
  // );

  return (
    <div style={{ display: isOpenNoti ? "block" : "none" }}>
      {/* ------------ */}
      <div className="noti-outer">
        <div className="noti-container">
          <div className="notification-text">Notification</div>
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
      </div>

      {/* ------------------ */}

      {/* {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer

            anchor={anchor}
            open={state[anchor] }
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}*/}
    </div>
  );
}
export default Notification;
