const express = require('express');
const bodyParser = require('body-parser')
const next = require('next');
const path = require('path')
const dev = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV)
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json())
    server.get("/robots.txt", (req, res) => {
      res.header("Content-Type", "text/plain")
      res.sendFile(path.join(__dirname, "./public/static", "robots.txt"))
    })

    // received a request for partner
    server.post("/api/partner", (req,res) => {
      console.log(req.body)
    })
    // received a request for contact
    server.post("/api/contact", (req,res) => {
      console.log(req.body)
    })

    // server.get('/post/:slug', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { slug: req.params.slug, apiRoute: 'post' };
    //   app.render(req, res, actualPage, queryParams);
    // });

    // server.get('/page/:slug', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { slug: req.params.slug, apiRoute: 'page' };
    //   app.render(req, res, actualPage, queryParams);
    // });

    // server.get('/category/:slug', (req, res) => {
    //   const actualPage = '/category';
    //   const queryParams = { slug: req.params.slug };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get('/_preview/:id/:rev/:type/:status/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const { id, rev, type, status, wpnonce } = req.params;
      const queryParams = { id, rev, type, status, wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
