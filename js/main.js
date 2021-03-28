var app = new Vue({
    el: '#root',
    data: {
        clickedChevron: -1,
        activeContact: 0,
        lastAccess: 'Ultimo accesso oggi alle',
        search: '',
        newMessage: '',
        emoticonsActive: false,
        emoticons: ['angry','dizzy','flushed','frown','frown-open','grimace','grin','grin-alt','grin-beam','grin-beam-sweat','grin-hearts','grin-squint','grin-squint-tears','grin-stars','grin-tears','grin-tongue','grin-tongue-squint','grin-tongue-wink','grin-wink','kiss','kiss-beam','kiss-wink-heart','laugh','laugh-beam','laugh-squint','laugh-wink','meh','meh-blank','meh-rolling-eyes','sad-cry','sad-tear','smile','smile-beam','surprise','tired'],
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
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
    methods: {
        orderContacts: function() {
            var support = this.contacts[this.activeContact];
            this.contacts.sort((a,b) => (a.messages[a.messages.length - 1].date < b.messages[b.messages.length - 1].date)? 1 : -1);
            this.activeContact = this.contacts.indexOf(support);
        },
        toggleEmoticons: function() {
            this.emoticonsActive = !this.emoticonsActive;
        },
        toggleWindow: function(index) {
            if (this.clickedChevron == index) {
                this.clickedChevron = -1;
            }
            else {
                this.clickedChevron = index;
            }
        },
        closeWindow: function() {
            if (this.clickedChevron != -1) {
                this.clickedChevron = -1;
            }
        },
        deleteMessage: function(clickedMessageIndex,fromOrToWho) {
            console.log(fromOrToWho.messages[clickedMessageIndex]);
            fromOrToWho.messages[clickedMessageIndex].text = 'Questo messaggio è stato eliminato.';
        },
        contactVisibility: function() {
            var searchChars = this.search;
            var index = searchChars.length;
            this.contacts.forEach((contact) => {
                var str = contact.name;
                var nameChars = str.slice(0,index);
                if (nameChars == searchChars) {
                    contact.visible = true;
                }
                else {
                    contact.visible = false;
                };
            });
        },
        openChat: function(clickedIndex) {
            this.activeContact = clickedIndex;
            // e le notifiche spariscono
            this.contacts[clickedIndex].unread = 0;
            // e la scritta sotto al nome in alto cambia
            this.isTexting();
            // e scorro in fondo
            document.getElementsByClassName('chat-content')[0].scrollTop = 9999999;
        },
        isTexting: function() {
            if (this.contacts[this.activeContact].texting) {
                this.lastAccess = this.contacts[this.activeContact].name + ' sta scrivendo...';
            }
            else {
                this.lastAccess = 'Ultimo accesso oggi alle';
            };
        },
        // NB: la arrow function mi permette di cambiare lo scope del this e fa in modo che si riferisca effettivamente all'oggetto root; utilizzando una function normale il settimeout sembra che cambi il significato del this
        receiveConfirm: function(textingContact) {
            // se siamo in quella chat vediamo "sta scrivendo"
            textingContact.texting = true;
            this.isTexting();
            setTimeout(() => {
                var date = dayjs();
                var newMessage = {
                    date: date,
                    text: 'ok',
                    status: 'received'
                };
                textingContact.messages.push(newMessage);
                this.orderContacts();
                // nuova notifica se non sono già all'interno di quella chat
                if (this.contacts[this.activeContact] != textingContact) {
                    textingContact.unread += 1;
                }
                // this.lastAccess = 'Ultimo accesso oggi alle';
                textingContact.texting = false;
                this.isTexting();

                document.getElementsByClassName('chat-content')[0].scrollTop = 9999999;
            },10000);
        },
        sendMessage: function(textingContact) {
            var text = this.newMessage;
            if (text != '') {
                var date = dayjs();
                var newMessage = {
                    date: date,
                    text: text,
                    status: 'sent'
                };
                textingContact.messages.push(newMessage);
                this.orderContacts();
                // siccome cambio l'ordine dei contatti in base all'ultimo messaggio allora l'attivo è il primo della lista
                this.activeContact = 0;
                document.getElementById('write-message').value = '';
                document.getElementsByClassName('chat-content')[0].scrollTop = 9999999;
                this.receiveConfirm(textingContact);
            }
            this.newMessage = '';
        },
        insertEmoticon: function(element) {
            this.newMessage += '<i class="in-text fas fa-' + element + '"></i>';
        },
    },
    created: function() {
        // NB: il confronto tra date nel formato non accettatto universalmente mi dava problemi, quindi ho convertito il tutto e solo in fase di stampa nell'html ho aggiunto il formato desiderato
        this.contacts.forEach((contact) => {
            contact.messages.forEach((message) => {
                let support = message.date;
                let year = support.slice(6,10);
                let month = support.slice(3,5);
                let day = support.slice(0,2);
                let hour = support.slice(11,19);
                support = dayjs(year + '-' + month + '-' + day + 'T' + hour);
                message.date = support;
            });
            // approfitto di questo ciclo per dire che per ogni contatto i messaggi non letti inizialmente sono 0 (istanzio una nuova proprietà)
            contact.unread = 0;
            // e dico anche che nessuno inizialmente sta rispondendo ai messaggi
            contact.texting = false;
        });
        this.orderContacts();
        this.activeContact = 0;
    },
});
Vue.config.devtools = true;
