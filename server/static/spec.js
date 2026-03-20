
//----Spec
function get_spec(){
    document.getElementById("spec_div").innerHTML='';
    spec_id.value = '';
    spec_order_sel.value = '';
    spec_prod_sel.value = '';
    spec_kol.value = '';
    fetch("spec",{
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
        for(const text of ['#','Счет','Продукция','Количество','']){
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
            btn_upd.addEventListener("click",move_spec_data_for_update);
            btn_del = document.createElement('button');
            btn_del.innerHTML = 'Del';
            btn_del.addEventListener("click",del_spec_data);
            td.append(btn_upd);
            td.append(btn_del);
            tr.append(td);
            t.append(tr);
        }  
        document.getElementById("spec_div").append(t);
// init order select
            fetch("order",{
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response =>  response.json())
            .then((response) => {
                if(response.status == 500){
                    return Promise.reject({statusText: response.message});
                }
                spec_order_sel.options.length = 1;
                for(const row of response){
                    spec_order_sel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
                }
            })
            .catch((ex) => {
                console.log("Error: " + ex.statusText);
                alert("Error: " + ex.statusText);
            })
            fetch("prod",{
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response =>  response.json())
            .then((response) => {
                if(response.status == 500){
                    return Promise.reject({statusText: response.message});
                }
                spec_prod_sel.options.length = 1;
                for(const row of response){
                    spec_prod_sel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
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





function ins_upd_spec(){
    let spec_id = document.getElementById("spec_id");
    let spec_order_sel = document.getElementById("spec_order_sel");
    let spec_prod_sel = document.getElementById("spec_prod_sel");
    let spec_kol = document.getElementById("spec_kol");
    if(spec_id.value == ''){
        fetch("spec",{
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: spec_order_sel.value,
                prod_id: spec_prod_sel.value,
                kol: spec_kol.value
            })
        })
        .then(response =>  response.json())
        .then((response) => {
            if(response.status == 500){
                return Promise.reject({statusText: response.message});
            }
            get_spec();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    } else {
        fetch("spec",{
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(spec_id.value),
                order_id: spec_order_sel.value,
                prod_id: spec_prod_sel.value,
                kol: spec_kol.value
            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_spec();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    }
}



function move_spec_data_for_update(){
    document.getElementById("spec_id").value = this.parentElement.parentElement.cells[0].innerHTML;
    spec_order_sel.selectedIndex = Array.from(spec_order_sel.options).reduce((notFound,e,index) => {
                                                if(e.text == this.parentElement.parentElement.cells[1].innerHTML) return index; 
                                                else return notFound;
                                                },0);
    spec_prod_sel.selectedIndex = Array.from(spec_prod_sel.options).reduce((notFound,e,index) => {
                                                if(e.text == this.parentElement.parentElement.cells[2].innerHTML) return index; 
                                                else return notFound;
                                                },0);
    document.getElementById("spec_kol").value = this.parentElement.parentElement.cells[3].innerHTML;
}


function del_spec_data(){
    fetch("spec",{
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
            get_spec();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
}

