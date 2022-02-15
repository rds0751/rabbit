import "./App.css";
import react,{useEffect} from 'react'
import {Provider} from "react-redux"
import {store} from "./reducers/store"
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
// import Home_2 from "./components/Home_2";
// import Home_3 from "./components/Home_3";
import "./assets/styles/custom.css";

import { BrowserRouter as Router, Routes, Route, Link ,Switch} from "react-router-dom";
// import Collection_HomeNftFilters from "./components/Collection_HomeNftFilters";
// import ToggleSwitch from "./components/ToggleSwitch";
import HelpCenter from "./modules/Resources/Help/HelpCenter";
import Suggestion from "./modules/Resources/Suggestion";
import Buying from "./modules/Resources/Help/Buying";
import MyItems from "./modules/Items/MyItems";
import EditProfile from "./modules/Profile/EditProfile";
import MyItems_Collection from "./modules/MyPages/MyItemCollection";
import CreateNFT from "./modules/Create/CreateNFT";
import CreateSingleNFT from "./modules/Create/CreateSingleNFT";
import About from "./modules/About/About";
// import Menu from "./";
// import Fixed_Price from "./modules/";
// import Highest_Bid from "./components/Highest_Bid";
import CreateNftCollections from "./modules/Create/CreateNftCollections";
import CollectionDetails from "./modules/Collections/CollectionDetails";
import NftInformation from "./modules/Home/NftInformation";
import NftInformation1 from "./modules/Home/NftInformation1";
import NftInformation2 from "./modules/Home/NftInformation2";
import NftInformationOffer1 from "./modules/Home/NftInformationOffer1";
import EditItem from "./modules/Items/EditItem";
import Wallet from "./modules/Wallet/Wallet";
import NftInformationFixedPrice from "./modules/Home/NftInformationFixedPrice";
import FixedPrice from "./modules/Items/FixedPrice";
import Menu from "./common/components/Menu";

function App() {

  const location = window.location

  console.log("location :",location);

  

//   useEffect(() => {
//     if(typeof window !== "undefined"){
//         const accounts = window.ethereum.request({method: "eth_requestAccounts"})
//         console.log("accounts :",accounts);
//     }
// },[])

  return (
      <Provider store={store}>
    <div className="App">
      <Router>
        <Navbar />
        {/* <Tile__homepage /> */}
        {/* <Switch> */}
          <Routes>
            <Route path="/nfts" element={<NftPage />} />
            <Route path="/" element={<NftPage />} />

            <Route exact path="/nft-information/:id" element={<NftInformation />} />

            <Route
              exact
              path="/nft-information_1"
              element={<NftInformation1 />}
            />
            <Route
              exact
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
            {/* ------------------ */}
            <Route exact path="/top-collection" element={<Top_collection />} />
            <Route exact path="/top-bidder" element={<TopBidders />} />
            <Route exact path="/top-seller" element={<TopSeller />} />
            {/* ----------- */}
            <Route exact path="/leader-board" element={<LeaderBoard />} />
            <Route exact path="/buying" element={<Buying />} />
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

            <Route exact path="/edit-items" element={<EditItem />} />
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
            <Route exact path="/create" element={<Create />} />
            <Route eaxct path="/my-profile" element={<MyProfile/>} />
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
          </Routes>
        {/* </Switch> */}
      </Router>
      {location.pathname !== "/Wallet" ? <Footer/> : <></> }
      {/* <Footer/> */}
    </div>
    </Provider>
  );
}

export default App;