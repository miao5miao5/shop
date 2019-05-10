// function Res(){
//     this.tel = document.querySelector(".tel");
//     this.veri = document.querySelector(".veri");
//     this.pass = document.querySelector(".pass");
//     this.repass = document.querySelector(".repass");
//     this.btn = document.querySelector(".btn");
//     this.init();
// }
// // Res.prototype.init = function(){
// //     var that = this;
// //     this.tel.onblur = function(){
// //         var reg1 = /^[\d{11}]$/;
// //         if(reg1.test(this.tel.value)){
// //             osp[0].innerHTML = "";
// //         }else{
// //             osp[0].innerHTML = "请输入正确的名称";
// //         }
// //     }
// // }

// // 每个部分独立验证的状态开关
// Res.prototype.init = function(){
//     var telOnoff = passOnoff = pass2Onoff = false;
//     var that = this;
    
//     this.tel.onblur = function(){
//         console.log(that.tel.value);
//         var reg = /^1[3-9]\d{9}$/;
//         if(reg.test(that.tel.value)){
//             console.log(that.tel);
//             // that.nextElementSibling.innerHTML = "成功";
//             telOnoff = true;
//         }else{
//             console.log(1)
//             // that.nextElementSibling.innerHTML = "失败";
//             console.log(that.nextElementSibling)
//             telOnoff = false;
//         }
//     }
//     this.pass.onblur = function(){
//     // 验证长度
//         var lengthReg = /^.{6,18}$/;
//         if(!lengthReg.test(that.value)){
//             that.nextElementSibling.innerHTML = "长度不符";
//             passOnoff = false;
//             return;
//         }
//     }
// }
// new Res();

class Register{
    constructor(){
        this.user = document.querySelector(".user");
        this.tel = document.querySelector(".tel");
        this.pass = document.querySelector(".pass");
        this.repass = document.querySelector(".repass");
        this.btn = document.querySelector(".btn");
        this.span = document.querySelector(".tip");

        this.init();
        this.getData();
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            that.setData()
        }
    }
    getData(){
        this.data = localStorage.getItem("data");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.data == null){
            this.data = [];
        }else{
            this.data = JSON.parse(this.data)
        }
    }
    setData(){
        if(this.data.length == 0){
            // 第一次注册
            this.data.push({
                tel:this.tel.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功";
            localStorage.setItem("data",JSON.stringify(this.data))
        }else{
            // 不是第一次注册，如果不是第一次注册，需要判断这次注册的和之前注册的是否重名，如果重名，不执行
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].tel === this.tel.value){
                    this.span.innerHTML = "已注册";
                    return;
                }
            }
            // 如果执行了，表示没重名，那就再增加一个
            this.data.push({
                tel:this.tel.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功,2秒后跳转";
            localStorage.setItem("data",JSON.stringify(this.data));
            setTimeout(()=>{
                location.href = "login.html";
            },2000)
            return;
            // location.href = "login.html";
        }
    }
}

new Register;