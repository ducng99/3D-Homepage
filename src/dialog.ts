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

export function SetDialogText(text: string)
{
    if (!textRunning)
    {
        clearInterval(blinkingCursorInterval);
        let dialogTextDOM = document.getElementById("dialog-text");
        if (dialogTextDOM)
        {
            textRunning = true;
            for (let i = 0; i < text.length; i++)
            {
                setTimeout(() => {
                    if (dialogTextDOM)
                    {
                        dialogTextDOM.textContent = text.substring(0, i + 1) + "_";
                    
                        if (i == text.length - 1)
                        {
                            textRunning = false;
                            
                            blinkingCursorInterval = setInterval(() => {
                                if (dialogTextDOM)
                                {
                                    let blinkingCursorIsShown = false;
                                    
                                    if (dialogTextDOM.textContent?.endsWith("_"))
                                        blinkingCursorIsShown = true;
                                    
                                    dialogTextDOM.textContent = blinkingCursorIsShown ? dialogTextDOM.textContent!.substring(0, dialogTextDOM.textContent!.length - 1) : dialogTextDOM.textContent + "_";
                                }
                            }, 500);
                        }
                    }
                }, i * 50);
            }
        }
    }
}