import * as THREE from 'three'
import Model from './Model';

export default class RotationHelper
{
    private parent: Model;
    
    constructor(model: Model)
    {
        this.parent = model;
    }
    
    /**
     * Rotate on the Y-axis to look at the destination
     * * Use for 2D rotation
     * @param dest the destination to look at
     */
    RotateY(dest: THREE.Vector3)
    {
        const currentPosition = new THREE.Vector3().copy(this.parent.Model!.position);
        const angleRot = Math.atan2(dest.x - currentPosition.x, dest.z - currentPosition.z);
        this.parent.Model?.rotation.set(0, angleRot, 0);
    }
    
    /**
     * Return current rotation of the model
     */
    get Rotation()
    {
        return this.parent.Model?.rotation;
    }
}