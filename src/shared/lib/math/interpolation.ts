/**
 * Линейная интерполяция (linear interpolation, которую е)
 * Интерполирует в диапазоне [от..до] на основе параметра t, где t обычно находится в диапазоне [0..1]
 * @param start Начало диапазона
 * @param end Конец диапазона
 * @param t Величина интерполяции
 * @example
 * lerp(0, 100, 0.5); // 50
 * lerp(20, 80, 0);   // 20
 * lerp(30, 5, 1);    // 5
 * lerp(-1, 1, 0.5);  // 0
 * lerp(0.5, 1, 0.5); // 0.75
 * @returns {Number} Возвращает значени интерполяции
 */
export const lerp = (start: number, end: number, t: number): number => start * (1 - t) + end * t