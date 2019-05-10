    function Menu(){
        this.banner = document.querySelector("#banner");
        this.goods = document.querySelector(".goods");
        this.dd = document.querySelectorAll(".goods dd");
        this.menu = document.querySelector(".menu");
        this.ul = document.querySelector(".menu ul");

        // this.span = document.querySelector(".th-menu span");
        // this.guoguo = document.querySelector(".guoguo");
        // this.a =document.querySelector(".guoguo a");
        
        console.log(this.banner)
        for(var i=0;i<this.dd.length;i++){
            this.dd[i].index = i;
        }

        this.arr = [{"进口水果":["奇异果","牛油果","提子","柑桔橙柚","火龙果","榴莲","火龙果","时令水果","原箱水果"]},
        {"国产水果":["梨","芒果","凤梨","莓","瓜","热带水果"]},
        {"精选肉类":["进口牛肉","国产牛肉","猪肉","羊肉","肉制品"]},
        {"禽类蛋品":["鸭","鹅/鸽/特色禽类","蛋"]},
        {"即烹美食":["中华美食"]},
        {"海鲜水产":["鳕鱼","虾仁","鱼","三文鱼","虾","蟹","贝","活鲜","海参","加工水产"]},
        {"乳品糕点":["面包","蛋糕","甜点"]},
        {"新鲜蔬菜":["根茎类","瓜果类","花菜","沙拉菜","豆制品","葱酸类","冷冻蔬菜"]},
        {"方便速食":["冷冻点心","火锅料","中式主食","半成品菜"]},
        {"粮油杂货":["杂粮","面制品","油","干货","果干/零食"]},
        {"饮料酒水":["水","葡萄酒","酒具"]}
        ];

        this.index = 0;

        // 绑定事件
        this.init();
        // this.getDate();  
    }

    // 绑定事件
    Menu.prototype.init = function(){
        var that = this;
        // 事件委托
        this.banner.addEventListener("mouseover",function(eve){
            // this.third.className = "third clear";
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "DD"){
                that.index= target.index;
                target.className = "dd active";
               
                target.style.color = "#128449";
                that.menu.style.display = "block";
                // 渲染三级菜单页面
                that.listDisplay();
            }
        })
        this.menu.addEventListener("mouseout",function(eve){
            // this.third.className = "third clear";
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "DD"){
                target.className = "dd";
                target.style.color = "#000";
            }
        })

        this.menu.onmouseout = function(){
            that.dd[that.index].className = "dd";
            that.dd[that.index].style.color = "#000";
            that.menu.style.display = "none";
        }

        this.menu.onmouseover = function(){
            that.dd[that.index].className = "dd active";
            that.dd[that.index].style.color = "#128449";
            that.menu.style.display = "block";
        }

        this.banner.onmouseout = function(){
            that.dd[that.index].className = "dd";
            that.dd[that.index].style.color = "#000";
            that.menu.style.display = "none";
        }
    }

    // 渲染三级菜单页面
    Menu.prototype.listDisplay = function(){
        var str = "";
        for(var i in this.arr[this.index]){
            str += `<li>
                        <div class="title">${i}</div>`
            for(var j=0;j<this.arr[this.index][i].length;j++){
                str += `<a href="list.html">${this.arr[this.index][i][j]}</a>`;
            }
            str += "</li>";    
        }
        this.menu.style.top = this.top;
        this.ul.innerHTML = str;
    }
    new Menu();

    class Index{
        constructor(){
            this.p1 = document.querySelector(".p1");
            this.p2 = document.querySelector(".p2");
            this.span = document.querySelector(".t-right span");
            this.exit = document.getElementById("exit")
            this.getData();
            this.addEvent();
            // console.log(this.p1)
        }
        getData(){
            this.data = localStorage.getItem("data");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if(this.data == null){
                this.data = [];
            }else{
                this.data = JSON.parse(this.data)
            }
            this.panduan()
            // console.log(this.data)
        }
        panduan(){
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].onoff == 1){
                    this.p1.style.display = "none";
                    this.p2.style.display = "block";
                    // console.log(this.data[i].tel)
                    this.span.innerHTML = this.data[i].tel;
                    this.successUser = this.data[i].tel;
                    // console.log(this.data[i].tel)
                    return;
                }
            }
            console.log(this.p1.style.display);
            this.p1.style.display = "block";
            this.p2.style.display = "none";
            this.span.innerHTML = "";
        }
        addEvent(){
            var that = this;
            // console.log(that.successUser)

            this.exit.onclick = function(){
                if(that.successUser){
                    for(var i=0;i<that.data.length;i++){
                        if(that.data[i].tel === that.successUser){
                            that.data[i].onoff = 0;
                            localStorage.setItem("data",JSON.stringify(that.data))
                            that.panduan();
                        }
                    }
                }
            }
        }
    }

    new Index();

    function Search(options){
        // 解析参数
        this.url = options.url;
        this.ul = options.ul;
        this.txt = options.txt;
        // 绑定事件
        this.addEvent()
    }
    Search.prototype.addEvent = function(){
        var that = this;
        this.txt.onkeyup = function(){
            // 获取内容
            that.value = this.value
            // 请求数据
            that.load()
        }
    }
    Search.prototype.load = function(){
        var that = this;
        jsonp(this.url,function(res){
            // console.log(res)
            // 保存数据
            that.res = res.s;
            // 渲染页面
            that.display()
        },{
            // jsonp的使用方式
            column:"cb",
            cb:"jagdsau",
            // 百度的搜索字段名
            wd:this.value
        })
    }
    Search.prototype.display = function(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li>${this.res[i]}</li>`
        }
        this.ul.innerHTML = str;
    }


    new Search({
        url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        ul:document.getElementsByClassName("search-res")[0],
        txt:document.getElementById("search").children[0]
    })
