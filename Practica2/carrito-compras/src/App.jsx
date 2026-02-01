import { useState, useEffect } from "react"
import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db"





function App() {

    function initialCart(){
        const localStorageCart=localStorage.getItem('cart')
        return localStorageCart? JSON.parse(localStorageCart):[]
    }

    const [data, setData]=useState(db);
    const [cart, setCart]=useState(initialCart())

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    }, [cart])

    function addToCart(guitar){
        const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
        console.log(itemIndex);
        if(itemIndex===-1){//Ese articuo aun no existe en el carrito
            guitar.quantity=1;
            setCart([...cart,guitar])
        }
        else{// si la guitarra ya se habia a;adido al carrito
            const updatedCart=[...cart]  //Creando una copia de la variable de estado
            updatedCart[itemIndex].quantity++
            setCart(updatedCart)
        }
        
    }

    function increaseQuantity(id){
    const updatedCart = cart.map(item =>item.id === id? { ...item, quantity: item.quantity + 1 }
            : item
    )
    setCart(updatedCart)
    }

    function decreaseQuantity(id){
    const updatedCart = cart.map(item =>item.id === id && item.quantity > 1? { ...item, quantity: item.quantity - 1 }
            : item
    )
    setCart(updatedCart)
    }

    function removeFromCart(id){
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }




    function calculateTotal(){
        /*let total=0;
        for (const guitar of cart) {
            total+=guitar.price * guitar.quantity;
        }*/
       let total=cart.reduce((total,item)=>total+item.price*item.quantity,0)
        return total;
    }

    


    return (
        <>
        <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} clearCart={clearCart}/>
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar)=>(
                <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
                ))}
                
                


            </div>
        </main>
        <Footer/>
        </>
    )
}

export default App