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
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('schools')
      .find({ _id: schoolId });
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
      schoolName: req.body.schoolName,
      email: req.body.email,
      phone: req.body.phone,
      adminId: req.body.adminId
    };
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('schools')
      .insertOne(newSchool);

    if (result.acknowledged) {
      res.status(201).json({
        message: 'Post was successful',
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

const updateSchool = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const updateSchool = {
      schoolName: req.body.schoolName,
      email: req.body.email,
      phone: req.body.phone,
      adminId: req.body.adminId
    };
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('schools')
      .replaceOne({ _id: userId }, updateSchool);
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

const deleteSchool = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('replay-live')
      .collection('schools')
      .remove({ _id: userId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Delete was successful',
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

module.exports = { getOneSchool, addSchool, updateSchool, deleteSchool };
