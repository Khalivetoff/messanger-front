export const LOGIN_RULES = [
  (e: string): boolean | string => !!e || '',
  (e: string): boolean | string => e.length <= 30 || 'Максимальная длина логика 30 символов',
  (e: string): boolean | string => !e.includes(' ') || 'Логин не должен содержать пробелы'
]

export const PASSWORD_RULES = [
  (e: string): boolean | string => !!e || '',
  (e: string): boolean | string => !e.includes(' ') || 'Пароль не должэен содержать пробелы'
]

export const NAME_RULES = [
  (e: string): boolean | string => !!e || '',
  (e: string): boolean | string => e.length <= 10 || 'Максимальная длина имени 10 символов'
]
