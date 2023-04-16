class MyHashSet {
  items
  constructor() {
    this.items = {}
  }
  add(key) {
    if (!this.contains(key)) {
      this.items[key] = key
    }
  }
  remove(key) {
    if (this.contains(key)) {
      delete this.items[key]
    }
  }
  contains(key) {
    return Object.prototype.hasOwnProperty.call(this.items, key)
  }
}