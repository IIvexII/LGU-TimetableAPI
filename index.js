require('dotenv').config();
const express = require('express');
const { Section } = require('./src/models');

const { PopulateRouter, LGURouter, GCRouter } = require('./src/routes');

const app = express();

app.use(GCRouter);
app.use(LGURouter);
app.use(PopulateRouter);

app.get('/meta', async (req, res) => {
  const sections = await Section.find({});
  const arr = [];

  for (let section of sections) {
    arr.push({
      semester: {
        _id: section.degree.semester._id,
        name: section.degree.semester.name,
      },
      degree: {
        _id: section.degree.degreeId,
        name: section.degree.degreeName,
      },
      section: {
        _id: section.sectionId,
        name: section.sectionTag,
      },
    });
  }
  res.send(arr);
});

module.exports = app;
