// Hsimmilarity
const similarityFinding = (str1, str2) => {
    const n = str1.length
    const m = str2.length
    let i = 0
    let j = 0
    let count = 0
    let max = 0
    while (i < n || count >= m) {
        if (str2[0] == str1[i]) {
            count = 1
            for (j = 1; j < m; j++) {
                if (str2[j] == str1[i + j]) {
                    count++
                }
            }
            i++
        } else {
            i++
        }
        if (max < count) {
            max = count
            break
        }
    }
    return Math.round(100 * (max / m));
}

// BM Matching
const buildLast = (pattern) => {
    let last = [];
    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < pattern.length; i++) {
        last[pattern.charAt(i)] = i;
    }

    return last;
}

const bmMatch = (text, pattern) => {
    let last = []
    last = buildLast(pattern);
    const n = text.length;
    const m = pattern.length;
    let i = m - 1;

    if (i > n - 1) {
        return -1;
    }

    let j = m - 1;
    while (i <= n - 1) {
        if (pattern.charAt(j) === text.charAt(i)) {
            if (j === 0) {
                return i;
            } else {
                i--;
                j--;
            }
        } else {
            let lo = last[text.charAt(i)];
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    }

    return -1;
}


// KMP Matching
const computeFail = (pattern) => {
    let fail = []
    fail[0] = 0

    const m = pattern.length
    let j = 0
    let i = 1

    while (i < m) {
        if (pattern.charAt(j) === pattern.charAt(i)) {
            fail[i] = j + 1
            i++
            j++
        } else if (j > 0) {
            j = fail[j - 1]
        } else {
            fail[i] = 0
            i++
        }
    }

    return fail
}

const kmpMatching = (text, pattern) => {
    const n = text.length
    const m = pattern.length

    const fail = computeFail(pattern)

    let i = 0;
    let j = 0;

    while (i < n) {
        if (pattern.charAt(j) === text.charAt(i)) {
            if (j === m - 1) {
                return i - m + 1
            }
            i++
            j++
        } else if (j > 0) {
            j = fail[j - 1]
        } else {
            i++
        }
    }
    return -1;
}

module.exports = {
    similarityFinding,
    kmpMatching,
    bmMatch
}