import axios from 'axios';

export const getProductDataFromDB = (productID, setterFunction) => {
  axios
    .get(`http://localhost:6969/products/${productID}`, {})
    .then((result) => {
      setterFunction(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRelatedProductsFromDB = (productID, setterFunction) => {
  axios
    .get(`http://localhost:6969/products/${productID}/related`, {})
    .then((result) => {
      setterFunction(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRatingsDataFromDB = (productID, setterFunction) => {
  axios.get(`http://localhost:6969/reviews/meta?id=${productID}`)
  .then((result) => {
    setterFunction(result.data);
  })
  .catch((err) => {
    console.log(err);
  })
};

 export const getCardProductImgFromDB = async (cardID, setterFunction) => {
  let response = await axios.get(
    `http://localhost:6969/products/${cardID}/styles`
  );
  let img = response.data.results[0].photos[0].thumbnail_url;
  // check image for null value and display "not available" if true
  if (img === null) {
    setterFunction(
      'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
    );
  } else {
    setterFunction(img);
  }
};

export const averageRating = (ratings: object) => {
  if (!ratings) {
    return;
  }

  let overallRating = Math.round(((Number(ratings['1']) * 1) + (Number(ratings['2']) * 2) + (Number(ratings['3']) * 3) + (Number(ratings['4']) * 4) + (Number(ratings['5']) * 5)) / ( Number(ratings['1']) + Number(ratings['2']) + Number(ratings['3']) + Number(ratings['4']) + Number(ratings['5'])) * 10) / 10

  if (overallRating.toString().length === 1) {
    let stringRating: string = overallRating.toString()
    stringRating += '.0'
    return stringRating
  } else {
    let stringRating: string = overallRating.toString()
    return stringRating;
  }
}