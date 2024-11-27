// https://www.tutorialspoint.com/jquery/jquery-syntax.htm
// handling document ready event

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

let thumb1, index1, middle1, ring1, small1;

function main() {

    const canvas = document.querySelector( '#threejs' );
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });


    const near = 0.1;
    const far = 100;
    const size = 10;
    const camera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    const geom = new THREE.CylinderGeometry(1, 1, 2, 16);

    const base = new THREE.Object3D();
    scene.add(base);
    const grid_base = new THREE.GridHelper(30, 30);
    grid_base.renderOrder = 1;
    scene.add(grid_base);

    const mat_base = new THREE.MeshPhongMaterial({ color: "#888" });
    const mid_color = new THREE.MeshPhongMaterial({ color: "#188" }); // 디버깅용 삭제 금지

    // 손목
    const mesh_base = new THREE.Mesh(geom, mat_base);
    mesh_base.scale.set(1, 0.5, 1);
    base.add(mesh_base);

    mesh_base.position.y = mesh_base.scale.y;

    // 손바닥
    const palm = new THREE.Object3D();
    base.add(palm);
    const mesh_palm = new THREE.Mesh(geom, mat_base);
    mesh_palm.scale.set(2.5, 2.2, 1);
    palm.add(mesh_palm);
    mesh_palm.position.y = mesh_palm.scale.y;
    palm.position.y = mesh_base.position.y * 2;

    // 손가락 생성 함수
    function createFinger(name, basePosition, lenght, rotationZ = 0, rotationY = 0){ //lenght 없이 해보기
        const joint1 = new THREE.Object3D()
        joint1.name = name + '1';
        joint1.rotation.reorder('ZYX'); // 회전 순서 정해주는 함수!
        joint1.rotation.z = rotationZ;
        joint1.rotation.y = rotationY;
        palm.add(joint1);
        const mesh_joint1 = new THREE.Mesh(geom, mat_base);
        mesh_joint1.name = 'mesh_' + joint1.name;
        mesh_joint1.scale.set(0.5, lenght, 0.5);
        joint1.add(mesh_joint1);
        mesh_joint1.position.y = mesh_joint1.scale.y;
        joint1.position.copy(basePosition);
        // joint1.position = basePosition;  // 이건 에러 발생!

        const joint2 = new THREE.Object3D();
        joint2.name = name + '2';
        joint1.add(joint2);
        const mesh_joint2 = new THREE.Mesh(geom, mat_base);
        mesh_joint2.name = 'mesh_' + joint2.name;
        joint2.add(mesh_joint2);
        mesh_joint2.position.y = mesh_joint1.scale.y;
        joint2.position.y = mesh_joint1.position.y * 2;
        mesh_joint2.scale.copy(mesh_joint1.scale);

        if(name != 'thumb'){
            const joint3 = new THREE.Object3D();
            joint3.name = name + '3';
            joint2.add(joint3);
            const mesh_joint3 = new THREE.Mesh(geom, mat_base);
            mesh_joint3.name = 'mesh_' + joint3.name;
            joint3.add(mesh_joint3);
            mesh_joint3.position.y = mesh_joint2.scale.y;
            joint3.position.y = mesh_joint2.position.y * 2;
            mesh_joint3.scale.copy(mesh_joint1.scale);
        }

        if (name === "thumb") thumb1 = joint1;
        else if (name === "index") index1 = joint1;
        else if (name === "middle") middle1 = joint1;
        else if (name === "ring") ring1 = joint1;
        else if (name === "small") small1 = joint1;
    }

    createFinger("thumb", new THREE.Vector3(-mesh_palm.scale.x, 0.5, 0), 1, Math.PI / 4, - Math.PI / 6);
    createFinger("index", new THREE.Vector3(-mesh_palm.scale.x/1.25, mesh_palm.scale.y*2, 0),1.1);
    createFinger("middle", new THREE.Vector3(-mesh_palm.scale.x / 3.7, mesh_palm.scale.y*2, 0),1.25);
    createFinger("ring", new THREE.Vector3(mesh_palm.scale.x / 3.7, mesh_palm.scale.y*2, 0), 1.15);
    createFinger("small", new THREE.Vector3(mesh_palm.scale.x /1.25, mesh_palm.scale.y*2, 0), 1);

    function onChange(event, ui){
        let id = event.target.id;

        document.querySelector("#log").innerHTML = "" + id + ": " + $("#" + id).slider("value");

        if(id == "slider-fingers"){
            // 손가락들 z회전
            thumb1.rotation.z = (45 + ui.value) * Math.PI / 180;
            index1.rotation.z = ui.value * Math.PI / 180;
            middle1.rotation.z = ui.value * Math.PI / 720;
            ring1.rotation.z = - ui.value * Math.PI / 360;
            small1.rotation.z = - ui.value * Math.PI / 120;
        }
        else if(id == "slider-wrist-twist"){
            // 손바닥 y회전
            base.rotation.y = ui.value * Math.PI / 180;
        }
        else if(id == "slider-wrist-bend"){
            // 손바닥 x회전
            palm.rotation.x = ui.value * Math.PI / 180;
        }
        else{
            // 손가락들 x회전
            const result1 = id.split('-');
            const result2 = result1[2].slice(5);
            if(result1[1]=="thumb"){
                var result3 = `${result1[1]}${3-result2}`;
            }
            else{
                var result3 = `${result1[1]}${4-result2}`;
            }

            const joint = scene.getObjectByName(result3);
            if( joint ){
                joint.rotation.x = - ui.value * Math.PI / 180;
            }

        }
    }

    // 조명 설정
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( 0, 10, 0 );
        light.target.position.set( - 5, 0, 0 );
        scene.add( light );
        scene.add( light.target );
    }
    {
        const color = 0xFFFFFF;
        const intensity = 0.1;
        const light = new THREE.AmbientLight( color, intensity );
        scene.add( light );
    }

    function resizeRendererToDisplaySize(renderer) {

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {

            renderer.setSize(width, height, false);

        }

        return needResize;
    }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    let sliders = [
        {id:"slider-thumb-joint1",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-thumb-joint2",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-index-joint1",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-index-joint2",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-index-joint3",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-middle-joint1", orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-middle-joint2", orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-middle-joint3", orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-ring-joint1",   orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-ring-joint2",   orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-ring-joint3",   orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-small-joint1",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-small-joint2",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-small-joint3",  orientation:"vertical",   min:0, max:45, value:0},
        {id:"slider-wrist-bend",    orientation:"vertical",   min:-45, max:45, value:0},
        {id:"slider-fingers",       orientation:"horizontal", min:0, max:10, value:0},
        {id:"slider-wrist-twist",   orientation:"horizontal", min:0, max:360, value:0},
    ];

    for(let slider of sliders) {
        $( "#" + slider.id).slider({
          orientation: slider.orientation,
          range: "min",
          min: slider.min,
          max: slider.max,
          value: slider.value,
          slide: onChange,
        });
    }
}

main();
