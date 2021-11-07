let download_icon = document.querySelector(".download");
let upload_icon = document.querySelector(".upload");

download_icon.addEventListener("click", function (e) {

    console.log("download button clicked!");

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sheets_props_arr));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sheets_data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});