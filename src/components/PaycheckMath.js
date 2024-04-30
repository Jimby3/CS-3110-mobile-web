import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const paycheckMath = async (stuff) => {
    const wages = setHours * setHourly;
    const yearly = wages * payperiods;
    const withholding = Math.max(yearly - setAllowance, 0);
    const percentage = withholding * 0.044;
    const exactAmount = percentage / payperiods;
    const coloradoFML = setHours * 0.072;
    const rounded = exactAmount.toFixed(2);
    const roundedFML = coloradoFML.toFixed(2);

    const total = wages - rounded - roundedFML //db 

        return {
            rounded,
            roundedFML
        };
};

export default paycheckMath;
