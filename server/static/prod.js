//----Prod
function get_prod(){
    document.getElementById("prod_div").innerHTML='';
    prod_id.value = '';
    prod_name.value = '';
    prod_price.value = '';
    prod_categ_sel.value = '';
    fetch("prod",{
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
        for(const text of ['#','Наименование','Цена','Категория','']){
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
            btn_upd.addEventListener("click",move_prod_data_for_update);
            btn_del = document.createElement('button');
            btn_del.innerHTML = 'Del';
            btn_del.addEventListener("click",del_prod_data);
            td.append(btn_upd);
            td.append(btn_del);
            tr.append(td);
            t.append(tr);
        }  
        document.getElementById("prod_div").append(t);
// Category selector init
            fetch("categ",{
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response =>  response.json())
            .then((response) => {
                if(response.status == 500){
                    return Promise.reject({statusText: response.message});
                }
                prod_categ_sel.options.length = 1;
                for(const row of response){
                    prod_categ_sel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
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


function ins_upd_prod(){
    let prod_id = document.getElementById("prod_id");
    let prod_name = document.getElementById("prod_name");
    let prod_price = document.getElementById("prod_price");
    let prod_categ_sel = document.getElementById("prod_categ_sel");
    if(prod_id.value == ''){
        fetch("prod",{
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                name: prod_name.value,
                price: parseFloat(prod_price.value),
                categ_id: parseInt(prod_categ_sel.value)
            })
        })
        .then(response =>  response.json())
        .then((response) => {
            if(response.status == 500){
                return Promise.reject({statusText: response.message});
            }
            get_prod();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    } else {
        fetch("prod",{
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(prod_id.value),
                name: prod_name.value,
                price: parseFloat(prod_price.value),
                categ_id: parseInt(prod_categ_sel.value)
            })
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.status == 500){
            return Promise.reject({statusText: response.message});
            }
            get_prod();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
    }
}


function move_prod_data_for_update(){
    console.log(this);
    document.getElementById("prod_id").value = this.parentElement.parentElement.cells[0].innerHTML;
    document.getElementById("prod_name").value = this.parentElement.parentElement.cells[1].innerHTML;
    document.getElementById("prod_price").value = this.parentElement.parentElement.cells[2].innerHTML;
    prod_categ_sel.selectedIndex = Array.from(prod_categ_sel.options).reduce((notFound,e,index) => {
                                                if(e.text == this.parentElement.parentElement.cells[3].innerHTML) return index; 
                                                else return notFound;
                                                },0);
}


function del_prod_data(){
    fetch("prod",{
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
            get_prod();
            alert(response.statusText);
        })
        .catch((ex) => {
            console.log("Error: " + ex.statusText);
            alert("Error: " + ex.statusText);
        })
}