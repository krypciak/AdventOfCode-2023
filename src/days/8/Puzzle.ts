import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        return 'day 1 solution 1'
    }

    public getFirstExpectedResult(): string {
        return 'day 1 solution 1'
    }

    public solveSecond(): string {
        const inp = this.input.trim()
        const sp = inp.split('\n')
        const moves = sp[0].split('').map(s => s == 'L' ? 0 : 1)
        const moveLen: number = moves.length
        sp.shift()
        sp.shift()
        const map: Record<string, [string, string]> = {}
        for (const l of sp) {
            map[l.substring(0, l.indexOf('=') - 1).trim()] =
                l.substring(l.indexOf('(') + 1, l.indexOf(')')).split(',').map(s => s.trim()) as [string, string]
        }
        const starts: string[] = Object.keys(map).filter(s => s.endsWith('A'))
        const freqToFind = [...starts]
        const freqFound = []
        while (freqToFind.length > 0) {
            for (let ci = 0, v = freqToFind[freqToFind.length - 1], mi = 0, findList = []; ; ci++, mi++) {
                if (mi >= moveLen) { mi = 0 }
                if (v.endsWith('Z')) {
                    findList.push([ci, mi] as const)
                    if (findList.length >= 2) {
                        freqFound.push(findList)
                        freqToFind.pop()
                        break
                    }
                }
                const moveIndex: number = moves[mi]
                v = map[v][moveIndex]
            }
        }
        console.log(freqFound)
        const freq = freqFound.map(e => e[1][0] - e[0][0])
        console.log(freq)

        function gcd(a: number, b: number): number {
            return b == 0 ? a : gcd(b, a % b)
        }
        function lcm(a: number, b: number) {
            return (a * b) / gcd(a, b)
        }
        function arrayLCM(numbers: number[]): number {
            let result = numbers[0]
            for (let i = 1; i < numbers.length; i++) {
                result = lcm(result, numbers[i])
            }
            return result
        }
        const res = arrayLCM(freq)

        return res.toString()
    }

    public getSecondExpectedResult(): string {
        return '22289513667691'
    }
}
