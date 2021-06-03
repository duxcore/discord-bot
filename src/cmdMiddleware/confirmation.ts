import { ButtonComponent, ButtonStyle, ComponentActionRow } from "@duxcore/interactive-discord";
import { MessageEmbed } from "discord.js";
import { MiddlewareMethod } from "../structures/CommandExecutor";

export const confirmation = (prompt?: MessageEmbed, rejectionPrompt?: MessageEmbed) => {
  const mid: MiddlewareMethod = (client, interaction, next) => {
    const promptEmbed = prompt ?? new MessageEmbed({ color: '#FFA500', title: "Confirmation...", description: "Are you sure you'd like to continue?" });
    const rejectionEmbed = rejectionPrompt ?? new MessageEmbed({ color: '#000000', title: "Canceled...", description: "This action has been canceled!" });

    let interacted = false;

    const confirmationButton = new ButtonComponent({ style: ButtonStyle.Success, label: "Continue" });
    const cancelationButton = new ButtonComponent({ style: ButtonStyle.Danger, label: "Cancel"})
    const row = new ComponentActionRow(confirmationButton, cancelationButton);

    client.interactions.addSingleButtonListener(confirmationButton, (coni) => { next(); interacted = true;});
    client.interactions.addSingleButtonListener(cancelationButton, (cani) => {
      interaction.respond({
        embeds: [rejectionEmbed],
        isPrivate: true
      });
    });

    interaction.respond({
      embeds: [promptEmbed],
      shouldEdit: true,
      isPrivate: true
    })

  }
  return mid;
}
