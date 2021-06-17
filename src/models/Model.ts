import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Model {
    private model?: THREE.Group;
    private animations?: THREE.AnimationClip[];
    private mixer?: THREE.AnimationMixer;
    
    InitFromGLTF(gltf: GLTF)
    {
        this.model = gltf.scene;
        
        this.model.traverse(mesh =>
        {
            if (mesh instanceof THREE.Mesh)
            {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
        
        this.animations = gltf.animations;
        this.mixer = new THREE.AnimationMixer(this.model);
    }
    
    GetModel()
    {
        return this.model;
    }
    
    GetMixer()
    {
        return this.mixer;
    }
    
    SetScale(scale: number)
    {
        if (this.model)
        {
            this.model.scale.set(scale, scale, scale);
        }
        else
        {
            console.error("Cannot set scale because model doesn't exist!");
        }
    }
    
    PlayAnimation(animName: string, loop: boolean = false)
    {
        if (this.animations && animName)
        {
            const clip = THREE.AnimationClip.findByName(this.animations, animName);
            const action = this.mixer!.clipAction(clip);
            action.play();
            action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
        }
    }
}