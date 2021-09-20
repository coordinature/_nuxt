<template lang="pug">
    canvas(
        :onCanvasInited="handleCanvasInited"
        :onResize="handleResize")#pulse
</template>
<script>
// import Proton from 'proton-engine';
import * as THREE from 'three';
import Proton from 'three.proton.js';
const Color = window.Color;

export default {
    created() {
        this.tha = 0;
        this.index = 0;
        this.hcolor = 0;
        this.renderProton = this.renderProton.bind(this);
    },
    mounted() {
        this.runProton()
    },
    beforeDestroyed() {
        try {
            RAFManager.remove(this.renderProton);
            this.proton.destroy();
        } catch (e) {}
    },
    methods: {
      runProton() {
            const scene = document.getElementById('pulse');
            const proton = new Proton();
            const emitter = new Proton.Emitter();

            //set Rate
            emitter.rate = new Proton.Rate(new Proton.Span(4, 16), new Proton.Span(.01));

            //add Initialize
            emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 0)));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Radius(6, 12));
            emitter.addInitialize(new Proton.Life(3));
            emitter.addInitialize(new Proton.V(45, new Proton.Vector3D(0, 1, 0), 180));
                        
            //add Behaviour
            emitter.addBehaviour(new Proton.Alpha(1, 0));
            emitter.addBehaviour(new Proton.Scale(.1, 1.3));
            
            var color1 = new THREE.Color();
            var color2 = new THREE.Color();
            var colorBehaviour = new Proton.Color(color1, color2);
            emitter.addBehaviour(colorBehaviour);
            emitter.emit();

            //add emitter
            proton.addEmitter(emitter);

            //add renderer
            proton.addRender(new Proton.SpriteRender(scene));
      },

      createProton(canvas) {
        const proton = new Proton();

        const emitter = new Proton.Emitter();
        //setRate
        emitter.rate = new Proton.Rate(
          new Proton.Span(2, 8),
          new Proton.Span(0.01)
        );
        //addInitialize
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 0)));
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(6, 12));
        emitter.addInitialize(new Proton.Life(2));
        emitter.addInitialize(
        new Proton.V(new Proton.Span(0.3), new Proton.Span(0, 360), "polar")
        );

        //addBehaviour
        emitter.addBehaviour(new Proton.Alpha(1, 0));
        emitter.addBehaviour(new Proton.Scale(0.1, 1.3));
        emitter.addBehaviour(new Proton.RandomDrift(3, 3, 0.05));


        const color1 = Color.parse( `hsl(${this.hcolor % 360}, 100%, 50%)` ).hexTriplet();
        const color2 = Color.parse(  `hsl(${(this.hcolor + 50) % 360}, 100%, 50%)` ).hexTriplet();

        const colorBehaviour = new Proton.Color(color1, color2);
        emitter.addBehaviour(colorBehaviour);
        emitter.addBehaviour(
          new Proton.CrossZone(
              new Proton.RectZone(0, 0, canvas.width, canvas.height),
              "collision"
          )
        );

        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
        emitter.emit();
        proton.addEmitter(emitter);

        const renderer = new Proton.CanvasRenderer(canvas);
        proton.addRenderer(renderer);

        //debug drawEmitter
        Proton.Debug.drawEmitter(proton, canvas, emitter);
        this.proton = proton;
        this.emitter = emitter;
        this.renderer = renderer;
        this.colorBehaviour = colorBehaviour;
      },

      handleCanvasInited(canvas) {
      this.canvas = canvas;
      this.createProton(canvas);
      RAFManager.add(this.renderProton);
      },

      handleResize(width, height) {
      this.renderer.resize(width, height);
      },

      emitterRunning() {
      this.tha += Math.PI / 200;
      const p = 400 * Math.sin(2 * this.tha);
      this.emitter.p.x = p * Math.cos(this.tha) + this.canvas.width / 2;
      this.emitter.p.y = p * Math.sin(this.tha) + this.canvas.height / 2;
      },

      changingColor() {
      this.index++;
      if (this.index % 10 === 0) {
        this.hcolor++;
        const color1 = Color.parse(
          "hsl(" + (this.hcolor % 360) + ", 100%, 50%)"
        ).hexTriplet();
        const color2 = Color.parse(
          "hsl(" + ((this.hcolor + 50) % 360) + ", 100%, 50%)"
        ).hexTriplet();
        this.colorBehaviour.reset(color1, color2);
        this.index = 0;
      }
      },
    
      renderProton() {
      this.changingColor();
      this.emitterRunning();
      this.proton.update();
      }
  }
}
</script>