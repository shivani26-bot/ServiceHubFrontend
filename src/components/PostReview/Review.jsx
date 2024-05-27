import React from "react";
import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";

const Review = ({ customerName, review, rating, reviewDate }) => {
  return (
    <Card
      sx={{
        width: 1170,
        padding: 2,
        margin: "auto",
        marginBottom: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        {customerName}
      </Typography>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" component="div">
          Review: {review}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography variant="body1" component="div" sx={{ mr: 1 }}>
            Rating:
          </Typography>
          <Rating value={rating} readOnly />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Posted on: {new Date(reviewDate).toLocaleDateString()}
        </Typography>
      </Box>
    </Card>
  );
};

export default Review;
