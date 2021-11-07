for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let cell = document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`)

        // when this cell is blured i.e out of focus
        // change its value
        cell.addEventListener("blur", function (e) {

            // row,col of current active cell
            let [arow, acol] = decodeCellAddr()
            let last_active_cell = document.querySelector(`.grid-cell[rid="${arow}"][cid="${acol}"]`)
            let data = last_active_cell.innerText;

            console.log("new data:", data);
            console.log("earlier stored:", props_arr[row][col].text);

            // if user has changed value in this cell i.e value saved earlier is not same as one reading now
            if (data != props_arr[row][col].text) {

                // 1) remove formula for this cell, as no use of it
                props_arr[arow][acol].formula = "";
                // 2) it is no longer dependent on its parents
                remove_children(add_cont.value);
                // 3) for the nodes it acts as parent update their values as well
                update_child_values(add_cont.value);
            }


            // update the cells db
            props_arr[arow][acol].text = data;
            console.log(props_arr[arow][acol]);
        })
    }
}

let formula_bar = document.querySelector(".formula-bar");

// problem left : what if there is a cyclic dependency
// A1 ->(depends on) B1 and B1 ->(depends on) A1
// then we need to alert to fix the formula
// i.e do cycle detection in acyclic graph

function has_cycle_component(addr, visited, in_stack) {

    let [row, col] = decodeCellAddr();
    in_stack[addr] = true;
    visited[addr] = true;

    let children = props_arr[row][col].children;
    let found_cycle = false;

    for (let i = 0; i < children.length; i++) {
        if (visited[children[i]] == true && in_stack[children[i]] == true) {
            found_cycle = true;
            break;
        }

        else if (visited[children[i]] == false) {
            let inside_found_cycle = has_cycle_component(children[i], visited, in_stack);
            if (inside_found_cycle == true) {
                found_cycle=true;
                break;
            }
        }
    }

    in_stack[addr] = false;
    return found_cycle;
}

function has_cycle() {


    let visited = {};
    let in_stack = {};

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let addr = String.fromCharCode(65 + col) + (row + 1);
            visited[addr] = false;
            in_stack[addr] = false;
        }
    }

    let found_cycle = false;
    let cycle_start_addr="";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let addr = String.fromCharCode(65 + col) + (row + 1);
            if (visited[addr] == false) {
                let cycle = has_cycle_component(addr, visited, in_stack);
                if (cycle) {
                    // this component has cycle
                    cycle_start_addr=addr;

                    found_cycle = true;
                    break;
                }
            }
        }

        if (found_cycle) {
            break;
        }
    }

    return [found_cycle,cycle_start_addr];
}


formula_bar.addEventListener("keydown", function (e) {

    let formula = formula_bar.value;

    if (e.key === "Enter" && formula) {

        // console.log("Enter pressed!!", "current formula:", formula);

        let val = evaluate(formula);
        let [arow, acol] = decodeCellAddr();
        let active_cell = document.querySelector(`.grid-cell[rid="${arow}"][cid="${acol}"]`);


        // if formula corresponding to current cell is changed then we need to remove old children of current cell
        remove_children(add_cont.value);

        let [found_cycle,cycle_start_addr] = has_cycle();
        console.log("cycle found ? :", found_cycle);

        if(found_cycle){
            props_arr[arow][acol].formula = formula;
            clear_cell(cycle_start_addr);
            alert("cycle found!! please change values or formula");
        }

        else{
            active_cell.innerText = val; // ui change
            props_arr[arow][acol].text = val; // properties change*/
            props_arr[arow][acol].formula = formula;

            // whichever cells current cell's value depends on behave as its parent as change in their value changes current
            // cell's value as well
            add_children(add_cont.value);

            // if formula of current cell is changed  
            update_child_values(add_cont.value);
        }
    }
})

function clear_cell(addr){
    
    let [row,col]=decodeCellAddr(addr);

    let children=props_arr[row][col].children;

    for(let i=0;i<children.length;i++){
        clear_cell(children[i]);
    }

    let cell=document.querySelector(`.grid-cell[rid="${row}"][cid="${col}"]`);
    cell.innerText="#REF";

    props_arr[row][col].text="#REF";
}

function add_children(child_addr) {

    let formula = formula_bar.value;

    let elems = formula.split(" ");
    for (let i = 0; i < elems.length; i++) {
        let ascii = elems[i].charCodeAt(0);

        // value to be picked from this address
        if (ascii >= 65 && ascii <= 90) {
            // parent row, parent col
            let [prow, pcol] = decodeCellAddr(elems[i]);
            if (props_arr[prow][pcol].children.indexOf(child_addr) == -1) {
                props_arr[prow][pcol].children.push(child_addr);
            }
        }
    }

    console.log(props_arr);
}

function update_child_values(parent_addr) {

    let [prow, pcol] = decodeCellAddr(parent_addr);
    let child_arr = props_arr[prow][pcol].children;

    for (let i = 0; i < child_arr.length; i++) {

        let [crow, ccol] = decodeCellAddr(child_arr[i]);
        let cformula = props_arr[crow][ccol].formula;
        let cres = evaluate(cformula);

        let ccell = document.querySelector(`.grid-cell[rid="${crow}"][cid="${ccol}"]`);
        ccell.innerText = cres;
        props_arr[crow][ccol].text = cres;

        console.log(props_arr[crow][ccol]);

        update_child_values(child_arr[i]);
    }
}

function remove_children(child_addr) {

    let [arow, acol] = decodeCellAddr();
    let active_cell = document.querySelector(`.grid-cell[rid="${arow}"][cid="${acol}"]`);

    let old_formula = props_arr[arow][acol].formula;
    // formula present right now is the new formula
    let new_formula = formula_bar.value;

    // formula for current cell has changed so remove current cell from childlist of its parents
    if (old_formula != new_formula) {
        let split_formula = old_formula.split(" ");

        for (let i = 0; i < split_formula.length; i++) {
            let ascii = split_formula[i].charCodeAt(0);

            if (ascii >= 65 && ascii <= 90) {
                // find row,col of current cell
                let [prow, pcol] = decodeCellAddr(split_formula[i]);
                // find where the address is present in child array
                console.log("parent add:", prow, pcol);

                if (props_arr[prow][pcol].children.length > 0) {

                    let child_idx = props_arr[prow][pcol].children.indexOf(child_addr);

                    //remove it from the parent's child array
                    if (child_idx != -1) {
                        props_arr[prow][pcol].children.splice(child_idx, 1);
                    }
                }
            }
        }
    }
}

function evaluate(formula) {

    let need_to_eval=true;
    
    let elems = formula.split(" ");
    for (let i = 0; i < elems.length; i++) {
        let ascii = elems[i].charCodeAt(0);

        // value to be picked from this address
        if (ascii >= 65 && ascii <= 90) {
            let [arow, acol] = decodeCellAddr(elems[i]);
            let active_cell = document.querySelector(`.grid-cell[rid="${arow}"][cid="${acol}"]`);
            let val = active_cell.innerText;
            
            // if some dependency cell has a #REF means part of a cycle then val of current cell can't be evaluated
            if(val=="#REF"){
                need_to_eval=false;
                break;
            }

            elems[i] = val;
        }
    }

    if(need_to_eval==false) return "#REF";
    formula = elems.join(" ");
    return eval(formula);
}