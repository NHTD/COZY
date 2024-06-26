export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()

export const validate = (payload, setInvalidFields) => {
    let invalids = 0

    const formatPayload = Object.entries(payload)
    for(let arr of formatPayload){
        if(arr[1].trim() === ''){
            invalids++
            setInvalidFields(prev => [...prev, {name: arr[0], msg: 'Require this field.'}])
        }
    }

    for(let arr of formatPayload){
        switch(arr[0]){
            case 'email':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(!arr[1].match(regex)){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], msg: 'Email invalid.'}])
                }
                break
            case 'password':
                if(arr[1].length<6){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], msg: 'Password at least 6 characters  '}])
                }
                break
            default:
                break
        }
    }
    return invalids
}

export const generateRange = (start, end) => {
    const length = end + 1 - start
    return Array.from({length}, (_, index) => start + index)
}

export const getBase64 = (file) => {
    if(!file) return ""
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
 }