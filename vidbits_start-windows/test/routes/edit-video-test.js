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


describe("/videos/:id/edit",()=>{

    describe('GET',()=>{
        beforeEach(connectDatabase);
          
        afterEach(disconnectDatabase);

        it("should render a form to edit the video",async ()=>{
            //setup
            const video = {
                title:"new title",
                description:"new description",
                url:"www.youtube.com"
            }
            const videoDetails = await Video.create(video);

            //excercise
            const response = await request(app).get("/videos/"+videoDetails._id+"/edit");
            //console.log("********************************"+parseTextFromHTML(response.text,'input#title'));
            //verify
            assert.include(response.text,'<input id = "title" type="text" name="title" value="new title"/>');
 

        })
    })
    
})


describe("/updates",()=>{
    describe('POST',()=>{
       
        beforeEach(connectDatabase);       
        afterEach(disconnectDatabase);
    
        it("should submit update and redirect to show",async ()=>{
            //setup
            const oldTitle = "title";
            let video = {
                title:oldTitle,
                description:"new description",
                url:"www.youtube.com"
            }
            
            const newTitle = "newTitle";
            await Video.create(video);
            const videoDetails = await Video.findOne({title:oldTitle});
            const videoId = videoDetails._id.toString();

            //excercise
            video.title = newTitle;
            
            const response = await request(app).post("/videos/"+videoId+"/update").type('form').send(video);

            //verify
            assert.equal(response.status,302);
    
        })



        it("should not update with empty title and should respond with 400",async ()=>{
            //setup
            const oldTitle = "title";
            let video = {
                title:oldTitle,
                description:"new description",
                url:"www.youtube.com"
            }
            
            const newTitle = "";
            await Video.create(video);
            const videoDetails = await Video.findOne({title:oldTitle});
            const videoId = videoDetails._id.toString();

            //excercise
            delete video.title;
            const response = await request(app).post("/videos/"+videoId+"/update").type('form').send(video);

            //verify
            assert.include(response.text,"missing title");
            assert.equal(response.status,400);
           
        })
    })
});
