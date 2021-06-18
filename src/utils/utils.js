const utils = {
  arrayFill (arr) {
    if (arr.flat().length !== arr.length) return arr
    const result = arr.slice(0)
    result.forEach((v, i) => (result[i] = new Array(Number(v)).fill(0)))
    return result
  }
}
export default utils
