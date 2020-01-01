

import getData from './js/getData'

import addHandleSubmit from './js/addHandleSubmit'
import deleteHandleSubmit from './js/deleteHandleSubmit'

import previewImage from './assets/preview.png';
import logo from './assets/logo.png';

import './styles/app.scss'
import './styles/footer.scss'
import './styles/responsive.scss'



document.getElementById('btn-add').addEventListener('click', addHandleSubmit.addHandleSubmit);

document.getElementById('btn-init').addEventListener('click', addHandleSubmit.getList);
export {
    previewImage,
    deleteHandleSubmit,
    addHandleSubmit
}

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this); local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
//set current date.
document.getElementById("date").value=new Date().toDateInputValue();