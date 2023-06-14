// import { Search, SentimentDissatisfied } from "@mui/icons-material";
// import {
//   CircularProgress,
//   Grid,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
// import { useSnackbar } from "notistack";
// import React, { useCallback, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./Products.css";
// import ProductCard from "./ProductCard";
// import Cart from "./Cart";
// import { textChangeRangeNewSpan } from "typescript";
// import { generateCartItemsFrom } from "./Cart.js";

// //generateCartItemsFrom()
// // Definition of Data Structures used
// /**
//  * @typedef {Object} Product - Data on product available to buy
//  *
//  * @property {string} name - The name or title of the product


// /**
//  * @typedef {Object} CartItem -  - Data on product added to cart
//  * 
//  * @property {string} name - The name or title of the product in cart
//  * @property {string} qty - The quantity of product added to cart
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} _id - Unique ID for the product
//  */

// const Products = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [loading, setLoading] = useState(false);
//   const [apiData, setApiData] = useState([]);
//   const [debounceTime, setDebounceTime] = useState(null);
//   const [fetchedData, setFetchedData] = useState([]);
//   const [Cartproduct, setCartproduct] = useState([]);
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     performAPICall();
//     // fetchCart(token);
//     //generateCartItemsFrom(fetchedData,apiData);
//   }, []);

//   useEffect(() => {
//     fetchCart(token)
//       .then((cartData) => generateCartItemsFrom(cartData, apiData))
//       .then((cartItems) => setCartproduct(cartItems));

//   }, [apiData]);

//   console.log(fetchedData, "fetchedData");
//   // useEffect(() => {
//   //   console.log(Cartproduct,"sh");
//   // }, [Cartproduct]);
//   //console.log(allCartproduct,"sh");
//   // const generateCartItemsFrom(fetchedData,apiData) = async()=>{

//   // }

//   // }
//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
//   /**
//    * Make API call to get the products list and store it to display the products
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on all available products
//    *
//    * API endpoint - "GET /products"
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "name": "iPhone XR",
//    *          "category": "Phones",
//    *          "cost": 100,
//    *          "rating": 4,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "v4sLtEcMpzabRyfx"
//    *      },
//    *      {
//    *          "name": "Basketball",
//    *          "category": "Sports",
//    *          "cost": 100,
//    *          "rating": 5,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "upLK9JbQ4rMhTwt4"
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 500
//    * {
//    *      "success": false,
//    *      "message": "Something went wrong. Check the backend console for more details"
//    * }
//    */
//   const performAPICall = async () => {
//     try {
//       setLoading(true);
//       let response = await axios.get(`${config.endpoint}/products`);
//       setApiData(response.data);
//       //setLoading(false);
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000); // Set the loading time to 3 seconds
//       //console.log(response.data[0]);
//     } catch (e) {
//       setLoading(false);
//       if (e.response) {
//         enqueueSnackbar(e.response.data.message, { variant: "error" });
//       }
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
//   /**
//    * Definition for search handler
//    * This is the function that is called on adding new search keys
//    *
//    * @param {string} text
//    *    Text user types in the search bar. To filter the displayed products based on this text.
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on filtered set of products
//    *
//    * API endpoint - "GET /products/search?value=<search-query>"
//    *
//    */
//   const performSearch = async (text) => {
//     try {
//       setLoading(true);
//       let res = await axios.get(
//         `${config.endpoint}/products/search?value=${text}`
//       );
//       setApiData(res.data);
//       setLoading(false);
//     } catch (e) {
//       setLoading(false);
//       //setLoading(true);
//       setApiData([]);
//       console.log(e.response);
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
//   /**
//    * Definition for debounce handler
//    * With debounce, this is the function to be called whenever the user types text in the searchbar field
//    *
//    * @param {{ target: { value: string } }} event
//    *    JS event object emitted from the search input field
//    *
//    * @param {NodeJS.Timeout} debounceTimeout
//    *    Timer id set for the previous debounce call
//    *
//    */

//   const debounceSearch = (event, debounceTime) => {
//     //setSearching(event.target.value);
//     if (debounceTime) {
//       clearTimeout(debounceTime);
//     }
//     let newtimeout = setTimeout(async () => {
//       await performSearch(event.target.value);
//     }, 500);
//     setDebounceTime(newtimeout);
//     //return()=>clearTimeout(cleardata);
//   };

//   // const debounce = useCallback(debounceSearch(performSearch, 500), []);

