import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstExercise from "./components/FirstExercise";
import SecondExercise from "./components/SecondExercise";
import { getMinMaxValues, getFixedValues } from "./utils/api";

const App = () => {
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [fixedValues, setFixedValues] = useState();

    useEffect(() => {
        const getInitialData = async () => {
            const minMax = await getMinMaxValues();
            const fixed = await getFixedValues();

            setMinValue(minMax.min);
            setMaxValue(minMax.max);
            setFixedValues(fixed);
        }
        getInitialData();
    }, []);

    if (!fixedValues || !minValue || !maxValue) return 'Loading...';

	return (
        <BrowserRouter>
            <Routes>
                <Route path="exercise2" element={<SecondExercise availableValues={fixedValues}/>}/>
                <Route path="*" element={<FirstExercise minValue={minValue} maxValue={maxValue}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
