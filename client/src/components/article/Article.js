import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Article = () => {
    const selectedArticle = useSelector((state) => state.article.selectedArticle);
    const [scrapedContent, setScrapedContent] = useState('');

    useEffect(() => {
        const fetchScrapedContent = async () => {
            if (selectedArticle.url) {
                try {
                    const response = await axios.get(`http://localhost:3001/scrape`, {
                        params: { url: selectedArticle.url }
                    });
                    setScrapedContent(response.data.content);
                } catch (error) {
                    console.error('Error fetching scraped content:', error);
                }
            }
        };

        fetchScrapedContent();
    }, [selectedArticle.url]);

    useEffect(() => {
        // Only run the DOM manipulation after the content has been set
        if (scrapedContent) {
            // const spans = document.getElementsByTagName('span');
            // Array.from(spans).forEach(element => {
            //     element.style.display = 'none';
            // });

            const lis = document.getElementsByTagName('li');
            Array.from(lis).forEach(element => {
                element.style.display = 'none';
            });

            const figures = document.getElementsByTagName('figure');
            Array.from(figures).forEach(element => {
                element.style.display = 'none';
            });

            const imgs = document.getElementsByTagName('img');
            Array.from(imgs).forEach(element => {
                element.style.margin = 'auto';
                element.style.width = "75%";
            });

            const svgs = document.getElementsByTagName('svg');
            Array.from(svgs).forEach(element => {
                element.style.display = 'none';
            });

            const h1s = document.getElementsByTagName('h1');
            Array.from(h1s).forEach(element => {
                element.style.fontWeight = 'bold';
                element.style.margin = "10px 4px";
            });
        }
    }, [scrapedContent]);

    if (!selectedArticle.title) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <img className='mt-15' src={selectedArticle.image} />
            <div className='my-10 w-3/4 text-wrap m-auto font-fira' dangerouslySetInnerHTML={{ __html: scrapedContent }} />
        </div>
    );
};

export default Article;
