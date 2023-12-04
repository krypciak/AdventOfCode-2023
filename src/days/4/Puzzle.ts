import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        const sum = this.input.trim().split('\n').reduce((acc, str) => {
            const [a1, a2] = [
                str.substring(str.indexOf(':'), str.indexOf('|')),
                str.substring(str.indexOf('|'))
            ].map(s => s.match(/\d+/g))
            const s2 = new Set(a2)
            const res = a1.filter(e => s2.has(e)).length
            const points = Math.floor(2 ** (res - 1))
            console.log(points)
            return acc + points
        }, 0)
        return sum.toString()
    }

    public getFirstExpectedResult(): string {
        return '23441'
    }

    public solveSecond(): string {
        const inp = this.input.trim().split('\n')
        const arr = inp.map(_ => 1)
        for (let i = 0; i < arr.length; i++) {
            const str = inp[i]
            const [a1, a2] = [
                str.substring(str.indexOf(':'), str.indexOf('|')),
                str.substring(str.indexOf('|'))
            ].map(s => s.match(/\d+/g))
            const s2 = new Set(a2)
            const res = a1.filter(e => s2.has(e)).length
            for (let x = i + 1; x < Math.min(i + 1 + res, arr.length); x++) {
                arr[x] += arr[i]
            }
        }
        return arr.reduce((acc, v) => acc + v).toString()
    }

    public getSecondExpectedResult(): string {
        return '5923918'
    }
}
