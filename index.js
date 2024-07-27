require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
app.use(helmet());
app.use(express.json());
const port = process.env.PORT || 91;
// auth
app.post('/signin' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
    onProxyReq:fixRequestBody
}));

app.post('/signup' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
    onProxyReq:fixRequestBody
}));

app.get('/:id/verify/:token' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
}));

app.get('/verifyUserSession' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
}));

app.post('/reset-password' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
    onProxyReq:fixRequestBody
}));

app.get('/:userId/reset/:token' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
}));

app.post('/changePassword' , createProxyMiddleware({
    target : process.env.AUTH_URL,
    changeOrigin : true,
    onProxyReq:fixRequestBody,
})); 
// end Auth


app.listen(port, console.log(`server api gateway is on http://localhost:${port} `));