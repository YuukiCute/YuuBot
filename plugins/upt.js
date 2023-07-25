function init() {
    return {
        "pluginName": "test",
        "pluginMain": "upt.js",
        "desc": {
            "vi_VN": "test",
            "en_US": "test",
        },
        "commandList": {
            "upt": {
                "help": {
                    "vi_VN": "",
                    "en_US": "",
                },
                "tag": {
                    "vi_VN": "test",
                    "en_US": "test",
                },
                "mainFunc": "main",
                "example": {
                    "vi_VN": "test",
                    "en_US": "test",
                }
            }
        },
        "langMap": {
            "smsg": {
                "desc": "Test!",
                "vi_VN": "test",
                "en_US": "test",
            }
        },
        "author": "Yuuki",
        "version": "0.0.1"
    }
}

async function onLoad(data, api) {
    console.log("CC");
}
async function main(data, api) {
    const path = require("path");
    const fetch = require("node-fetch");
    const fs = require("fs-extra");
    const axios = require("axios");
    const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);

    let apii = "https://raw.githubusercontent.com/YuukiCute/api/main/upt.json";
    let link = await fetch(apii);


    link = await link.json();

    const response = await axios({
        method: 'get',
        url: link[0],
        responseType: 'stream'
    });
    let dir = path.join(__dirname, "temp", "cache", "upt", data.messageID + ".mp4")
    ensureExists(path.join(__dirname, "temp", "cache", "upt"));
    let stream = response.data.pipe(fs.createWriteStream(dir));
    stream.on("finish", () => {
        api.sendMessage(({
            body: "Y2TB Bot đã hoạt động được: " + hours + " giờ, " + minutes + " phút, " + seconds + " giây." + "\nChúc bạn sử dụng Bot vui vẻ!",
            attachment: fs.createReadStream(dir)
        }), data.threadID, () => fs.unlinkSync(dir), data.messageID);
    });

}

function ensureExists(path, mask) {
    var fs = require('fs');
    if (typeof mask != 'number') {
        mask = 0o777;
    }
    try {
        fs.mkdirSync(path, {
            mode: mask,
            recursive: true
        });
        return;
    } catch (ex) {
        return {
            err: ex
        };
    }
}

module.exports = {
    init,
    main
}