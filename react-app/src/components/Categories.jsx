import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import categories from './CategoriesList';


const Categories = (props) => {
const navigate = useNavigate();
    
    return (
        <div className='cat-container'>
            <div>
                <span className='pr-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span key={index} onClick={()=> navigate('/category/' + item ) } className='category'> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}

export default Categories