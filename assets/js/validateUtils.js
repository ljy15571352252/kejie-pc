export const isValidEmail=function (email) {
    let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regExp.test(email)
}

export const isValidMobile=function (mobile) {
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(mobile)
}
