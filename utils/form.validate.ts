import { AuthFields } from "@/types/auth-filelds.type";

export const logInValidate = (value: AuthFields) => {
  const errors = {} as AuthFields
  if (!value.email.length) {
    errors.email = 'E-mail обязателен'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
    errors.email = 'Введите корректный E-mail'
  } else if (!value.password.length){
    errors.password = 'Пароль не может быть пустым'
  }else if (value.password.length <= 4 ){
    errors.password = 'Минимальная длина пароля 5 символов'
  }
  return errors
}