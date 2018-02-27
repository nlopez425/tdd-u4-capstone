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


describe("/videos/:id/delete",()=>{

    describe('POST',()=>{
       
        beforeEach(connectDatabase);       
        afterEach(disconnectDatabase);
    
        it("should delete a video",async ()=>{
            //setup
            const oldTitle = "title";
            let video = {
                title:oldTitle,
                description:"new description",
                url:"www.youtube.com"
            }
            
            await Video.create(video);
            const videoDetails = await Video.findOne({title:oldTitle});
            const videoId = videoDetails._id.toString();

            //excercise
            const response = await request(app).post("/videos/"+videoId+"/delete").type('form').send(video);
            const searchVideo = await Video.findOne({title:oldTitle});
            console.log(searchVideo);

            //verify
            assert.equal(searchVideo,null);
            assert.equal(response.status,302);
    
        })
    })
})

