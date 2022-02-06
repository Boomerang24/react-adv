import { ProductButtons, ProductCard, ProductImage, ProductTitle } from '../components';
import { useShoppingCart } from '../hooks/useShoppingCart';

import { products } from '../data/products';

import '../styles/custom-styles.css';

export const ShoppingPage = () => {

    const { shoppingCart, onProductCountChange} = useShoppingCart();

    return (
        <div>
            <h1>Shopping Store</h1>
            <hr />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    products.map( product => (
                        <ProductCard 
                            key={ product.id }
                            product={ product }
                            className='bg-dark text-white'
                            value={ shoppingCart[product.id]?.count || 0 } //? Se checa si existe el count del producto actual // sincroniza los valores
                            onChange={ onProductCountChange }
                        >
                            {/* Nice shadow  to use for images*/}
                            <ProductImage className="custom-image" style={{ boxShadow: '10px 10px 10px rgba(0,0,0,0.2)'}}/> 
                            <ProductTitle className="bold-text"/>
                            <ProductButtons className="custom-buttons"/>
                        </ProductCard>                        
                    ))
                }

            </div>

            <div className="shopping-cart">
                <h1 style={{ display: 'flex', justifyContent: 'center' }}>Cart</h1>
                {
                    // sideShoppingCart && //? Mine
                    Object.entries( shoppingCart ).map( ([ key, product ]) => (
                    // sideShoppingCart.map( item => ( //? Mine
                        <ProductCard
                            key={ key }
                            product={ product }
                            className='bg-dark text-white'
                            style={{ width: '100px' }}
                            value={ product.count }
                            onChange={ onProductCountChange }
                        >
                            {/* Nice shadow  to use for images*/}
                            <ProductImage className="custom-image" style={{ boxShadow: '10px 10px 10px rgba(0,0,0,0.2)'}}/>
                            <ProductButtons 
                                className="custom-buttons"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            />
                        </ProductCard>
                    ))
                }
            </div>
        </div>
    )
}
