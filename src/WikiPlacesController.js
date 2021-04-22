const data = require('./db.json');

class WikiPlacesService {
        places = [];

        constructor() {
            this.places = data;
        }

        findAll() {
            return this.places;
        }

        findPlaceById(id) {
            const place = this.places.filter((p) => {
                return p.id === id;
            });
            if (place && place.length === 1) {
                return place[0];
            }
            return [];
        }
}


exports.DataFactory = WikiPlacesService;
