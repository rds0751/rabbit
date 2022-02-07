import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { Login, SignUp } from "./modules";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import TopBidders from "./modules/TopList/TopBidders";
import Top_collection from "./modules/TopList/Top_collection";
import TopSeller from "./modules/TopList/TopSeller";
import NftPage from "./modules/Home/Nft";
import HelpCenter from "./modules/Resources/Help/HelpCenter";
import Suggestion from "./modules/Resources/Suggestion";
import Collection_homepage from "./modules/Home/Collection_homepage";
import LeaderBoard from "./modules/Leaderboard/LeaderBoard";
import Buying from "./modules/Resources/Help/Buying";
import Create from "./modules/Create/Create";
import CreateNFT from "./modules/Create/CreateNFT";
import CreateSingleNFT from "./modules/Create/CreateSingleNFT";
import CreateNFT_collection from "./modules/Create/CreateNFT_collection";
import Nft_Information from "./modules/Home/Nft_Information";
import Nft_Information_1 from "./modules/Home/Nft_Information_Offer_1";
import Nft_Information_Offer_1 from "./modules/Home/Nft_Information_Offer_1";
import MyItems from "./modules/MyPages/MyItems";
import MyItems_Collection from "./modules/MyPages/MyItems_Collection";
import Notification from "./common/components/Notification";
import CollectionDetails from "./modules/Collections/CollectionDetails";
import MyProfile from "./modules/MyPages/MyProfile";
import EditItem from "./modules/Items/EditItem";
import Collections_tile from "./modules/Collections/Collections_tile";
import Edit_Profile from "./modules/Profile/Edit_Profile";
import About from "./modules/About/About";
import Fixed_Price from "./modules/Items/Fixed_Price";
import Navbar from "./common/components/Navbar";
import Footer from "./common/components/Footer";

class Routes extends BaseComponent {
  componentDidMount() {}
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/" component={NftPage} />
            <Route
              exact
              path="/Collections_tile"
              component={Collections_tile}
            />
            <Route exact path="/Nft_Information" component={Nft_Information} />
            <Route
              exact
              path="/:MarketPlace/collections"
              component={Collection_homepage}
            />

            <Route exact path="/HelpCenter" component={HelpCenter} />
            <Route exact path="/Suggestion" component={Suggestion} />
            <Route exact path="/Top_collection" component={Top_collection} />
            <Route exact path="/TopBidders" component={TopBidders} />
            <Route exact path="/TopSeller" component={TopSeller} />
            <Route exact path="/LeaderBoard" component={LeaderBoard} />
            <Route exact path="/Buying" component={Buying} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/CreateNFT" component={CreateNFT} />
            <Route exact path="/CreateSingleNFT" component={CreateSingleNFT} />
            <Route
              exact
              path="/CreateNFT_collection"
              component={CreateNFT_collection}
            />
            <Route
              exact
              path="/Nft_Information_1"
              component={Nft_Information_1}
            />
            <Route
              exact
              path="/Nft_Information_Offer_1"
              component={Nft_Information_Offer_1}
            />

            <Route
              exact
              path="/MyItems_Collection"
              component={MyItems_Collection}
            />
            <Route
              exact
              path="/CollectionDetails"
              component={CollectionDetails}
            />
            <Route exact path="/Notification" component={Notification} />

            <Route exact path="/MyProfile" component={MyProfile} />

            <Route exact path="/EditItem" component={EditItem} />

            {/* <Route
              exact
              path="/CreateNFT_collection"
              element={<CreateNFT_collection />}
            /> */}
            <Route exact path="/Edit_Profile" component={Edit_Profile} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Fixed_Price" component={Fixed_Price} />

            <Redirect exact from="*" to="/" />
          </Switch>
        </Router>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
