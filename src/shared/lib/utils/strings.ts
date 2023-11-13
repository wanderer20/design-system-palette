import { capitalize as toCapitalize } from '@vue/shared'

export {
    camelize,
    hyphenate,
    hyphenate as kebabCase, // alias
} from '@vue/shared'

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
    string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

// NOTE: improve capitalize types. Restore previous code after the [PR](https://github.com/vuejs/core/pull/6212) merge
export const capitalize = <T extends string>(str: T) =>
    toCapitalize(str) as Capitalize<T>

/**
 * Метод получает первые буквы от слов в строке.
 * @param str Строка
 * @param count Количество слов
 */
export const getFirstCapitalLetters = (str: string, count: number = 2): string => {
    if (str === '') return ''

    const words: string[] = str.split(' ').slice(0, count)
    const letters: string[] = words.map(word => word.charAt(0).toUpperCase())

    return letters.join('')
}
