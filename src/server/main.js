var ros = new ROSLIB.Ros({ url : 'ws://' + location.hostname + ':9000' });

ros.on('connection', function() {console.log('websocket: connected');});
ros.on('error', function(error) {console.log('websocket error: ', error); });
ros.on('close', function() {console.log('websocket: closed');});

var sub = new ROSLIB.Topic({
    ros : ros,
    name : '/hint',
    messageType : 'std_msgs/String'
});

var pub = new ROSLIB.Topic({
    ros : ros,
    name : '/guess',
    messageType : 'std_msgs/Int32'
});

var reset_pub = new ROSLIB.Topic({
    ros : ros,
    name : '/reset',
    massageType : 'std_msgs/Int32'
});

send = document.getElementById("send");
reset = document.getElementById("reset");
guess = document.getElementById("guess");
hint = document.getElementById("hint");

sub.subscribe(function(message) {
    let val = message.data;

    console.log(message.data);

    if (val === "Correct") {
        hint.textContent = "正解！"
    }

    if (val === "Too Small") {
        hint.textContent = "小さすぎ"
    }

    if (val === "Too Big") {
        hint.textContent =　"大きすぎ";
    }
});

send.onclick = function() {
    if (guess.value === "")
        return;

    let val = parseInt(guess.value);

    if (val < 0 || 100 < val)
        return;

    pub.publish(new ROSLIB.Message({
        data: val
    }));
};

reset.onclick = function() {
    console.log("reset");

    guess.value = "";
    hint.textContent = "";

    reset_pub.publish(new ROSLIB.Message({
        data: 0
    }));
}
