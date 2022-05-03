import "./App.css";
import react, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import Navbar from "./common/components/Navbar";
import NftPage from "./modules/Home/Nft";
// import Lower__homepage from "./components/HomeNftFilters";
// import NftToggle from "./components/NftToggle";
import Footer from "./common/components/Footer";
import LeaderBoard from "./modules/Leaderboard/LeaderBoard";
import Notification from "./common/components/Notification";
import CollectionCards from "./modules/Collections/CollectionCards";
import Top_collection from "./modules/TopList/Top_collection";
import TopBidders from "./modules/TopList/TopBidders";
// import TopCollection from './components/TopCollection';
import TopSeller from "./modules/TopList/TopSeller";
import Create from "./modules/Create/Create";
import MyProfile from "./modules/MyPages/MyProfile";
import UserProfilePage from "./modules/MyPages/UserProfilePage";

// import Home_2 from "./components/Home_2";
// import Home_3 from "./components/Home_3";
import "./assets/styles/custom.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
// import Collection_HomeNftFilters from "./components/Collection_HomeNftFilters";
// import ToggleSwitch from "./components/ToggleSwitch";
import HelpCenter from "./modules/Resources/Help/HelpCenter";
import Suggestion from "./modules/Resources/Suggestion";
import Buying from "./modules/Resources/Help/Buying";
import MyItems from "./modules/Items/MyItems";
import EditProfile from "./modules/Profile/EditProfile";
import MyItems_Collection from "./modules/MyPages/MyItemCollection";
import CreateNFT from "./modules/Create/CreateNFT";
import CreateSingleNFT from "./modules/Create/index";
import About from "./modules/About/About";
// import Menu from "./";
// import Fixed_Price from "./modules/";
// import Highest_Bid from "./components/Highest_Bid";
import CreateNftCollections from "./modules/Create/CreateNftCollections";
import CollectionDetails from "./modules/Collections/CollectionDetails";
import NftInformation from "./modules/Home/index";
import NftInformation1 from "./modules/Home/NftInformation1";
import NftInformation2 from "./modules/Home/NftInformation2";
import NftInformationOffer1 from "./modules/Home/NftInformationOffer1";
import EditItem from "./modules/Items/EditItem";
import Wallet from "./modules/Wallet/Wallet";
import NftInformationFixedPrice from "./modules/Home/NftInformationFixedPrice";
import FixedPrice from "./modules/Items/FixedPrice";
import Menu from "./common/components/Menu";
import { WEB_APP_USER_WALLET_ADDRESS } from "./reducers/Constants";
import { addUseraction, addUserData } from "./reducers/Action";
import { CheckUserByWalletAddress } from "./services/UserMicroService";
import FAQsPage from "./modules/Faqs/index";
import Home from "./modules/Home/Home";
import CollectionPage from "./modules/Resources/CreateCollection/index";
import NftsPage from "./modules/Resources/AddingNfts/index";
import BuyPage from "./modules/Resources/Buying/index";
import SellPage from "./modules/Resources/Selling/index";
import ScrollToTop from "./ScrollToTop";
import SearchResults from "./common/components/searchResults";
import PageNotFound from "./common/components/pageNotFound";
import Blog from "./modules/blogs/blog";
import Privacy from "./modules/company/privacy";
import TermsAndCondition from "./modules/company/termsAndCondition";
function App() {

  useEffect(() => {
    const checkWalletAddress = localStorage.getItem(
      WEB_APP_USER_WALLET_ADDRESS
    );
    if (checkWalletAddress != null) {
      CheckUserByWalletAddress(checkWalletAddress, (res) => {
        console.log(res, "<<<< response at routes.js");
        addUserData(res);
      });
    }

    // alert(`${checkWalletAddress}`);
  }, []);

  return (
    <Provider store={store} >
      <div className="App" >

        <Router>
        <ScrollToTop />
          <Navbar />
          {/* <Tile__homepage /> */}
          {/* <Switch> */}
          <Routes>
            <Route path="/FAQs" element={<FAQsPage />} />
            <Route path="/nfts" element={<NftPage />} />
            <Route path="/" element={<Home />} />

            {/* <Route
              exact
              path="/my-profile/nft-information/:id"
              element={<NftInformation />}
            /> */}
            <Route
              exact
              path="/nft-information/:id"
              element={<NftInformation />}
            />

            {/* <Route
              exact
              path="/nft-information_1/:id"
              element={<NftInformation1 />}
            /> */}
            <Route
              // exact
              path="/nft-information_2"
              element={<NftInformation2 />}
            />

            <Route
              exact
              path="/nft-information_Offer_1"
              element={<NftInformationOffer1 />}
            />
            <Route exact path="/help-center" element={<HelpCenter />} />
            <Route exact path="/suggestion" element={<Suggestion />} />
             <Route exact path="/selling" element={<SellPage />} /> 
             <Route exact path="/resource-collection" element={<CollectionPage />} /> 
             <Route exact path="/adding-nfts" element={<NftsPage />} /> 
            {/* ------------------ */}
            <Route exact path="/top-collection" element={<Top_collection />} />
            <Route exact path="/top-bidder" element={<TopBidders />} />
            <Route exact path="/top-seller" element={<TopSeller />} />
            {/* ----------- */}
            <Route exact path="/leader-board" element={<LeaderBoard />} />
            <Route exact path="/buying" element={<BuyPage />} />
            <Route exact path="/my-items" element={<MyItems />} />
            <Route
              exact
              path="/my-items-collection"
              element={<MyItems_Collection />}
            />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/notification" element={<Notification />} />
            <Route exact path="/create-nft" element={<CreateNFT />} />
            <Route
              exact
              path="/collection-details/:id"
              element={<CollectionDetails />}
            />

            <Route exact path="/edit-items/:id" element={<EditItem />} />
            <Route
              exact
              path="/collections-tile"
              element={<CollectionCards />}
            />
            <Route
              exact
              path="/create-single-nft"
              element={<CreateSingleNFT />}
            />
            <Route
              exact
              path="/create-nft-collection"
              element={<CreateNftCollections />}
            />
            <Route exact path="/add-wallet" element={<Create />} />
            <Route eaxct path="/my-profile" element={<MyProfile />} />
            <Route eaxct path="/user-profile/:id" element={<UserProfilePage />} />

            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/wallet" element={<Wallet />} />

            <Route
              exact
              path="/nft-information-fixed-price"
              element={<NftInformationFixedPrice />}
            />
            {/* <Route eaxct path="/MyProfile" element={<MyProfile />} /> */}
            {/* <Route exact path="/MyProfile" element={<MyProfile />} /> */}

            {/* <Route
                exact
                path="/CollectionDetails"
                element={<CollectionDetails />}
              /> */}
            <Route exact path="/fixed-price" element={<FixedPrice />} />
            {/* <Route exact path="/CreateNFT" element={<CreateNFT />} /> */}
            {/* <Route
                exact
                path="/CollectionDetails"
                element={<CollectionDetails />}
              /> */}
            {/* <Route exact path="/Highest_Bid" element={<Highest_Bid />} /> */}
            {/* <Route exact path="/ToggleSwitch" element={<ToggleSwitch />} /> */}
            {/* <Route path="/" element={<NftToggle />} /> */}
            {/* <Route path="/" element={<Lower__homepage />} /> */}
            {/* <Route
              exact
              path="/Collection_HomeNftFilters"
              element={<Collection_HomeNftFilters />}
            /> */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />.
            <Route path="/Terms-Condition" element={<TermsAndCondition />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
          </Routes>
          {/* </Switch> */}
        </Router>
        <Footer />
        <Wallet />
        <Notification />
      </div>
    </Provider>
  );
}

export default App;
