//----Order
function get_order(){
    document.getElementById("order_div").innerHTML='';
    order_id.value = '';
    order_name.value = '';
    order_predpr_sel.value = '';
    fetch("order",{
        method: "GET",
        headers: { "Accept": "application/json" }
    })
    .then(response =>  response.json())
    .then((response) => {
        if(response.status == 500){
            return Promise.reject({statusText: response.message});
        }
        let t = document.createElement('table');
        t.append(document.createElement('tr'));
        for(const text of ['#','Наименование','Предприятие','']){
            t.firstChild.append(Object.assign(document.createElement('th'), {innerHTML: text}));
        }
        for(const row of response){
            let tr = document.createElement('tr');
            for(const key in row){
                tr.append(Object.assign(document.createElement('td'), {innerHTML: row[key]}))
            }
            let td = document.createElement('td');
            btn_upd = document.createElement('button');
            btn_upd.innerHTML = 'Upd';
            btn_upd.addEventListener("click",move_order_data_for_update);
            btn_del = document.createElement('button');
            btn_del.innerHTML = 'Del';
            btn_del.addEventListener("click",del_order_data);
            td.append(btn_upd);
            td.append(btn_del);
            tr.append(td);
            t.append(tr);
        }  
        document.getElementById("order_div").append(t);
// predpr selector init
        fetch("predpr",{
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response =>  response.json())
            .then((response) => {
                if(response.status == 500){
                    return Promise.reject({statusText: response.message});
                }
                order_predpr_sel.options.length = 1;
                for(const row of response){
                    order_predpr_sel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
                }
            })
            .catch((ex) => {
              console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
            })
    })
    .catch((ex) => {
        console.log("Error: " + ex.statusText);
        alert("Error: " + ex.statusText);
    })
}



function ins_upd_order(){
    let order_id = document.getElementById("order_id");
    let order_name = document.getElementById("order_name");
    let order_predpr_sel = document.getElementById("order_predpr_sel");
    if(order_id.value == ''){
        fetch("order",{
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                name: order_name.value,
                predpr_id: parseInt(order_predpr_sel.value)
            })
        })
        .then(response =>  response.json())
        .then((response) => {
            if(response.status == 500){
                return Promise.reject({statusText: response.message});
            }
            get_order();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    } else {
        fetch("order",{
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(order_id.value),
                name: order_name.value,
                predpr_id: parseInt(order_predpr_sel.value)
            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_order();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    }
}



function move_order_data_for_update(){
    console.log(this);
    document.getElementById("order_id").value = this.parentElement.parentElement.cells[0].innerHTML;
    document.getElementById("order_name").value = this.parentElement.parentElement.cells[1].innerHTML;
    order_predpr_sel.selectedIndex = Array.from(order_predpr_sel.options).reduce((notFound,e,index) => {
                                                if(e.text == this.parentElement.parentElement.cells[2].innerHTML) return index; 
                                                else return notFound;
                                                },0);
}


function del_order_data(){
    fetch("order",{
            method: "DELETE",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.parentElement.parentElement.cells[0].innerHTML
            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_order();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
}

