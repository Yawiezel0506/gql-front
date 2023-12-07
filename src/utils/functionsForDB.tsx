import { useAppDispatch } from "../rtk/hooks";
import axios from "axios";
import { useEffect } from "react";
import { setProducts } from "../rtk/productsSlice";
import { setBanners, setCategory } from "../rtk/category&banners";
// import { CartProduct } from "../rtk/cartSlice";
// import { store } from "../rtk/store";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setCart } from "../rtk/cartSlice2";
import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const baseUrl = import.meta.env.VITE_SERVER_API || "https://store-back-3.onrender.com"

// const GET_ALL_PRODUCTS = gql`
//   query {
//     getAllProducts {
//       title
//       price
//       description
//       category
//       attribute
//       quantity
//     }
//   }
// `;


// export function ConnectToData() {
//   const dispatch = useAppDispatch();
//   const { error, data } = useQuery(GET_ALL_PRODUCTS);

//   useEffect(() => {
//     if (data) dispatch(setProducts(data.getAllProducts))
//     if (error) throw error
//   }, [data, error])
// }


export function ConnectToData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/products`
        );
        if(response.data){
          const { data } = response;
          dispatch(setProducts(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


export const ConnectBanners = async () => {
  const dispatch = useAppDispatch();

  try {
    const resp = await axios.get(`https://serverbanners.onrender.com/banners`);
    if (resp.data) {
      const { data } = resp;
      dispatch(setBanners(data));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const GET_CATEGORY = gql`
  query {
    getCategory {
      name
      image
      click
    }
  }
`;


const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export function ConnectCategory() {
  const dispatch = useAppDispatch();
  const { error, data } = useQuery(GET_CATEGORY);

  useEffect(() => {
    if (data) dispatch(setCategory(data.getCategory))
    if (error) throw error
  }, [data, error])
}


// export function ConnectCategoryWrapper() {
//   return (
//     <ApolloProvider client={client}>
//       <ConnectCategory />
//     </ApolloProvider>
//   );
// }

// export const ConnectCategory = async () => {
//   const dispatch = useAppDispatch();

//   try {
//     const resp = await axios.get(`${baseUrl}/categories`);
//     const { data } = resp;
//     dispatch(setCategory(data))
//   } catch (error) {
//     console.log(error);
//   }
// }


// export const getCartFromServer = async (userId) => {
//   // const userId = useAppSelector((state) => state.userName.userId);
//   // const [data, setData] = useState<CartProduct[]>([]);
// const dispatch = useAppDispatch();
//   // useEffect(() => {
//     // const getData = async () => {
//       try {
//         if (userId) {
//           const response = await axios.get(
//             `https://store-back-3.onrender.com/api/cart/${userId}`
//           );
//           if (response.data) {
//             dispatch(setCart(response.data));
//             // setData(response.data);
//           }
//         }
//         //  else {
//         //   const item = localStorage.getItem("cart");
//         //   setData(item ? JSON.parse(item) : []);
//         // }
//       } catch (error) {
//         console.error("Error fetching cart data", error);
//       }
//     };

//     // getData();
//   // }, [userId]);

//   // return data;
// // };




// // export const getCartFromServer = async () => {

// //   const userId = useAppSelector((state) => state.userName.userId)

// //   useEffect(() => {
// //     const getData = async () => {
// //       if (userId) {
// //         try {
// //           const response = await axios.get(
// //             `https://store-back-3.onrender.com/api/cart/${userId}`
// //           );
// //           if (response.data) return response.data;
// //         } catch (err) {
// //           console.log(err);
// //         }
// //       } else {
// //         try {
// //           const item = localStorage.getItem("cart");
// //           return item ? JSON.parse(item) : [];
// //         } catch (error) {
// //           console.error("Failed to parse cart from localStorage", error);
// //           return [];
// //         }
// //       }
// //     };
// //     getData();
// //   }, [userId]);
// //   return [];
// // };

// export const postCartToServer = async (cart: CartProduct[]) => {
//   const state = store.getState();
//   const user = state.userName.flag;
//   const userId = state.userName.userId;

//   if (user) {
//     try {
//       const response = await axios.post(
//         `https://store-back-3.onrender.com/api/cart/${userId}`,
//         cart
//       );
//       return response.data ? response.data : [];
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return [];
// };

// export const postCart = (cart: CartProduct[]) => {
//   const state = store.getState();
//   const flag = state.userName.flag;

//   if (flag) {
//     try {
//       postCartToServer(cart);
//     } catch (err) {
//       throw err;
//     }
//   }
// };
