export default {
  sortByNumber: (a, b, type) => {
    if (type === 'desc') {
      return parseInt(a) < parseInt(b) ? 1 : -1
    } else {
      return parseInt(a) > parseInt(b) ? 1 : -1
    }
  }
}
