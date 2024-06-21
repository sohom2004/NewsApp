import React from 'react'
import { SearchOutlined } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, selectSearchQuery } from '../../redux/news';


const Navbar = () => {
    const dispatch = useDispatch();
    const search = useSelector(selectSearchQuery);
    
    const handleSearchChange = (event) => {
        dispatch(setSearch(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted search query:", search);
    };

    return (
        <div class="bg-cyan-500 border-gray-200 mb-8 shadow-lg">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-4 ">
                <div className='pl-4 2xl:pl-0'>
                    <a href='/' className='text-2xl font-bold font-playWrite hover:text-white'>NewsApp</a>
                </div>
                <div className='flex content-center justify-center md:w-2/5 w-3/5'>
                    <button><FavoriteBorderIcon className='w-full' sx={{ fontSize: 30, "&:hover": { color: "white" }}}/></button>
                    <form onSubmit={handleSubmit} className='flex content-center justify-center w-full'>
                        <input type='text' value={search} onChange={handleSearchChange} className='border-1 border-black rounded-l-lg p-2 md:w-3/4 w-3/5 outline-none' placeholder='Search...' />
                        <button type='submit' className='pr-2 md:pr-4 bg-white rounded-r-lg text-gray-500'><SearchOutlined sx={{ fontSize: 30 }}/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Navbar
