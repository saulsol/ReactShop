import React, {useRef, useState} from 'react';

interface ProductType{
    id: number;
    name: string;
    explanation: string,
    price: number;
}

interface ProductItemProps{
    product: ProductType
}

const ProductItem = ({product} : ProductItemProps) => {
    const {id, name, price, explanation} = product;
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div>
            <div>{id}</div>
            <div>{name}</div>
            <div>{price}</div>
            <div>{explanation}</div>
            
            <button type={"button"} onClick={() => console.log("삭제하기")}>삭제하기</button>
            <button type={"button"} onClick={() => console.log("수정하기")}>수정하기</button>
            
        </div>
    );
}


const App = () => {
    const [products, setProducts] = useState<ProductType[]>([
        {
            id: 0,
            name: "제품",
            explanation: '해상도 지원',
            price: 1200
        },
    ]);

    const [name, setName] = useState<string>('');
    const [explanation, setExplanation] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const fakeId = useRef(0);
    const handleCreate=(newProduct: Omit<ProductType, 'id'>)=>{
        fakeId.current += 1;
        setProducts([...products, {
            ...newProduct,
            id: fakeId.current,
        }]);
    };



  return (
      <>
          <form onSubmit={(event) => {
                event.preventDefault();
                handleCreate({name,explanation,price});
          }}>
              <input onChange={(event)=>(setName(event.target.value))} type={"text"} placeholder={"상품이름"} />
              <input onChange={(event) => (setExplanation(event.target.value))} type={"text"} placeholder={"상품설명"}/>
              <input onChange={
                  (event) => (setPrice(parseInt(event.target.value, 10)))
              } type={"number"} placeholder={"상품가격"}></input>
              <input type={"submit"} placeholder={"상품만들기"}/>
          </form>



          {products.map((product) => (
              <ProductItem key={product.id} product={product} />
          ))}




      </>
  );
}

export default App;
