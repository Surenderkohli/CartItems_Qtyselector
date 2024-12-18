import React,{useState,createContext} from 'react';
import logo from './logo.svg';
import './index.css';
import Price from './components/Price';




import DetailsView from './components/DetailsView';


const tshirtData = {
  colors: [
    {
      name: "black",
      image:'https://sc04.alicdn.com/kf/H5921ee83f9be49c6bcdeca979d140ae3t.jpg_100x100.jpg',
      sizes: [
        { size: "S", quantity: 0, price: 2.4 },
        { size: "M", quantity: 0, price: 2.4 },
        { size: "L", quantity: 0, price: 2.4 }
      ]
    },
    {
      name: "white",
      image:'https://sc04.alicdn.com/kf/H8e270eb8ed8a4f8a972a61ef243557f9m.png_100x100.png',
      sizes: [
        { size: "S", quantity: 0, price: 2.4 },
        { size: "M", quantity: 0, price: 2.4 },
        { size: "L", quantity: 0, price: 2.4 }
      ]
    },
    {
      name: "yellow",
      image:'https://sc04.alicdn.com/kf/H7f0f21d73bbf449b9aaf976da9385c7d3.png_100x100.png',
      sizes: [
        { size: "S", quantity: 0, price: 2.44 },
        { size: "M", quantity: 0, price: 2.44 },
        { size: "L", quantity: 0, price: 2.44 }
      ]
    },
    {
      name: "green",
      image:'https://s.alicdn.com/@sc04/kf/H1e810ce525b645a2b3dabf2818453170l.png',
      sizes: [
        { size: "S", quantity: 0, price: 2.44 },
        { size: "M", quantity: 0, price: 2.44 },
        { size: "L", quantity: 0, price: 2.44 }
      ]
    }, {
      name: "purple",
      image:'https://s.alicdn.com/@sc04/kf/H6b03df190baf4da7938900f9f3d9c940c.png',
      sizes: [
        { size: "S", quantity: 0, price: 2.4 },
        { size: "M", quantity: 0, price: 2.4 },
        { size: "L", quantity: 0, price: 2.4 }
      ]
    },
    {
      name: "red",
      image:'https://s.alicdn.com/@sc04/kf/Hcdae35a5982247dca8c11940567e0fc2e.png',
      sizes: [
        { size: "S", quantity: 0, price: 2.4 },
        { size: "M", quantity: 0, price: 2.4 },
        { size: "L", quantity: 0, price: 2.4 }
      ]
    }
   

  ]
};

export const stateData=createContext()
function App() {
  console.log(tshirtData);

  const [totalCount, setTotalCount] = useState(0)

  console.log(totalCount,'app');
  

  
  
  return (<><stateData.Provider value={{totalCount, setTotalCount}}>
    <div className="App">
      <div className='w-1/2 border border-black mx-auto mt-4 p-5'>
      <Price/>
      <DetailsView tshirtData={tshirtData}/>
      </div>
    
     
    </div></stateData.Provider>
    </>);
}

export default App;
