<template>
  <frmDangKyThietBiIDC v-if="formPopup == 'frmDangKyThietBiIDC'" :dulieu="dulieu" @form-close="closeForm"/>
  <frmHDTB_SUB_V3 v-else-if="formPopup == 'frmHDTB_SUB_V3'" :dulieu="dulieu" @form-close="closeForm"/>
  <frmDangKySoThanhVien v-else-if="formPopup == 'frmDangKySoThanhVien'" :hdtb_id="dulieu.hdtb_id" :thuebao_id="dulieu.thuebao_id" :kieuld_id="dulieu.vkieuld_id_cbo" @form-close="closeForm"/>
  <!-- <frmNhapDSThanhVien v-else-if="formPopup == 'frmNhapDSThanhVien'" :hdtb_id="dulieu.hdtb_id" @form-close="closeForm" ref="frmNhapDSThanhVien"/> -->
  <frmDanhSachSoThanhVien v-else-if="formPopup == 'frmDanhSachSoThanhVien'" :hdtb_id="dulieu.hdtb_id" :thuebao_id="dulieu.thuebao_id" :tinh_id="dulieu.tinh_id" @form-close="closeForm"/>
  <frmHDTB_SUB_V4 v-else-if="formPopup == 'frmHDTB_SUB_V4'" :dulieu="dulieu" @form-close="closeForm"/>
  <frmHDTB_SUB_V2 v-else-if="formPopup == 'frmHDTB_SUB_V2'" :dulieu="dulieu" @form-close="closeForm"/>
</template>
<style>
input.disabled,
select.disabled,
.disabled input,
.disabled select,
.disabled /deep/ .select2-selection {
  background-color: #eee;
  color: lightgray;
}
.e-grid .e-gridheader .e-sortfilter .e-headercelldiv,
.e-grid .e-gridheader .e-stackedheadercelldiv,
.e-grid .e-gridheader .e-headercell .e-headercelldiv.e-headerchkcelldiv {
  padding: 0 5px 0 5px !important;
}
</style>
<script>
import breadcrumb from "@/components/breadcrumb";
import VueFlatPickr from "vue-flatpickr-component";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi.js";
import "vue2-datepicker/index.css";
import frmDangKyThietBiIDC from "./frmDangKyThietBiIDC.vue";
import frmHDTB_SUB_V2 from "./frmHDTB_SUB_V2.vue";
import frmHDTB_SUB_V3 from "./frmHDTB_SUB_V3.vue";
import frmHDTB_SUB_V4 from "./frmHDTB_SUB_V4.vue";
import frmDangKySoThanhVien from "@/modules/contract/setup/VoiceBrandname";
// import frmNhapDSThanhVien from '@/modules/contract/setup/ChangeContractOwner/popup/frmNhapDSThanhVien.vue';
import frmDanhSachSoThanhVien from '@/modules/contract/setup/VoiceBrandname/part/DanhSachThanhVien.vue';

import {
  required,
  minLength,
  integer,
  maxValue,
} from "@vuelidate/validators";
import {
  LoaiHopDong,
  TrangThaiHD,
  DichVuVienThong,
  listDichVuCNTT,
  TRANGBI,
  KieuLapDat,
  KHOANMUC_TT,
  LoaiHinhTB,
  Loai_KM,
  NHOM_LNV,
  LOAI_DV,
} from "@/modules/admin/category/MultiServicePackage/enum.js";
import { Checkbox } from "element-ui";
export default {
  name: "popupThongTinTBBS",
  components: {
    required,
    minLength,
    integer,
    maxValue,
    DatePicker,
    VueFlatPickr,
    breadcrumb,
    frmDangKyThietBiIDC,
    frmHDTB_SUB_V2,
    frmHDTB_SUB_V3,
    frmHDTB_SUB_V4,
    frmDangKySoThanhVien,
    // frmNhapDSThanhVien,
    frmDanhSachSoThanhVien
  },
  props: ["dulieu"],
  data() {
    return {
      formPopup: ""
    };
  },
  watch: {
    "dulieu.vloaitb_id_cbo" (val) {
      if (val == LoaiHinhTB.VNPT_COLOCATION) {
        this.formPopup = "frmDangKyThietBiIDC";
      } else if (val == LoaiHinhTB.IVAN) {
        this.formPopup = "frmHDTB_SUB_V3";
      } else if (val == LoaiHinhTB.Voice_Brandname) {
        if (this.dulieu.vkieuld_id_cbo == 14057 || this.dulieu.vkieuld_id_cbo == 14058) {
          this.formPopup = "frmDanhSachSoThanhVien";
        } else if (this.dulieu.vkieuld_id_cbo == 14060 || this.dulieu.vkieuld_id_cbo == 14059 || this.dulieu.vkieuld_id_cbo == 14071) {
          this.formPopup = "frmDangKySoThanhVien";
        } else if (this.dulieu.vkieuld_id_cbo ==  19544) {
          // this.formPopup = "frmNhapDSThanhVien";
          // this.$refs.frmNhapDSThanhVien.hdtb_id = this.dulieu.hdtb_id;
          // this.$refs.frmNhapDSThanhVien.ShowDialog();
        } else {
          this.formPopup = "frmHDTB_SUB_V4";
        }
      } else {
        this.formPopup = "frmHDTB_SUB_V2";
      }
    }
  },
  computed: {},
  mounted() {
    if (this.dulieu.vloaitb_id_cbo == LoaiHinhTB.VNPT_COLOCATION) {
      this.formPopup = "frmDangKyThietBiIDC";
    } else if (this.dulieu.vloaitb_id_cbo == LoaiHinhTB.IVAN) {
      this.formPopup = "frmHDTB_SUB_V3";
    } else if (this.dulieu.vloaitb_id_cbo == LoaiHinhTB.Voice_Brandname) {
      if (this.dulieu.vkieuld_id_cbo == 14057 || this.dulieu.vkieuld_id_cbo == 14058) {
        this.formPopup = "frmDanhSachSoThanhVien";
      } else if (this.dulieu.vkieuld_id_cbo == 14060 || this.dulieu.vkieuld_id_cbo == 14059 || this.dulieu.vkieuld_id_cbo == 14071) {
        this.formPopup = "frmDangKySoThanhVien";
      } else if (this.dulieu.vkieuld_id_cbo ==  19544) {
        // Dialog khong goi theo cach nay duoc
        // this.formPopup = "frmNhapDSThanhVien";


      } else {
        this.formPopup = "frmHDTB_SUB_V4";
      }
    } else {
      this.formPopup = "frmHDTB_SUB_V2";
    }
  },
  methods: {
    closeForm: function (val) {
      if (val) this.$emit("form-close", val)
    }
  },
};
</script>
