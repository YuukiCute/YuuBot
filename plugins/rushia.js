function init() {
    return {
        "pluginName": "Rushia",
        "pluginMain": "rushia.js",
        "desc": {
            "vi_VN": "Rushia Ch",
            "en_US": "Rushia Ch",
        },
        "commandList": {
            "rushia": {
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
async function main(data, api) {
    const streamBuffers = require("stream-buffers");
    const path = require("path");
    const fetch = require("node-fetch");
    var fetchdata = await (await fetch("https://yuusadboiz.tk/rushia.json")).json();
    let link = fetchdata.BaseURL + Math.floor(Math.random()*fetchdata.Total) + ".jpg";
    let fetchimage = await fetch(link);
    let buffer = await fetchimage.buffer();
    let imagesx = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 1024
    });
    imagesx.path = path.join(__dirname, "cache", "hololive", data.messageID+".jpg");
    imagesx.put(buffer);
    imagesx.stop();

    api.sendMessage({ body: "Done!", attachment: [imagesx] }, data.threadID, data.messageID);
}


module.exports = {
    init,
    main
}