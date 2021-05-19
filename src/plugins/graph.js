import Vue from 'vue'
import VueGun from 'vue-gun';
// import SEA from 'gun/sea'; // Required for SEA functions and user authentication 

Vue.use(VueGun, {
    peers: [
        // 'http://localhost:8080/gun',
        'http://188.166.125.234/gun',
    ]
});