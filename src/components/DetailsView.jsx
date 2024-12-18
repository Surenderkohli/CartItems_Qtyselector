import React, { useEffect, useState,useContext } from "react";
import { stateData } from "../App";

const DetailsView = ({ tshirtData }) => {
    const [selectedColor, setSelectedColor] = useState(tshirtData.colors[0]);

    const [tshirtCollection, setTshirtCollection] = useState(
        tshirtData.colors.reduce((acc, color) => {
            acc[color.name] = {
                totalQuantity: 0,
                sizes: color.sizes.reduce((sizeAcc, size) => {
                    sizeAcc[size.size] = 0; // Initialize quantities for each size to 0
                    return sizeAcc;
                }, {}),
            };
            return acc;
        }, {})
    );
    const {totalCount, setTotalCount}=useContext(stateData)

    const chooseColor = (color) => setSelectedColor(color);

    const increment = (size) => {
        console.log(size);
        
        setTshirtCollection((prev) => {
            const updatedSizes = {
                ...prev[selectedColor.name].sizes,
                [size.size]: prev[selectedColor.name].sizes[size.size] + 1,
            };
            console.log(updatedSizes,'ddd');
            
            const totalQuantity = Object.values(updatedSizes).reduce((sum, qty) => sum + qty, 0);
            return {
                ...prev,
                [selectedColor.name]: {
                    ...prev[selectedColor.name], // Ensure other fields are preserved
                    sizes: updatedSizes,
                    totalQuantity,
                },
            };
        });
    };

    const decrement = (size) => {
        setTshirtCollection((prev) => {
            const updatedSizes = {
                ...prev[selectedColor.name].sizes,
                [size.size]: Math.max(0, prev[selectedColor.name].sizes[size.size] - 1),
            };
            const totalQuantity = Object.values(updatedSizes).reduce((sum, qty) => sum + qty, 0);
            return {
                ...prev,
                [selectedColor.name]: {
                    ...prev[selectedColor.name], // Ensure other fields are preserved
                    sizes: updatedSizes,
                    totalQuantity,
                },
            };
        });
    };
    console.log(tshirtCollection);
    useEffect(() => {
        const getTotalQuantity = () => {
            return Object.values(tshirtCollection).reduce((acc, color) => acc + color.totalQuantity, 0);
        };
      const result=getTotalQuantity()
        setTotalCount(getTotalQuantity())



    }, [tshirtCollection])
    //   const getTotalQuantity = () => {
    //     return Object.values(tshirtCollection).reduce((acc, color) => acc + color.totalQuantity, 0);
    //   };
    console.log(totalCount, 'cla');
    const handleChange = (size, e) => {
        const newValue = Math.max(0, parseInt(e.target.value) || 0);
        setTshirtCollection((prev) => {
          const updatedSizes = {
            ...prev[selectedColor.name].sizes,
            [size.size]: newValue,
          };
          const totalQuantity = Object.values(updatedSizes).reduce((sum, qty) => sum + qty, 0);
          return {
            ...prev,
            [selectedColor.name]: {
              ...prev[selectedColor.name],
              sizes: updatedSizes,
              totalQuantity,
            },
          };
        });
      };

    return (
        <div>
            <h3>
                Selected Color: {selectedColor.name} (Total Quantity:{" "}
                {tshirtCollection[selectedColor.name].totalQuantity})
            </h3>

            <div className="flex justify-between">
                {tshirtData.colors.map((color) => (
                    <div
                        key={color.name}
                        className={`relative cursor-pointer border-2 w-[100px] ${selectedColor.name === color.name ? 'border-blue-500' : 'border-transparent'
                            }`}
                        onClick={() => chooseColor(color)}
                    >
                        <img src={color.image} alt={color.name} className="w-full h-full" />
                        {
                            tshirtCollection[color.name].totalQuantity > 0
                            && <div className="absolute top-0 right-0 bg-red-400 text-white p-[2px]">
                                x{tshirtCollection[color.name].totalQuantity}
                            </div>
                        }

                    </div>
                ))}
            </div>

            <div>
                {selectedColor.sizes.map((size) => (
                    <div key={size.size} className="flex justify-between items-center">
                        <p>{size.size}</p>
                        <p>
                            {totalCount > 0 && totalCount<= 99
                                ? '$2.40'
                                : totalCount >= 100 && totalCount <= 999
                                    ? '$1.90'
                                    :totalCount >= 1000 && totalCount <= 9990
                                    ?'$1.40'
                                    : null}
                        </p>
                        <div className="flex items-center">
                            <button
                                className="px-2 py-1 bg-gray-200"
                                onClick={() => decrement(size)}
                            >
                                -
                            </button>
                            {/* <p className="px-4">{tshirtCollection[selectedColor.name].sizes[size.size]}</p> */}
                            <input
      type="text"
      className="mx-2 w-12 text-center border border-gray-400 rounded"
      value={tshirtCollection[selectedColor.name].sizes[size.size] || 0} // Ensure it defaults to 0 if undefined
      onChange={(e) => handleChange(size, e)}
    />
                            <button
                                className="px-2 py-1 bg-gray-200"
                                onClick={() => increment(size)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <p>{totalCount}</p>
        </div>
    );
};

export default DetailsView