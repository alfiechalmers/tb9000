const { RoleManager, Guild } = require("discord.js")

module.exports = {
    name: "verify",
    cooldown: "0",
    execute(message, args) {
        if(message.member.roles.cache.has("769269038743289867")) {
            message.channel.send('You are already Verified!')
          } else {
        let verifiable = message.author.id;
        let verified = message.author;
        let correctGuild = message.guild;
        const monkeys = ["🙈","🙉", "🙊"]
        const randomMonkey = Math.floor(Math.random() * monkeys.length)

        message.author.send(`React with ${monkeys[randomMonkey]} to verify yourself.`)
        .then(function (message){
            message.react('🙈');
            message.react('🙉');
            message.react('🙊');
            const filter = (reaction, user) => {
                return ['🙈', '🙉', '🙊'].includes(reaction.emoji.name) && user.id === verifiable;
            };
    
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
    
                    if (reaction.emoji.name === monkeys[randomMonkey]) {
                        let member = correctGuild.members.cache.get(verifiable);
                        let role = correctGuild.roles.cache.get("769269038743289867");
                        member.roles.add(role)
                        verified.send(`Successfully verified as ${verified}`);
                    } else {
                        let member = correctGuild.members.cache.get(message.author.id);
                        let role = correctGuild.roles.cache.get("769269038743289867");
                        member.roles.remove(role)
                        verified.send('It\'s not hard, try again in 10 minutes.');
                    }
        })
        .catch(function (){
            
        })
            
                })

    }

}}