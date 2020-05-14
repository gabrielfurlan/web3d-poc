import React from 'react';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import BabylonScene from './scene';
import './App.css';

let box;

const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  let camera = new FreeCamera("camera1", new Vector3(0, 10, -15), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new HemisphericLight("light", new Vector3(0, -10, 15), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.75;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 1 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 3, height: 3 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = scene => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

const App = (props) => (
  <div id="web3d-poc">
    <BabylonScene
      id='poc-canvas'
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
    />
  </div>
);

export default App;
