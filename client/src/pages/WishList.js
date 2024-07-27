import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useWishList } from "../context/wishlist";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useCart } from "../context/cart";
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

const WishList = () => {
    const [wishList, setWishList] = useWishList();
    // const URL = process.env.REACT_APP_API;


    const [cart, setCart] = useCart();

    console.log("wish list pro ", wishList);
    const URL = process.env.REACT_APP_API;

    const navigate = useNavigate();

    const handleWishlist = (pid) => {
      
        try {
            let myWishList = [...wishList];
            let index = myWishList.findIndex(item => item._id === pid)
            myWishList.splice(index, 1);
            setWishList(myWishList)
            localStorage.setItem('wishList', JSON.stringify(myWishList));
            toast.success(`Product has been removed from wishlist`);
        }
        catch (error) {
            console.log("Error while removing wishlist item ", error.message);
        }
    };

    return (
        <Layout title={'WishList'}>
            <div className="wishList-box">
                {wishList.length == 0 ? (
                    <>
                        {" "}
                        <div> No items are in the WishList </div>{" "}
                    </>
                ) : (
                    <>
                        <div className="wishList-content">
                            <div className="wish-header">
                            <h1 className="text-center mt-4">

                                My Wishlist{" "} Contains
                                <span className="wishlist-count">
                                    {" "}
                                    {wishList?.length } Items{" "}
                                </span>{" "}
                            </h1>
                            </div>

                            <div className="d-flex flex-wrap pro-wishlist">
                                {wishList?.map((product) => (
                                    <div className="card m-2 card-box" style={{ width: "17rem" }}>
                                        <CancelIcon     
                                            className="faHeart"
                                            onClick={() => {
                                                handleWishlist(product._id);
                                            }}
                                            style={{ fontSize: '30px' }}
                                        />
                                        <VisibilityIcon
                                                style={{ fontSize: '30px' }}
                                            className="faEye"
                                            onClick={() => {
                                                navigate(`/product/${product.slug}`);
                                            }}
                                        />

                                        <img
                                            src={`${URL}/api/v1/product/product-photo/${product._id}`}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                            alt={product.name}
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">
                                                {product.description.substring(0, 25)}....
                                            </p>
                                            <div className="pro-price">
                                                <div className="card-text fp">
                                                    {" "}
                                                    ₹ {product.price - 500}{" "}
                                                </div>
                                                <div className="card-text sp"> ₹ {product.price} </div>

                                                <div className="off"> ( 10 % OFF ) </div>
                                            </div>

                                            <div className="card-btn">
                                                <button
                                                    className="card-btn-details"
                                                    onClick={() => {
                                                        navigate(`/product/${product.slug}`);
                                                    }}
                                                >
                                                    More Details
                                                </button>
                                                <button
                                                    className="card-btn-add"
                                                    onClick={() => {
                                                        setCart([...cart, product]);
                                                        localStorage.setItem(
                                                            "cart",
                                                            JSON.stringify([...cart, product])
                                                        );
                                                        toast.success(
                                                            `${product.name} has been added to cart`
                                                        );
                                                    }}
                                                >
                                                    Add to cart
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default WishList;
