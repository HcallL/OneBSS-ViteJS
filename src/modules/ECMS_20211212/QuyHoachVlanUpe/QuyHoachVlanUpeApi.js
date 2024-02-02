
export default {
  layDsQuyHoachVlanUpe: (axios, data) => axios.get(`/web-ecms/quyhoach-vlan-upe/lay?vlan=${data.data}`),
  layAllUpe: (axios, data) => axios.get(`/web-ecms/quyhoach-vlan-upe/lay-all-upe`),
  layDsQuyHoachVlanUpeAll: (axios) => axios.get(`/web-ecms/quyhoach-vlan-upe/lay-all`),
  capNhatQuyHoachVlanUpe: (axios, data) =>
    axios.post(`/web-ecms/quyhoach-vlan-upe/capnhat?quyhoachId=${data.quyHoachId}`, data.body),
  themMoiQuyHoachVlanUpe: (axios, data) => axios.post('/web-ecms/quyhoach-vlan-upe/them', data),
  xoaQuyHoachVlanUpe: (axios, data) =>
    axios.post(`/web-ecms/quyhoach-vlan-upe/xoa/?quyhoachId=${data.quyHoachId}`)
}
