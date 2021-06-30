// TODO: Get HTML file content instead of hardcoded texts

import * as ThreeHelper from '../ThreeHelper'
import * as Dialog from '../dialog'

export default function Stage2()
{
    Step1();
}

/**
 * Greet user
 */
function Step1()
{
    ThreeHelper.humanModel.PlayAnimation("WaveHands");
    
    Dialog.ShowDialog();
    
    // 1s delay for dialog box animation to finish
    setTimeout(() => {
        Dialog.SetDialogText(
            `Hi there!<br/><br/>
            I'm Tom, a junior programmer.<br/>
            Welcome to my bedroom, where I create dozens of apps, programs and websites. But I think you can already tell by my ugly 3D model, I am definately not a designer.`,
            () => setTimeout(Step2, 3000)
        );
    }, 1000);
}

/**
 * A bit more introduction
 */
function Step2()
{
    Dialog.SetDialogText(
        `Throughout the game of life, I have gained experiences in <b>Java</b>, <b>C#</b>, <b>C++</b>, <b>PHP</b> and a couple of other languages.<br/>
        Also frameworks such as Node.js, Express.js, Vue.js (I'm learning React atm).<br/><br/>
        My speciality is in backend and software development.`,
        () => setTimeout(Step3, 4000)
    );
}

function Step3()
{
    ThreeHelper.humanModel.PlayAnimation("Pointing");
    
    Dialog.SetDialogText(
        `If you are interested, take a look at my computer!`,
        () => Step4
    );
}

function Step4()
{
    
}