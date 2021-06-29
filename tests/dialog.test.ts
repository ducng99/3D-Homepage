/**
 * @jest-environment jsdom
 */

const Dialog = require('../src/dialog')

jest.setTimeout(10000);

describe("Dialog tests", () => 
{
    beforeEach(() =>
    {
        document.body.innerHTML = '<div style="display: none;" id="dialog"><div id="dialog-text"></div></div>';
    });
    
    it("Show dialog container", () =>
    {
        const dialogDOM = document.querySelector("#dialog");
        expect(dialogDOM).not.toBeNull();
        
        expect(dialogDOM!.getAttribute("style")).toContain("display: none");
        
        Dialog.ShowDialog();
        
        expect(dialogDOM!.getAttribute("style")).toContain("display: block");
    })
    
    it("Set dialog text", (done) =>
    {        
        const textToTest = "Hello I am <b>Tom</b>.<br>How are you?";
        
        Dialog.SetDialogText(textToTest, () =>
        {
            const dialogTextDOM = document.querySelector("#dialog-text");
            try
            {
                expect(dialogTextDOM).not.toBeNull();
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