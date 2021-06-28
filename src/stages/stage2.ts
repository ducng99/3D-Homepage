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
    Dialog.SetDialogText("Hi there!");
}