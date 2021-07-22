<template lang="pug">
    canvas.uk-background-secondary.uk-width-1-1.uk-height-viewport( ref="can" id="can" )
</template>

<script>
import Proton from 'proton-engine';
import RAFManager from "raf-manager";


export default {
    mounted() {
        const canvas = this.$refs.can
        const proton = new Proton();
        const emitter = new Proton.Emitter();

        //set Rate
        emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);

        //add Initialize
        emitter.addInitialize(new Proton.Radius(1, 12));
        emitter.addInitialize(new Proton.Life(2, 4));
        emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));

        //add Behaviour
        emitter.addBehaviour(new Proton.Color('fff', 'random'));
        emitter.addBehaviour(new Proton.Alpha(1, 0));

        //set emitter position
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
        emitter.emit(5);

        //add emitter to the proton
        proton.addEmitter(emitter);

        // add canvas renderer
        const renderer = new Proton.CanvasRenderer(canvas);
        proton.addRenderer(renderer);

    }
}
</script>