import { useState } from 'react';
import { Product, ProductInCart } from '../interfaces/interfaces';

export const useShoppingCart = () => {

    const [shoppingCart, setShoppingCart] = useState<{ [key:string]: ProductInCart }>({});

    // const sideShoppingCart = Object.values(shoppingCart); //? Mine
    //? Genera un arreglo por cada objeto existente en shoppingCart
    // console.log(sideShoppingCart);

    const onProductCountChange = ({ count, product }: { count:number, product: Product}) => {
        // console.log( count, product );

        setShoppingCart( oldShoppingCart => {

            if( count === 0 ){
                const { [product.id]: toDelete, ...rest } = oldShoppingCart; // Se desestructura la propiedad a eliminar
                // console.log({ toDelete });
                return { ...rest }; // Se retorna lo demas, dejando fuera el producto
            }

            return {
                ...oldShoppingCart,
                [ product.id ]: { ...product, count }
            }
        });
    };

    return {
        shoppingCart,
        onProductCountChange
    }
}
