import React, { useState, useEffect } from "react";

export const data = {
    "Azerbaijan": "Baku",
    "Germany": "Berlin",
    "Papua New Guinea": "Port Moresby",
    "Poland": "Warszawa"
}

export default function CountryCapitalGame() {
    const [buttonItems, setButtonItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [isWrong, setIsWrong] = useState(false)
    const countryList = Object.keys(data)
    const capitalList = Object.values(data)

    useEffect(() => {
        setButtonItems([...countryList, ...capitalList].sort(() => Math.random() - 0.5))
    }, [])

    const handleSelection = (item) => {
        setSelectedItems([...selectedItems, item])
    }

    const getStyle = (item) => {
        if (selectedItems.includes(item) && !isWrong) {
            return { "backgroundColor": "#0000ff" }
        }
        else if (selectedItems.includes(item) && isWrong) {
            return { "backgroundColor": "#ff0000" }
        } else {
            return { "backgroundColor": "initial" }
        }
    }


    useEffect(() => {
        if (selectedItems.length === 2 && !isWrong) {//a pair is selected
            if (
                (data[selectedItems[0]] === selectedItems[1]) || (data[selectedItems[1]] === selectedItems[0])
            ) {
                const updatedArray = buttonItems.filter((el) => !selectedItems.includes(el));
                setButtonItems(updatedArray)
                setSelectedItems([])

            } else {
                setIsWrong(true)
            }
        }else if(selectedItems.length === 3 && isWrong){
            setSelectedItems([])
            setIsWrong(false)
        }

    }, [selectedItems])


    return <div>
        {buttonItems.length !==0 ? buttonItems.map(item => {
            return <button key={item}
                style={getStyle(item)}
                onClick={() => handleSelection(item)}>{item}</button>
        }): <div>Congratulations!</div>}
    </div>;
}

