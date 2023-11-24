function createRequestParams(req, res) {
    try {

        var filters = {};
        if (req.body.contentCategories) {
            var contentCategories = req.body.contentCategories;
            filters.contentFilter = {
                "includedContentCategories": contentCategories
            };
        }

        if (req.body.dates) {

            /*
                dates : (List) of Date objects. MAX of 5 dates
            [   
                {
                    day : (int)
                    month : (int)
                    year : (int)
                },
            ]
            */

            var dates = req.body.dates;
            filters.dateFilter = {
                "dates": dates
            };
        } else if (req.body.ranges) {
            /*
                ranges : (List) of DateRange Objects. Max of 5 ranges
                [
                    {
                        "endDate" : {
                            day : (int)
                            month : (int)
                            year : (int)
                        }
                        "startDate" : {
                            day : (int)
                            month : (int)
                            year : (int)
                        }
                    }, 
                ]
            */


            var ranges = req.body.ranges;
            filters.dateFilter = {
                "ranges": ranges
            }
        }

        if (req.body.feature) {

            /*
             feature : (List) of feature Enum.
             */

            var feature = req.body.feature;
            filters.featureFilter = {
                "includedFeatures": feature
            }
        }
        filters.mediaTypeFilter =  {
            "mediaTypes": [
                "PHOTO"
            ]
        };

        // params = {
        //     "filters" : filters
        // };
        console.log(filters);
        return filters;

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Error in parameters" });
    }
}

module.exports = createRequestParams;