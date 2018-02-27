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

/*describe('/',()=>{

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase)
    describe('GET',()=>{
        it("should render saved videos",async ()=>{
            //setup
            const video = {
                title:"new title",
                description:"new description"
            }
            const videoDetails = await Video.create(video);

            //excercise
            const response = await request(app).get("/");

            //verify
            assert.include(parseTextFromHTML(response.text,'div#videos-container'),video.title);
 
        })
    })


});*/


