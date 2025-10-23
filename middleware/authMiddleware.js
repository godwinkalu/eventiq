const jwt = require('jsonwebtoken')
const individualModel = require('../models/individualModel')
const hallOwnerModel = require('../models/hallownerModel')
const adminModel = require('../models/adminModel')

exports.authentication = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      return res.status(404).json({
        message: 'Auth missing',
      })
    }

    const token = auth.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await individualModel.findById(decoded.id) || await hallOwnerModel.findById(decoded.id) || await adminModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({
        message: 'Authentication failed, User not found',
      })
    }

    req.user = decoded
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(500).json({
        message: ' Session timed out, please login to your account',
      })
    }
    next(error)
  }
}
exports.hallProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await individualModel.findById(decoded.id)) ||
      (await hallOwnerModel.findById(decoded.id)) ||
      (await adminModel.findById(decoded.id));

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }


    if(user.role  !=="hallOwners" ){
      return res.status(401).json({
        message: 'only hallOwner is allowed to make this action'
      })
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
exports.hallProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await individualModel.findById(decoded.id)) ||
      (await hallOwnerModel.findById(decoded.id)) ||
      (await adminModel.findById(decoded.id));

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }


    if(user.role  !=="hallOwners" ){
      return res.status(401).json({
        message: 'only hallOwner is allowed to make this action'
      })
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.hallProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await individualModel.findById(decoded.id)) ||
      (await hallOwnerModel.findById(decoded.id)) ||
      (await adminModel.findById(decoded.id));

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }


    if(user.role  !=="hallOwners" ){
      return res.status(401).json({
        message: 'only hallOwner is allowed to make this action'
      })
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.hallProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await individualModel.findById(decoded.id)) ||
      (await hallOwnerModel.findById(decoded.id)) ||
      (await adminModel.findById(decoded.id));

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }


    if(user.role  !=="hallOwners" ){
      return res.status(401).json({
        message: 'only hallOwner is allowed to make this action'
      })
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.individualProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await individualModel.findById(decoded.id)) ||
      (await hallOwnerModel.findById(decoded.id)) ||
      (await adminModel.findById(decoded.id));

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

 
    if(user.role  !=="individual" ){
      return res.status(401).json({
        message: 'only hallOwner is allowed to make this action'
      })
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};






