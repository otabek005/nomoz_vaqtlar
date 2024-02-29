function $(select){
    return document.querySelector(select);
}

function $$(select) {
    return document.querySelectorAll(select);
}

function createElement(tegName, classname, contentlist){
    let element = document.createElement(tegName);
    if(classname){
        element.className = classname;
    }

    if(contentlist){
        element.innerHTML = contentlist;
    }
    return element;
}