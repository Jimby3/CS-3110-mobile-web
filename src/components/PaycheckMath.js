import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const paycheckMath = async (hours, hourly, payperiods, withholding, addwithholding) => {
    const wages = hours * hourly;
    const yearly = wages * payperiods;
    const allowence = Math.max(yearly - withholding - addwithholding, 0);
    const percentage = allowence * 0.044;
    const exactAmount = percentage / payperiods;
    const coloradoFML = hours * 0.072;
    const rounded = exactAmount.toFixed(2);
    const roundedFML = coloradoFML.toFixed(2);

    const total = (wages - (Number(rounded) + Number(roundedFML))).toFixed(2);

        return {
            rounded,
            roundedFML,
            total
        };
};

export default paycheckMath;
