import { AddShoppingCartOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  console.log(handleAddToCart,"handleAddToCart");
  return (
    <>
    {/* <Grid product xs={6} md={3} > */}
    <Card className="card">
      <CardMedia
      sx={{ height: 140 }}
        component="img"
        image={product.image}
        alt="product"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${product.cost}
        </Typography>
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
         onClick={handleAddToCart}
         id={product._id}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
    {/* </Grid> */}
    </>
  );
};

export default ProductCard;
