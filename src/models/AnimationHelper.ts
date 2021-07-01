import * as THREE from 'three'
import Model from './Model';

export default class AnimationHelper
{
    private static readonly clock = new THREE.Clock();
    private parent: Model;
    private animations: THREE.AnimationClip[];
    private mixer: THREE.AnimationMixer;
    private action?: THREE.AnimationAction;
    
    constructor(model: Model, animations: THREE.AnimationClip[])
    {
        this.parent = model;
        this.animations = animations;
        
        console.log(`Imported ${this.animations.length} animations from model`);
        
        this.mixer = new THREE.AnimationMixer(this.parent.Model!);
    }
    
    Play(animName: string, loop: boolean = false, onDone?: Function)
    {
        if (this.mixer && this.animations && animName)
        {
            if (this.action && this.action.isRunning)
                this.Stop();
            
            const clip = THREE.AnimationClip.findByName(this.animations, animName);
            if (clip)
            {
                this.action = this.mixer.clipAction(clip);
                this.action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
                this.action.play();
            
                if (onDone)
                {
                    setTimeout(onDone, clip.duration * 1000 + 2);
                }
            }
            else
            {
                console.error(`No animation with name "${animName}" found`);
            }
        }
        else
        {
            console.error("No animations imported from model.");
        }
    }
    
    Stop()
    {
        if (this.action)
            this.action.stop();
    }
    
    Update()
    {
        this.mixer.update(AnimationHelper.clock.getDelta());
    }
}