const {assert} = require('chai');

const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};

describe("User visits landing page",()=>{

    describe("No saved videos",()=>{

        it("should render an empty container",()=>{
            //setup
            browser.url("/")

            //excercise

            //verify
            assert.equal(browser.getText('#videos-container'),'');
        })

    })

    describe("User should click link to navigate to create page", ()=>{

        it('should take them to videos/create',()=>{
            //setup
            const expectedText = "Save a Video"

            //excercise
            browser.click("a#create-video");
            const text = browser.getText("body");

            //verify
            assert.include(text,expectedText);
        });

    })

    describe("saved videos",()=>{

        it('should render videos in ifram with video url',()=>{
            //setup
            const title = "New Video";
            const description = "This is a new video";
            const url = "http://www.youtube.com";
            browser.url('/videos/create');

            //excercise
            browser.setValue("input#title",title);
            browser.setValue("input#url",url);
            browser.setValue("textarea#description",description);
            browser.click("input#submit-video");

            //page should now be video page
            browser.url('/');
            const videos = browser.getAttribute("iframe","src");
            assert.include(videos,url);
        })

        it("should let user to click video and take them to single view page",()=>{
             //setup
             const title = "New Video";
             const description = "This is a new video";
             const url = "http://www.youtube.com";
             browser.url('/videos/create');
 
             //excercise
             browser.setValue("input#title",title);
             browser.setValue("input#url",url);
             browser.setValue("textarea#description",description);
             browser.click("input#submit-video");
 
             //page should now be video page
             browser.url('/');
             browser.click("div.video-title a");

             const videoTitle = browser.getText("h1");
             const video = browser.getAttribute('iframe','src');

             assert.include(videoTitle,title); 
             assert.include(video,url);           
        })

    })

    



})