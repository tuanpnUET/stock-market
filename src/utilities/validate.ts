/* eslint-disable consistent-return */
import VALIDATE_FORM from './staticData';

interface formUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const validateForm = (form: formUser, status: string) => {
    if (status === VALIDATE_FORM.INFO_VALID) {
        return form.email === '' || form.password === '' || form.confirmPassword === '';
    }
    if (status === VALIDATE_FORM.CHECK_CONFIRM_PASSWORD) {
        return form.confirmPassword !== form.password;
    }
};
export const checkConfirmPassword = (form: formUser) => {
    return form.password !== form.confirmPassword;
};
export const regexEmail =
    /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
