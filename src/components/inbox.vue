<template lang="pug">
div#talkjs-container(style='width: 90%; margin: 30px; height: 500px')
    i Loading chat...
</template>
<script>
import Talk from "talkjs";

(function(t,a,l,k,j,s){
s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
.push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);

export default {
    name: 'Inbox',
        props: {
            currentUser: {
                type: Object,
                //required: true,
                default: function() {
                    return {
                        id: '129223',
                        name: 'Jane Doe',
                        email: 'jane@example.nl',
                        photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
                        welcomeMessage: 'Hello',
                    }
                }
            }
        },
    mounted() {
       /* const currentUser = {
                id: this.currentUser.id,
                name: this.currentUser.name,
                email: this.currentUser.email,
                photoUrl: this.currentUser.photoUrl,
                welcomeMessage: "Hi, how are you?",
                role: "parent"
            }*/
        Talk.ready.then(function() {
            var me = new Talk.User({
                id: parseInt(Math.random()*500000).toString(),
                name: "Sanne",
                email: "Sanne@example.nl",
                photoUrl: "https://eu.ui-avatars.com/api/?name=Sanne+Doe",
                welcomeMessage: "Hey there! How are you? :-)",
                role: "Initiator"
            });
            var talkSession = new Talk.Session({
                appId: "tRm5PSRh",
                me: me
            });
            var other = new Talk.User({
                id: "654321",
                name: "Jack",
                email: "jack@example.com",
                photoUrl: "https://eu.ui-avatars.com/api/?name=Jack+Doe",
                welcomeMessage: "Hi there, how can I help?",
                role: "FamilyMember"
            })
            var other2 = new Talk.User({
                id: "654321",
                name: "Rick",
                email: "Rick@example.com",
                photoUrl: "https://eu.ui-avatars.com/api/?name=Rick+Doe",
                welcomeMessage: "Hi there, how can I help?",
                role: "FamilyMember"
            })
            var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            var inbox = talkSession.createInbox({selected: conversation});
            inbox.mount(document.getElementById("talkjs-container"));

        })
    }
    
}
</script>