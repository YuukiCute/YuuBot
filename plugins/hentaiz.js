function init(){
    return{
        "pluginName":"Image Hentaiz",
        "pluginMain":"hentaiz.js",
        "desc": {
            "vi_VN": "Cho bạn một tấm ảnh trên Gallery của Hentaiz",
            "en_US": "Cho bạn một tấm ảnh trên Gallery của Hentaiz",
        },
        "commandList": {
            "hentaiz": {
                "help": {
                    "vi_VN": "<ecchi> || <hentai> || <normal>",
                    "en_US": "<ecchi> || <hentai> || <normal>",
                },
                "tag": {
                    "vi_VN": "Cho bạn một tấm ảnh trên Gallery của Hentaiz",
                    "en_US": "Cho bạn một tấm ảnh trên Gallery của Hentaiz",
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
        "version": "0.0.1",
        "nodeDepends": {"zenrows": ""}
    }
}

async function main(data, api) {
    const axios = require('axios');
    const fs = require('fs-extra');
    const path = require('path');
    const { ZenRows } = require("zenrows");
    const keyword = Math.floor(Math.random() * 10000);
    const bruh = Math.floor(Math.random() * 22);
    const tagg = data.args[1];
    let tag;
    let abc;
    switch ((data.args[1]+"").toLowerCase()) {
        case "ecchi": {
            tag = "&siteTag=rating:questionable"; abc = "yandere?"; 
            break;
        }
        case "hentai": {
            tag = "&siteTag=rating:explicit"; abc = "yandere?";
            break;
        }
        case "normal": {
            tag = "&siteTag=rating:safe"; abc = "yandere?";
            break;
        }
        case "cosplay": {
            tag = ""; abc = "wnacg?";
            break;
        }
        default: {
            api.sendMessage("Wrong command. Use: "+global.config.facebook.prefix+"hentaiz <ecchi> || <hentai> || <normal> \n- Ex: "+global.config.facebook.prefix+"hentaiz ecchi", data.threadID, data.messageID);
        }
    }
    // if (tagg == "ecchi") {tag = "&siteTag=rating:questionable"; abc = "yandere?"; };
    // if (tagg == "hentai") {tag = "&siteTag=rating:explicit"; abc = "yandere?"};
    // if (tagg == "normal") {tag = "&siteTag=rating:safe"; abc = "yandere?"};
(async () => {
    const client = new ZenRows("d30968a9c310d938f4e0a06218b0b068d9a46dd6");
    const url = "https://meoden.net/api/gallery/"+abc+"page="+keyword+tag;

    try {
        const { data: cc } = await client.get(url, {});
        console.log(cc);
        const response = await axios({
            method: 'get',
            url: cc[bruh].originalUrl,
            responseType: 'stream'
        }); 
        let dir = path.join(__dirname, "temp", "cache", "hentaiz", data.messageID+".jpg")
        //ensureExists(path.join(__dirname, "temp", "cache", "hentaiz"))
        let stream = response.data.pipe(fs.createWriteStream(dir));
        stream.on("finish", () => { 
            let text1 = cc[bruh].id;
            let text2 = cc[bruh].name;
            api.sendMessage(({
                body: "Hoàn thành!\nId: "+text1+"\nName: "+text2,
                attachment: fs.createReadStream(dir)
            }), data.threadID, ()=>fs.unlinkSync(dir), data.messageID);
        });

    } catch (error) {
        console.error(error.message);
        if (error.response) {
            console.error(error.response.data);
        }
    }
})();

}


module.exports = {
    init,
    main
}