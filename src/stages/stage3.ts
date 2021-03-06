import * as THREE from 'three'
import * as ThreeHelper from '../ThreeHelper'
import * as Dialog from '../dialog'

export default function Stage3()
{
    Step1();
}

/**
 * Move camera close to monitor and look at the monitor
 */
function Step1()
{
    Dialog.HideDialog();
    
    const FRAMETIME = 1000 / 60;
    const currentPosition = new THREE.Vector3().copy(ThreeHelper.camera.position);
    
    // Based on 3D model
    const moveDestination = new THREE.Vector3(1.5661, 2.23152, -0.6);
    const lookAtDestination = new THREE.Vector3(1.5661, 2.23152, -2.09425);
    
    const totalTime = 2000;     // Total time takes to move to destination (ms)
    const steps = Math.floor(totalTime / FRAMETIME);
    const pathVector = new THREE.Vector3().copy(moveDestination).sub(currentPosition);
    
    for (let i = 1; i <= steps; i++)
    {
        setTimeout(() =>
        {
            let easedNum = EasingCalc(i / steps);
            
            // Smoothly moving camera
            let easedVector = new THREE.Vector3().copy(pathVector).multiplyScalar(easedNum);
            let newPosition = easedVector.add(currentPosition);
            
            ThreeHelper.camera.position.copy(newPosition);
            
            // Smoothly looking at monitor from default location (0, 0, 0)
            let lookAtVector = new THREE.Vector3().copy(lookAtDestination).multiplyScalar(easedNum);
            ThreeHelper.camera.lookAt(lookAtVector);
            
            if (i == steps)
            {
                Step2();
            }
        }, i * FRAMETIME);
    }
}

function Step2()
{
    let landingPageDOM = document.getElementById("landingPageFrame");
    
    if (landingPageDOM)
    {
        landingPageDOM.style.display = "";
    }
    else
    {
        console.error("Cannot find landing page iframe!");
    }
}

/**
 * Call this function repetitively with linear numbers to get an easing number
 * Using parametric function (https://stackoverflow.com/a/25730573/11303727)
 * @param num a linear number between 0 and 1
 * @return eased number between 0 and 1
 */
function EasingCalc(num: number)
{
    if (num >= 0 && num <= 1)
    {
        let sqr = num * num;
        return sqr / (2 * (sqr - num) + 1);
    }
    else
    {
        console.error("'num' can only be between 0 and 1");
        return 0;
    }
}