const {assert} = require('chai');

describe("User can delete video from show page",()=>{

    describe('user navigates to show view and clicks delete',()=>{
        
        it('should remove from list on landing page',()=>{
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

            //page change to /show
            browser.click("#delete");

            //page change to lp
            browser.url('/')

            //verify
            assert.notInclude(browser.getText("#videos-container"),"video title");
        });

    })


})
