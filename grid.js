// access all the elements
let row_add_cont=document.querySelector(".row-address-cont");
let col_add_cont=document.querySelector(".col-address-cont");
let cells_cont=document.querySelector(".cells-cont");
let add_cont=document.querySelector(".address-bar");
let bold_icon=document.querySelector(".bold");
let italic_icon=document.querySelector(".italic");
let underline_icon=document.querySelector(".underline");
let align_left_icon=document.querySelector(".align-left");
let align_center_icon=document.querySelector(".align-center");
let align_right_icon=document.querySelector(".align-right");
let text_color_picker=document.querySelector(".text-color-picker");
let cell_color_picker=document.querySelector(".cell-color-picker");
let font_type_dropdown=document.querySelector(".font-family-dropdown");
let font_size_dropdown=document.querySelector(".font-size-dropdown");

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

    let curr_row=[];

    for(let col=0;col<cols;col++){
        let elem=document.createElement("div");
        elem.setAttribute("class","grid-cell");
        elem.setAttribute("contenteditable","true");
        
        // for accessing the element via its row 
        elem.setAttribute("rid",`${row}`);
        elem.setAttribute("cid",`${col}`);
        
        row_div.appendChild(elem);

        curr_row.push(elem);
        display_address(elem,row,col);
    }

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

// by default the cell at (0,0) is clicked
let first_cell=document.querySelector(".grid-cell");
first_cell.click();