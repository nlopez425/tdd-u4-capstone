const {assert} = require('chai');

describe("User navigates to edit page",()=>{

    describe("user click on edit button to change values",()=>{
        it("should take user to edit page and take updates",()=>{
            //setup
            const title = "New Video";
            const description = "This is a new video";
            const url = "www.test.com";
            const editTitle = "Newer Video";

            browser.url('/videos/create');
      
            //excercise
            browser.setValue("input#title",title);
            browser.setValue("input#url",url);
            browser.setValue("textarea#description",description);
            
            browser.click("input#submit-video");

            //user on show page
            browser.click("#edit");

            //user on edit page
            browser.setValue("input#title",editTitle);
            browser.click("#submit-edit");

            //user back to show page
            const newTitle = browser.getText("h1");

            //verify
            assert.equal(newTitle,editTitle);
        })
    })

})