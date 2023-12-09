import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        const inp = this.input.trim()
        const arr = inp.split('\n').map(s => s.split(' ').map(Number))

        function histOf(arr: number[]): number[] {
            return arr.map((v, i) => arr[i + 1] - v).filter(n => !isNaN(n))
        }
        let sum = 0
        for (const beg of arr) {
            let hists: number[][] = [beg]
            while (hists.at(-1).filter(n => n != 0).length != 0) {
                hists.push(histOf(hists[hists.length - 1]))
            }
            hists.at(-1).push(0)
            for (let i = hists.length - 2; i >= 0; i--) {
                hists[i].push(hists[i].at(-1) + hists[i + 1].at(-1))
            }
            sum += hists[0].at(-1)
        }
        return sum.toString()
    }

    public getFirstExpectedResult(): string {
        return '1708206096'
    }

    public solveSecond(): string {
        const inp = this.input.trim()
        const arr = inp.split('\n').map(s => s.split(' ').map(Number))

        function histOf(arr: number[]): number[] {
            return arr.map((v, i) => arr[i + 1] - v).filter(n => !isNaN(n))
        }
        let sum = 0
        for (const beg of arr) {
            let hists: number[][] = [beg]
            while (hists.at(-1).filter(n => n != 0).length != 0) {
                hists.push(histOf(hists[hists.length - 1]))
            }
            hists.at(-1).unshift(0)
            for (let i = hists.length - 2; i >= 0; i--) {
                hists[i].unshift(hists[i][0] - hists[i + 1][0])
            }
            sum += hists[0][0]
        }
        return sum.toString()
    }

    public getSecondExpectedResult(): string {
        return '1050'
    }
}
