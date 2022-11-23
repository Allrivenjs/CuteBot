module.exports =  client => {
    console.log(`Session ${client.session} started on ${client.user.tag} - ${client.user.id}`.green);

    if (client?.application?.commands){
        client.application.commands.set(client.slashArray);
        console.log(`(/) Loaded ${client.slashCommands.size} slash commands`.green);
    }
}