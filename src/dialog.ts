export function ShowDialog()
{
    let dialogDOM = document.getElementById("dialog");
    if (dialogDOM)
        dialogDOM.style.display = "";
}

export function HideDialog()
{
    let dialogDOM = document.getElementById("dialog");
    if (dialogDOM)
        dialogDOM.style.display = "none";
}

export function ShowButton()
{
    let dialogButtonDOM = document.getElementById("dialog-button");
    if (dialogButtonDOM)
        dialogButtonDOM.style.display = "";
}

export function HideButton()
{
    let dialogButtonDOM = document.getElementById("dialog-button");
    if (dialogButtonDOM)
    {
        dialogButtonDOM.style.display = "none";
        dialogButtonDOM.onclick = null;
    }
}

export function SetButtonOnClickListener(func: Function)
{
    let dialogButtonDOM = document.getElementById("dialog-button");
    if (dialogButtonDOM)
    {
        dialogButtonDOM.onclick = (event) => func(event);
    }
}

let blinkingCursorInterval: number;

/**
 * Set new text for the dialog with typing animation
 * @param text an HTML string to show on the dialog
 * @param onDone a function to call after finish displaying all text
 */
export function SetDialogText(text: string, onDone?: Function)
{
    clearInterval(blinkingCursorInterval);
    let dialogTextDOM = document.getElementById("dialog-text");
    if (dialogTextDOM)
    {
        // Clear previous text
        dialogTextDOM.innerHTML = "";
        
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
                delay += 30;
            
            setTimeout(() => {
                if (dialogTextDOM)
                {
                    // * This is to prevent HTML autofill closing tag. Eg. adding <b> will have </b> prepended immediately by browser. We must rewrite the whole innerHTML
                    printedText += charToPrint;
                    
                    // Write to text DOM
                    dialogTextDOM.innerHTML = printedText;
                    
                    // When finished printing all chars
                    if (i == charactersToPrint.length - 1)
                    {
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