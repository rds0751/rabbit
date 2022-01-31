import React, { Component } from 'react'
// import './Collections_tile.css'

export class Collections_tile extends Component {


    render() {

        let { Collections_title, collection_image, no_of_items } = this.props;


        return (
            <div>
                < div class="row">
                    <div className='col-md-3 col-lg-3 col-sm-6 col-12'>
                        <div className='Collections__container'>
                            <ul>
                                <li>
                                    <img className='Collection__logo' className='img-fluid' class="rounded-circle" alt="100x100" src={collection_image}
                                        data-holder-rendered="true" />
                                </li>
                                <div style={{ marginTop: "-30px" }}>
                                    <li style={{ fontSize: "16px", fontWeight: "bolder", marginBottom: "5px" }}>{Collections_title}</li>
                                    <li style={{ fontSize: "16px", fontWeight: "normal" }}>Total Items:<span>{no_of_items}</span> </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Collections_tile
