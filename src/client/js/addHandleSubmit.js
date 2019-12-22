function addHandleSubmit(event) {
    let city =document.getElementById('city').value;
    let goDate=document.getElementById('date').value;

    let currentDate=new Date();

    let duringDays=(new Date(goDate).setHours(0,0,0)-currentDate.setHours(0,0,0))/(1000*3600*24);

    

}
export default {
    addHandleSubmit
}