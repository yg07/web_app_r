// ------------------------SKLAD---------------------------
function get_sklad(){
    document.getElementById("sklad_div").innerHTML='';
    sklad_id.value = '';
    sklad_prod_sel.value = 0;
    sklad_kol.value = 0;
    fetch("sklad",{
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
        for(const text of ['#','Продукция','Количество','']){
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
            btn_upd.addEventListener("click",move_sklad_data_for_update);
            btn_del = document.createElement('button');
            btn_del.innerHTML = 'Del';
            btn_del.addEventListener("click",del_sklad_data);
            td.append(btn_upd);
            td.append(btn_del);
            tr.append(td);
            t.append(tr);
        }  
        document.getElementById("sklad_div").append(t);
//prod select init
        fetch("prod",{
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response =>  response.json())
            .then((response) => {
                if(response.status == 500){
                    return Promise.reject({statusText: response.message});
                }
                sklad_prod_sel.options.length = 1;
                for(const row of response){
                    sklad_prod_sel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
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

function move_sklad_data_for_update(){
    console.log(this);
    document.getElementById("sklad_id").value = this.parentElement.parentElement.cells[0].innerHTML;
    sklad_prod_sel.selectedIndex = Array.from(sklad_prod_sel.options).reduce((notFound,e,index) => {
                                                if(e.text == this.parentElement.parentElement.cells[1].innerHTML) return index; 
                                                else return notFound;
                                                },0);
    document.getElementById("sklad_kol").value = this.parentElement.parentElement.cells[2].innerHTML;

}


function del_sklad_data(){
    fetch("sklad",{
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
            get_sklad();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
}

function ins_upd_sklad(){
    let sklad_id = document.getElementById("sklad_id");
    let sklad_name = document.getElementById("sklad_prod_sel");
    let sklad_kol = document.getElementById("sklad_kol");
    if(sklad_id.value == ''){
        fetch("sklad",{
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                prod_id: sklad_prod_sel.value,
                kol: sklad_kol.value
            })
        })
        .then(response =>  response.json())
        .then((response) => {
            if(response.status == 500){
                return Promise.reject({statusText: response.message});
            }
            get_sklad();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    } else {
        fetch("sklad",{
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(sklad_id.value),
                prod_id: sklad_prod_sel.value,
                kol: sklad_kol.value
            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_sklad();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    }
}
