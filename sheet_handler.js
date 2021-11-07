let sheet_add_icon = document.querySelector(".sheet-add-icon");
let sheets_cont = document.querySelector(".sheets-folder-cont");
let active_sheet_idx=-1;

let default_props_obj={
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

window.addEventListener("contextmenu", e => e.preventDefault());

sheet_add_icon.addEventListener("click", function (e) {

    let sheet_folder = document.createElement("div");
    let all_sheets = document.querySelectorAll(".sheet-folder");
    console.log("number of sheets:", all_sheets.length);
    sheet_folder.setAttribute("class", "sheet-folder");
    sheet_folder.setAttribute("id", all_sheets.length);
    sheet_folder.innerHTML = `<div class="sheet-content"> Sheet ${all_sheets.length + 1} </div>`;

    sheets_cont.appendChild(sheet_folder);

    // handles which sheet is active
    handle_active_sheet(sheet_folder);
    // add new array of each cell for every new sheet added 
    add_new_sheet();
    console.log("sheets array", sheets_props_arr);

    // for every new sheet created it should be active
    sheet_folder.click();

    // after right click on the sheet handle its removal
    handle_sheet_removal(sheet_folder);
});

function handle_sheet_removal(sheet_folder) {

    sheet_folder.addEventListener("click", function (e) {
        window.oncontextmenu = function (e) {
            e.preventDefault()
            
            let sheet_folders=document.querySelectorAll(".sheet-folder");
            let sheet_idx = parseInt(sheet_folder.getAttribute("id"));

            if (sheet_folders.length == 1) {
                alert("You need to have atleast one sheet!");
            }

            else {
                let response = confirm("Current sheet will be deleted permanently! Are you sure?");
                if (response == false) return;

                // db change
                sheets_props_arr.splice(sheet_idx, 1);

                // ui change fucking up big time!!
                sheets_cont.removeChild(sheet_folder);

                sheet_folders=document.querySelectorAll(".sheet-folder");

                // renaming remaining sheets and ids 
                for(let i=0;i<sheet_folders.length;i++){
                    sheet_folders[i].setAttribute("id",i);
                    sheet_folders[i].innerHTML=`Sheet ${i + 1}`;
                    sheet_folders[i].style.backgroundColor=normal_bg_color;
                }

                // make sheet 0 active then
                sheet_folders=document.querySelectorAll(".sheet-folder");
                sheet_folders[0].click();
                //props_arr=sheets_props_arr[0];
                //handle_cell_ui();
            }
        }
    });
}

function add_new_sheet() {

    let curr_sheet_db = [];

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
                "background_color": "#ecf0f1",
                "font": "monospace",
                "font_size": "14",
                "text": "",
                "formula": "",
                "children": [],
            }
            row_arr.push(props);
        }

        curr_sheet_db.push(row_arr);
    }

    sheets_props_arr.push(curr_sheet_db);
}


// instead of creating multiple ui, we keep a an array for each sheet and update the values 
function handle_active_sheet(sheet_folder) {

    sheet_folder.addEventListener("click", function (e) {
        let sheet_idx = parseInt(sheet_folder.getAttribute("id"));
        console.log("active sheet after click:", sheet_idx + 1);

        // depending on the active sheet assign the data corresponding to that 
        props_arr = sheets_props_arr[sheet_idx];

        // for current active sheet manage the data as per the one in db 
        handle_cell_ui();
        // for current active sheet darken its bg color
        handle_active_sheet_ui(sheet_folder);
    })
}


function handle_cell_ui() {

    let grid_cells = document.querySelectorAll(".grid-cell");
    // for every active cell highlight and apply the properties which are applied to it
    for (let i = 0; i < grid_cells.length; i++) {
        grid_cells[i].click();
    }

    grid_cells[0].click();
}

function handle_active_sheet_ui(sheet_folder) {

    let sheet_folders = document.querySelectorAll(".sheet-folder");

    for (let i = 0; i < sheet_folders.length; i++) {
        sheet_folders[i].style.backgroundColor = normal_bg_color;
    }

    sheet_folder.style.backgroundColor = highlighted_bg_color;
}