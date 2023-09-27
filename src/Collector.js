class Collector {
  constructor(name, trashCan, garbageArr, pos_x, pos_y) {
    this.name = name
    this.trashCan = trashCan
    this.garbageArr = garbageArr
    this.stopped = false
    this.carrying = false
    this.pos_x = pos_x
    this.pos_y = pos_y
    this.dist_x = this.calcDist(this.pos_x, garbageArr[garbageArr.length - 1].pos_x)
    this.dist_y = this.calcDist(this.pos_y, garbageArr[garbageArr.length - 1].pos_y)
    this.memory = {
      x: pos_x,
      y: pos_y,
    }
  }

  status() {
    if (this.stopped) {
      return 'Coletor parado'
    }
    return this.carrying ? 'Indo para lixeira' : 'Indo pegar o lixo'
  }

  calcDist(pos, dest) {
    return dest - pos
  }

  moveRight(matrix) {
    matrix[this.pos_y][this.pos_x] = '  '
    this.pos_x++
    this.dist_x--
    matrix[this.pos_y][this.pos_x] = this.name
    return matrix
  }

  moveDown(matrix) {
    matrix[this.pos_y][this.pos_x] = '  '
    this.pos_y++
    this.dist_y--
    matrix[this.pos_y][this.pos_x] = this.name
    return matrix
  }

  moveUp(matrix) {
    matrix[this.pos_y][this.pos_x] = '  '
    this.pos_y--
    this.dist_y++
    matrix[this.pos_y][this.pos_x] = this.name
    return matrix
  }

  moveLeft(matrix) {
    matrix[this.pos_y][this.pos_x] = '  '
    this.pos_x--
    this.dist_x++
    matrix[this.pos_y][this.pos_x] = this.name
    return matrix
  }

  makeMovement(matrix) {
    const position = {
      x: this.pos_x,
      y: this.pos_y,
    }
    if (this.dist_x > 0 && matrix[this.pos_y][this.pos_x + 1] === '  ' && JSON.stringify({ x: this.pos_x + 1, y: this.pos_y }) !== JSON.stringify(this.memory)) {
      this.memory = position
      return this.moveRight(matrix)
    } else if (this.dist_y > 0 && matrix[this.pos_y + 1][this.pos_x] === '  ' && JSON.stringify({ x: this.pos_x, y: this.pos_y + 1 }) !== JSON.stringify(this.memory)) {
      this.memory = position
      return this.moveDown(matrix)
    } else if (this.dist_x < 0 && matrix[this.pos_y][this.pos_x - 1] === '  ' && JSON.stringify({ x: this.pos_x - 1, y: this.pos_y }) !== JSON.stringify(this.memory)) {
      this.memory = position
      return this.moveLeft(matrix)
    } else if (this.dist_y < 0 && matrix[this.pos_y - 1][this.pos_x] === '  ' && JSON.stringify({ x: this.pos_x, y: this.pos_y - 1 }) !== JSON.stringify(this.memory)) {
      this.memory = position
      return this.moveUp(matrix)
    } else {
      if (matrix[this.pos_y][this.pos_x + 1] === '  ' && JSON.stringify({ x: this.pos_x + 1, y: this.pos_y }) !== JSON.stringify(this.memory)) {
        this.memory = position
        return this.moveRight(matrix)
      } else if (matrix[this.pos_y + 1][this.pos_x] === '  ' && JSON.stringify({ x: this.pos_x, y: this.pos_y + 1 }) !== JSON.stringify(this.memory)) {
        this.memory = position
        return this.moveDown(matrix)
      } else if (matrix[this.pos_y][this.pos_x - 1] === '  ' && JSON.stringify({ x: this.pos_x - 1, y: this.pos_y }) !== JSON.stringify(this.memory)) {
        this.memory = position
        return this.moveLeft(matrix)
      } else if (matrix[this.pos_y - 1][this.pos_x] === '  ' && JSON.stringify({ x: this.pos_x, y: this.pos_y - 1 }) !== JSON.stringify(this.memory)) {
        this.memory = position
        return this.moveUp(matrix)
      }
    }
    return matrix
  }

  canAct() {
    if (this.dist_x === 0 && Math.abs(this.dist_y) === 1) {
      return true
    } else if (this.dist_y === 0 && Math.abs(this.dist_x) === 1) {
      return true
    }
    return false
  }

  collect(matrix) {
    const garbage = this.garbageArr.pop()
    matrix[garbage.pos_y][garbage.pos_x] = '  '
    return matrix
  }

  makeAction(matrix) {
    this.memory = []
    if (!this.carrying) {
      this.dist_x = this.calcDist(this.pos_x, this.trashCan.pos_x)
      this.dist_y = this.calcDist(this.pos_y, this.trashCan.pos_y)
      this.carrying = true
      return this.collect(matrix)
    }
    if (this.trashCan.free === 0) {
      this.stopped = true
      return matrix
    }
    this.trashCan.deposit()
    this.carrying = false
    if (!this.garbageArr.length) {
      this.stopped = true
      return matrix
    }
    this.dist_x = this.calcDist(this.pos_x, this.garbageArr[this.garbageArr.length - 1].pos_x)
    this.dist_y = this.calcDist(this.pos_y, this.garbageArr[this.garbageArr.length - 1].pos_y)
    return matrix
  }

  move(matrix) {
    if (this.stopped) {
      return matrix
    }
    if (this.canAct()) {
      return this.makeAction(matrix)
    }
    return this.makeMovement(matrix)
  }
}
module.exports = Collector
