import React, { useState, useEffect } from 'react';
import "../../styles/index.css";
// need to be lowercase "rx" for compiling in deployment
import { RxCaretDown } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = (props) => {
  const [sizeSelected, setSizeSelected] = useState({});
  const [quantitySelected, setQuantitySelected] = useState('-');
  const [skuSelected, setSkuSelected] = useState(0);
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [quantityDropdownExpanded, setQuantityDropdownExpanded] = useState(false);

  const onOptionSelect = (option, sku) => {
    setSizeSelected(option);
    setSkuSelected(sku);
    setDropdownExpanded(false);
    setQuantitySelected(1);
    // console.log(Object.keys(sizeSelected).length > 0)
  };

  const onQuantitySelect = option => {
    setQuantitySelected(option);
    setQuantityDropdownExpanded(false);
  };

  useEffect(() => {
    setQuantitySelected('-');
    if (!props.styles[props.styleIndex]?.skus[null]) {
      setSizeSelected({});
    }
    else {
      setSizeSelected({ size: "OUT OF STOCK" });
    }
  }, [props.styles]);

  const addToCart = clicked => {
    props.onClickAddToCart(skuSelected);
    toast(`${props.styles[props.styleIndex].name} has been added to your cart!`);
  }

  return (
    <div data-testid='testAddToCart' widgetname="Overview" className="addToCart">
      <div widgetname="Overview" className="dropdown">
        <button widgetname="Overview" onClick={() => { setDropdownExpanded(!dropdownExpanded) }} className="dropdown-button">{sizeSelected.size || "SELECT SIZE"}  <RxCaretDown size="20" className="caret" /></button>
        <div widgetname="Overview" className={dropdownExpanded ? "dropdown-content dropdownExpanded" : "dropdown-content"}>
          {Object.keys((props.styles[props.styleIndex]?.skus) || {}).map((size, index) => {
            if (props.styles[props.styleIndex]?.skus[size].quantity > 0) {
              return (<p widgetname="Overview" key={index} onClick={() => { onOptionSelect(props.styles[props.styleIndex]?.skus[size], size) }}>{props.styles[props.styleIndex]?.skus[size].size}</p>)
            }
          })}
        </div>
      </div>
      <div widgetname="Overview" className="dropdown">
        {!isNaN(quantitySelected) ?
          <div widgetname="Overview"><button widgetname="Overview" className="dropdown-button" id="quantity" onClick={() => { setQuantityDropdownExpanded(!quantityDropdownExpanded) }}>{quantitySelected}<div widgetname="Overview"> <RxCaretDown className="caret" size="20" /></div> </button></div>
          : <button widgetname="Overview" className="dropdown-button" id="quantity">{quantitySelected} <RxCaretDown className="caret" size="20" /></button>}
        <div widgetname="Overview" className={quantityDropdownExpanded ? "dropdown-content dropdownExpanded" : "dropdown-content"}>
          {sizeSelected.quantity > 15 ?
            Array.from(Array(15).keys()).map((quantity, index) => {
              return (<p widgetname="Overview" key={index} onClick={() => { onQuantitySelect(quantity + 1) }}>{quantity + 1}</p>)
            })
            : Array.from(Array(sizeSelected.quantity).keys()).map((quantity, index) => {
              return (<p widgetname="Overview" key={index} onClick={() => { onQuantitySelect(quantity + 1) }}>{quantity + 1}</p>)
            })}
        </div>
      </div>
      {sizeSelected.quantity > 0 ?
        <button widgetname="Overview" id="checkout" className="dropdown-button" onClick={addToCart} >ADD TO BAG<AiOutlinePlus size="20" className='plus' /></button>
        : ''}
      <div widgetname="Overview">
      </div>
    </div>
  )
}

export default AddToCart;