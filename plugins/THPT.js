function init(){
    return{
        "pluginName":"THPT",
        "pluginMain":"THPT.js",
        "desc": {
            "vi_VN": "Đếm ngược tới ngày thi THPTQG 2023",
            "en_US": "Countdown to this THQTQG 2023 exam",
        },
        "commandList": {
            "thpt": {
                "help": {
                    "vi_VN": "",
                    "en_US": "",
                },
                "tag": {
                    "vi_VN": "Đếm ngược tới ngày thi THPTQG 2023",
                    "en_US": "Countdown to this THQTQG 2023 exam",
                },
                "mainFunc": "main",
                "example": {
                    "vi_VN": "THPT",
                    "en_US": "THPT",
                }
            }
        },
        "langMap": {
            "smsg": {
                "desc": "none!",
                "vi_VN": "Thời gian còn lại tính đến ngày thi THPTQG 2023 là: {0} ngày {1} giờ {2} phút {3} giây",
                "en_US": "The remaining time as of the 2023 THPTQG exam date is: {0} days {1} hours {2} minutes {3} seconds",
                "args": {
                    "{0}": {
                        "vi_VN": "Ngày",
                        "en_US": "Days"
                    }
                }
            }
        },
        "author": "Yuuki",
        "version": "0.0.1"
    }
}
async function main(data, api) {
    const t = Date.parse("June 28, 2023 7:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );
    var quote = [
        "Tri thức là sức mạnh. F.Bacon",
        "Cần phải lựa chọn một cách nghiêm ngặt xem nên học gì và không nên học gì. [Lev Tolstoy]",
        "Đọc sách không bằng suy ngẫm, Học trường không hơn được trường đời. [Immanuel Kant]",
        "Nghị lực và bền bỉ có thể giúp bạn chinh phục mọi thứ",
        "Cuộc đời sẽ tươi đẹp hơn rất nhiều nếu ta có những tình bạn đúng nghĩa, luôn hết mình vì người khác.",
        "Một chữ cũng là thầy, nửa chữ cũng là thầy [Tục ngữ Việt Nam]",
        "Vấp ngã không phải là thất bại, chỉ là dừng lại cho đỡ mỏi chân thôi!",
        "Giáo dục là làm cho con người tìm thấy chính mình . [Socrates]",
        "Ước mơ không có ngày hết hạn, hãy hít thở sâu và cố gắng thêm lần nữa.",
        "Cuộc sống rất ngắn. Đừng lẵng phí nó bởi những nỗi buồn. Hãy là chính mình, luôn vui vẻ, tự do, và trở thành bất cứ gì bạn muốn.",
        "Học, học nữa, học mãi. [V.I. Lenin]",
        "Phía sau tôi không có lấy một người, sao tôi dám ngã xuống.",
        "Trường học có thể hô biến những người thắng và người bại, nhưng cuộc sống thì không. [Bill Gate]",
        "Muốn xây dựng đất nước, trước hết phải phát triển giáo dục. Muốn trị nước, phải trọng dụng người tài. [Chiếu Lập Học]",
        "Thời gian còn lại rất ngắn. Hãy cố gắng hết sức mình, để không phải hối tiếc.",
        "Con đường do bản thân lựa chọn, dù có quỳ cũng phải đi cho hết.",
        "Thái độ bây giờ của bạn sẽ quyết định mười năm sau bạn là một nhân vật tầm cỡ hay chỉ là một kẻ thất bại.",
        "Nếu như không có vận may, thì hãy thử dùng dũng khí.",
        "Để có thể thành công, bạn cần phải tin rằng mình có thể.",
        "Cách tốt nhất để làm mọi thứ là ngừng nói và làm ngay bây giờ.",
        "Bạn chỉ thất bại khi bạn ngừng cố gắng."
    ];
    var randomNumber = Math.floor(Math.random() * (quote.length));
    var text = quote[randomNumber];
    return api.sendMessage(`Thời gian còn lại tính đến ngày thi THPTQG 2023 là: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây. \n\nNgày thi chính thức: 28/06/2023.\n\nFact: ${text}`, data.threadID, data.messageID);
}
module.exports = {
    main,
    init
};