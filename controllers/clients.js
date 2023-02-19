const { ObjectId } = require('mongodb');
const mongodb = require('../db');

// const getAll = async (req, res) => {
//   try {
//     const result = await mongodb.getDb().db().collection('contacts').find();
//     result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists); // we just need the first one (the only one)
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const getOneClient = async (req, res) => {
  try {
    const clientId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('clients')
      .find({ _id: clientId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

const addClient = async (req, res) => {
  try {
    console.log('1');
    const newClient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      businessName: req.body.businessName,
      zip: req.body.zip,
      businessId: req.body.businessId
    };
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('clients')
      .insertOne(newClient);
    console.log('3');
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Post was successful',
        // eslint-disable-next-line no-undef
        body: result
      });
    } else {
      res.status(400).json({
        message: 'Result Failed',
        body: result
      });
      console.log('4');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateClient = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const updateClient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      businessName: req.body.businessName,
      zip: req.body.zip,
      businessId: req.body.businessId
    };
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('clients')
      .replaceOne({ _id: userId }, updateClient);
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(201).json({
        message: 'Post was successful',
        // eslint-disable-next-line no-undef
        body: result
      });
    } else {
      res.status(500).json({
        message: 'Result Failed',
        body: result
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteClient = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('clients')
      .remove({ _id: userId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(201).json({
        message: 'Post was successful',
        // eslint-disable-next-line no-undef
        body: result
      });
    } else {
      res.status(500).json({
        message: 'Result Failed',
        body: result
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { addClient, getOneClient, updateClient, deleteClient };
