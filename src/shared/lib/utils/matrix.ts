/**
 * Метод получает пару индексов в матрице, если найдено значение
 * @param {string[][]} matrix Матрица из строк
 * @param {string} value Поисковое значение
 * @return {number[]} Массив индексов, где первое значение - номер строки, второе - столбца. Если поиск ничего не дал,
 * то вернется пустой массив
 */
export const getMatrixIndexesByValue = (matrix: string[][], value: string): number[] => {
    if ( matrix.length !== 0 ) {
        const rowCount: number  = matrix.length
        const colCount: number  = matrix[0].length

        for ( let i: number = 0; i < rowCount; i++ ) {
            for ( let j: number = 0; j < colCount; j++) {
                if ( matrix[i][j] === value )
                    return [i, j]
            }
        }
    }

    return []
}