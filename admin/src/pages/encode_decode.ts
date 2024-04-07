export function escapeHtml(text:any) {
    var map:object = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m:any) { return map[m as keyof typeof map]; });
  }
export  function decodeHtml(html:any) {
    var map:object = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'"

    }
    return html.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m:any) { return map[m as keyof typeof map]; });
  }