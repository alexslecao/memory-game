import type { CardProps } from "../templates/Card";

const keyGen = (): string => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

const duplicateArray = <T>(array: T[]): T[] => {
    return array.concat(array);
}

const sortArray = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
}

const regenerateCards = (cards: CardProps[]): CardProps[] => {
    return cards.map(card => ({ ...card, id: keyGen() }));
}

export const duplicateRegenerateSortCards = (cards: CardProps[]): CardProps[] => {
    return sortArray(regenerateCards(duplicateArray(cards)));
}