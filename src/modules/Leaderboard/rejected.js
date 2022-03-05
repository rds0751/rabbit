<div className="nftCardEach col-md-6 col-lg-3  col-sm-12 mt-5 nft_card">
                  <div className="card nft-card-radius border-radius cardmob">
                    <img
                      id="nft__photo"
                      className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                      src={cdnUrl}
                      alt="nft"
                      onError="this.onerror=null;this.src='/images/image.svg';"
                    />
                    {/* <img id='like_icon' src={require('../asset//images/')} /> */}
                    <div className="container-details">
                      <div className="tile__details">
                        <div className="container__up" style={{ paddingTop: '10px' }}>
                          <h6 className="title">{name}</h6>
                        </div>
                        <div className="container__down">
                          <h6 className="value__high" style={{ margin: 'inherit' }}>
                            Sold to&nbsp;
                            <span style={{ fontWeight: "bold", color: "black" }}  >
                              {(String(ownedBy).length >= 7) ? (!ownedBy ? " " : (String(ownedBy).substring(0, 8) + "...")) : (String(ownedBy) === undefined ? "" : ownedBy)}
                            </span>
                            &nbsp;for<span> &nbsp;{curElem.biddingDetails.currency}</span>
                          </h6>
                          <h6 className="value__k">
                            {daysLeft}{" "}
                            {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                            <i
                              className="fa-solid fa-heart"
                              style={{ color: "#ef3643" }}
                            ></i>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>