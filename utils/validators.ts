import EmailValidator from 'email-validator'

export const emailValid = (val: string) => {
    return EmailValidator.validate(val)
}

export const minLengthValidatorCreator = (minLength: number) => (val: string) => {
    return val.length >= minLength
}