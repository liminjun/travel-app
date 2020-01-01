const apiURL = 'http://localhost:8090';

function deleteHandleSubmit(event) {

    console.log(event);
    const currentIndex = event.target.dataset.index;

    removeTrip(apiURL + '/delete', { currentIndex: currentIndex }).then((response) => {
        
        console.log(response);
        if(response.success){
            alert("Remove trip successfully.");
            Client.addHandleSubmit.getList();
        }
    });
}
const removeTrip = async (requestUrl = '', data = {}) => {
    const response = await fetch(requestUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.log('error', error);
    }
}

module.exports = deleteHandleSubmit;