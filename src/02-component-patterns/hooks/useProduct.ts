import { useEffect, useRef, useState } from 'react';
import { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces';

interface useProductArgs {
    product: Product;
    onChange?: ( args: onChangeArgs ) => void;
    value?: number;
    initialValues?: InitialValues;
}

export const useProduct = ( { onChange, product, value = 0, initialValues }: useProductArgs ) => {

    const [ counter, setCounter ] = useState<number>( initialValues?.count || value );
    const isMounted = useRef( false );

    const increaseBy = ( value: number ) => {

        let newValue = Math.max( counter + value, 0)
        if ( initialValues?.maxCount ){
            newValue = Math.min( newValue, initialValues.maxCount );
        }
        
        //? Mine
        // const newValue =  Math.max( counter + value, 0 );
        // if ( initialValues?.maxCount && newValue <= initialValues?.maxCount ){
        //     setCounter( newValue );
        // }

        setCounter( newValue );
        onChange && onChange({ count: newValue, product });
    }

    const reset = () => {
        setCounter( initialValues?.count || value )
    }

    useEffect(() => {
        if ( !isMounted.current ) return; // No ocupa dependencia en el useEffect por que por que viene de un hook/useRef
        setCounter( value );
    }, [ value ]);

    useEffect(() => {
        isMounted.current = true;
    }, [])

    return {
        counter,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
        maxCount: initialValues?.maxCount,
        
        increaseBy,
        reset
    };
}
