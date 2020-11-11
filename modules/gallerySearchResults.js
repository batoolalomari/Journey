'use strict';

const superagent = require('superagent');

const key = process.env.GALLERY_KEY;


var galleryResults = {

    searchResults: function (filter, res) {
        const queryParams = {
           
            query: filter,
            per_page: 9,
            

        };

        let Object;
        superagent.get(`https://api.pexels.com/v1/search`).query(queryParams).set('Authorization',key ).then(data => {
            let galleryObject = data.body.photos;
            let gallery = galleryObject.map(element => {
                Object = new Gallery(element.src.original);
                
                return Object;


            });
            

            res.render('pages/gallery/gallerySearchResult.ejs', { searchResults: gallery });
            

        });
    }
}

function Gallery(previewURL) {
    this.previewURL = previewURL;


};

module.exports= galleryResults;