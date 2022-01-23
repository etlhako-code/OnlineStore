function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
  function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }
  //////////////////////////////////////////////////////////////////////////////////
  import mongoose from 'mongoose'
  
  const MONGO_URL = process.env.MONGO_URL
  
  if (!MONGO_URL) {
    throw new Error(
      'Please define the MONGO_URL environment variable inside .env.local'
    )
  }
  
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
  }
  
  async function dbConnect() {
    if (cached.conn) {
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      }
  
      cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
        return mongoose
      })
    }
    cached.conn = await cached.promise
    return cached.conn
  }
  //////////////////////////////////////////////////////////////////////
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Origin, X-Requested-With, Accept, Authorization "
    );
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','POST, PUT, GET, PATCH, DELETE');
        return res.status(200).json({
          message:"success",
        });
      }
      next();
  };
  /////////////////////////////////////////////////////////////////////////
  const bcrypt = require('bcrypt');
  const imageToBase64 = require('image-to-base64');
  var base64Img = require('base64-img');
  exports.hashpassword=(pass)=>{
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);
  
    return hash;
  
  }
  base64Img.base64('path/demo.png', function(err, data) {})
  base64Img.img('data:image/png;base64,...', 'dest', '1', function(err, filepath) {});
  exports.getBase64ImageFile = (filePathOrUrl) => {
    
    //or
    //import imageToBase64 from 'image-to-base64/browser';
    
    imageToBase64(filePathOrUrl) // Path to the image
        .then(
            (response) => {
                console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  var {Sequelize}=require('sequelize');
  var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: true
    }
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  function ensureAuthenticated(request, response, next) {
    if (!request.userContext) {
      return response.status(401).redirect('../users/index');
    }
  
    next();
  }
  
  //hapi joi validation 
  
  const Joi = require('@hapi/joi');
  
  function validateUser(user){
    //validaion user schema
    const valUserSchema={
      name:Joi.string().min(3).required(),
      email: Joi.string().min(5).required().email(),
      password: Joi.string().min(5).required()
  
    }
    const {error}= Joi.validate(user,valUserSchema);
    
    
      return error ? error.details[0].message : null;
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  const jwt=require('jsonwebtoken');
  
  // jwt auth tokenization
  
  function createToken(data){
     const token= jwt.sign(data,process.env.JWT_SECRETKEY,{
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  function validateToken(token) {
    try {
      var decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
      return decoded ? decoded : false;
    } catch(err) {
          return err;    // err
    }
  }
  
  module.exports={
      validateToken,
      validateUser,
      createToken,
      base64Img
  }
  /*
  Errors & Codes
  Possible thrown errors during verification. Error is the first argument of the verification callback.
  
  TokenExpiredError
  Thrown error if the token is expired.
  
  Error object:
  name: 'TokenExpiredError'
  message: 'jwt expired'
  expiredAt: [ExpDate]
  
  JsonWebTokenError
  Error object:
  
  name: 'JsonWebTokenError'
  message:
  'jwt malformed'
  'jwt signature is required'
  'invalid signature'
  'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
  'jwt issuer invalid. expected: [OPTIONS ISSUER]'
  'jwt id invalid. expected: [OPTIONS JWT ID]'
  'jwt subject invalid. expected: [OPTIONS SUBJECT]'
  */