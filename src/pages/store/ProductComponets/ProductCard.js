import React from "react";
import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

const ProductCard = ({ name, author, price }) => {
    //will convert to props when connecting to database
    

    return (
        <Card
            sx={{
            width: 240,
            borderRadius: 3,
            boxShadow: 3,
            overflow: "hidden", 
            }}
        >
            {/* Image */}
            

            {/* Content */}
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
                <Typography variant="body1" fontWeight="medium" mt={1}>
                    ${price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
