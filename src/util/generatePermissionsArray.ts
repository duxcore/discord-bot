import { ApplicationCommandPermissions, ApplicationCommandPermissionType } from "@duxcore/interactive-discord";
import Config from "../../.config";

export enum PermissionLevel {
  MODERATOR,
  ADMINISTRATOR
}

export function generatePermsArray(level: PermissionLevel): ApplicationCommandPermissions[] {
  let moderator = Config.permissions.moderator;
  let administrator = Config.permissions.administrator;

  const permissionsArray: ApplicationCommandPermissions[] = []

  if (level == PermissionLevel.MODERATOR) moderator.map(id => permissionsArray.push({ id, permission: true, type: ApplicationCommandPermissionType.ROLE }))
  if (level == PermissionLevel.ADMINISTRATOR) administrator.push(...moderator); administrator.map(id => permissionsArray.push({ id, permission: true, type: ApplicationCommandPermissionType.ROLE }))

  return permissionsArray;
}