const {assert} = require('chai');

describe("User visits Create page",()=>{

  describe("User fills a form to save a video",()=>{

    it("should submit and send user to video page",()=>{
        //setup
        const title = "New Video";
        const description = "This is a new video";
        const url = "www.test.com";
        browser.url('/videos/create');

        //excercise
        browser.setValue("input#title",title);
        browser.setValue("input#url",url);
        browser.setValue("textarea#description",description);
        browser.click("input#submit-video");

        //page should now be video page
        const videoTitle = browser.getText("h1");

        //verify
        assert.include(videoTitle,title);
    });

    it("should submit and video should be available on landing page",()=>{
      //setup
      const title = "New Video";
      const description = "This is a new video";
      const url = "www.test.com";
      browser.url('/videos/create');

      //excercise
      browser.setValue("input#title",title);
      browser.setValue("input#url",url);
      browser.setValue("textarea#description",description);
      
      browser.click("input#submit-video");

      //page should now be video page
      browser.url('/');
      const videos = browser.getText("div#videos-container");
      
      //verify
      assert.include(videos,title);
  });

  })

})