//   /**
//    * Perform the API call to fetch the user's cart and return the response
//    *
//    * @param {string} token - Authentication token returned on login
//    *
//    * @returns { Array.<{ productId: string, qty: number }> | null }
//    *    The response JSON object
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 401
//    * {
//    *      "success": false,
//    *      "message": "Protected route, Oauth2 Bearer token not found"
//    * }
//    */

//   const fetchCart = async (token) => {
//     if (!token) return;
//     try {
//       const url = `${config.endpoint}/cart`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data, "aa");
//       setFetchedData(response.data);

//       return response.data;
//     } catch (error) {
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//       return null;
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
//   /**
//    * Return if a product already is present in the cart
//    *
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { String } productId
//    *    Id of a product to be checked
//    *
//    * @returns { Boolean }
//    *    Whether a product of given "productId" exists in the "items" array
//    *
//    */
//   const isItemInCart = (items, productId) => {
//    // options.preventDefault=true;
//     return items.findIndex((item) => (item.productId === productId)) !== -1;
//   };

//   /**
//    * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
//    *
//    * @param {string} token
//    *    Authentication token returned on login
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { Array.<Product> } products
//    *    Array of objects with complete data on all available products
//    * @param {string} productId
//    *    ID of the product that is to be added or updated in cart
//    * @param {number} qty
//    *    How many of the product should be in the cart
//    * @param {boolean} options
//    *    If this function was triggered from the product card's "Add to Cart" button
//    *
//    * Example for successful response from backend:
//    * HTTP 200 - Updated list of cart items
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 404 - On invalid productId
//    * {
//    *      "success": false,
//    *      "message": "Product doesn't exist"
//    * }
//    */
//   const addToCart = async (
//     token,
//     items,
//     products,
//     productId,
//     qty,
//     options = { preventDuplicate : false}
//   ) => {
//     if(!token){
//       enqueueSnackbar("please login first",{variant:"warning"});
//       return;
//     }
//       if(options.preventDuplicate && isItemInCart(items,productId)){
//           enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.",{variant:"warning"});
//           return;
//       }
//     console.log("ayush");
//     try {
//       console.log("ayush in try")
//       const response = await axios.post(
//         `${config.endpoint}/cart`,
//         {
//           productId, qty,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//      // console.log(temp.data)
//      let data = generateCartItemsFrom(response.data, products);
//       setCartproduct(data);
//       console.log(data, response.data, "uyguj");
//     } catch (e) {
//       if (e.response) {
//         enqueueSnackbar(e.response.data.message, { variant: "error" });
//       }
//     }
//   };
//   console.log(Cartproduct, "hsh");
//   return (
//     <div>
//       <Header>
//         {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
//         <TextField
//           className="search-desktop"
//           size="small"
//           fullWidth
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Search color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           placeholder="Search for items/categories"
//           name="search"
//           onChange={(e) => {
//             debounceSearch(e, debounceTime);
//           }}
//         />
//       </Header>

//       <TextField
//         className="search-mobile"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         placeholder="Search for items/categories"
//         name="search"
//         onChange={(e) => {
//           debounceSearch(e, debounceTime);
//         }}
//       />

//       <Grid container>
//         <Grid container md={token ? 9 : 12}>
//           <Grid item className="product-grid">
//             <Box className="hero">
//               <p className="hero-heading">
//                 India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
//                 to your door step
//               </p>
//             </Box>
//           </Grid>

//           {loading && (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               className="loading"
//             >
//               <CircularProgress size={25} color="primary" />
//               <span>Loading Products</span>
//             </Box>
//           )}

//           {apiData.length === 0 && !loading && (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               className="loading"
//             >
//               <SentimentVeryDissatisfiedIcon />
//               <br />
//               <span>No products found</span>
//             </Box>
//           )}

//           {!loading && (
//             <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
//               {apiData.map((product) => (
//                 <Grid item xs={6} md={3} key={product._id}>
//                   <ProductCard
//                     product={product}
//                     handleAddToCart= {async () => await addToCart(token,fetchedData,apiData,product._id,1,{ preventDuplicate : true}) }
//                   />
                 
//                 </Grid>
//               ))}
//             </Grid>
//           )}
          
//         </Grid>

//         {token ? (
//           <Grid md={3} xs={12}>
//             <Cart products={apiData} items={Cartproduct} 
//             // handleQuantity={addToCart(token,fetchedData,apiData,fetchedData.productId,Cartproduct.qty)} 
//             handleQuantity={addToCart}
//             />
//           </Grid>
//         ) : null}
//       </Grid>
//       <Footer />
//     </div>
//   );
// };

