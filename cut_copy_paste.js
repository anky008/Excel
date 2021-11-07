let cut_icon = document.querySelector(".cut");
let copy_icon = document.querySelector(".copy");
let paste_icon = document.querySelector(".paste");


// to know the state of control key
let ctrl_key = false;

// for control key pressed returns true
document.addEventListener("keydown", function (e) {
    ctrl_key = e.ctrlKey;
    console.log("from keydown:", ctrl_key);
});

document.addEventListener("keyup", function (e) {
    ctrl_key = e.ctrlKey;
    console.log("from keyup:", ctrl_key);
});


cut_icon.addEventListener("click", function (e) {

    if (selected_cells.length < 2) return;

    data = [];

    for (let row = selected_cells[0][0]; row <= selected_cells[1][0]; row++) {
        let data_row = [];
        for (let col = selected_cells[0][1]; col <= selected_cells[1][1]; col++) {

            data_row.push(props_arr[row][col]);
            // db update
            props_arr[row][col] = {
                "bold": false,
                "italic": false,
                "underline": false,
                "align_left": false,
                "align_center": false,
                "align_right": false,
                "color": "#000000",
                "background_color": "#ecf0f1",
                "font": "monospace",
                "font_size": "14",
                "text": "",
                "formula": "",
                "children": [],
            };

            let to_update_cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
            to_update_cell.click();
        }

        data.push(data_row);
    }

    remove_added_border();
});

let data = [];

copy_icon.addEventListener("click", function (e) {

    if (selected_cells.length < 2) return;

    // every time copy is clicked, clear old data
    data = [];

    for (let row = selected_cells[0][0]; row <= selected_cells[1][0]; row++) {
        let data_row = [];
        for (let col = selected_cells[0][1]; col <= selected_cells[1][1]; col++) {
            data_row.push(props_arr[row][col]);
        }
        data.push(data_row);
    }

    console.log("data from copy:", data);
    remove_added_border();
});


paste_icon.addEventListener("click", function (e) {

    if (data.length < 2) return;

    let top_left_addr = add_cont.value;
    let [top_row, top_col] = decodeCellAddr(top_left_addr);

    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[0].length; c++) {

            let cell_row = r + top_row;
            let cell_col = c + top_col;

            if (cell_row >= rows || cell_col >= cols) {
                continue;
            }

            let to_put_cell = document.querySelector(`.grid-cell[rid="${cell_row}"][cid="${cell_col}"]`);

            // db change
            props_arr[cell_row][cell_col] = data[r][c];
            // in cell_properties click listner attached sets the props of each cell from the db so clicking the cell to activate that
            to_put_cell.click();
        }
    }
});

function remove_added_border() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
            cell.style.border = "1px solid #dfe4ea";
        }
    }
}

// top left and bottom right corrdinates of cells from which to do cut copy paste
let selected_cells = [];

// add event listner to each cell 
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);

        cell.addEventListener("click", function (e) {
            if (ctrl_key == false) return;

            if (selected_cells.length >= 2) {
                remove_added_border();
                selected_cells = [];
            }

            let row = cell.getAttribute("rid");
            let col = cell.getAttribute("cid");

            selected_cells.push([row, col]);
            cell.style.border = "1px solid #218c74";
        })
    }
}
