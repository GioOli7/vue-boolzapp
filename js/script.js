// dayjs
dayjs.locale('it');
dayjs.extend(dayjs_plugin_relativeTime);
const dateFormat = 'DD MMMM - HH:mm';

// MAIN
const app = new Vue({
    el: "#app",
    data: {
        // Elenco contatti
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: dayjs().subtract(50, 'minute').format(dateFormat),
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: dayjs().subtract(49, 'minute').format(dateFormat),
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: dayjs().subtract(31, 'minute').format(dateFormat),
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: dayjs().subtract(27, 'hour').format(dateFormat),
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: dayjs().subtract(49, 'minute').format(dateFormat),
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: dayjs().subtract(12, 'minute').format(dateFormat),
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: dayjs().subtract(72, 'minute').format(dateFormat),
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: dayjs().subtract(20, 'minute').format(dateFormat),
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: dayjs().subtract(16, 'minute').format(dateFormat),
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: dayjs().subtract(46, 'minute').format(dateFormat),
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: dayjs().subtract(4, 'minute').format(dateFormat),
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        answers: [
            'Va Bene!', 'Ok, a domani', 'Certamente', "Senz'altro", 'Come dici tu', 'Potrebbe andare', 'Meglio così', 'La fai facile', 'Certo come no', 'Potresti essere più specifico?', 'Ovvero?', 'Potresti spiegarti meglio?', 'Non mi sembra male', 'Sicuro?', 'Pensaci bene', 'Dubito', 'Tu che mi consigli?', 'Se lo dici tu..',],
        selectedIndex: 0,   // index of selected contact in chat list
        searchContact: "",  // string for searching contact in chat list
        myMessage: '',      // my chat message
        // end data
    },
    methods: {
        /**
         * Give index of selected contact in chat list
         */
        getContactIndex(index) {
            this.selectedIndex = index;
        },

        /**
         * Submit your chat message
         */
        submit() {
            if (this.myMessage != "") {
                myMessage = this.myMessage;
                this.contacts[this.selectedIndex].messages.push(
                    {
                        date: dayjs().format(dateFormat),
                        message: myMessage,
                        status: 'sent'
                    }
                )
                
                // reset field
                this.myMessage = '';
                
                // auto-response "bot"
                setTimeout(() => {
                    // randAnsw = this.answers[this.random(this.answers.length)];
                    this.contacts[this.selectedIndex].messages.push(
                        {
                            date: dayjs().format(dateFormat),
                            message: this.randAnswer(),
                            status: 'received'
                        }
                    )
                }, 1000)
            }
        },

        /**
         * allow visibility of contacts based on your search query
         */
        search() {
            query = this.searchContact.toLowerCase();
            this.contacts.forEach(contact => {
                contactName = contact.name.toLowerCase()
                contact.visible = contactName.includes(query);
            })
        },

        /**
         * random index
         */
        random(max) {
            return Math.floor( Math.random() * max);
        },

        /**
         * return a random answer from array of strings
         */
        randAnswer() {
            let randIndex = this.random(this.answers.length - 1)
            return randAnsw = this.answers[randIndex];
        },
    }
})