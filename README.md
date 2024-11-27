# Luy5762-github.io

<!DOCTYPE html>
<!-- https://jqueryui.com/slider/#slider-vertical -->
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>jQuery UI Slider - Vertical slider</title>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.14.0/themes/base/jquery-ui.css">
        <style>
            table {
                font-size: 1em;
            }
            
            .ui-draggable, .ui-droppable {
                background-position: top;
            }
            td
            {
                padding-top:10px;
                padding-left:10px;
                padding-bottom:10px;
                padding-right:10px;
            }
            div.finger
            {
                position:absolute;
                background-color:gray;
            }
            div.joint
            {
                position:absolute;
                z-index:1;
            }
            #threejs
            {
                width: 100%;
                height: 100%;
                display: block;
            }
        </style>
    </head>
    <body>
        <!-- index finger -->
        <div class="finger" style="left:100px;top:20px;width:50px;height:100px;"></div>
        <div class="joint" style="left:118px;top:100px;width:14px;height:60px;">
            <div id="slider-index-joint1" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:100px;top:140px;width:50px;height:100px;"></div>
        <div class="joint" style="left:118px;top:220px;width:14px;height:60px;">
            <div id="slider-index-joint2" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:100px;top:260px;width:50px;height:100px;"></div>
        <div class="joint" style="left:118px;top:340px;width:14px;height:60px;">
            <div id="slider-index-joint3" style="height:100%;"></div>
        </div>
         

        <!-- middle finger -->
        <div class="finger" style="left:180px;top:20px;width:50px;height:100px;"></div>
        <div class="joint" style="left:198px;top:100px;width:14px;height:60px;">
            <div id="slider-middle-joint1" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:180px;top:140px;width:50px;height:100px;"></div>
        <div class="joint" style="left:198px;top:220px;width:14px;height:60px;">
            <div id="slider-middle-joint2" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:180px;top:260px;width:50px;height:100px;"></div>
        <div class="joint" style="left:198px;top:340px;width:14px;height:60px;">
            <div id="slider-middle-joint3" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:180px;top:260px;width:50px;height:100px;"></div>
         

        <!-- ring finger -->
        <div class="finger" style="left:260px;top:20px;width:50px;height:100px;"></div>
        <div class="joint" style="left:278px;top:100px;width:14px;height:60px;">
            <div id="slider-ring-joint1" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:260px;top:140px;width:50px;height:100px;"></div>
        <div class="joint" style="left:278px;top:220px;width:14px;height:60px;">
            <div id="slider-ring-joint2" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:260px;top:260px;width:50px;height:100px;"></div>
        <div class="joint" style="left:278px;top:340px;width:14px;height:60px;">
            <div id="slider-ring-joint3" style="height:100%;"></div>
        </div>


        <!-- small finger -->
        <div class="finger" style="left:340px;top:20px;width:50px;height:100px;"></div>
        <div class="joint" style="left:358px;top:100px;width:14px;height:60px;">
            <div id="slider-small-joint1" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:340px;top:140px;width:50px;height:100px;"></div>
        <div class="joint" style="left:358px;top:220px;width:14px;height:60px;">
            <div id="slider-small-joint2" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:340px;top:260px;width:50px;height:100px;"></div>
        <div class="joint" style="left:358px;top:340px;width:14px;height:60px;">
            <div id="slider-small-joint3" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:340px;top:260px;width:50px;height:100px;"></div>
         
        <!-- thumb -->
        <div class="finger" style="left:20px;top:320px;width:50px;height:100px;"></div>
        <div class="joint" style="left:38px;top:400px;width:14px;height:60px;">
            <div id="slider-thumb-joint1" style="height:100%;"></div>
        </div>
        <div class="finger" style="left:20px;top:440px;width:50px;height:100px;"></div>
        <div class="joint" style="left:38px;top:520px;width:14px;height:60px;">
            <div id="slider-thumb-joint2" style="height:100%;"></div>
        </div>

        <!-- palm -->
        <div class="finger" style="left:100px;top:380px;width:290px;height:280px;"></div>
        <div class="joint" style="left:120px;top:420px;width:250px;height:20px;">
            <div id="slider-fingers" style="width:100%;"></div>
        </div>

        <!-- wrist -->
        <div class="joint" style="left:120px;top:620px;width:250px;height:20px;">
            <div id="slider-wrist-twist" style="width:100%;"></div>
        </div>
        <div class="joint" style="left:240px;top:640px;width:20px;height:40px;">
            <div id="slider-wrist-bend" style="height:100%;"></div>
        </div>

        <div id="log" style="display:block;position:absolute;left:20px;top:700px;width:370px;height:20px;border:1px solid black">
        </div>

        <div style="position:absolute;left:420px;top:20px;width:640px;height:640px;">
            <canvas id="threejs" style="width:100%;height:100%;">
            </canvas>
        </div>


        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <script src="https://code.jquery.com/ui/1.14.0/jquery-ui.js"></script>
        <script type="importmap">
            {
              "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/",
                "lil-gui": "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm"
              }
            }
        </script>
         

        <script type="module" src="proj1.js">
        </script>

    </body>
</html>
