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
    const result = await mongodb.getDb().db().collection('clients').find({ _id: clientId });
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
    const newClient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    };
    const result = await mongodb.getDb().db().collection('clients').insertOne(newClient);

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
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// const updateContact = async (req, res) => {
//   try {
//     const userId = new ObjectId(req.params.id);
//     const newUser = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const result = await mongodb
//       .getDb()
//       .db()
//       .collection('contacts')
//       .replaceOne({ _id: userId }, newUser);
//     console.log(result);
//     if (result.modifiedCount > 0) {
//       res.status(201).json({
//         message: 'Post was successful',
//         // eslint-disable-next-line no-undef
//         body: result
//       });
//     } else {
//       res.status(500).json({
//         message: 'Result Failed',
//         body: result
//       });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const deleteContact = async (req, res) => {
//   try {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
//     console.log(result);
//     if (result.deletedCount > 0) {
//       res.status(201).json({
//         message: 'Post was successful',
//         // eslint-disable-next-line no-undef
//         body: result
//       });
//     } else {
//       res.status(500).json({
//         message: 'Result Failed',
//         body: result
//       });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports = { addClient, getOneClient };
