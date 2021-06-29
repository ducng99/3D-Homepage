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
            let extraDelay = 0;
            
            for (let i = 0; i < text.length; i++)
            {
                let charToPrint = text.substring(i, i + 1);
                
                // This adds delay BEFORE the character is shown. Not ideal, will need changes later.
                // TODO: Make it after
                if (charToPrint === "\n")
                    extraDelay += 500;
                else if (charToPrint === ".")
                    extraDelay += 300;
                else if (charToPrint === ",")
                    extraDelay += 200;
                
                setTimeout(() => {
                    if (dialogTextDOM)
                    {
                        // If new line character found, add <br/> tag instead
                        if (charToPrint === "\n")
                            charToPrint = "<br/>";
                        
                        // Add character to text DOM
                        dialogTextDOM.innerHTML += charToPrint;
                        
                        // When finished printing all chars
                        if (i == text.length - 1)
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
                }, i * 50 + extraDelay);
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