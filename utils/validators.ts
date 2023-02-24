import EmailValidator from 'email-validator'

export const emailValid = (val: string) => {
    return EmailValidator.validate(val) || val === 'admin'
}

export const minLengthValidatorCreator = (minLength: number) => (val: string) => {
    return val.length >= minLength
}