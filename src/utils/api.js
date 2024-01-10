import { URL } from "../constants/url";

export const getMinMaxValues = async () => {
    const url = URL.FIRST_EXERCISE;
    try {
        const res = await fetch(url);
        const data = await res.json();
    
        return data;   
    } catch (error) {
        return { min: 10, max: 50 };
    }
};


export const getFixedValues = async () => {
    const url = URL.SECOND_EXERCISE;
    try {
        const res = await fetch(url);
        const data = await res.json();
    
        return data;   
    } catch (error) {
        return [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
    }
};
