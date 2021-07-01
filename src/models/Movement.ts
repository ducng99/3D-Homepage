import * as THREE from 'three'
import Model from './Model'

export default class Movement
{
    private static readonly FRAMETIME = 1000 / 60;
    private speed = 0.002;
    private parent: Model;
    
    constructor(model: Model)
    {
        this.parent = model;
    }
    
    /**
     * Move model to specified destination + rotate model
     * ! Rotation only works in 2D (currently mixing 3D and 2D calculations)
     * TODO: Add 3D for rotation
     * @param dest a {@link THREE.Vector3} object contains destination position
     * @param onDone (optional) a function to call after finished moving
     */
    MoveTo(dest: THREE.Vector3, onDone?: Function)
    {
        const distance = dest.distanceTo(this.parent.Model!.position);
        const walkingTime = distance / this.speed;   // How long it will take to walk to dest (ms)
        const steps = Math.floor(walkingTime / Movement.FRAMETIME);
        
        this.parent.Rotation?.RotateY(dest);
        
        const pathVector = new THREE.Vector3().copy(dest).sub(this.parent.Model!.position);
        const stepVector = new THREE.Vector3().copy(pathVector).divideScalar(steps);
        
        for (let i = 1; i <= steps; i++)
        {
            setTimeout(() => {
                this.parent.Model!.position.add(stepVector);
                
                if (onDone && i == steps)
                {
                    onDone();
                }
            }, i * Movement.FRAMETIME);
        }
    }
}