import { Request, Response } from 'express';
const express = require('express');
const dotenv = require('dotenv').config();
import axios from 'axios';
var cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static('dist'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/products', (req: Request, res: Response) => {
  axios('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', {
    headers: {
      Authorization: process.env.API_KEY,
    },
  }).then((results) => {
    res.send(results.data);
  });
});

// get product info
app.get('/products/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log('this is the product info route');
  // console.log('id: ', id);
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`, {
    headers: {
      Authorization: process.env.API_KEY,
    },
  }).then((results) => {
    // console.log('results: ', results.data);
    res.send(results.data);
  });
});

// get related product id's
app.get('/products/:id/related', (req: Request, res: Response) => {
  const id = req.params.id;
  axios(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/related`,
    {
      headers: {
        Authorization: process.env.API_KEY,
      },
    }
  ).then((results) => {
    res.send(results.data);
  });
});

// get product styles
app.get('/products/:id/styles', (req: Request, res: Response) => {
  const id = req.params.id;
  axios(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
    {
      headers: {
        Authorization: process.env.API_KEY,
      },
    }
  ).then((results) => {
    res.send(results.data);
  });
});

// get all questions
app.get('/qa/questions/:product_id', (req: Request, res: Response) => {
  axios(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${req.params.id}`, {
    headers: {
      Authorization: process.env.API_KEY,
    }
  }).then((results) => {
    console.log('this is results', results.data);
    res.json(results.data);
  })
})

// get answers list
app.get('/qa/questions/:id/answers', (req: Request, res: Response) => {
  const id = req.params.id;
  axios(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${id}/answers`, {
    headers: {
      Authorization: process.env.API_KEY,
    }
  }).then((results) => {
    res.json(results.data);
  })
})

app.post('/qa/questions', (req: Request, res: Response) => {
  axios
    .post(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=37311',
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((results) => {
      console.log('this is results', results.data);
      res.json(results.data);
    });
});



///////////////////////
// Ratings & Reviews //
///////////////////////


// http://example.com/page?parameter=value&also=another

app.get('/reviews', (req: Request, res: Response) => {
  // console.log('Bryce:', req.query);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?page=1&count=${req.query.count}&sort=${req.query.sort}&product_id=${req.query.id}`, {
    headers: {
      Authorization: process.env.API_KEY,
    }
  })
  .then((results) => {
    // console.log('Bryce results', results.data);
    res.send(results.data);
  })
})


app.get('/reviews/meta', (req: Request, res: Response) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta?product_id=${req.query.id}`, {
    headers: {
      Authorization: process.env.API_KEY,
    }
  })
  .then((results) => {
    res.send(results.data);
  })
})

app.post('/reviews', (req: Request, res: Response) => {
  // console.log('body', req.body)
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/',
    method: 'post',
    headers: {
      Authorization: process.env.API_KEY,
    },
    data: {
      "product_id": req.body.product_id,
      "rating": req.body.rating,
      "summary": req.body.summary,
      "body": req.body.body,
      "recommend": req.body.recommend,
      "name": req.body.name,
      "email": req.body.email,
      "photos": req.body.photos,
      "characteristics": req.body.characteristics
    }
  })
    .then((result) => {
      console.log(result)
      res.send(result.data)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.put('/reviews/helpful', (req: Request, res: Response) => {
  // console.log(req.body.review_id);
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${req.body.review_id}/helpful`,
    method: 'put',
    headers: {
      Authorization: process.env.API_KEY,
    },
  })
    .then((result) => {
      res.send(`${req.body.review_id} was Helpful!`)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put('/reviews/report', (req: Request, res: Response) => {
  // console.log(req.body.review_id);
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${req.body.review_id}/report`,
    method: 'put',
    headers: {
      Authorization: process.env.API_KEY,
    },
  })
    .then((result) => {
      res.send(`${req.body.review_id} was Reported!`)
    })
    .catch((err) => {
      console.log(err)
    })
})





// "product_id": req.body.product_id,
// "rating": req.body.rating,
// "summary": req.body.summary,
// "body": req.body.body,
// "recommend": req.body.recommend,
// "name": req.body.name,
// "email": req.body.email,
// "photos": req.body.photos,
// "characteristics": req.body.characteristics

// "product_id": 37311,
// "rating": 1,
// "summary": 'testing review post route',
// "body": 'tesssssssssssssssssstttttttttttttttttttttttt',
// "recommend": false,
// "name": 'test-user',
// "email": 'abryce.anderson@gmail.com',
// "photos": [],
// "characteristics":  {
//   "125033": 3,
//   "125031": 3,
//   "125032": 3,
//   "125034": 3
// }






app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
