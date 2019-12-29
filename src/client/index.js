

import getData from './js/getData'

import addHandleSubmit from './js/addHandleSubmit'
import deleteHandleSubmit from './js/deleteHandleSubmit'

import previewImage from './assets/preview.png';

import './styles/app.scss'
import './styles/footer.scss'




document.getElementById('btn-add').addEventListener('click', addHandleSubmit.addHandleSubmit);

document.getElementById('btn-init').addEventListener('click', addHandleSubmit.getList);
export {
    previewImage,
    deleteHandleSubmit,
    addHandleSubmit
}