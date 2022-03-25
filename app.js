// Displays names and codenames
Vue.component('codenames', {
    data: function() {
        return {
            // This is what determines whether the elements are toggled or not
            toggle: false
        }
    },
    props: ['name', 'codename'],
    template: `
        <div v-on:click='toggle = !toggle'> 
            <p v-bind:class="{'hidden': toggle}">{{name}}</p>
            <p v-bind:class="{'hidden': !toggle}">{{codename}}</p>
        </div>
        `
});

var form = new Vue({
    el: "#form",
    data: {
        name: "",
        email: "",
        message: "",
        codenames: [
            {name:"Protagonist",codename:"Joker"},
            {name:"Anne",codename:"Panther"},
            {name:"Ryuji",codename:"Skull"}
        ]
    },
    computed: {
        nameMessage: function() {
            if(this.validName()) {
                this.message = "";
                this.submit();
            }
            else {
                this.message = "Not enough characters";
            }
        },
        emailMessage: function() {
            if(this.validEmail()) {
                this.message = "";
                this.submit();
            }
            else {
                this.message = "Email needs to be in format: example@domain.xyz";
            }
        }
    },
    methods: {
        validName: function() {
            return (!(this.name.length < 2));
        },
        validEmail: function() {
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return this.email.match(mailformat);
        },
        submit: function() {
            if(this.validName() && this.validEmail()) {
                this.message = "Submitted";
            }
        }
    },
    watch: {
        name: function() {
            this.nameMessage();
        },
        email: function() {
            this.emailMessage();
        }
    }
});