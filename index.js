const Discord = require("discord.js");
const token = process.env.Discord_Token; 
const client = new Discord.Client();
const PersistentCollection = require('djs-collection-persistent');
const prefix = ";";
const ranks = new PersistentCollection({
    name : "ranks"
});
const questions = new PersistentCollection({
    name : "questions"
})
const suggestions = new PersistentCollection({
    name : "suggestions"
})

client.on("ready", () => {
    console.log("Je suis prêt à être utilisé. \nRuler t'es le plus beau <3\nJvais aider KT")
})

client.on("message", message => {
    if (message.author.name === "kikooweabojap"){
        client.guilds.get("352855524162797574").channels.find("name", "staff").send("<@352856910665482251> ce fdp de kikooweabojap est de retour.")
        mute = message.guild.roles.get("358283504783458305")
        membrer = message.guild.roles.get("358281649307254784")
        nvx = message.guild.roles.get("358281312790118400")
        message.delete()
        message.member.addRole(mute)
        message.member.addRole(nvx)
        message.member.removeRole(membrer)
    }
    
})

client.on("message", ask => {
    if (ask.channel.id == "365565201342398484"){
        if (ask.content.startsWith(prefix + "ask")){
            var question = ask.content.substr(5)
            var demandeur = ask.author.tag
            var id = ask.author.id
            ask.delete()
                .then(ask.reply("Ta question a été prise en compte. Le staff te répondra au plus vite !"))
                .then(client.guilds.get("352855524162797574").channels.find("name", "questions").send("L'utilisateur " + demandeur + " (" + ask.author.id + ") a demandé : " + question))
                .then(questions.set(id, id))
            console.log(demandeur + " a demandé : " + question)
        }
    }

    if (ask.content.startsWith(prefix + "reponse")){
        if (ask.guild.id == "352855524162797574"){
            var args = ask.content.split("|")
            var aenv = args[1]
            var question = args[2]
            var reponse = args[3]
            var membrestaff = ask.author.tag
            var id = message.author.id
            if (questions.has(aenv)){
                client.users.get(aenv).send(["Bonsoir,",
                                         "Suite à ta question (" + question + "), le staff a répondu :",
                                         reponse,
                                         "Si cette réponse ne te convient pas, tu peux demander plus de précision à **" + membrestaff + "**, qui a répondu à ta question.",
                                         "Bonne journée !"])
                    .then(questions.delete(question, question))
                    .then(ask.delete())
                    .then(ask.reply("J'ai bien répondu : " + reponse + " à " + client.users.get(aenv).tag) + " suite à sa question : " + question)
                console.log(membrestaff + "a répondu : \"" + reponse + "\" à la question : \"" + question + "\" de " + client.users.get(aenv).tag)
            }

            else {
                ask.channel.send("Cette question a déjà reçu une réponse ou n'existe pas.")
            }
        }
    }
})

client.on("message", sugg => {
    if (sugg.content.startsWith(prefix + "sugg")){
        if (sugg.channel.id == "358287567302426624"){
            var suggestion = sugg.content.substr(6)
            var proposeur = sugg.author.tag
            var id = ask.author.id
            sugg.delete().then(sugg.reply("Ta suggestion a été prise en note. Le staff te répondra au plus vite !"))
                .then(client.guilds.get("352855524162797574").channels.find("name", "suggestions").send("L'utilisateur " + proposeur + " (" + sugg.author.id + ") a proposé : " + suggestion))
                .then(suggestions.set(id, id))
            console.log(proposeur + " a proposé : " + suggestion)
        }
    }

    if (sugg.content.startsWith(prefix + "sreponse")){
        if (sugg.guild.id == "352855524162797574"){
            var args = sugg.content.split("|")
            var aenvs = args[1]
            var suggestion = args[2]
            var sreponse = args[3]
            var membrestaff = sugg.author.tag
            if (suggestions.has(aenv)){
            client.users.get(aenvs).send(["Bonsoir,",
                                         "Suite à ta suggestion (" + suggestion + "), le staff a répondu :",
                                         sreponse,
                                         "Si cette réponse ne te convient pas, tu peux demander plus de précision à **" + membrestaff + "**, qui a répondu à ta suggestion.",
                                         "Bonne journée !"])
                .then(suggestions.delete(suggestion, suggestion))
                .then(sugg.delete())
                .then(sugg.reply("J'ai bien répondu : " + sreponse + " à " + client.users.get(aenvs).tag) + " suite à sa suggestion : " + suggestion)
            console.log(membrestaff + "a répondu : \"" + sreponse + "\" à la question : \"" + suggestion + "\" de " + client.users.get(aenvs).tag)
            }

            else {
                sugg.channel.send("Cette suggestion a déjà été gérée ou n'existe pas.")
            }
        }                                 
    }

})

client.on("message", report => {
    if (report.content.startsWith(prefix + "report")){
        var àdir = report.content.substr(8);
        var reporteur = report.author.tag;
        report.delete()
            .then(client.guilds.get("352855524162797574").channels.find("name", "moderateur").send(reporteur + " vous signale que " + àdir));
        console.log(reporteur + " a signalié : " + àdir)
    }
})

