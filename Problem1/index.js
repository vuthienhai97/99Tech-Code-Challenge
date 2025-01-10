var sum_to_n_a = function (n) {
    if (n === 0 || n < 0) return 0
    return (n * (n + 1)) / 2
}

var sum_to_n_a = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    return (n * (n + 1)) / 2
}

var sum_to_n_b = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

var sum_to_n_c = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    if (n === 0) return 0
    return n + sum_to_n_c(n - 1)
}

var sum_to_n_d = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0)
}

var sum_to_n_e = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    return (n * (n + 1)) >> 1
}

var sum_to_n_f = function (n) {
    if (typeof n !== 'number' || n <= 0) return 0
    let sum = 0
    while (n > 0) {
        sum += n
        n--
    }
    return sum
}

console.log('sum_to_n_a:', sum_to_n_a(5))
console.log('sum_to_n_b:', sum_to_n_b(-5))
console.log('sum_to_n_c:', sum_to_n_c('1'))
console.log('sum_to_n_d:', sum_to_n_d(5))
console.log('sum_to_n_e:', sum_to_n_e(5))
console.log('sum_to_n_f:', sum_to_n_f(5))
