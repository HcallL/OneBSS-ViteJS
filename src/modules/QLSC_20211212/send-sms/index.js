
export default async function(context, soDt, noiDung) {
    
    let data = {
        content: noiDung,
        msisdn: soDt,
        mt_type: "reply"
    }

    try {
        // await context.$root.context.post("/web-cabman/traphieukhieunai/send-sms", data)
    } catch(err) {
        throw 'Lỗi khi gửi tin nhắn'
    }
}