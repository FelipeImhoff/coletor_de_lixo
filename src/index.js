const Collector = require('./Collector')
const Garbage = require('./Garbage')
const TrashCan = require('./TrashCan')

const MAX_X = 23
const MAX_Y = 18
let MATRIX = [
  ['O ', 'C ', 'O ', 'O ', 'O ', 'M ', 'O ', 'O ', 'O ', 'L ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O '],
  ['O ', 'Cs', '  ', '  ', '  ', 'Co', '  ', '  ', '  ', 'Ce', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O ', 'O ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'O '],
  ['O ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'O '],
  ['O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O ', 'O '],
]

const C = new TrashCan(2, 1, 0)
const M = new TrashCan(2, 5, 0)
const L = new TrashCan(2, 9, 0)
const LoArr = generateGarbage(3, 'Lo')
const LsArr = generateGarbage(3, 'Ls')
const LeArr = generateGarbage(3, 'Le')
const Cs = new Collector('Cs', C, LsArr, 1, 1)
const Ce = new Collector('Ce', L, LeArr, 9, 1)
const Co = new Collector('Co', M, LoArr, 5, 1)

function generateRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateGarbage(num, type) {
  let arr = []

  do {
    const x = generateRandomNumber(MAX_X)
    const y = generateRandomNumber(MAX_Y)
    if (MATRIX[y][x] === '  ') {
      arr.push(new Garbage(type, x, y))
      MATRIX[y][x] = type
    }
  } while (arr.length < num)

  return arr
}

function print() {
  for (item of MATRIX) {
    console.log(item.join(''))
  }
  console.log(`Coletor seco: ${Cs.status()}`)
  console.log(`Lixeira cinza (seco): ${C.status()}`)
  console.log('\n')
  console.log(`Coletor eletrônico: ${Ce.status()}`)
  console.log(`Lixeira laranja (eletrônico): ${L.status()}`)
  console.log('\n')
  console.log(`Coletor orgânico: ${Co.status()}`)
  console.log(`Lixeira marrom (orgânico): ${M.status()}`)
  console.log('\n')
  console.log('\n')
  console.log('\n')
  console.log('\n')
  console.log('\n')
}

function main() {
  print()
  const delay = 1000
  function iterate() {
    MATRIX = Co.move(MATRIX)
    MATRIX = Ce.move(MATRIX)
    MATRIX = Cs.move(MATRIX)
    print()
    if (!(Co.stopped && Cs.stopped && Ce.stopped)) {
      setTimeout(iterate, delay)
    }
  }
  iterate()
}
main()
