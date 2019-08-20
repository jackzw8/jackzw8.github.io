/**
启动一个服务： node start.js 或用  start.bat
使用：http://127.0.0.1:12345
*/
var port = 12345;                                      			//监听端口
var webDir = "..";											//web目录

const http=require("http");                                     //引入http模块
const fs=require("fs");                                         //引入fs文件模块
const url=require("url");                                       //引入url模块
const path=require("path");                                     //引入path模块
const getTextType=require("./getTextType.js");                  //引入自定义模块

http.createServer((req,res)=>{                                  //创建服务器
    var urls=req.url;                                           //获取地址栏用户输入的信息
    urls=url.parse(urls).pathname;                              //通过输入信息截取相关路径信息
    var urlstype=getTextType.getextName(fs,path.extname(urls)); //获取文件的后缀名并调用自定义模块更改信息
    if(urls!="/favicon.ico"){                                   //去除无效的信息
        if(urls=="/"){                                         //判断是否只输入了域名，如果是则更改为index页面
            urls = webDir + "/index.html";
        } else {
			urls = webDir + urls;
		}
		console.log(urls);
        fs.readFile(urls,(err,data)=>{
            if(err){
                fs.readFile("./notfound.html",(err,nodata)=>{                                      //查找不到网页，打开404页面
                    res.writeHead(404,{"content-type":""+urlstype+";charset='utf-8'"});            //编写头部信息
                    res.write(nodata);                                                             //将404页面内容填入页面
                    res.end();                                                                     //关闭刷新
                })
                return;                                                                            //阻止程序继续往下运行
            }
            res.writeHead(200,{"content-type":""+urlstype+";charset='utf-8'"});                    //编写头部信息
            res.write(data);                                                                       //将获取的网页内容写入
            res.end();                                                                             //关闭
        })
    }
}).listen(port);

console.log("Server running at port: " + port + ".");
