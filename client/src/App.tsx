import React, {useState} from 'react';

interface ProductType{
    id: number;
    name: string;
    explanation: string,
    price: number;
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

    const handleSubmit=(event : any)=>{
        event.preventDefault();
        console.log(event.type)
        console.log(name, explanation, price);
    }



  return (
      <>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <input onChange={(event)=>(setName(event.target.value))} type={"text"} placeholder={"상품이름"} />
              <input onChange={(event) => (setExplanation(event.target.value))} type={"text"} placeholder={"상품설명"}/>
              <input onChange={
                  (event) => (setPrice(parseInt(event.target.value, 10)))
              } type={"number"} placeholder={"상품가격"}></input>
              <input type={"submit"} placeholder={"상품만들기"}/>
          </form>

        {products.map((product)=>(
                <div key={product.id}>
                    <div>{product.id}</div>
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                    <div>{product.explanation}</div>
                </div>
            )
        )}
      </>
  );
}

export default App;
