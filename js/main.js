var app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                active: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    },
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    },
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    },
                ],
            },
        ],

    },
    // created: {
    //     currentDate: setInterval(function() {
    //         var d = new Date();
    //         var day = d.getDate();
    //         var month = d.getMonth();
    //         var year = d.getFullYear();
    //         var hour = d.getHours();
    //         var minute = d.getMinutes();
    //         var second = d.getSeconds();
    //         var date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    //         return date;
    //     },1000),
    // },
    methods: {
        openChat: function(clickedContact) {
            if (!clickedContact.active) {
                this.contacts.forEach((contact) => {
                    contact.active = false;
                });
                clickedContact.active = true;
            }
        },
        sendMessage: function(textingContact) {
            var text = document.getElementById('write-message').value;
            if (text != '') {
                // var d = new Date();
                // var day = d.getDate();
                // var month = d.getMonth();
                // var year = d.getFullYear();
                // var hour = d.getHours();
                // var minute = d.getMinutes();
                // var second = d.getSeconds();
                // var date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                var newMessage = {
                    date: currentDate(),
                    text: text,
                    status: 'sent'
                };
                textingContact.messages.push(newMessage);
                document.getElementById('write-message').value = '';
            }
        },
        // receiveConfirm: function(textingContact) {
        //     setTimeout(function(){
        //         var newMessage = {
        //             date: date,
        //             text: 'ok',
        //             status: 'received'
        //         };
        //         textingContact.messages.push(newMessage);
        //     },1000)
        // },
    },
});
Vue.config.devtools = true;

function currentDate() {
    setInterval(function() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
        return date;
    },1000);
};