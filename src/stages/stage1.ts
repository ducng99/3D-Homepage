import * as THREE from 'three'
import * as ThreeHelper from '../ThreeHelper'
import Stage2 from './stage2';

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
                ThreeHelper.humanModel.Model?.rotateY(THREE.MathUtils.degToRad(-90));
                
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
    ThreeHelper.humanModel.PlayAnimation("Walking", true);
    
    ThreeHelper.humanModel.Movement?.MoveTo(new THREE.Vector3(4, 0, 3), () => {
        ThreeHelper.humanModel.StopAnimation();
        Step3();
    });
}

/**
 * Begin walking animation and move the human model from door (does not exist) into room
 */
function Step3()
{
    ThreeHelper.humanModel.PlayAnimation("Walking", true);
    
    ThreeHelper.humanModel.Movement?.MoveTo(new THREE.Vector3(1, 0, 1), () => {
        ThreeHelper.humanModel.StopAnimation();
        Step4();
    });
}

/**
 * Turn around and look at camera
 * ! YES THIS STEP SUCKS.
 * TODO: Fix animation.
 */
function Step4()
{
    ThreeHelper.humanModel.PlayAnimation("LookAround", false, () => {
        ThreeHelper.humanModel.Model?.rotation.set(0, 0, 0);
        
        const position2D = new THREE.Vector2(ThreeHelper.humanModel.Model!.position.x, ThreeHelper.humanModel.Model!.position.z);
        const angleRot = Math.tanh(Math.abs(ThreeHelper.camera.position.z - position2D.y) / Math.abs(ThreeHelper.camera.position.x - position2D.x));
        
        ThreeHelper.humanModel.Model?.rotateY(angleRot);
        
        Stage2();
    });
}