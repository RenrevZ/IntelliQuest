import useValidate from '@vuelidate/core'
import { required,maxLength} from '@vuelidate/validators'

const validateInputs = (forminput) => {
    const rules = {
        BookTitle : { required, maxLength : maxLength(50) },
        BooksubTitle : { required, maxLength : maxLength(100) },
        BookDescription : { required,maxLength : maxLength(500) },
        genreSelected : { required },
        Author: { required }
    }

    return useValidate(rules,forminput)
}

export default validateInputs
