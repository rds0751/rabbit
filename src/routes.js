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
import nft_page from "./modules/Home/Nft";
import HelpCenter from "./modules/Resources/Help/HelpCenter";
import Suggestion from "./modules/Resources/Suggestion";
import Collection_homepage from "./modules/Home/Collection_homepage";
import LeaderBoard from "./modules/Leaderboard/LeaderBoard";
import Buying from "./modules/Resources/Help/Buying";
import Create from "./modules/Create/Create";
import CreateNFT from "./modules/Create/CreateNFT";
import CreateSingleNFT from "./modules/Create/CreateSingleNFT";
import CreateNFT_collection from "./modules/Create/CreateNFT_collection";

class Routes extends BaseComponent {
  componentDidMount() {}
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Switch>
            {/* <Route exact path={"/"} component={Login} /> */}
            <Route path="/" component={nft_page} />
            {/* <Route exact path={"/sign-up"} component={SignUp} /> */}
            {/* <Route path="/nfts" element={<Tile__homepage />} /> */}
            <Route
              exact
              path="/:MarketPlace/collections"
              element={<Collection_homepage />}
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
            <Redirect exact from="*" to="/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