client.on("message", rank => {
    if (rank.author.id != "367374581884780545")
    if (rank.content.startsWith(prefix + "join")){
        if(rank.channel.id != "366231356868526081") return;
        var join = rank.content.substr(6)
        if (ranks.has(join)){
            if (rank.member.roles.find("name", join)){
                rank.reply("vous avez déjà ce rôle !")
            };

            if (!rank.member.roles.find("name", join)){
                var rolej = rank.guild.roles.find("name", join)
                if (!rolej){
                    rank.reply("ce rôle n'est pas assignable manuellement !")
                }

                if (rolej){
                    rank.member.addRole(rolej)
                    rank.reply("vous avez bien ajouté le rôle " + join + " à votre liste de rôle !")
                }
            }
        }

        else {
            rank.reply("Ce rôle ne peut pas être atribué manuellement ! Merci de séléctionner un rôle valide.")
        }
    }

    if (rank.content.startsWith(prefix + "remove")){
        if(rank.channel.id != "366231356868526081") return;
        var remove = rank.content.substr(8)
        if (ranks.has(remove)){
            if (rank.member.roles.find("name", remove)){
                var roler = rank.guild.roles.find("name", remove)
                rank.member.removeRole(roler)
                rank.reply("vous avez bien retiré le rôle " + remove + " de votre liste de rôle !")
            }
           else {
               rank.reply("vous ne possédez pas ce rôle.")
           }
        }

        else {
            rank.reply("ce rôle ne peut pas être retiré manuellement ! Merci de séléctionner un rôle valide.")
        }
    }

    if (rank.content === prefix + "rlist"){
        if(rank.channel.id != "358293465592889344") return;
        rank.channel.send(["Voici la liste des rôles auto-assignables pour le serveur KawZzeN's Team :",
        "``" + ranks.map(r => r).join("``\n``"),
        "``",
        "Pour vous assigner un rôle manuellement, faites `;join [couleur]`, pour en retirer un, faites `;remove [couleur]` (n'oubliez pas de remplacer [couleur] par la couleur souhaitée ! Et sans les crochets !)"])
    }

    if (rank.content.startsWith(prefix + "addrank")){
        if(rank.member.hasPermission("MANAGE_GUILD")){
            addr = rank.content.substr(9)
            if (ranks.has(addr, addr)){
                rank.reply("Ce rôle est déjà auto-assignable !")
            }

            else {
                if (rank.guild.roles.find("name", addr)){
                    ranks.set(addr, addr)
                    rank.reply("Le rôle " + addr + " peut désormais être assigné manuellement.")
                }

                else {
                    rank.reply("Ce rôle n'existe pas !")
                }
            }
        }

        else {
            rank.reply("Vous n'avez pas la permission requise.")
        }
    };

    if (rank.content.startsWith(prefix + "delrank")){
        if(rank.member.hasPermission("MANAGE_GUILD")){
            delr = rank.content.substr(9)
            if (!ranks.has(delr, delr)){
                rank.reply("Ce rôle n'est pas auto-assignable !")
            }

            else {
                if (ranks.has(delr, delr)){
                    ranks.delete(delr, delr)
                    rank.reply("Le rôle " + delr + " ne peut plus être assigné manuellement.")
                }

                else {
                    rank.reply("Ce rôle n'existe pas !")
                }
            }
        }

        else {
            rank.reply("Vous n'avez pas la permission requise.")
        }
    };

})

client.on("messageDelete", message => {
    if (message.author.bot) return; 
    if (message.guild.id === "352855524162797574") return;
    if (message.channel.id === "358285425950982144") return;
    client.guilds.get("352855524162797574").channels.find("name", "log").send({
        "embed": {
            "author": {
                "name": message.author.tag,
                "icon_url": message.author.avatarURL
              },
            "color": 13360308,
            "timestamp": new Date(),
            "footer": {
            "icon_url": "",
            "text": "ID : " + message.author.id
            },
            "fields": [
            {
              "name": "**Message supprimé**",
              "value": "Message envoyé par " + message.author + "\nContenu : " + message.content + "\nChannel : " + message.channel
            }
          ]
        }
    })
})

client.on("messageDeleteBulk", message => {
    if (message.author.bot) return; 
    if (message.guild.id === "352855524162797574") return;
    if (message.channel.id === "358285425950982144") return;
    client.guilds.get("352855524162797574").channels.find("name", "log").send({
        "embed": {
            "author": {
                "name": message.author.tag,
                "icon_url": message.author.avatarURL
              },
            "color": 13360308,
            "timestamp": new Date(),
            "footer": {
            "icon_url": "",
            "text": "ID : " + message.author.id
            },
            "fields": [
            {
              "name": "**Message supprimé**",
              "value": "Message envoyé par " + message.author + "\nContenu : " + message.content + "\nChannel : " + message.channel
            }
          ]
        }
    })
})

client.on("message", warn => {
    if (warn.content.startsWith(prefix + "warn")){
        if (warn.guild.id === "352855524162797574") return;
        let staff = warn.guild.roles.find("name", "Equipe Modération")
        if (warn.member.roles.has(staff.id)){  
            var àwarn = warn.guild.member(warn.mentions.users.first())
            var args = warn.content.split("|")
            var raison = args[1]

            if(àwarn){
                warn.delete()
                client.guilds.get("352855524162797574").channels.find("name", "warns").send({
                    "embed": {
                        "author": {
                            "name": warn.author.tag,
                            "icon_url": warn.author.avatarURL
                          },
                        "color": 13360308,
                        "timestamp": new Date(),
                        "footer": {
                        "icon_url": "",
                        "text": "ID : " + warn.author.id
                        },
                        "fields": [
                        {
                          "name": "**Membre averti : **",
                          "value": warn.author.tag + " a averti " + àwarn + " pour la raison suivante :\n\"" + raison + "\""
                        }
                      ]
                    }
                })
                .then(àwarn.send(warn.author + " vous a averti pour la raison suivante :\n\"" + raison + "\""))
                .then(console.log(warn.author + " a averti :" + àwarn+ "pour la raison suivante :\n\"" + raison + "\""))
            }

            else {
                return
            }
        }

        else {
            return
        }

        
    }

})

client.login(token);