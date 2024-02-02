

class apiHelper {

  



  

  getSrtCodeError(response) {
    if(!this.isResponseApiSuccess(response))
      return response.data.message_detail || response.data.message
    
    return ""
  }

  getDataFromResponseApiReturnArray(response) {
    if (!response) return []
    if (response && response.data && response.data.error_code === 'BSS-00000000') return response.data.data || []
    return []
  }

  getDataFromResponseApiReturnRaise(response) {
    if (!response) return ''
    if (response && response.data && response.data.error_code === 'BSS-00000000') return response.data.data
    return ''
  }

  isResponseApiSuccess(response) {
    if (!response) return false
    if (response && response.data && response.data.error_code === 'BSS-00000000') return true
    return false
  }
}

export default new apiHelper()
