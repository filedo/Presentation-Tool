var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
    path = require('path'),
	fs = require('fs');
app.listen(1337);
function handler(req, res) {
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
            res.write(data);
            res.end();
        });
        break;
    case '.css':
        fs.readFile(__dirname +'/node_modules'+req.url, 'UTF-8',
            function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                res.end();
            }
        );
        break;
    case '.js':
        fs.readFile(__dirname +'/node_modules'+req.url, 'UTF-8',
            function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.write(data);
                res.end();
            }
        );
        break;
    case '.png':
        fs.readFile(__dirname +'/node_modules'+req.url,
            function (err, data) {
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                res.end();
            }
        );
        break;
    default:
        break;
    }
}

io.sockets.on('connection',function(socket) {
	socket.on('emit_from_client',function(data){
		// console.log(data);
		// 接続しているソケットのみ
		// socket.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット以外全部
		// socket.broadcast.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット全部
		io.sockets.emit('emit_from_server','['+ socket.id +']：'+data);
		// 以下のset、getは現在のsocket.ioのバージョンでは対応しておらず使えない
		// socket.set('client_name',data.name);
		// socket.get('client_name',function(err,name){
		//	io.sockets.emit('emit_from_server','['+ name +']：'+data.msg);
		//});

	});
    // jsonObjの情報を現在のディレクトリにtest.txtとして保存する
    socket.on('save_from_client',function(data){
        var file = 'test.txt';
        fs.writeFile(file, JSON.stringify(data));
        fs.readFile(file, 'utf8', function (err, data) {
            var a = JSON.parse(data);
            console.log(JSON.parse(data));
            // アクセスできる
            //console.log(a["comments"][1]["id"]);
        });
    });
});