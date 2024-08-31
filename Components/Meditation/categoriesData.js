import cateImage1 from '../../Imgs/trackCategories/cate1.jpg';
import cateImage2 from '../../Imgs/trackCategories/cate2.jpg';
import cateImage3 from '../../Imgs/trackCategories/cate3.jpg';
import cateImage4 from '../../Imgs/trackCategories/cate4.jpg';
import cateImage5 from '../../Imgs/trackCategories/cate5.jpg';

import song1 from'../../mediationMusic/song1.mp3'
import song2 from'../../mediationMusic/song2.mp3'
import song3 from'../../mediationMusic/song3.mp3'
import song4 from'../../mediationMusic/song4.mp3'




export const categoriesData =[
    {id:1, name:'Darkness', cateImage: require('../../Imgs/trackCategories/cate1.jpg')},
    {id:2, name:'Winter', cateImage: require('../../Imgs/trackCategories/cate2.jpg') },
    {id:3, name:'Peacful', cateImage: require('../../Imgs/trackCategories/cate3.jpg')},
    {id:4, name:'Mountain', cateImage: require('../../Imgs/trackCategories/cate4.jpg') },
    {id:5, name:'Summer', cateImage: require('../../Imgs/trackCategories/cate5.jpg') },
        ];

export const songsData =[
    {id:1,title: 'Song 1', category:'Darkness', songImage: cateImage1,mp3: song1},
    {id:2,title: 'Song 2', category:'Darkness', songImage: cateImage1,mp3: song2},
    {id:3,title: 'Song 3', category:'Peacful', songImage: cateImage1,mp3: song2},
    {id:4,title: 'Song 4', category:'summer', songImage: cateImage1,mp3: song1},
        ];
