const getCurrentDate = () => {
  const today = new Date();
  return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
}

// Hamming Distance
const hammingDistance = (string1, string2) => {
  const length = string1.length
  let dist_counter = 0;
  for (let i = 0; i < length; i++) {
    if (i < string2.length) {
      if (string1.charAt(i) != string2.charAt(i)) {
        dist_counter += 1;
      }
    } else {
      dist_counter += 1;
    }
  }

  let percentage = dist_counter * 100 / length;

  percentage = Math.round(percentage)

  return 100 - percentage;

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
    if (pattern.charAt(j) == text.charAt(i)) {
      if (j == 0) {
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
    if (pattern.charAt(j) == pattern.charAt(i)) {
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
    if (pattern.charAt(j) == text.charAt(i)) {
      if (j == m - 1) {
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

const isValid = (text) => {
  if (text.match(/[a-z]/) || text.match(/[^ACGT]/)) {
    return false;
  } else {
    return true;
  }
}


const dna = "AAAAACCCCCTTTGGGG"

const disease = "AAAAACCCCCTTTGGGG"

if (isValid(dna) && isValid(disease)) {
  console.log("DNA valid")

  let status
  let date = getCurrentDate()
  let name = "Mhs IF"
  let diseaseName = "HIV"

  const position = kmpMatching(dna, disease)

  const similarity = hammingDistance(dna, disease);

  if (position == -1) {
    status = "False" 
  } else {
    status = "True"
  }

  console.log(`${date} - ${name} - ${diseaseName} - ${similarity}% - ${status}`)
  console.log("Located at position: " + position)

} else {
  console.log("DNA tidak valid")
}
  