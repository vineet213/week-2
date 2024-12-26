import { Song } from "../models/songs.models.js";
import {Album} from "../models/album.model.js";
import cloudinary from '../lib/cloudinary.js';

//HELPER FUNCTION FOR CLOUDINARY UPLOADS
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto",
        })
        return result.secure_url
    } catch (error) {
        console.log("error in uploadToCloudinary",error);
        throw new Error("Error uploading to cloudinary"); 
        
    }

}

export const createSong = async (req, res, next) => {
    try {
        // Check if all required files are present
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all required files (audio and image)." });
        }

        const { title, artist, albumId, duration } = req.body;

        // Extract files
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Construct URLs or paths for uploaded files 
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);
        // Create new song instance
        const song = new Song({
            title,
            artist,
            albumId: albumId|| null,
            audioUrl,
            imageUrl,
            duration,
        });

        // Save the song to the database
        await song.save();
        //If songs belong to an album then update
        if (albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: songs._id},

            })
        }

        res.status(201).json({ message: "Song created successfully!", song });
    } catch (error) {
        console.log("Error in createSong controller:", error);
        next(error);
       
    }
};


export const deleteSong = async(req, res, next) =>{
    try {
        const {id } = req.params

        const song = await Song.findById(id)
        if (song.albumId){
            await Album.findByIdAndUpdate(song/albumId, {
                $pull: {songs: song_.id},
            })
        }

        await Song.findByIdAndUpdate(id)
        res.status(200).json({message: "Song deleted successfully"});


    } catch (error) {   
        console.log("error in deleteSong",error);
        next(error)
    }
};

export const createAlbum = async (req, res, next) =>{
    try {
        const {title,artist,releaseYear} = req.body
        const{imageFile}= req.files

        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        })

        await album.save()

        res.status(201).json({message:"Album created successfully",album})
    } catch (error) {
        console.log("error in createAlbum",error);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log("error in deleteAlbum",error);
        next(error);
        
    }
};

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin:true});
};