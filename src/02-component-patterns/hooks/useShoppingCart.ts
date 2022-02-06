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

            //* Añadir producto
            const productInCart: ProductInCart = oldShoppingCart[product.id] || { ...product, count: 0 }; //Se busca el product que cumpla con ese id, si es null, devuelve el 2do objeto
            if( Math.max( productInCart.count + count, 0) > 0 ){ // Se busca el valor mas alto, limitandolo a 0
                productInCart.count += count;
                return {
                    ...oldShoppingCart,
                    [product.id]: productInCart
                }
            }

            //* Borrar producto
            const { [product.id]: toDelete, ...rest } = oldShoppingCart; // Se desestructura la propiedad a eliminar
            return { ...rest }; // Se retorna lo demas, dejando fuera el producto


            //? Implementacion sencilla
            // if( count === 0 ){
            //     const { [product.id]: toDelete, ...rest } = oldShoppingCart; // Se desestructura la propiedad a eliminar
            //     // console.log({ toDelete });
            //     return { ...rest }; // Se retorna lo demas, dejando fuera el producto
            // }

            // return {
            //     ...oldShoppingCart,
            //     [ product.id ]: { ...product, count }
            // }
        });
    };

    return {
        shoppingCart,
        onProductCountChange
    }
}
