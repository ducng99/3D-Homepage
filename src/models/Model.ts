import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import AnimationHelper from './AnimationHelper';
import MovementHelper from './MovementHelper';
import RotationHelper from './RotationHelper';

export default class Model {
    private _model?: THREE.Group;
    private _movement?: MovementHelper;
    private _rotation?: RotationHelper;
    private _animation?: AnimationHelper;
    
    InitFromGroup(group: THREE.Group)
    {
        this._model = group;
        
        this._model.traverse(mesh =>
        {
            if (mesh instanceof THREE.Mesh)
            {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
        
        this._movement = new MovementHelper(this);
        this._rotation = new RotationHelper(this);
        
        console.log("Imported model done!");
    }
    
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
        
        this._animation = new AnimationHelper(this, gltf.animations);
        this._movement = new MovementHelper(this);
        this._rotation = new RotationHelper(this);
        
        console.log("Imported model done!");
    }
    
    get Model()
    {
        return this._model;
    }
    
    get Movement()
    {
        return this._movement;
    }
    
    get Rotation()
    {
        return this._rotation;
    }
    
    get Animation()
    {
        return this._animation;
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
}