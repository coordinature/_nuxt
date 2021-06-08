<template lang="pug">
inbox(
    :addConversation="addConversation"
    :conversations="conversations"
).uk-height-viewport
</template>
<script>
export default {
    data() {
        return {
            conversations: {},
            conversationList: []
        }
    },
    mounted() {
        this.$gun.get('conversations').map().on((node, key) => {

            // add results straight to the Vue component state
            // and get updates when nodes are updated by GUN
            console.log('object', key, node)
            this.conversations[key] = node;
        });
    },
    methods: {
        addConversation() {
            this.$gun.get('conversations').set({
                id: "ResearchStarter",
                photoUrl: `https://eu.ui-avatars.com/api/?name=research`,
                subject: "Research Starter",
                email: "mark@gunDB.io",
            });
        },
    }
}
</script>
