/**
 * @jest-environment jsdom
 */

const Dialog = require('../src/dialog')

jest.setTimeout(10000);

describe("Dialog tests", () => 
{    
    it("Set dialog text", (done) =>
    {
        // Get innerHTML to compare to prevent differences in tags. Eg. <br> vs <br/>
        document.body.innerHTML = '<div id="dialog-text"></div>' + '<div id="testText"><a href="/">Hello I am <b>Tom</b>.<br/>How are you?</a></div>';
        const textToTest = document.body.querySelector("#testText")!.innerHTML;
        
        Dialog.SetDialogText(textToTest, () =>
        {
            const dialogTextDOM = document.querySelector("#dialog-text");
            try
            {
                expect(dialogTextDOM!.innerHTML).toEqual(textToTest);
                done();
            }
            catch (e)
            {
                done(e);
            }
        });
    });
});