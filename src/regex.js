let validSeqDNA =  /^[ACGT]{1,}$/
let validDate = /^(?:(?:31(\/|-|\.| )(?:0?[13578]|1[02]|Jan(?:uary)?|Mar(?:ch)?|May|Jul(?:y)?|Aug(?:ust)?|Oct(?:ober)?|Dec(?:ember)?))\1|(?:(?:29|30)(\/|-|\.| )(?:0?[13-9]|1[0-2]|Jan(?:uary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(?:Nov|Dec)(?:ember)?)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.| )(?:0?2|Feb(?:ruary)?)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.| )(?:(?:0?[1-9])|(?:1[0-2])|Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm
let validDisease = /.*/gm
// validDateandDisease? extract date or disease or both
//let result = validDisease.test("19-January-2003")

