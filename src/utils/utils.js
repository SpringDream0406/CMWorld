export class Utils {
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  getSize(id) {
    const element = document.getElementById(id);
    if (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return { width, height };
    }
  }
}
