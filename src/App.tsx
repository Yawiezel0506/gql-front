import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Home from "./pages/Home";
import { themeSettings } from "./palette/theme";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { ConnectToData, ConnectBanners, ConnectCategory } from "./utils/functionsForDB";
import NotFound from "./pages/NotFound";
import automaticLogIn from "./utils/automaticLogIn";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const baseUrl = import.meta.env.VITE_SERVER_API

const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  // ConnectToData();
  automaticLogIn();
  // ConnectCategory()
  ConnectBanners()
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/store" element={<Home />} />
              <Route path="/store/products/:category" element={<Products />} />
              <Route path="/store/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
