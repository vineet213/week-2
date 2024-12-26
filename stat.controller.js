import {Album} from "../models/album.model.js";
import {Song} from "../models/songs.models.js";
import {User} from "../models/user.model.js";


export  const getStats = async (req, res, next) => {
    try {
            // Optimized version
            const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
                Song.countDocuments(),
                User.countDocuments(),
                Album.countDocuments(),
    
    
                Song.aggregate([
                    {
                        $unionWith: {
                            coll: "albums",
                            pipeline: []
                        }
                    },
                    {
                        $group: {
                            _id: "$artist"
                        }
                    },
                    {
                        $count: "count"
                    }
                ])
            ]);
    
            res.status(200).json({ totalSongs, totalUsers, totalAlbums, totalArtists:uniqueArtists[0]?.count || 0 });
        } catch (error) { 
            next(error);
        }
    };
    
    
