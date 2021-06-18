import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Movement from './Movement';

export default class Model {
    private _model?: THREE.Group;
    private animations?: THREE.AnimationClip[];
    private _mixer?: THREE.AnimationMixer;
    private action?: THREE.AnimationAction;
    private _movement?: Movement;
    
    InitFromGLTF(gltf: GLTF)
    {
        this._model = gltf.scene;
        
        this._model.traverse(mesh =>
        {
            if (mesh instanceof THREE.Mesh)
            {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
        
        this.animations = gltf.animations;
        this._mixer = new THREE.AnimationMixer(this._model);
        this._movement = new Movement(this);
    }
    
    get Model()
    {
        return this._model;
    }
    
    get Mixer()
    {
        return this._mixer;
    }
    
    get Movement()
    {
        return this._movement;
    }
    
    SetScale(scale: number)
    {
        if (this.Model)
        {
            this.Model.scale.set(scale, scale, scale);
        }
        else
        {
            console.error("Cannot set scale because model doesn't exist!");
        }
    }
    
    PlayAnimation(animName: string, loop: boolean = false, onDone?: Function)
    {
        if (this.Mixer && this.animations && animName)
        {
            if (this.action && this.action.isRunning)
                this.StopAnimation();
            
            const clip = THREE.AnimationClip.findByName(this.animations, animName);
            this.action = this.Mixer.clipAction(clip);
            this.action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            this.action.play();
            
            if (onDone)
            {
                setTimeout(onDone, clip.duration * 1000);
            }
        }
        else
        {
            console.error("Cannot find animation action with name %s", animName);
        }
    }
    
    StopAnimation()
    {
        this.action?.stop();
    }
}