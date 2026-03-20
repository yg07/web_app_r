// ------------------------Categ---------------------------
function get_categ(){
    document.getElementById("categ_div").innerHTML='';
    categ_id.value = '';
    categ_name.value = '';
    fetch("categ",{
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
        for(const text of ['#','Наименование','']){
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
            btn_upd.addEventListener("click",move_categ_data_for_update);
            btn_del = document.createElement('button');
            btn_del.innerHTML = 'Del';
            btn_del.addEventListener("click",del_categ_data);
            td.append(btn_upd);
            td.append(btn_del);
            tr.append(td);
            t.append(tr);
        }  
        document.getElementById("categ_div").append(t);
    })
    .catch((ex) => {
        console.log("Error: " + ex.statusText);
        alert("Error: " + ex.statusText);
    })
}

function move_categ_data_for_update(){
    console.log(this);
    document.getElementById("categ_id").value = this.parentElement.parentElement.cells[0].innerHTML;
    document.getElementById("categ_name").value = this.parentElement.parentElement.cells[1].innerHTML;
}


function del_categ_data(){
    fetch("categ",{
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
            get_categ();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
}
function ins_upd_categ(){
    let categ_id = document.getElementById("categ_id");
    let categ_name = document.getElementById("categ_name");
    if(categ_id.value == ''){
        fetch("categ",{
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                name: categ_name.value,
            })
        })
        .then(response =>  response.json())
        .then((response) => {
            if(response.status == 500){
                return Promise.reject({statusText: response.message});
            }
            get_categ();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    } else {
        fetch("categ",{
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(categ_id.value),
                name: categ_name.value,

            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_categ();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    }
}
