import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        const input = this.input
        const sp = input.split('\n')
        const w = sp[0].length

        const matches = [...input.matchAll(/\d+/g)]
        const res: number = matches.reduce((acc: number, m) => {
            const i: number = m.index!
            const numStr: string = m[0]
            const around = (input[i - 1] ?? '') + (input[i + numStr.length] ?? '') +
                (input.substring(i + w, i + w + numStr.length + 2)) +
                (input.substring(i - w - 2, i - w + numStr.length))
            const ok = ((around.match(/[^0-9\.\n]/g) ?? []).length > 0)
            return acc + (ok ? parseInt(numStr) : 0)
        }, 0)

        return res.toString()
    }

    public getFirstExpectedResult(): string {
        return '531932'
    }

    public solveSecond(): string {
        let input = this.input.trim()
        const sp: string[][] = input.split('\n').map(s => s.split(''))
        const w = sp[0].length

        let nums: number[] = []
        function check(x: number, y: number): boolean {
            if (x < 0 || y < 0 || x >= w || y >= sp.length) { return }
            let minX = x
            while (((sp[y][minX] ?? '').match(/\d/g) ?? []).length > 0) { minX-- }
            let maxX = x
            while (((sp[y][maxX] ?? '').match(/\d/g) ?? []).length > 0) { maxX++ }

            let num = ''
            for (let x = minX + 1; x < maxX; x++) {
                num += sp[y][x]
            }
            num = num.trim()
            if (num && (nums.length == 0 || nums[0] != parseInt(num))) {
                nums.push(parseInt(num))
                if (nums.length == 2) { return true }
            }
            return false
        }
        const stars = [...input.replaceAll(/\n/g, '').matchAll(/\*/g)]
        let sum: number = 0
        for (const star of stars) {
            const i = star.index!
            const x = (i % w), y = Math.floor(i / w)
            nums = []
            do {
                if (check(x - 1, y - 1)) break
                if (check(x, y - 1)) break
                if (check(x + 1, y - 1)) break

                if (check(x - 1, y)) break
                if (check(x + 1, y)) break

                if (check(x - 1, y + 1)) break
                if (check(x, y + 1)) break
                if (check(x + 1, y + 1)) break
            } while (false)
            if (nums.length == 2) {
                sum += nums[0] * nums[1]
            }
        }
        return sum.toString()
    }

    public getSecondExpectedResult(): string {
        return '73646890'
    }
}
