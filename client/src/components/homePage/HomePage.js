// 96aa729cb8a54fff8cc2ab226e33dc2a 6002c4bb10674140b999a95014992078 44d985f03a974a1f814d8a7ba42f69df
import React from 'react'
import Navbar from '../navbar/Navbar'
import { Divider } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import Cards from '../cards/Cards';
import { Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchQuery } from '../../redux/news';

const HomePage = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = React.useState(1);
    const searchQuery = useSelector(selectSearchQuery);
    const dispatch = useDispatch();

    const handleClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handlePageChange = (event, value) => {
        setPageNum(value);
    };

    const fetchNews = async (pageNum, query) => {
        try {
            const searchQuery = query ? query : 'all';
            var url = 'https://newsapi.org/v2/everything?' +
                'q=' + searchQuery +
                '&pageSize=12&' +
                'page=' + pageNum +
                '&language=en' +
                '&apiKey=44d985f03a974a1f814d8a7ba42f69df';
            var req = new Request(url);
            let resp = await fetch(req);
            const data = await resp.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNews(pageNum, searchQuery);
    }, [pageNum, searchQuery]);

    const handleCategoryClick = (category) => {
        fetchNews(1, category);
    };


    return (
        <div className='font-fira'>
            <Navbar />
            <div className='w-1/4'>
                <div className='relative m-6 w-1/3' onClick={handleClick}>
                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className='bg-cyan-200 rounded-xl py-2 px-4 font-fira hover:bg-cyan-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 flex flex-row shadow-md' type='button'><span>Category</span> <ArrowDropDown /></button>
                    {isDropdownVisible && <div className='absolute mt-2 bg-cyan-100 p-2 divide-gray-100 rounded-lg shadow w-44 z-10'>
                        <ul className='py-2 text-sm text-gray-700'>
                            <a href="#" onClick={() => handleCategoryClick("all")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</a>
                            <a href="#" onClick={() => handleCategoryClick("business")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Business</a>
                            <a href="#" onClick={() => handleCategoryClick("technology")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Technology</a>
                            <a href="#" onClick={() => handleCategoryClick("entertainment")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Entertainment</a>
                        </ul>
                    </div>}
                </div>
            </div>
            <div className='flex flex-wrap flex-col md:flex-row items-center w-full justify-evenly px-2'>
                {data && data.articles && data.articles.map(({ title, urlToImage, content, description, url }, index) => (
                    <Cards key={index} title={title} image={urlToImage} content={content} description={description} url={url} />
                ))}
            </div>

            <div className='flex items-center justify-center my-10'>
                <Stack spacing={2}>
                    <Pagination count={5} page={pageNum} onChange={handlePageChange} />
                </Stack>
            </div>

            
        </div>
    )
}

export default HomePage
