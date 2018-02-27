const {assert} = require('chai');
const {connectDatabase,disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');


describe("Video",()=>{

  describe("#title",()=>{

    it("should be a string",()=>{
      //setup 
      const titleAsInt = 1;

      //excercise
      const video = new Video({title:titleAsInt});

      //verify
      assert.strictEqual(video.title, titleAsInt.toString());

    });

    it("should be required",()=>{
      //setup 
      const video = new Video({});

      //excercise
      const error = video.validateSync();

      //verify
      assert.equal(error.errors['title'].message,"missing title");

    });

  })

  describe("#description",()=>{

    it("should be a string",()=>{
      //setup 
      const descAsInt = 1;
    
      //excercise
      const video = new Video({description:descAsInt});
      
      //verify
      assert.strictEqual(video.description, descAsInt.toString());

    });

  })

  describe('#url',()=>{
    it("should be a string",()=>{
      //setup 
      const urlAsInt = 1;
    
      //excercise
      const video = new Video({url:urlAsInt});
      
      //verify
      assert.strictEqual(video.url, urlAsInt.toString());

    });

    it("should be required",()=>{
      //setup 
      const video = new Video({});

      //excercise
      const error = video.validateSync();

      //verify
      assert.equal(error.errors['url'].message,"missing url");

    });
  })


})
