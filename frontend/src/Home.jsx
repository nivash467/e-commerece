import {Link} from 'react-router-dom'

function Home(){
    return(
        <div style={{padding:"20px"}}>
            <h1>Welcome to our Store</h1>

            <Link to="/products" >
                <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
                    alt="store banner" 
                    style={{width:"100%", height:"400px", objectFit:"cover", cursor:"pointer", borderRadius:"8px"}}
                />
            </Link>
            <p>Click the image to explore products</p>
        </div>
    )
}

export default Home