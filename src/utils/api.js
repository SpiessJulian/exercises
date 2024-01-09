export const getMinMaxValues = async () => {
    const url = 'http://demo6691984.mockable.io/min-max';
    try {
        const res = await fetch(url);
        const data = await res.json();
    
        return data;   
    } catch (error) {
        return { min: 10, max: 50 };
    }
};


export const getFixedValues = async () => {
    const url = 'http://demo6691984.mockable.io/fixed';
    try {
        const res = await fetch(url);
        const data = await res.json();
    
        return data;   
    } catch (error) {
        return [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
    }
};
