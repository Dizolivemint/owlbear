import { Character } from "@/lib/app.types";

function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

function isCharacter(value: any): value is Character {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    typeof value.species === "string" &&
    (value.background === undefined || typeof value.background === "string") &&
    (value.desciprtion === undefined || typeof value.description === "string") &&
    typeof value.appearance === "string" &&
    typeof value.size === "string" &&
    typeof value.challenge_rating === "string" &&
    typeof value.attributes === "object" &&
    typeof value.attributes.STR === "number" &&
    typeof value.attributes.DEX === "number" &&
    typeof value.attributes.CON === "number" &&
    typeof value.attributes.INT === "number" &&
    typeof value.attributes.WIS === "number" &&
    typeof value.attributes.CHA === "number" &&
    isArray(value.skills) &&
    value.skills.every((skill: any) => 
      typeof skill.skill === "string" && typeof skill.description === "string"
    ) &&
    isArray(value.actions) &&
    value.actions.every((action: any) =>
      typeof action.action === "string" && typeof action.description === "string"
    ) &&
    isArray(value.reactions) &&
    value.reactions.every((reaction: any) =>
      typeof reaction.reaction === "string" && typeof reaction.description === "string"
    ) &&
    (value.legendary_actions === undefined || isArray(value.legendary_actions)) &&
    (value.legendary_actions === undefined ||
      value.legendary_actions.every(
        (legendary_action: any) =>
          typeof legendary_action?.legendary_action === "string" &&
          typeof legendary_action?.description === "string"
      )
    )
  );
}

export { isCharacter }