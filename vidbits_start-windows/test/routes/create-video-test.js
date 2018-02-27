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


describe("/videos",()=>{

    describe('GET',()=>{
        beforeEach(connectDatabase);
          
        afterEach(disconnectDatabase);

        it("should render saved videos",async ()=>{
            //setup
            const video = {
                title:"new title",
                description:"new description",
                url:"www.youtube.com"
            }
            const videoDetails = await Video.create(video);

            //excercise
            const response = await request(app).get("/");

            //verify
            assert.include(parseTextFromHTML(response.text,'div#videos-container'),video.title);
 
        })
    })
    
    describe("POST",()=>{

        beforeEach(connectDatabase);
          
        afterEach(disconnectDatabase);

        it("should not save a video with no title and respond with 400 status",async ()=>{
            //setup
            const data = {
                description:"new description",
                url:"www.youtube.com"
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);

            //verify
            assert.include(response.text, "missing title");
            assert.equal(response.status,400);
        })

        it("should not save a video with no url and respond with 400 status",async ()=>{
            //setup
            const data = {
                title:"video",
                description:"new description",
                url:''
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);

            //verify
            assert.include(response.text, "missing url");
            assert.equal(response.status,400);
        })

        it("should send user to create page when title is missing and show error",async ()=>{
            //setup
            const data = {
                title:"",
                description:"new description",
                url:"www.youtube.com"
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);

            //verify
            assert.equal(parseTextFromHTML(response.text,".error"),"missing title");
        })

        it("should send user to create page when title is missing and maintain other fields",async ()=>{
            //setup
            const data = {
                title:"",
                description:"new description",
                url:"hello.com"
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);

            //verify
            assert.equal(parseTextFromHTML(response.text,"#description"),"new description");
            assert.include(response.text,"hello.com");
        })

        it("should respond with 302 status",async ()=>{
            //setup
            const data = {
                title:"new title",
                description:"new description",
                url:"www.youtube.com"
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);

            //verify
            assert.equal(response.status, 302);
        })

        it("should save the new video",async ()=>{
            //setup
            const data = {
                title:"new title",
                description:"new description",
                url:"http://www.youtube.com"
            }

            //excercise
            const response = await request(app).post("/videos").type('form').send(data);
            const dbResponse = await Video.findOne({});
            
            //verify
            assert.equal(dbResponse.title,data.title);
            assert.equal(dbResponse.url,data.url);
        })


    });
})