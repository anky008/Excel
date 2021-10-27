let row_add_cont=document.querySelector(".row-address-cont");
let col_add_cont=document.querySelector(".col-address-cont");
let cells_cont=document.querySelector(".cells-cont");
let add_cont=document.querySelector(".address-bar");

let rows=100;
let cols=26;

for(let row=0;row<rows;row++){
    let row_add_child=document.createElement("div");
    row_add_child.setAttribute("class","row-address-cell");
    row_add_child.innerText=(row+1);
    row_add_cont.appendChild(row_add_child);
}

for(let col=0;col<cols;col++){
    let col_add_child=document.createElement("div");
    col_add_child.setAttribute("class","col-address-cell");
    col_add_child.innerText=String.fromCharCode(65+col);
    col_add_cont.appendChild(col_add_child);
}

for(let row=0;row<rows;row++){
    let row_div=document.createElement("div");
    row_div.setAttribute("display","flex");
    row_div.setAttribute("class","grid-row");

    for(let col=0;col<cols;col++){
        let elem=document.createElement("div");
        elem.setAttribute("class","grid-cell");
        elem.setAttribute("contenteditable","true");
        row_div.appendChild(elem);

        display_address(elem,row,col);
    }

    console.log(row_div.childElementCount);
    cells_cont.appendChild(row_div);
}

function display_address(cell,row,col){
    cell.addEventListener("click",function(e){
        console.log(row,col,"clicked!");
        let row_id=row+1;
        let col_id=String.fromCharCode(65+col);
        add_cont.value=col_id+row_id;
    })
}