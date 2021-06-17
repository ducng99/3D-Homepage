import * as THREE from 'three'
import * as ThreeHelper from '../ThreeHelper'

export default function Stage1()
{
    Step1();
}

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
        
        ThreeHelper.SetupHuman(() => {
            
            ThreeHelper.humanModel.GetModel()?.position.set(4, 0, 2);
            ThreeHelper.humanModel.GetModel()?.rotateY(THREE.MathUtils.degToRad(-90));
        });
    }, 500);
}