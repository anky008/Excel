// contains properties corresponding to each cell
let props_arr = [];

for (let row = 0; row < rows; row++) {
    let row_arr = [];
    for (let col = 0; col < cols; col++) {
        let props = {
            "bold": false,
            "italic": false,
            "underline": false,
            "align_left": false,
            "align_center": false,
            "align_right": false,
            "color": "#000000",
            "background_color" : "#ecf0f1",
            "font" : "monospace",
            "font_size" : "14",
            "text" : "",
            "formula" : "",
            "children" : [],
        }
        row_arr.push(props);
    }

    props_arr.push(row_arr);
}

let normal_bg_color="#ecf0f1";
let highlighted_bg_color="#bdc3c7";


let grid_cells=document.querySelectorAll(".grid-cell");


// for every active cell highlight the properties which are applied to it
for(let i=0;i<grid_cells.length;i++){
    grid_cells[i].addEventListener("click",function(e){
        let cell_addr=add_cont.value;                   
        let [row,col]=decodeCellAddr(cell_addr); 

        if(props_arr[row][col].bold==true){
            bold_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            bold_icon.style.backgroundColor=normal_bg_color;
        }

        if(props_arr[row][col].italic==true){
            italic_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            italic_icon.style.backgroundColor=normal_bg_color;
        }

        if(props_arr[row][col].underline==true){
            underline_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            underline_icon.style.backgroundColor=normal_bg_color;
        }

        if(props_arr[row][col].align_left==true){
            align_left_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            align_left_icon.style.backgroundColor=normal_bg_color;
        }

        if(props_arr[row][col].align_right==true){
            align_right_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            align_right_icon.style.backgroundColor=normal_bg_color;
        }

        if(props_arr[row][col].align_center==true){
            align_center_icon.style.backgroundColor=highlighted_bg_color;
        }

        else{
            align_center_icon.style.backgroundColor=normal_bg_color;
        }

        formula_bar.value=props_arr[row][col].formula;
        font_type_dropdown.value=props_arr[row][col].font;
        font_size_dropdown.value=props_arr[row][col].font_size;
    })
}

// given an address like A1 returns [row,col] corresponding to that cell
function decodeCellAddr(addr) {

    if(addr==undefined){
        addr=add_cont.value;       
    } 

    let add_bar_text = addr
    let col = add_bar_text.charCodeAt(0) - 65;//add_bar_text[0];
    let row = parseInt(add_bar_text.slice(1)) - 1;
    return [row, col];
}

// event listners for all icons
bold_icon.addEventListener("click", function (e) {

    let [row, col] = decodeCellAddr();

    props_arr[row][col].bold = !props_arr[row][col].bold;

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].bold == true) {
        curr_cell.style.fontWeight = "bold";
        bold_icon.style.backgroundColor=highlighted_bg_color;
    }

    else {
        curr_cell.style.fontWeight = "normal";
        bold_icon.style.backgroundColor=normal_bg_color;
    }
})

italic_icon.addEventListener("click", function (e) {

    let [row, col] = decodeCellAddr();
    props_arr[row][col].italic = !props_arr[row][col].italic;

    console.log("italic icon clicked");
    console.log("active:", row, col);

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].italic == true) {
        curr_cell.style.fontStyle = "italic";
        italic_icon.style.backgroundColor=highlighted_bg_color;
    }

    else {
        curr_cell.style.fontStyle = "normal";
        italic_icon.style.backgroundColor=normal_bg_color;
    }
})

underline_icon.addEventListener("click", function (e) {

    let [row, col] = decodeCellAddr();
    props_arr[row][col].underline = !props_arr[row][col].underline;

    console.log("underline icon clicked");
    console.log("active:", row, col);

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].underline == true) {
        curr_cell.style.textDecoration = "underline";
        underline_icon.style.backgroundColor=highlighted_bg_color;
    }

    else {
        curr_cell.style.textDecoration = "none";
        underline_icon.style.backgroundColor=normal_bg_color;
    }
})

align_left_icon.addEventListener("click", function (e) {

    let [row, col] = decodeCellAddr();
    props_arr[row][col].align_left = !props_arr[row][col].align_left;

    console.log("align left icon clicked");
    console.log("active:", row, col);

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].align_left == true) {
        curr_cell.style.textAlign = "left";

        align_left_icon.style.backgroundColor=highlighted_bg_color;
        align_right_icon.style.backgroundColor=normal_bg_color;
        align_center_icon.style.backgroundColor=normal_bg_color;

        console.log("left:",align_left_icon);
        console.log("center:",align_center_icon);
        console.log("right",align_right_icon);
    }

    else {
        curr_cell.style.textDecoration = "none";

        align_left_icon.style.backgroundColor=normal_bg_color;
    }
})

align_center_icon.addEventListener("click", function (e) {

    let [row, col] = decodeCellAddr();
    props_arr[row][col].align_center = !props_arr[row][col].align_center;

    console.log("align center icon clicked");
    console.log("active:", row, col);

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].align_center == true) {
        curr_cell.style.textAlign = "center";

        align_center_icon.style.backgroundColor=highlighted_bg_color;
        console.log(align_center_icon);
        align_left_icon.style.backgroundColor=normal_bg_color;
        align_right_icon.style.backgroundColor=normal_bg_color;
    }

    else {
        curr_cell.style.textDecoration = "none";

        align_center_icon.style.backgroundColor=normal_bg_color;
    }
})


align_right_icon.addEventListener("click", function (e) {


    let [row,col]=decodeCellAddr();
    props_arr[row][col].align_right = !props_arr[row][col].align_right;

    console.log("underline icon clicked");
    console.log("active:", row, col);

    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

    if (props_arr[row][col].align_right == true) {
        curr_cell.style.textAlign = "right";

        align_right_icon.style.backgroundColor=highlighted_bg_color;
        align_center_icon.style.backgroundColor=normal_bg_color;
        align_left_icon.style.backgroundColor=normal_bg_color;
    }

    else {
        curr_cell.style.textDecoration = "none";

        align_right_icon.style.backgroundColor=normal_bg_color;
    }
})

text_color_picker.addEventListener("change",function(e){
    
    let [row,col]=decodeCellAddr();
    let picked_color=text_color_picker.value;
    props_arr[row][col].color=picked_color;
    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
    curr_cell.style.color=picked_color;
})

cell_color_picker.addEventListener("change",function(e){
    
    let [row,col]=decodeCellAddr();
    let picked_color=cell_color_picker.value;
    props_arr[row][col].background_color=picked_color;
    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
    curr_cell.style.backgroundColor=picked_color;
})

font_type_dropdown.addEventListener("change",function(e){
    
    let [row,col]=decodeCellAddr();
    let picked_font=font_type_dropdown.value;
    props_arr[row][col].font=picked_font;
    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
    curr_cell.style.fontFamily=picked_font;
})

font_size_dropdown.addEventListener("change",function(e){

    let [row,col]=decodeCellAddr();
    let picked_font_size=font_size_dropdown.value;
    props_arr[row][col].font_size=picked_font_size;
    let curr_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
    curr_cell.style.fontSize=picked_font_size + "px";
})
