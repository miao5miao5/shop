function Goods(){
    this.cont = document.querySelector("#main .count");
    this.url = "http://localhost/ztt/homework/fruite/ctrl/fruite.php";
    // console.log(this.cont)
    this.abs();
    // G1.绑定点击加入购物车事件
    this.addEvent();
}
Goods.prototype.abs = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        // console.log(res)
        that.res = JSON.parse(res);
        // console.log(that.res)
        that.display();
    })
}
Goods.prototype.display = function(){
    var str = "";
    for(var i=0;i<this.res.length;i++){
        str += `<li index="${this.res[i].fruiteId}">
                    <a href="#"><img src="${this.res[i].src}" alt=""></a>
                    <p>${this.res[i].name}</p>
                    <b>${this.res[i].price}</b>
                    <div class="flo">
                        <a  class="add">加入购物车</a>
                    </div>
                </li>`
                
    }
    this.cont.innerHTML = str;
}
Goods.prototype.addEvent = function(){
    var that = this;
    this.cont.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "add"){
            console.log(11);
            that.id = target.parentNode.parentNode.getAttribute("index");
            console.log(that.id);
            // G2.存储cookie
            that.setCookie()
        }
    })
}
Goods.prototype.setCookie = function(){
    // 存商品货号和对应的数量

    // 怎么存:JSON,数组里面放对象，对象内至少有两个键值对，货号和数量
    // [{id:123123,num:1},{id:123123,num:1},{id:123123,num:1}]
    this.goods = getCookie("goods");
    if(this.goods == ""){
        // 第一次存，直接存
        this.goods = [{
            id:this.id,
            num:1
        }];
    }else{
        var onoff = true;
        // 不是第一次存，先读取，字符，转对象
        this.goods = JSON.parse(this.goods)
        for(var i=0;i<this.goods.length;i++){
            // 老数据
            if(this.goods[i].id == this.id){
                // 直接修改数量
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        // 新数据
        if(onoff){
            // 直接添加对象
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}

new Goods();

