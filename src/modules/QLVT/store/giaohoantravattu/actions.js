import API from '../../api/GiaoHoanTraVatTuAPI'

export const actions = {    
    async getThamSoMacDinh({ commit, state },thamSo) {
        let response = await API.getThamSoMacDinh(this._vm.axios,thamSo)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },

    async getDSQuyen({ commit, state },nguoiDungId) {
        let response = await API.getDSQuyen(this._vm.axios,nguoiDungId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSDonViGiaoNhanChungTu({ commit, state },data) {
        let response = await API.getDSDonViGiaoNhanChungTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSKhoNhanChungTuHCM({ commit, state }) {
        let response = await API.getDSKhoNhanChungTuHCM(this._vm.axios)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSKhoGiaoChungTuHCM({ commit, state },nhanVienId) {
        let response = await API.getDSKhoGiaoChungTuHCM(this._vm.axios,nhanVienId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSDonViDuyet({ commit, state },) {
        let response = await API.getDSDonViDuyet(this._vm.axios,)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSKhoNhanChungTuHaNoi({ commit, state },nhanVienId) {
        let response = await API.getDSKhoNhanChungTuHaNoi(this._vm.axios,nhanVienId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSHoanTraChungTu({ commit, state },data) {
        let response = await API.getDSHoanTraChungTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSFileCongVan({ commit, state },vanBanId) {
        let response = await API.getDSFileCongVan(this._vm.axios,vanBanId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSChiTietVatTu({ commit, state },data) {
        let response = await API.getDSChiTietVatTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSChiTietVatTuDaChia({ commit, state },chungTuId) {
        let response = await API.getDSChiTietVatTuDaChia(this._vm.axios,chungTuId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSThietBiDaChia({ commit, state },chungTuId) {
        let response = await API.getDSThietBiDaChia(this._vm.axios,chungTuId)
        try {
            return response.data.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSThietBi({ commit, state },data) {
        let response = await API.getDSThietBi(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSXuatDaChia({ commit, state },data) {
        let response = await API.getDSXuatDaChia(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async giaoPhieuHoanTraChungTu({ commit, state },data) {
        let response = await API.giaoPhieuHoanTraChungTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async kiemTraHanChungTu({ commit, state },data) {
        let response = await API.kiemTraHanChungTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async kiemTraDaXoaPhieu({ commit, state },chungTuId) {
        let response = await API.kiemTraDaXoaPhieu(this._vm.axios,chungTuId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async xoaPhieuDaHoanThanh({ commit, state },data) {
        let response = await API.xoaPhieuDaHoanThanh(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async kiemTraHoanThienChungTu({ commit, state },chungTuId) {
        let response = await API.kiemTraHoanThienChungTu(this._vm.axios,chungTuId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async hoanThienChungTu({ commit, state },data) {
        let response = await API.hoanThienChungTu(this._vm.axios,data)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async uploadFile({ commit, state },data) {
        let response = await API.uploadFile(this._vm.axios,data)
        try {
            return response.data.data || {}
        } catch (error) {
            throw error
        }
        return response
    },
    async downloadFile({ commit, state },linkFile) {
        let response = await API.downloadFile(this._vm.axios,linkFile)
        try {
            return response.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getLinkFile({ commit, state },data) {
        let response = await API.getLinkFile(this._vm.axios,data)
        try {
            return response.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async checkFileExist({ commit, state },data) {
        let response = await API.checkFileExist(this._vm.axios,data)
        try {
            return response.data || []
        } catch (error) {
            throw error
        }
        return response
    },
    async getDSLoaiKho({ commit, state },) {
        let response = await API.getDSLoaiKho(this._vm.axios,)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },

    async getDSKhoTTVT({ commit, state },) {
        let response = await API.getDSKhoTTVT(this._vm.axios,)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },

    async getDSKhoDen({ commit, state },nhanVienId) {
        let response = await API.getDSKhoDen(this._vm.axios,nhanVienId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },

    async getDSMaKhoKT({ commit, state },loaiKhoId) {
        let response = await API.getDSMaKhoKT(this._vm.axios,loaiKhoId)
        try {
            return response.data.data || []
        } catch (error) {
            throw error
        }
        return response
    },
}