function getListDonViVNP(){
    let arr=getArrayDonViVNP()
    var data=[]
    for(let i=0;i<arr.length;i++){
        data.push({
            DonVi_ID:arr[i][0],
            Ma_DV:arr[i][2],
            Ten_DV:arr[i][1],
            Vung:arr[i][3],
            MaVungDT:arr[i][4]
        })
    }
    return data
    
}
function getArrayDonViVNP(){
    return [[1, "An Giang", "AGG", 3, "296"],
    [2, "Bà Rịa Vũng Tàu", "VTU", 3, "254"],
    [3, "Bắc Giang", "BGG", 1, "204"],
    [4, "Bắc Cạn", "BKN", 1, "209"],
    [5, "Bắc Ninh", "BNH", 1, "222"],
    [6, "Bình Định", "BDH", 2, "256"],
    [7, "Bến Tre", "BTE", 3, "275"],
    [8, "Bình Dương", "BDG", 3, "274"],
    [9, "Bình Phước", "BPC", 3, "271"],
    [10, "Bình Thuận", "BTN", 3, "252"],
    [11, "Bạc Liêu", "BLU", 3, "291"],
    [12, "Cao Bằng", "CBG", 1, "206"],
    [13, "Cần Thơ", "CTO", 3, "292"],
    [14, "Cà Mau", "CMU", 3, "290"],
    [15, "Tp.Đà Nẵng", "DNG", 2, "236"],
    [16, "Đắc Lắc", "DLC", 2, "262"],
    [17, "Đồng Nai", "DNI", 3, "251"],
    [18, "Đồng Tháp", "DTP", 3, "277"],
    [19, "Gia Lai", "GLI", 2, "269"],
    [20, "Hà Giang", "HGG", 1, "219"],
    [21, "Hà Nội", "HNI", 1, "24"],
    [22, "Điện Biên", "DBN", 1, "215"],
    [23, "Hà Tĩnh", "HTH", 1, "239"],
    [24, "Hưng Yên", "HYN", 1, "221"],
    [25, "Hà Nam", "HNM", 1, "226"],
    [26, "Hải Phòng", "HPG", 1, "225"],
    [27, "Hải Dương", "HDG", 1, "220"],
    [28, "Tp Hồ Chí Minh", "HCM", 3, "28"],
    [29, "Khánh Hoà", "KHA", 2, "258"],
    [30, "Kiên Giang", "KGG", 3, "297"],
    [31, "Kon Tum", "KTM", 2, "260"],
    [32, "Lai Châu", "LCU", 1, "213"],
    [33, "Lạng Sơn", "LSN", 1, "205"],
    [34, "Lào Cai", "LCI", 1, "214"],
    [35, "Lâm Đồng", "LDG", 3, "263"],
    [36, "Long An", "LAN", 3, "272"],
    [37, "Nam Định", "NDH", 1, "228"],
    [38, "Nghệ An", "NAN", 1, "238"],
    [39, "Ninh Bình", "NBH", 1, "229"],
    [40, "Ninh Thuận", "NTN", 3, "259"],
    [41, "Phú Yên", "PYN", 2, "257"],
    [42, "Quảng Bình", "QBH", 2, "232"],
    [43, "Quảng Nam", "QNM", 2, "235"],
    [44, "Quảng Ngãi", "QNI", 2, "255"],
    [45, "Quảng Ninh", "QNH", 1, "203"],
    [46, "Quảng Trị", "QTI", 2, "233"],
    [47, "Sóc Trăng", "STG", 3, "299"],
    [49, "Sơn La", "SLA", 1, "212"],
    [50, "Tây Ninh", "TNH", 3, "276"],
    [51, "Thái Bình", "TBH", 1, "227"],
    [52, "Thanh Hoá", "THA", 1, "237"],
    [53, "Huế", "HUE", 2, "234"],
    [54, "Tiền Giang", "TGG", 3, "273"],
    [55, "Trà Vinh", "TVH", 3, "294"],
    [56, "Tuyên Quang", "TQG", 1, "207"],
    [57, "Vĩnh Long", "VLG", 3, "270"],
    [58, "Vĩnh Phúc", "VPC", 1, "211"],
    [59, "Phú Thọ", "PTO", 1, "210"],
    [60, "Yên Bái", "YBI", 1, "216"],
    [61, "Thái Nguyên", "TNN", 1, "208"],
    [64, "Đắc Nông", "DNO", 2, "261"],
    [65, "Hòa Bình", "HBH", 1, "218"],
    [66, "Hậu Giang", "HGI", 3, "293"],
    [70, "Khách hàng doanh nghiệp", "KHDN", 0, null],
    [71, "Đài CSKH Tập trung", "HTKH", 0, null]]
}
export {
    getListDonViVNP
}