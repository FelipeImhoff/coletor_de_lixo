class Lixeira {
  constructor(capacidade, pos_x, pos_y) {
    this.cap = capacidade
    this.free = capacidade
    this.pos_x = pos_x
    this.pos_y = pos_y
  }

  status() {
    if (this.free === this.cap) {
      return 'Lixeira vázia'
    } else if (!this.free) {
      return 'Lixeira cheia'
    } else {
      return `Ainda cabe(m) ${this.free} saco(s) de lixo`
    }
  }

  deposit() {
    this.free -= 1
  }
}
module.exports = Lixeira
