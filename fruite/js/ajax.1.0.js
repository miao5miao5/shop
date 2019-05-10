function ajaxGet(url,callback,data){
    data = data ? data : {};
    // data = data || {};
    var str = ""
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "_qft=" + d.getTime();
    // console.log(url)

    var ajax = new XMLHttpRequest();
    ajax.open("get",url);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            callback(ajax.responseText)
        }
    }
    ajax.send(null);
}



function jsonp(url,callback,data){
    var str = ""
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "_qft=" + d.getTime()

    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script)

    window[data[data.column]] = function(res){
        callback(res)
    }
}