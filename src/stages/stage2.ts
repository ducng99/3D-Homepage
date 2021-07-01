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
    ThreeHelper.humanModel.Animation?.Play("WaveHands");
    
    Dialog.ShowDialog();
    
    // 1s delay for dialog box animation to finish
    setTimeout(() => {
        Dialog.SetDialogText(
            `Hi there!<br/><br/>
            I'm Tom, a junior programmer.<br/>
            Welcome to my bedroom, where I create dozens of apps, programs and websites. But I think you can already tell by my ugly 3D model, I am definately not a designer.`,
            () => {
                Dialog.ShowButton();
                Dialog.SetButtonOnClickListener(() => {
                    Dialog.HideButton();
                    Step2();
                });
            }
        );
    }, 1000);
}

/**
 * A bit more introduction
 */
function Step2()
{
    Dialog.SetDialogText(
        `Playing the game called "Life", I have learned new skills such as <b>Java</b>, <b>C#</b>, <b>C++</b>, <b>PHP</b> and a couple of other languages.<br/>
        Also familiarized myself with tools like Node.js, Express.js, Vue.js (currently collecting exp for React).<br/><br/>
        My speciality is in backend and software development.`,
        () => {
            Dialog.ShowButton();
            Dialog.SetButtonOnClickListener(() => {
                Dialog.HideButton();
                Step3();
            });
        }
    );
}

function Step3()
{
    ThreeHelper.humanModel.Animation?.Play("Pointing");
    
    Dialog.SetDialogText(
        `If you are interested, take a look at my computer!`,
        () => {
            Dialog.ShowButton();
            Dialog.SetButtonOnClickListener(() => {
                Dialog.HideButton();
                Step4();
            });
        }
    );
}

function Step4()
{
    
}