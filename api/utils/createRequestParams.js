function createRequestParams(req, res) {
    try {

        var filters = {};
        if (req.contentCategories) {
            var contentCategories = req.contentCategories;
            filters.contentFilter = {
                "includedContentCategories": contentCategories
            };
        }

        if (req.dates) {

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

            var dates = req.dates;
            filters.dateFilter = {
                "dates": dates
            };
        } else if (req.ranges) {
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


            var ranges = req.ranges;
            filters.dateFilter = {
                "ranges": ranges
            }
        }

        if (req.feature) {

            /*
             feature : (List) of feature Enum.
             */

            var feature = req.feature;
            filters.featureFilter = {
                "includedFeatures": feature
            }
        }
        filters.mediaFilter =  {
            "mediaTypes": [
                "PHOTO"
            ]
        };

        params = {
            "filters" : filters
        };
        console.log(params);
        return params;

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Error in parameters" });
    }
}

module.exports = createRequestParams;