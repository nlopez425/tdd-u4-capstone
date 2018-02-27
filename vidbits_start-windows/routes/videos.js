const router = require('express').Router();
const Video = require("../models/video");


router.get('/',async (req,res)=>{
    const videos = await Video.find({});
    res.render('videos/index',{videos});
});

router.get('/videos/create',(req,res)=>{
    res.render('videos/create');
});

router.post('/videos', async (req, res) => {
    const {title, description,url} = req.body;
    const video = new Video({title,description,url});
    const error = video.validateSync();
    
    if(error){
        res.status(400).render('videos/create',{error,video})
    }else{
        await Video.create(video);
        const videoDetails = await Video.findOne({"title":title,"description":description});
        res.redirect(302,'videos/'+videoDetails._id);
    }
})

router.get('/videos/:id',async(req,res)=>{
    //find video
    const videoDetails = await Video.findOne({"_id":req.params.id});
    res.render('videos/show',{videoDetails});
})

router.get('/videos/:id/edit',async(req,res)=>{
    //find video
    const videoDetails = await Video.findOne({"_id":req.params.id});
    res.render('videos/edit',{videoDetails});
})

router.post('/videos/:id/update',async(req,res)=>{
    //find video
    const {title,description,url} = req.body;

    if(title == "" || title == undefined){
        let error = "missing title";
        let video = {title:title,description:description,url:url};
        res.status(400).render('videos/edit',{error,video})
    }else{
        await Video.update({"title": title},function(error){});
        const videoDetails = await Video.findOne({"_id":req.params.id});
        res.status(302).render('videos/show',{videoDetails});
    }


})

router.post('/videos/:id/delete',async(req,res)=>{
    
    await Video.remove({"_id": req.params.id},function(error){});
    res.redirect(302,"/");
    
})


module.exports = router;