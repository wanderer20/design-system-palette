import type { ScoresAPCA, ScoresWCAG2 } from "@/shared/lib";

export type ContrastData = {
    wcag2?: {
        ratio: number,
        score: ScoresWCAG2
    },
    apca?: {
        ratio: number,
        score: ScoresAPCA
    }
}

export const contrastDirection = ['direct', 'reverse'] as const
export type ContrastDirection = typeof contrastDirection[number]