function init() {
    return {
        "pluginName": "test",
        "pluginMain": "test.js",
        "desc": {
            "vi_VN": "test",
            "en_US": "test",
        },
        "commandList": {
            "test": {
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


async function inte(data, api) {
    let time = new Date();
    let hrs = time.getHours();
    let min = time.getMinutes();
    let second = time.getSeconds();
    if (hrs == 10) if (min == 47) if (second == 1) { api.sendMessage("Bây giờ là 10h47, BỐ M TEST OK!", 6186800708105252) }
}



async function main(data, api) {
    let cc = setInterval(function () { inte(data, api) }, 1000)
    api.sendMessage("Đã khởi động autosend!", data.threadID, data.messageID)
    let listT = await api.getThreadList(10, null, []);
    console.log(listT)
}

module.exports = {
    init,
    inte,
    main
}

// if(second == 1) 