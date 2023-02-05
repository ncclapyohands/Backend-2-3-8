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

const getOneSchool = async (req, res) => {
  try {
    const schoolId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('schools').find({ _id: schoolId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

const addSchool = async (req, res) => {
  try {
    const newSchool = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      businessId: req.body.businessId
    };
    const result = await mongodb.getDb().db().collection('schools').insertOne(newSchool);

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

module.exports = { getOneSchool, addSchool };
