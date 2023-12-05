import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, CardMedia, IconButton, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import {
  CartProduct,
  decrement,
  increment,
  removeProduct,
} from "../rtk/cartSlice";
import { Product } from "../interfaces/product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import {
  StyledTableCell,
  StyledTableRow,
  styleDivBottom,
  stylePaper,
} from "../style/cart";
import { styleButton } from "../style/login&Signin";
import { buttonAddToCart } from "../style/products";

interface CartProps {
  props: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartTable: React.FC<CartProps> = ({ props }) => {
  const [productForCart, setProductForCart] = useState<CartProduct[]>([]);
  const [productsCartFromData, setProductsCartFromData] = useState<Product[]>(
    []
  );
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const dataProduct = useAppSelector((state) => state.products.products);
  const setOpenCart = props;

  const flag = useAppSelector((state) => state.userName.flag);
  const productFromRtk: CartProduct[] = useAppSelector(
    (state) => state.cart.products
  );

  useEffect(() => {
    setProductForCart(productFromRtk);
  }, [flag, productFromRtk]);

  const comparison = () => {
    if (productForCart.length) {
      const products = productForCart.flatMap((item) => {
        const product = dataProduct.find((product) => product.id === item.name);
        return product ? [product] : [];
      });
      if (products.length) {
        setProductsCartFromData(products);
      }
    } else setProductsCartFromData([]);
  };

  useEffect(() => {
    comparison();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForCart]);

  useEffect(() => {
    let total = 0;
    for (const product of productsCartFromData) {
      const quantity: CartProduct | undefined = productForCart.find(
        (item) => item.name === product.id
      );
      if (quantity && quantity.quantity) {
        total += product.price * quantity.quantity;
      }
    }
    setTotalPrice(total);
  }, [productsCartFromData, productForCart]);

  const incrementQuantity = (product: Product) => {
    dispatch(increment(product.id));
  };
  const decrementQuantity = (product: Product) => {
    dispatch(decrement(product.id));
  };
  const removeProductFromCart = (product: Product) => {
    dispatch(removeProduct(product.id));
  };

  return (
    <>
      {productsCartFromData.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, minHeight:100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{backgroundColor: 'rgb(35,47,62)'}}>ITEMS</StyledTableCell>
                <StyledTableCell align="center" style={{backgroundColor: 'rgb(35,47,62)'}}>QUANTITY</StyledTableCell>
                <StyledTableCell align="center" style={{backgroundColor: 'rgb(35,47,62)'}}>AVAILABILITY</StyledTableCell>
                <StyledTableCell align="right" style={{backgroundColor: 'rgb(35,47,62)'}}>TOTAL PRICE</StyledTableCell>
                <StyledTableCell align="right" style={{backgroundColor: 'rgb(35,47,62)'}}>
                  ADDITIONAL ACTIONS
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsCartFromData.map((product) => {
                const quantity: CartProduct | undefined = productForCart.find(
                  (item) => item.name === product.id
                );
                return (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell component="th" scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia
                          sx={{ maxWidth: "12rem", minWidth: "12rem" }}
                          component="img"
                          height="75em"
                          image={product.image}
                          alt={product.title}
                        />
                        <Box sx={{ width: "1em" }}></Box>
                        <Typography variant="body1">{product.title}</Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {quantity?.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">{}</StyledTableCell>
                    <StyledTableCell align="center">
                      <StyledTableCell align="center">
                        {quantity && quantity.quantity
                          ? product.price * quantity.quantity + "$"
                          : null}
                      </StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton sx={buttonAddToCart} onClick={() => removeProductFromCart(product)}>
                        <DeleteTwoToneIcon />
                      </IconButton>
                      <IconButton sx={buttonAddToCart} onClick={() => incrementQuantity(product)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton sx={buttonAddToCart} onClick={() => decrementQuantity(product)}>
                        <RemoveIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
          <div style={styleDivBottom}>
            <Typography variant="h3" color="#333">
              TOTAL PRICE: {totalPrice}$
            </Typography>
            <Payment total={totalPrice} />
          </div>
        </TableContainer>
      ) : (
        <Paper sx={stylePaper}>
          <Typography variant="h4" align="center">
            Your cart is looking a little lonely...
          </Typography>

          <Typography variant="subtitle1" align="center">
            Browse our products and find something special to take home with you
            today! We have lots of amazing options to suit your style.
          </Typography>

          <div style={{ textAlign: "center" }}>
            <Button
              sx={styleButton}
              variant="contained"
              onClick={() => {
                navigate("/store");
                setOpenCart(false);
              }}
            >
              Start Shopping
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
};
export default CartTable;
