<template lang="pug">
.uk-flex
    #talkjs-container.uk-width-expand(style="width: 90%; margin: 30px 0; height: 550px")
        i Loading chat...
    .uk-panel.uk-width-medium.uk-background-muted.uk-padding-small
        .uk-card.uk-card-small.uk-card-default
            .uk-card-header
                span.uk-text-small hello
            .uk-card-body hello body
</template>
<script>
import Talk from "talkjs";

export default {
    name: 'Inbox',

    props: {
        currentUser: {
            type: Object,
            //required: true,
            default: function() {
                return {
                    id: '654321',
                    name: 'Current User',
                    email: 'jane@example.nl',
                    photoUrl: null,
                    welcomeMessage: 'Hello from currentUser',
                    role: "Initiator"
                }
            }
        }
    },

    data() {
        return {
            user: [],
            contacts: []
        }
    },
        
    mounted() {
        this.user = {
            id: this.currentUser.id,
            name: this.currentUser.name,
            email: this.currentUser.email,
            photoUrl: this.currentUser.photoUrl || `https://eu.ui-avatars.com/api/?name=${this.currentUser.name}`,
            welcomeMessage: this.currentUser.welcomeMessage,
            role: this.currentUser.role
        }

        this.contacts = [
            {
                    id: "jack",
                    name: "Jack",
                    email: "jack@example.com",
                    photoUrl: null,
                    welcomeMessage: "Hi there, how can I help?",
                    role: "FamilyMember"
            },
            {
                    id: 'rick',
                    name: "Rick",
                    email: "Rick@example.com",
                    photoUrl: null,
                    welcomeMessage: "Hi there, how can I help?",
                    role: "FamilyMember"
            },
        ]

        this.initConversation(this.user, this.contacts, 'ResearchStarter')

    },

    methods: {
        initConversation(user, contacts, conversationId) {
            Talk.ready.then(function() {
                var me = new Talk.User(user);
                
                /* var privateSession = new Talk.Session({
                    appId: "tRm5PSRh",
                    me: me
                });*/

                // Create a session with me in it
                const session = new Talk.Session({
                    appId: "tRm5PSRh",
                    me: me
                });

                // Create a conversation in this session
                const conversation = session.getOrCreateConversation(conversationId);
                conversation.setAttributes({
                    photoUrl: `https://eu.ui-avatars.com/api/?name=research`,
                    subject: "Research Starter"
                });

                // conversation.setParticipant(me);

                contacts.forEach(contact => {
                    conversation.setParticipant(new Talk.User(contact));
                })
                               

                var inbox = session.createInbox({selected: conversation});
                inbox.mount(document.getElementById("talkjs-container"));

                /* var privateConversation = privateSession.getOrCreateConversation(Talk.oneOnOneId(me, other1));
                privateConversation.setParticipant(me);
                privateConversation.setParticipant(other1);
                var inbox = talkSession.createInbox({selected: privateConversation}); */

                const element = document.getElementsByClassName('NoticeBar')
                console.log("notice hidden", element)

            })

            
        
        },
    }
    
}
</script>