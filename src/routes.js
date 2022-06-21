import "./App.css";
import react, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
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
import BlogDetail from "./modules/blogs/blogDetail";
import { getTenantData } from "./services/clientConfigMicroService";
import { useState } from "react";
import Spinner from "./common/components/Spinner";
import NewHomePage from "./modules/NewHomePage/index";
import NavTwo from "./modules/NewHomePage/Nav";
import FooterTwo from "./modules/NewHomePage/Footer";

const url = new URL(window.location.href);
const tenantId = url.searchParams.get("id");

localStorage.setItem("tenantId", tenantId);

function App() {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);
  const [navFooter, setNavFooter] = useState(true);

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

  useEffect(() => {
    // if (localStorage.getItem('WHITE_LABEL_TOKEN') !== null) {

    getTenantData()
      .then((response) => {
        dispatch({ type: "ADD_CUSTOMIZE_DATA", payload: response[0] });
        dispatch({ type: "ADD_BANNER_NFTS", payload: response[1] });

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });

    // } else {
    //   setLoader(false)
    // }
  }, []);

  return (
    <div className="App">
      {/* {
         loader && <div className="loader-spinner"><Spinner/></div>
        } */}

      <Router>
        <ScrollToTop />

        <Navbar loader={loader} />

        {/* <Tile__homepage /> */}
        {/* <Switch> */}
        <Routes>
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route
            exact
            path="/nfts"
            element={<NftPage loaderState={loader} />}
          />
          <Route path="/" element={<Home loaderState={loader} />} />
          

          {/* <Route
              exact
              path="/my-profile/nft-information/:id"
              element={<NftInformation />}
            /> */}
          <Route
            exact
            path="/nft-information/:id"
            element={<NftInformation loader={loader} />}
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
          <Route
            exact
            path="/help-center"
            element={<HelpCenter loader={loader} />}
          />
          <Route
            exact
            path="/suggestion"
            element={<Suggestion loader={loader} />}
          />
          <Route exact path="/selling" element={<SellPage />} />
          <Route
            exact
            path="/resource-collection"
            element={<CollectionPage />}
          />
          <Route exact path="/adding-nfts" element={<NftsPage />} />
          {/* ------------------ */}
          <Route
            exact
            path="/top-collection"
            element={<Top_collection loader={loader} />}
          />
          <Route
            exact
            path="/top-bidder"
            element={<TopBidders loader={loader} />}
          />
          <Route
            exact
            path="/top-seller"
            element={<TopSeller loader={loader} />}
          />
          {/* ----------- */}
          <Route
            exact
            path="/leader-board"
            element={<LeaderBoard loader={loader} />}
          />
          <Route exact path="/buying" element={<BuyPage />} />
          <Route exact path="/my-items" element={<MyItems loader={loader} />} />
          <Route
            exact
            path="/my-items-collection"
            element={<MyItems_Collection />}
          />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/notification" element={<Notification />} />
          <Route
            exact
            path="/create-nft"
            element={<CreateNFT loader={loader} />}
          />
          <Route
            exact
            path="/collection-details/:id"
            element={<CollectionDetails loader={loader} />}
          />

          <Route exact path="/edit-items/:id" element={<EditItem />} />
          <Route
            exact
            path="/collections-tile"
            element={<CollectionCards loader={loader} />}
          />
          <Route
            exact
            path="/create-single-nft"
            element={<CreateSingleNFT loader={loader} />}
          />
          <Route
            exact
            path="/create-nft-collection"
            element={<CreateNftCollections loader={loader} />}
          />
          <Route exact path="/add-wallet" element={<Create />} />
          <Route
            exact
            path="/my-profile"
            element={<MyProfile loader={loader} />}
          />
          <Route
            exact
            path="/user-profile/:id"
            element={<UserProfilePage loader={loader} />}
          />

          <Route
            exact
            path="/edit-profile"
            element={<EditProfile loader={loader} />}
          />
          <Route exact path="/about" element={<About loader={loader} />} />
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
          <Route path="/blogs" element={<Blog loader={loader} />} />
          <Route path="/privacy" element={<Privacy loader={loader} />} />
          <Route
            path="/Terms-Condition"
            element={<TermsAndCondition loader={loader} />}
          />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* </Switch> */}
        <Wallet />

        {navFooter ? <Footer loader={loader} /> : ""}
      </Router>

      <Notification />
    </div>
  );
}

function MarketingApp() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        <NavTwo />

        <Routes>
          <Route path="*" element={<NewHomePage />} />
          <Route path="/" element={<NewHomePage />} />
        </Routes>
        <FooterTwo />
      </Router>
    </div>
  );
}

export {App,MarketingApp};
