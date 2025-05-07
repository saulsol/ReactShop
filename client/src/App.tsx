import React, {useRef, useState} from 'react';

interface ProductType{
    id: number;
    name: string;
    explanation: string,
    price: number;
}

interface ProductItemProps{
    product: ProductType;
    onDelete: (id: number)=> void;
    onUpdate: (id: number) => void;
}

const ProductItem = ({product, onDelete, onUpdate} : ProductItemProps) => {
    const {id, name, price, explanation} = product;
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div>
            <div>{id}</div>
            <div>{name}</div>
            <div>{price}</div>
            <div>{explanation}</div>
            
            <button type={"button"} onClick={() => onDelete(id)}>삭제하기</button>
            <button type={"button"} onClick={() => setIsEditMode((prev) => !prev)}>수정하기</button>

            {
                isEditMode && (
                    <form
                        onSubmit={(event) =>
                        {
                            event.preventDefault();
                            onUpdate(id);
                        }}
                    >
                        <input type={"text"} placeholder= "상품 이름"/>
                        <input type={"text"} placeholder= "상품 설정"/>
                        <input type={"number"} placeholder= "상품 가격"/>
                        <input type={"submit"} placeholder= "상품 수정하기"/>
                    </form>
                )
            }


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

    const handleDelete = (id: number) => setProducts(products.filter((product) => product.id !== id));

    const handleUpdate = (id: number) => {
        const updateProduct = {
            id,
            name: "수정된 상품",
            explanation: "수정된 상품",
            price: 0
        }
        setProducts(
            products.map((product) => (product.id === id ? updateProduct : product))
        );
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
              <ProductItem key={product.id} product={product}
                           onDelete={handleDelete} onUpdate={handleUpdate}  />
          ))}

      </>
  );
}

export default App;
