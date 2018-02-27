const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title:{
      type:"String",
      required:[true,"missing title"]
    },
    description:{
      type:"String"
    },
    url:{
      type:"String",
      required:[true,"missing url"]
    }
  })
);

module.exports = Video;
