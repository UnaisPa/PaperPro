import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { IoImage, IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { toast } from "react-toastify";
import Axios from "axios";
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadForm({ open, setOpen }) {
    const fileInputRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [images, setImages] = React.useState([])
    const [videos, setVideos] = React.useState([])

    const [img, setImg] = React.useState(null)
    const [video, setVideo] = React.useState(null)
    const [content, setcontent] = React.useState('');

    const handleImgButtonCLick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    }

    const [prevImgages, setPrevImages] = React.useState([])

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        //images
        if (file.type.startsWith('image')) {
            setImages((prev) => [...prev, file])
        }
        //videos
        else if (file.type.startsWith('video')) {
            setVideos((prev) => [...prev, file])
        }

        // Do something with the selected file
        const imageUrl = URL.createObjectURL(file);
        setPrevImages((prev) => [...prev, imageUrl])
           

        // setImg(file);
        // if (file) {
        //     // Do something with the selected file
        //     const imageUrl = URL.createObjectURL(file);
        //     setPrevImg(imageUrl);
        //     console.log('Selected file:', file);
        // }
    }

    //Dialog 
    const handleClose = () => {
        setOpen(false);
    };

    //Upload file to cloudingary
    const uploadFile = async (files, type) => {
        // const data = new FormData();

        // files.forEach(file => {
        //     data.append('file',file);
        // });

        //data.append('file',type === 'image' ? img : video );
        //data.append('upload_preset',type==='image'? 'images_preset' : 'videos_preset');
        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            const uploadPreset = type === 'image' ? 'images_preset' : 'videos_preset';
            const resourceType = type
            // const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            // const response = await Axios.post(api,data, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     }});

            // const uploadedUrls = response.data.resources.map((resource) => resource.secure_url);
            // console.log(response.data);
            // return uploadedUrls
            const uploadedUrls = [];

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', uploadPreset);

                const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

                const response = await Axios.post(api, data);
                const { secure_url } = response.data;
                uploadedUrls.push(secure_url);
            }

            return uploadedUrls;
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            //Upload images
            if (images) {
                console.log(images)
                const imageUrls = await uploadFile(images, 'image');
                console.log(imageUrls)
            }

            //Upload videos
            //if(videos==null) {const videoUrls = await uploadFile(videos,'video');}



            setTimeout(() => {
                toast.success('success')
                setLoading(false)
            }, 1000)
            //Reset states
            setImages(null);
            setVideos(null)
        } catch (err) {
            setLoading(false)
            console.error(err)
            toast.error(err.message)
        }
    }

    //remove image from form
    const removeImage = (index) =>{
        console.log()
        setPrevImages(prevImgages.filter((_,i)=>i!==index));
        setImages(images.filter((_,i)=>i!==index));
        
    }

    React.useEffect(()=>{
        console.log(images)
    },[images])
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth={true}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className="bg-boxSecondary text-white">
                    <DialogTitle className="text-center sm:text-left font-semibold">
                        Create Post
                    </DialogTitle>
                    <form onSubmit={handleSubmit} className="w-full" >
                        <DialogContent>
                            {/* <DialogContentText id="alert-dialog-slide-description"> */}
                            <div className="mt-1 h-48">
                                <textarea
                                    onChange={(e) => setcontent(e.target.value)}
                                    name="content"
                                    placeholder="Start writing here..."
                                    className="block w-full h-full bg-transparent text-white resize-none outline-none"
                                    style={{
                                        position: "",
                                        margin: 0,
                                        top: 0,
                                        left: 0,
                                        boxSizing: "border-box",
                                        fontSize: "inherit",
                                        letterSpacing: "inherit",
                                        bottom: 0,
                                        overflow: "auto",
                                        lineHeight: "20px",
                                        color: "white",
                                        flexGrow: 1,
                                        padding: "5px 0",
                                        borderColor: "transparent",
                                    }}
                                ></textarea>
                            </div>
                            {/* </DialogContentText> */}
                            <div className="flex gap-x-2" >
                                {/* {prevImgages && <Badge className="cursor-pointer" onClick={() => { setPrevImg(false); setImg(null) }} badgeContent={'X'} color="primary">
                                    <img src={prevImg} className="w-10 h-10" />
                                </Badge>} */}
                                {prevImgages && (
                                    prevImgages.map((img,index)=>{
                                        return(
                                            <>
                                                <img src={img}  className="w-12 h-12" />
                                                <Badge key={index} onClick={()=>removeImage(index)} className="cursor-pointer"  badgeContent={<IoClose/>} color="primary"></Badge>
                                                
                                            </>
                                        )
                                    })
                                )}
                            </div>
                        </DialogContent>

                        <DialogActions>

                            <div className="ml-2 mr-2 flex  w-full">

                                <input
                                    multiple
                                    name="image"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <IconButton onClick={handleImgButtonCLick} className="" variant="" color="inherit">
                                    <IoImageOutline className="" size={20} />
                                </IconButton>
                                <IconButton className="" variant="" color="inherit">
                                    <IoVideocamOutline className="mr-auto" size={20} />
                                </IconButton>
                                <div className="ml-auto mr-3" >
                                    <button type="button" className="color-secondary mr-3 text-slate-400" onClick={handleClose}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ fontFamily: '"Poppins", sans-serif' }}
                                        className=" p-1.5 font-semibold px-3 bg-primary text-black rounded-lg mr-3 hover:bg-hoverColor"
                                    >
                                        {loading ? <><ClipLoader size={13} /> Uploading...</> : 'Upload'}

                                    </button>
                                </div>

                            </div>

                        </DialogActions>
                    </form>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
