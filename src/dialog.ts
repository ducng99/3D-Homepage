export function ShowDialog()
{
    let dialogDOM = document.getElementById("dialog");
    if (dialogDOM)
        dialogDOM.style.display = "block";
        
    DialogNamePostisioning();
    DialogTextPositioning();
}

export function HideDialog()
{
    let dialogDOM = document.getElementById("dialog");
    if (dialogDOM)
        dialogDOM.style.display = "none";
}

export function DialogNamePostisioning()
{
    let dialogNameDOM = document.getElementById("dialog-name");
    if (dialogNameDOM)
    {
        let dialogLeftDOM = document.getElementById("dialog-left");
        if (dialogLeftDOM)
        {
            let dialogLeftSize = dialogLeftDOM.getBoundingClientRect();
            dialogNameDOM.style.left = (dialogLeftSize.left + dialogLeftSize.width / 5 * 3).toString() + "px";
            dialogNameDOM.style.bottom = (dialogLeftSize.height / 6 * 5).toString() + "px";
        }
    }
}

export function DialogTextPositioning()
{
    let dialogTextDOM = document.getElementById("dialog-text");
    if (dialogTextDOM)
    {
        let dialogLeftDOM = document.getElementById("dialog-left");
        if (dialogLeftDOM)
        {
            let dialogLeftSize = dialogLeftDOM.getBoundingClientRect();
            dialogTextDOM.style.left = (dialogLeftSize.left + dialogLeftSize.width / 5 * 2).toString() + "px";
            dialogTextDOM.style.bottom = (dialogLeftSize.height / 9).toString() + "px";
            dialogTextDOM.style.height = (dialogLeftSize.height / 5 * 3).toString() + "px";
            
            let dialogRightDOM = document.getElementById("dialog-right");
            if (dialogRightDOM)
            {
                let dialogRightSize = dialogRightDOM.getBoundingClientRect();
                dialogTextDOM.style.width = (dialogRightSize.left - dialogLeftSize.left - dialogLeftSize.width / 5 * 2).toString() + "px";
            }
        }
    }
}

let textRunning = false;
let blinkingCursorInterval: number;

/**
 * Set new text for the dialog with typing animation
 * @param text an HTML string to show on the dialog
 * @param onDone a function to call after finish displaying all text
 */
export function SetDialogText(text: string, onDone?: Function)
{
    if (!textRunning)
    {
        clearInterval(blinkingCursorInterval);
        let dialogTextDOM = document.getElementById("dialog-text");
        if (dialogTextDOM)
        {
            // Clear previous text
            dialogTextDOM.innerHTML = "";
            
            textRunning = true;
            let delay = 0;
            
            const charactersToPrint = text.match(/<.+?>|(?:\.|,) |./g);
            let printedText = "";
            
            for (let i = 0; charactersToPrint && i < charactersToPrint.length; i++)
            {
                let charToPrint = charactersToPrint[i];
                
                // This modify delay BEFORE the character is shown. Not ideal, will need changes later.
                // TODO: Make it after
                if (/<\/?br\/?>/.test(charToPrint))     // if this is new line, add delay
                    delay += 500;
                else if (charToPrint === ". ")
                    delay += 400;
                else if (charToPrint === ", ")
                    delay += 300;
                else
                    delay += 50;
                
                setTimeout(() => {
                    if (dialogTextDOM)
                    {
                        // * This is to prevent HTML autofill closing tag. Eg. adding <b> will have </b> prepended immediately by browser. We must rewrite the whole innerHTML
                        printedText += charToPrint;
                        
                        // Add character to text DOM
                        dialogTextDOM.innerHTML = printedText;
                        
                        // When finished printing all chars
                        if (i == charactersToPrint.length - 1)
                        {
                            textRunning = false;
                            
                            if (onDone)
                                onDone();
                            
                            // Setup blinking cursor interval
                            blinkingCursorInterval = window.setInterval(() => {
                                if (dialogTextDOM)
                                {
                                    let blinkingCursorIsShown = dialogTextDOM.innerHTML.endsWith("_");
                                    
                                    dialogTextDOM.innerHTML = blinkingCursorIsShown ? dialogTextDOM.innerHTML.substring(0, dialogTextDOM.innerHTML.length - 1) : dialogTextDOM.innerHTML + "_";
                                }
                            }, 500);
                        }
                    }
                    else
                    {
                        console.error("Dialog text DOM no longer exist");
                    }
                }, delay);
            }
        }
        else
        {
            console.error("Cannot find dialog text DOM");
        }
    }
    else
    {
        console.warn("WARNING! Dialog's text is still running, pls fix overlap");
    }
}