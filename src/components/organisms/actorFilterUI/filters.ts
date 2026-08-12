import { BaseActorProps } from "@typings/interfaces";

/**
 * Matches an actor whose name contains the search text, ignoring case.
 *
 * @param actor The actor being tested.
 * @param value The name search text.
 * @returns True when the actor should be kept.
 */
export const nameFilter = (actor: BaseActorProps, value: string): boolean => {
    return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
};
