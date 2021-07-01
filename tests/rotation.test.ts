import * as THREE from 'three'
import Model from '../src/models/Model'

const destination45Degrees = new THREE.Vector3(1, 0, 1);
const destination90Degrees = new THREE.Vector3(1, 0, 0);
const destination135Degrees = new THREE.Vector3(1, 0, -1);
const destination180Degrees = new THREE.Vector3(0, 0, -1);
const destinationNeg45Degrees = new THREE.Vector3(-1, 0, 1);
const destinationNeg90Degrees = new THREE.Vector3(-1, 0, 0);
const destinationNeg135Degrees = new THREE.Vector3(-1, 0, -1);

const group = new THREE.Group();
const model = new Model();
model.InitFromGroup(group);

beforeEach(() =>
{
    if (model.Model)
        model.Model.rotation.set(0, 0, 0);
    else
        throw new Error("Model not initialized");
});

describe("Rotate Y on axis", () =>
{
    it("Rotate 45 degrees", () =>
    {
        model.Rotation!.RotateY(destination45Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(45));
    });
    
    it("Rotate 90 degrees", () =>
    {
        model.Rotation!.RotateY(destination90Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(90));
    });
    
    it("Rotate 135 degrees", () =>
    {
        model.Rotation!.RotateY(destination135Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(135));
    });
    
    it("Rotate 180 degrees", () =>
    {
        model.Rotation!.RotateY(destination180Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(180));
    });
    
    it("Rotate -45 degrees", () =>
    {
        model.Rotation!.RotateY(destinationNeg45Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(-45));
    });
    
    it("Rotate -90 degrees", () =>
    {
        model.Rotation!.RotateY(destinationNeg90Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(-90));
    });
    
    it("Rotate -135 degrees", () =>
    {
        model.Rotation!.RotateY(destinationNeg135Degrees);
        
        expect(model.Model!.rotation.y).toEqual(THREE.MathUtils.degToRad(-135));
    });
});