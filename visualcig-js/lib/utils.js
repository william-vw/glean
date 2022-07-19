// courtesy 
// https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript

function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// courtesy
// https://thewebdev.info/2022/04/28/how-to-read-file-contents-on-the-client-side-in-javascript-in-various-browsers/

function readFile(file, onload, onerror) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => onload(e.target.result);
    reader.onerror = (evt) => onerror(e);
}

