var socketio = require('socket.io');
var fs = require('fs');
var path = require('path');

module.exports = sio;

function sio(server) {

    var io = socketio.listen(server);
    io.sockets.on('connection',function(socket) {
        socket.on('emit_from_client',function(data){
            io.sockets.emit('emit_from_server','['+ socket.id +']：'+data);

        });
        socket.on('userID_from_client',function(){
            socket.emit('userID_from_server', socket.id);
        });
        socket.on('nextpage_from_client',function(){
           socket.broadcast.emit('nextpage_from_server');
       });
        socket.on('prepage_from_client',function(){
           socket.broadcast.emit('prepage_from_server');
       });

        socket.on('slideload_from_client',function(){
            var dir = 'public/img/';
            var extname = path.extname(fs.readdirSync(dir)[0]);
            fs.readdir(dir, function(err, files){
                if(err) throw err;
                socket.emit('slideload_from_server',files.length,extname);
            });
        });
        socket.on('save_from_client',function(jsonObj){
            fs.writeFile('public/data/pagedata.json', JSON.stringify(jsonObj));
        });
        socket.on('reload_from_client',function(jsonObj,clientsObj){
            fs.readFile('public/data/pagedata.json', 'utf8', function (err, data) {
                if(err){
                    fs.writeFile('public/data/pagedata.json',JSON.stringify(jsonObj));
                }else{
                    socket.emit('reload_from_server',JSON.parse(data),'');
                }
            });
            fs.readFile('public/data/clientList.txt','utf8',function(err,data){
                if(!err){
                    var clientList = data.split(',');
                    clientList.pop();
                    socket.emit('reload_from_server','',clientList);
                }
            });
        });

        socket.on('count_from_client',function(choiceNum,choiceId){
            fs.readFile('public/data/question.txt','utf8',function(err,data){
                if (!err){
                    var answerList = data.split(',');
                    answerList.pop();
                    io.sockets.emit('count_from_server',answerList,choiceNum);
                    io.sockets.emit('invalid_from_server',choiceId);
                    fs.unlink('public/data/question.txt',function(err){});
                    fs.unlink('public/data/clientList.txt',function(err){});
                }
            });
        });
        socket.on('countDialog_from_client',function(){
            io.sockets.emit('countDialog_from_server');
        });

        socket.on('comment_from_client',function(data1,data2){
            var commentData = data1 + ": " + data2 + "\n";
            fs.appendFile('public/data/comment.txt',commentData, function (err) {
                if (err) throw err;
            });
        });

        socket.on('question_from_client',function(data){
            var questionData = data + ",";
            fs.appendFile('public/data/question.txt',questionData, function (err) {
                if (err) throw err;
            });
        });
        socket.on('submited_from_client',function(id){
            var clientsData = id + ",";
            fs.appendFile('public/data/clientList.txt',clientsData,function(err){
                if(err) throw err;
            });
        });

        socket.on('rmClientList_from_client',function(){
            fs.unlink('public/data/clientList.txt',function(err){});
        });

        socket.on('remove_from_client',function(){
            fs.unlink('public/data/question.txt',function(err){});
            fs.unlink('public/data/clientList.txt',function(err){});
        });
        socket.on('register_from_client',function(id){
            fs.readFile('public/data/username.txt', 'utf8', function (err, data) {
                if(err){
                    socket.emit('register_from_server');
                }else{
                    if(id==data){
                        socket.emit('presenter_from_server');
                    }
                }
            });
        });
        socket.on('registered_from_client',function(id){
            fs.writeFile('public/data/username.txt',id);
        });
        socket.on('release_from_client',function(){
            fs.unlink('public/data/username.txt',function(err){
            });
        });
    });
}