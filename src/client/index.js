import getData from './js/getData'
import addHandleSubmit from './js/addHandleSubmit'
import deleteHandleSubmit from './js/deleteHandleSubmit'

import './styles/app.scss'
import './styles/footer.scss'






document.getElementById('btn-add').addEventListener('click',addHandleSubmit)
document.getElementById('btn-delete').addEventListener('click',deleteHandleSubmit)