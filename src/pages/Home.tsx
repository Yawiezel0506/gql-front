import "./home.css"
import { useEffect, useState } from "react";
import { Category } from "../interfaces/category";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { render } from "../rtk/cartSlice";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { cardCategory, pHello } from "../style/home";
import { bannerCard, class_scrolling_container, hide_scrollbar } from "../style/banners";


const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categoriesFromRTK: Category[] = useAppSelector((state) => state.categoryAndBanners.category)
  const bannersFromRTK: Banner[] = useAppSelector((state) => state.categoryAndBanners.banners)

  useEffect(() => {
    setBanners(bannersFromRTK)
  }, [bannersFromRTK])

  useEffect(() => {
    if (categoriesFromRTK.length) {
      setCategories(categoriesFromRTK)
      setLoading(false)
    }
  }, [categoriesFromRTK])

  useEffect(() => {
    dispatch(render());
  }, [dispatch]);

  const clickToCard = (cat: string) => {
    navigate(`/store/products/${cat}`);
  };

  const handleClick = (productId: string) => {
    navigate(`/store/product/${productId}`);
  };

  const userName = useAppSelector((state) => state.userName.userName)

  return (
    <>
      {userName && <Typography variant="h1" align="center" gutterBottom style={pHello}>
        Hello {userName}
      </Typography>}
      {banners && banners.length > 0 && (
        <>

          <div
            className="hide-scrollbar"
            style={hide_scrollbar}
          >
            <div
              className="scrolling-container"
              style={class_scrolling_container}
            >
              {banners.map((banner, index) => (
                <div
                  key={index}
                  style={bannerCard}
                >
                  <img
                    className="banner-image"
                    src={banner.image.url}
                    alt={banner.image.alt}
                    onClick={() => handleClick(banner.productID.toString())}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Grid container spacing={2}>
        {loading ? (
          <HomeSkeleton />
        ) : (
          Array.isArray(categories) &&
          categories.map((cat: Category) => (
            <Grid item xs={12} sm={6} md={4} key={cat._id}>
              <Card sx={cardCategory}>
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h3"
                      fontFamily="Fira Sans, sans-serif"
                      fontWeight="bold"
                      color="rgb(33,47,58)"
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ maxHeight: 210, objectFit: "" }}
                    image={cat.image}
                    alt={cat.name}
                    onClick={() => clickToCard(cat.name)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;