// export default Products;
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";
import Cart, { generateCartItemsFrom } from "./Cart";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
import "./Products.css";


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [searchData, setSearchData] = useState("");
  const [debounceTime, setDebounceTime] = useState(null);
  const [items, setItems] = useState([]);
  // const dummyData = {
  //   name: "Tan Leatherette Weekender Duffle",
  //   category: "Fashion",
  //   cost: 150,
  //   rating: 4,
  //   image:
  //     "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   _id: "PmInA797xJhMIPti",
  // };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for moren details"
   * }
   */
  const performAPICall = async () => {
    setLoading(true);
    try {
      let res = await axios.get(`${config.endpoint}/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
      setLoading(false);
    } catch (e) {
      if (e.response && e.responce.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch products. check that the backend running, reachable and returns valid JSON.",
          { variant: "error" }
        );
        return null;
      }
    }
  };

  const isItemInCart = (items, productId) => {
    return items.findIndex((item) => item.productId === productId) !== -1;
  };

  
  const addToCart = async (token, items, productId,products,qty,options={} ) => {
    if (!token) {
      enqueueSnackbar("Please log in to add item to cart", {
        variant: "warning",
      });
      return;
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        "item already in cart",
        {
          variant: "warning",
        }
      );
      return;
    }
    try {
      const responce = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const cartItems = generateCartItemsFrom(responce.data,products)
      // setItems(cartItems)
      const cartItems = generateCartItemsFrom(responce.data, products)
      setItems(cartItems)

      // return responce.data;
      // updateCartItems(responce.data, products);
    } catch (e) {
      if (e.responce) {
        enqueueSnackbar(e.responce.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend id=s running,reachable and return valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
    console.log("Added to cart", productId);
  };

  useEffect(() => {
    performAPICall();
    // setDataLoaded("loaded");
  }, []);
  useEffect(() => {
    fetchCart(token)
      .then((cartData) => generateCartItemsFrom(cartData, products))
      .then((cartItems) => setItems(cartItems));
  }, [products]);

  // useEffect(() => {
  //   performSearch(searchData);
  // }, [searchData]);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const responce = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );

      setFilteredProducts(responce.data);
    } catch (e) {
      if (e.response.status === 404) {
        setFilteredProducts([]);
      } else if (e.response.status === 500) {
        enqueueSnackbar(e.responce.data.message, { variant: "error" });
        setFilteredProducts(products);
        // }else {

        //   enqueueSnackbar("Something Went Wrong", { variant: "error" });
        //   setFilteredProducts(products)
        // }
      }
    }
  };
  // curl https://workspace:8002/api/v1/cart
  const fetchCart = async (token) => {
    if (!token) return;
    try {
      const responce = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return responce.data;
    } catch {
      enqueueSnackbar(
        "Could not featch detail. check that the backend is running, reachable and returns vaild JSON",
        {
          variant: "error",
        }
      );
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *time
   */
  const debounceSearch = (event, debounceTime) => {
    if (debounceTime) {
      clearTimeout(debounceTime);
    }

    const time = setTimeout(async () => {
      await performSearch(event.target.value);
    }, 500);
    setDebounceTime(time);
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField  fullWidth
          className="search-desktop"
          size="small"
          InputProps={{
           
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, debounceTime)}
        />
         </Header>
        <TextField fullWidth
          className="search-mobile"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, debounceTime)}
        />
     

      <Grid container>
        <Grid items md={token ? 9 : 12}>
          <Grid container>
            <Grid item className="product-grid" padding={"1rem"}>
              <Box className="hero">
                <p className="hero-heading">
                  India’s{" "}
                  <span className="hero-highlight">FASTEST DELIVERY</span> to
                  your door step
                </p>
              </Box>
            </Grid>
            {loading ? (
              <Box className="loading">
                <CircularProgress />
                <h4>Loading Products...</h4>
              </Box>
            ) : (
              <Grid container spacing={2} padding={"1rem"}>
                {filteredProducts.length ? (
                  filteredProducts.map((product) => {
                    return (
                      <Grid item xs={6} md={3} key={product._id}>
                        <ProductCard
                          product={product}
                          handleAddToCart={async () =>
                            await addToCart(
                              token,
                               items,
                               product._id,
                               products,
                               1,
                                {preventDuplicate : true})
                          }
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Box className="loading">
                    <SentimentDissatisfied />
                    <div>No products found</div>
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        {token ? (
          <Grid item xs={12} md={3} style={{ backgroundColor: "#E9F5E1" }}>
            <Cart products={products} items={items} handleQuantity={addToCart} />
          </Grid>
        ) : null}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
