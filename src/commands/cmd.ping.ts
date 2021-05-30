import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";
import { ButtonStyle, ComponentType } from "../util/types/interactions";

const command = new CommandExecutor({
  name: "ping",
  description: "A simple test command"
});

command.use(isAdmin)
command.setExecutor((client, interaction) => {
  interaction.respond({
    type: 4,
    data: {
      content: 'Pong!',
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              custom_id: "1234567890",
              label: "Primary",
              style: ButtonStyle.Primary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Secondary",
              style: ButtonStyle.Secondary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Success",
              style: ButtonStyle.Success    
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 2,
              custom_id: "1234567890",
              label: "Primary",
              style: ButtonStyle.Primary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Secondary",
              style: ButtonStyle.Secondary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Success",
              style: ButtonStyle.Success    
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 2,
              custom_id: "1234567890",
              label: "Primary",
              style: ButtonStyle.Primary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Secondary",
              style: ButtonStyle.Secondary    
            },
            {
              type: 2,
              custom_id: "1234567890",
              label: "Success",
              style: ButtonStyle.Success    
            }
          ]
        }
      ]
    },
  }).catch(dat => console.log(dat.response.data.errors.data));
});

export default command;
