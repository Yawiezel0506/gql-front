// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import productsReducer from "./productsSlice";
// import cartReducer from "./cartSlice2";
// import userNameReducer from "./userNameSlice";
// import signUpReducer from "./flagSignUpSlice";
// import logInReducer from "./flagLogInSlice";


// const middleware = [
//     ...getDefaultMiddleware(),
//     (store) => (next) => (action) => {
//       if (typeof action === 'function') {
//         // אם הפעולה היא פונקציה, הפעל את fetchDataBasedOnLogin ואז את הפעולה הרגילה
//         store.dispatch(fetchDataBasedOnLogin()).then(() => next(action));
//       } else {
//         // אחרת, המשך עם הפעולה הרגילה
//         next(action);
//       }
//     },
//   ];

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cart: cartReducer,
//     userName: userNameReducer,
//     openSignUp: signUpReducer,
//     openLogIn: logInReducer,
//   },
//   middleware,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
