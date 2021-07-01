import * as THREE from 'three'
import * as ThreeHelper from '../ThreeHelper'

export default function Stage1()
{
    Step1();
}

/**
 * Turn on room light, remove moon light -> remove light toggle -> Setup human model and its position, rotation then move to Step2
 */
function Step1()
{
    setTimeout(() => {
        ThreeHelper.TurnOnLight();
        ThreeHelper.RemoveMoonLight();
        
        let lightToggleContainer = document.getElementById("lightToggleContainer");
        if (lightToggleContainer)
        {
            lightToggleContainer.style.display = "none";
        }
        
        setTimeout(() => {
            ThreeHelper.SetupHuman(() => {
                ThreeHelper.humanModel.Model?.position.set(10, 0, 3);
                
                Step2();
            });
        }, 1000);
    }, 500);
}

/**
 * Begin walking animation and move the human model from outside screen to door
 */
function Step2()
{
    ThreeHelper.humanModel.Animation?.Play("Walking", true);
    
    ThreeHelper.humanModel.Movement?.MoveTo(new THREE.Vector3(4, 0, 3), Step3);
}

/**
 * Move the human model from door (does not exist) into room and stop animation
 */
function Step3()
{
    ThreeHelper.humanModel.Movement?.MoveTo(new THREE.Vector3(1, 0, 1), () => {
        ThreeHelper.humanModel.Animation?.Stop();
        Step4();
    });
}

/**
 * Turn around and look at camera
 * TODO: Fix animation.
 */
function Step4()
{
    ThreeHelper.humanModel.Animation?.Play("LookAround", false, () => {
        ThreeHelper.humanModel.Rotation?.RotateY(ThreeHelper.camera.position);
        
        import("./stage2").then(Stage2 => Stage2.default());
    });
}