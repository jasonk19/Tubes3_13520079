let validSeqDNA =  /^[ACGT]{1,}$/

//let justDate = /^(?:(?:31(\/|-|\.| )(?:0?[13578]|1[02]|Jan(?:uary)?|Mar(?:ch)?|May|Jul(?:y)?|Aug(?:ust)?|Oct(?:ober)?|Dec(?:ember)?))\1|(?:(?:29|30)(\/|-|\.| )(?:0?[13-9]|1[0-2]|Jan(?:uary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(?:Nov|Dec)(?:ember)?)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.| )(?:0?2|Feb(?:ruary)?)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.| )(?:(?:0?[1-9])|(?:1[0-2])|Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
let validDate = /(?:(?:31(\/|-|\.| )(?:0?[13578]|1[02]|Jan(?:uary)?|Mar(?:ch)?|May|Jul(?:y)?|Aug(?:ust)?|Oct(?:ober)?|Dec(?:ember)?))\1|(?:(?:29|30)(\/|-|\.| )(?:0?[13-9]|1[0-2]|Jan(?:uary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(?:Nov|Dec)(?:ember)?)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|\.| )(?:0?2|Feb(?:ruary)?)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|\.| )(?:(?:0?[1-9])|(?:1[0-2])|Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/

let input = "13 January 2020 HIV Tidur"

/*
  Fungsi mengembalikan map dengan
    key : tanggal, penyakit
    value tanggal berupa string
    value penyakit berupa array
  dan mengembalikan null diluar itu(tidak valid)
*/
const validateSearchInput = (input) => {
    let result = validDate.exec(input)
    const ret = new Map()
    if (result != null){
        let validInput = result[0]
        if(result.index == 0){
            //Jika input hanya tanggal
            if (input.length == result.index + result[0].length){
                ret.set("tanggal",result[0])
                return result[0]
            }else{
                tanggal = result[0]
                strPenyakit = input.substring(result[0].length, input.length)
                arrPenyakit = strPenyakit.split(" ")
                var filteredArrPenyakit = arrPenyakit.filter(function(e) { return e !== '' })
                ret.set("tanggal", result[0])
                ret.set("penyakit", filteredArrPenyakit)
                // console.log(ret)
                return ret;
            }
        }
    }else{ //Hanya penyakit
        arrPenyakit = input.split(" ")
        var filteredArrPenyakit = arrPenyakit.filter(function(e) { return e !== '' })
        // console.log(filteredArrPenyakit)
        return filteredArrPenyakit
    }
    return null
}

// let filter = validateSearchInput(input)
// console.log(filter)

module.exports = {
    validateSearchInput
}

