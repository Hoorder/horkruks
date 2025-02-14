"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = {
    // STEP 1
    deceasedName: "",
    deceasedSurname: "",
    deceasedPesel: "",
    deceasedBirthDate: "",
    deceasedDeathDate: "",
    noInsurance: null,
    insuranceAtZUS: null,
    insuranceAtKRUS: null,

    // STEP 2
    orderingName: "",
    orderingSurname: "",
    orderingPhoneNumber: "",
    orderingCity: "",
    orderingHouseNumber: "",
    orderingPostCode: "",
    orderingLocality: "",

    // STEP 3
    funeralDate: "",
    funeralLocality: "",
    funeralTime: "",
    funeralEnteryTime: "",
    funeralGroupUpTime: "",
    funeralFlowers: null,
    funeralFlowersNote: "",

    // STEP 4
    burialInAnUrn: null,
    burialInACoffin: null,

    // STEP 5
    manager: null,
    mournerOne: null,
    mournerTwo: null,
    mournerThree: null,
    mournerFour: null,
    mournerFive: null,
    mournerSix: null,
    mournerSeven: null,

    // STEP 6
    transport: "",
    bodyPrepary: "",
    tent: "",
    cross: "",
    musicalarrangement: "",
    musicalarrangementNote: "",

    // STEP 7

    coffinPrice: "0",
    urnPrice: "0",
    funeralService: "0",
    bodyTransportPrice: "0",
    bodyPreparyPrice: "0",
    crossPrice: "0",
    musicalarrangementPrice: "0",
    flowersPrice: "0",

    totalCeremonyCost: 0,
    funeralBenefit: 4000,
    totalAmount: 0,

    invoiceName: "",

    step: 1,
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };
        case "PREV_STEP":
            return { ...state, step: state.step - 1 };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const FormContext = createContext(undefined);

export const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext musi być użyty wewnątrz FormProvider");
    }
    return context;
};
