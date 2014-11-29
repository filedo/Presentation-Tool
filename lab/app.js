/*var app = require('http').createServer(),
io = require('socket.io').listen(app),
path = require('path'),
fs = require('fs');
app.listen(3000);*/

var http = require("http");
var io = require("socket.io");
var fs = require("fs");
var path = require('path');

var server = http.createServer(function(req, res) {
   /*  res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);*/
       // ファイルパスから拡張子を取得
    var extname = path.extname(req.url);
    switch(extname) {
        case '':
        // 現在のディレクトリにあるindex.htmlを読み込む
        fs.readFile(__dirname +'/index.html',function(err,data){
            // errが出れば500番のインターナルサーバエラーを返して終了
            // うまくいけば200番を返し、index.htmlの中身を表示させる
            if(err){
                res.writeHead(500);
                return res.end('Error');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
//            res.write(data);
            res.end(data);
        });
        break;
        case '.css':
        fs.readFile(__dirname +'/'+req.url, 'UTF-8',
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'text/css'});
            //            res.write(data);
                        res.end(data);
                    }
                    );
        break;
        case '.js':
        fs.readFile(__dirname +'/'+req.url, 'UTF-8',
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'text/javascript'});
            //            res.write(data);
                        res.end(data);
                    }
                    );
        break;
        case '.png':
        fs.readFile(__dirname +'/'+req.url,
                    function (err, data) {
                        if(err){
                            res.writeHead(500,{'Content-Type':'image/png'});
                            res.write(err.toString());
                        }else{
                            res.writeHead(200, {'Content-Type': 'image/png'});
                //            res.write(data);
                            res.end(data);
                        }
                    }
                    );
        break;
        case '.jpg':
        fs.readFile(__dirname +'/'+req.url,
                    function (err, data) {
                        if(err){
                            res.writeHead(500,{'Content-Type':'image/jpg'});
                            res.write(err.toString());
                        }else{
                            res.writeHead(200, {'Content-Type': 'image/jpg'});
                //            res.write(data);
                            res.end(data);
                        }
                    }
                    );
        break;
        default:
        break;
    }
}).listen(process.env.VMC_APP_PORT || 3000);

var io = io.listen(server);


io.sockets.on('connection',function(socket) {
	socket.on('emit_from_client',function(data){
		// console.log(data);
		// 接続しているソケットのみ
		// socket.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット以外全部
		// socket.broadcast.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット全部
		io.sockets.emit('emit_from_server','['+ socket.id +']：'+data);
        //io.sockets.emit('emit_from_server',data);
		// 以下のset、getは現在のsocket.ioのバージョンでは対応しておらず使えない
		// socket.set('client_name',data.name);
		// socket.get('client_name',function(err,name){
		//	io.sockets.emit('emit_from_server','['+ name +']：'+data.msg);
		//});

    });
    // 全クライアントのスライドを次に進める
    socket.on('nextpage_from_client',function(){
       io.sockets.emit('nextpage_from_server');
    });
    // 全クライアントのスライドを前に戻す
    socket.on('prepage_from_client',function(){
       io.sockets.emit('prepage_from_server');
    });

    // 全クライアントにスライドに使う画像データのファイル数と拡張子名を伝える
    socket.on('slideload_from_client',function(){
        var dir = __dirname + '/node_modules/img/';
        var extname = path.extname(fs.readdirSync(dir)[0]);
        fs.readdir(dir, function(err, files){
            if(err) throw err;
            io.sockets.emit('slideload_from_server',files.length,extname);
        });
    });
    // jsonObjの情報を現在のディレクトリにpagedata.jsonとして保存する
    socket.on('save_from_client',function(jsonObj){
        fs.writeFile('pagedata.json', JSON.stringify(jsonObj));
    });
    // ページの再読み込み時にpagedata.jsonが存在すればそのデータを読み込み、存在しなければ作成する
     socket.on('reload_from_client',function(jsonObj){
         fs.readFile('pagedata.json', 'utf8', function (err, data) {
            if(err){
                fs.writeFile('pagedata.json',JSON.stringify(jsonObj));
            }else{
                socket.emit('reload_from_server',JSON.parse(data));
            }
        });
    });
    // 初期化されたjsonObjを書き込み、pagedata.jsonの中身を初期化する
    socket.on('removeAll_from_client',function(jsonObj){
        fs.writeFile('pagedata.json',JSON.stringify(jsonObj));
    });
    // question.txtファイルを読み込み、カンマで区切ったリストに変換し、その情報からアンケートを集計する
    // answerList:['1','2','4','1'...]
    socket.on('count_from_client',function(choiceNum){
        fs.readFile('question.txt','utf8',function(err,data){
            if (err){
                // 何もしない
            }else{
                var answerList = data.split(',');
                // question.txtの最後の','を削除
                answerList.pop();
                io.sockets.emit('count_from_server',answerList,choiceNum);
            }
        });
    });
    // アンケートの集計ダイアログを表示する
    socket.on('countDialog_from_client',function(){
        io.sockets.emit('countDialog_from_server');
    });
    // アンケートの集計が終わるとquestion.txtを削除する
    socket.on('rmQuestionFile_from_client',function(){
        fs.unlink(__dirname+'/question.txt',function(err){
          //  if (err) throw err;
        });
    });
    // コメントフォームの送信内容をcomment.txtとして保存する
    socket.on('comment_from_client',function(data1,data2){
        var commentData = data1 + ": " + data2 + "\n";
        fs.appendFile('comment.txt',commentData, function (err) {
            if (err) throw err;
        });
    });
    // アンケートフォームの送信内容をquestion.txtとして保存する
    socket.on('question_from_client',function(data){
        var questionData = data + ",";
        fs.appendFile('question.txt',questionData, function (err) {
            if (err) throw err;
        });
    });
    // 発表者として登録されているかどうかを確認し、いなければ発表者として登録できる
    socket.on('register_from_client',function(){
        fs.readFile('username.txt', 'utf8', function (err, data) {
            // 登録者がいない
            if(err){
                socket.emit('register_from_server');
            }
        });
    });
    // 入力したユーザ名をusername.txtとして保存する
    socket.on('registered_from_client',function(id){
        fs.writeFile('username.txt',id);
    });
    // cookieとサーバの値を比較し、発表者かどうかを認証する
    socket.on('cookie_from_client',function(id){
        fs.readFile('username.txt', 'utf8', function (err, data) {
            // 発表者なら発表者特有の機能が使える
            if(id==data){
                socket.emit('presenter_from_server');
            }
        });
    });
    // username.txtを削除し、発表者としての権限を解除する
    socket.on('release_from_client',function(){
        fs.unlink(__dirname+'/username.txt',function(err){
            if (!err){
               socket.emit('release_from_server');
            }
        });
    });
});