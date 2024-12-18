import React, { useEffect, useState, useContext } from "react";
import { stateData } from "../App";

const DetailsView = ({ tshirtData }) => {
    const [selectedColor, setSelectedColor] = useState(tshirtData.colors[0]);

    const [tshirtCollection, setTshirtCollection] = useState(
        tshirtData.colors.reduce((acc, color) => {
            acc[color.name] = {
                totalQuantity: 0,
                sizes: color.sizes.reduce((sizeAcc, size) => {
                    sizeAcc[size.size] = 0;
                    return sizeAcc;
                }, {}),
            };
            return acc;
        }, {})
    );
    const { totalCount, setTotalCount } = useContext(stateData)

    const chooseColor = (color) => setSelectedColor(color);

    const increment = (size) => {
      

        setTshirtCollection((prev) => {
            const updatedSizes = {
                ...prev[selectedColor.name].sizes,
                [size.size]: prev[selectedColor.name].sizes[size.size] + 1,
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
                    ...prev[selectedColor.name],
                    sizes: updatedSizes,
                    totalQuantity,
                },
            };
        });
    };

    useEffect(() => {
        const getTotalQuantity = () => {
            return Object.values(tshirtCollection).reduce((acc, color) => acc + color.totalQuantity, 0);
        };
        const result = getTotalQuantity()
        setTotalCount(getTotalQuantity())



    }, [tshirtCollection])


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
        <div className="pt-5">
            <p className="text-[#666] pt-4">Total items:{totalCount}</p>
            <h3 className="font-bold text-base pb-4">
                Color(6): <span className="font-normal">{selectedColor.name}</span>
            </h3>

            {/* <h3>
                Color(6): {selectedColor.name} (Total Quantity:{" "}
                {tshirtCollection[selectedColor.name].totalQuantity})
            </h3> */}

            <div className="flex justify-between">
                {tshirtData.colors.map((color) => (
                    <div
                        key={color.name}
                        className={`relative cursor-pointer border-2 w-[100px] rounded-lg  ${selectedColor.name === color.name ? 'border-blue-500' : 'border-transparent'
                            }`}
                        onClick={() => chooseColor(color)}
                    >
                        <img src={color.image} alt={color.name} className="w-full h-full rounded-lg" />
                        {
                            tshirtCollection[color.name].totalQuantity > 0
                            && <div className="absolute top-[-15px] right-[-2px] bg-[#f60] text-white p-[2px] overflow-hidden px-2 rounded-lg">
                                x{tshirtCollection[color.name].totalQuantity}
                            </div>
                        }

                    </div>
                ))}
            </div>

            <div className="py-4">
                <h3 className="font-bold text-base pb-4">
                    Material(1): <span className="font-normal">100% Cotton</span>
                </h3>
                <div className="flex">
                    <p className="bg-[#e1e1e2] rounded border border-black px-1">100% Cotton</p>

                </div>

            </div>

            <div className="pb-5 border-b border-[#e6e7eb]">
                <h3 className="font-bold text-base pb-4">
                    Sizes(3)
                </h3>
                <div className="flex flex-col gap-y-4">


                    {selectedColor.sizes.map((size) => (
                        <div key={size.size} className="flex justify-between items-center gap-y-4">
                            <p className="bg-[#d8d8d9] px-2 py-1 w-[30px] rounded-lg text-center">{size.size}</p>
                            <p >
                                {totalCount >= 0 && totalCount <= 99
                                    ? '$2.40'
                                    : totalCount >= 100 && totalCount <= 999
                                        ? '$1.90'
                                        : totalCount >= 1000 && totalCount <= 9990
                                            ? '$1.40'
                                            : totalCount >= 10000
                                                ? '$0.90'
                                                : null}
                            </p>
                            <div className="flex items-center rounded-full border border-[#e4e4e7] overflow-hidden shadow-md">
                                <button
                                    className="px-2 pb-1 bg-[#d8d8d9] rounded-full w-[30px] h-[30px] text-center hover:bg-[#9f9f9f]"
                                    onClick={() => decrement(size)}
                                >
                                    -
                                </button>
                                {/* <p className="px-4">{tshirtCollection[selectedColor.name].sizes[size.size]}</p> */}
                                <input type="text" className="mx-2 w-12 text-center  rounded" maxLength={6} value={tshirtCollection[selectedColor.name].sizes[size.size] || 0} onChange={(e) => handleChange(size, e)} />
                                <button
                                    className="px-2 pb-1 bg-[#d8d8d9] rounded-full w-[30px] h-[30px] text-center hover:bg-[#9f9f9f] "
                                    onClick={() => increment(size)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}  </div>
            </div>
            <div className="py-4">
                <h3 className="font-bold text-base pb-4">
                    Shipping
                </h3>
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-base">Express</h4>
                    <p className="underline">{`Change >`}</p>
                </div>

                <p className="">Shipping fee: Est. $33.13 for 4 pieces</p>


                <p>Estimated delivery in 8-31 business days</p>

            </div>
            <div className="text-[#767676] text-sm">
                * Shipping costs listed are estimates for your reference. Please contact the supplier for the final quote.
            </div>
           
                <div className="sticky bottom-0  bg-white shadow-[0px_-20px_23px_-18px_rgba(255,168,0,1)] overflow-hidden mt-10">
                    <div className="flex justify-between py-4">
                        <h4 className="font-bold">Subtotal({totalCount})</h4>
                        <p className="font-bold">
                            {totalCount >= 0 && totalCount <= 99
                                ? `$${(totalCount * 2.40).toFixed(2)}`
                                : totalCount >= 100 && totalCount <= 999
                                    ? `$${(totalCount * 1.90).toFixed(2)}`
                                    : totalCount >= 1000 && totalCount <= 9999
                                        ? `$${(totalCount * 1.40).toFixed(2)}`
                                        : totalCount >= 10000
                                            ? `$${(totalCount * 0.90).toFixed(2)}`
                                            : null}
                        </p>

                   
                </div>
                <div className="flex  gap-6 py-5">
                    <button className="bg-[#f60] rounded-full border border-[#f60] py-4 px-4 font-bold text-white w-full">Send Inquiry</button>
                    <button className="rounded-full py-4 px-4 border border-black font-bold w-full">Chat now</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsView