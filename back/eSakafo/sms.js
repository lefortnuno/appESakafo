const prisma = require('./connection');
const accountSid = 'AC3ecd504c4721080b995b5492a19f89a6';
const authToken = '5a1f4757babf8f01ada67ea6867ccb75';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const getRandomRecette = async () => {
    const recettes = await prisma.recette.findMany()
    const randomRecette = recettes [Math.floor(Math.random() * recettes.length)]
    return randomRecette
}

module.exports.sendRecette = async () => {
    const {nom_recette,contenu_recette} = await getRandomRecette()
    client.messages
    .create({
        body: nom_recette+"\n"+contenu_recette,
        from: '+12566336697',
        to: '+261385577609'
    })
    .then(message => console.log(message.sid));
}

const sendRecetteAt8 = async () => {
    const datenow = new Date()
    if (datenow.getHours() === 8 && datenow.getMinutes() === 0){
        sendRecette()
        console.log("Lasa tamin'ny" + datenow)
    }
}

// setInterval(()=>{
//     sendRecetteAt8();
// },6000)