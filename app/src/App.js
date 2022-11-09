import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import logo from "./logo.svg";
import gltf from "./webgl_test_4_c4d_redshift_test.gltf";
import "./App.css";

function App() {
  const ref = useRef();

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer();

    const el = ref.current;

    el.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 5000);
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.SphereGeometry(300, 30, 30);

    const material = new THREE.MeshStandardMaterial();

    const mesh = new THREE.Mesh(geometry, material);

    // scene.add(mesh);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(1, 1, 1);

    scene.add(directionalLight);

    (async () => {
      const loader = new GLTFLoader();
      const model = await loader.loadAsync(gltf);
      model.scene.scale.set(2, 2, 2);
      scene.add(model.scene);
    })();

    const controls = new OrbitControls(camera, renderer.domElement);

    const tick = () => {
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      el.removeChild(renderer.domElement);
    };
  });
  return (
    <div className="App" ref={ref}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;