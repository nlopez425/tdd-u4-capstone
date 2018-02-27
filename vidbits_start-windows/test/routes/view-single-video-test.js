const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {jsdom} = require('jsdom');
const {connectDatabase,disconnectDatabase} = require('../database-utilities');
const Video = require("../../models/video");



const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = jsdom(htmlAsString).querySelector(selector);
    if (selectedElement !== null) {
      return selectedElement.textContent;
    } else {
      throw new Error(`No element with selector ${selector} found in HTML string`);
    }
  };


describe("/videos/:id",()=>{
    
    describe("GET",()=>{
        
        beforeEach(connectDatabase);
        afterEach(disconnectDatabase);

        it('should display one specific video',async ()=>{
            //setup
            const video = {title:"hello world",description:"this is a new beginning",url:"youtube.com"};
            const createdVideo = await Video.create(video);
            const videoDetails = await Video.findOne({title:video.title});
            
            //excercise
            const response = await request(app).get('/videos/'+videoDetails._id);
            
            //verify
            assert.include(response.text,video.title);
            assert.include(response.text,video.description);
            assert.include(response.text,'iframe');
        });
    });

})