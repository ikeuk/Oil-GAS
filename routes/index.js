const express = require('express')
const path = require('path')
const multer = require('multer')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Gallary = require('../models/Gallary')
const Mission = require('../models/Mission')
const Fleets = require('../models/Fleets')
const PreviouseProject = require('../models/PreviouseProject')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../config/auth')

const router = express.Router()


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-'+ Date.now() +
        path.extname(file.originalname))
    }
})

//init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('myImage')

function checkFileType(file, cb){
    //Allow ext
    const filetypes = /jpeg|jpg|png|gif/
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
        if(mimetype && extname){
            return cb(null, true)
        } else {
            cb('Error: Images Only')
        }
}

//Get Home Page
router.get('/', (req, res) => {
    res.render('home')
}) 

//Register Routes
router.get('/register', (req, res) => {
    res.render('register', {
        layout: 'registerHead',
    })
}) 

router.post('/register', async (req, res) => {
    const {name, email, password } = req.body
     User.findOne({email: email })
     .then(user => {
         if(user){
             res.render('userregister')
         } else {
             const newUser = new User({
                 name,
                 email,
                 password
             })
             
             bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) =>{
             if(err) throw err
                 newUser.password = hash
                 newUser.save()
                 .then(user => {
                     res.redirect('/login')
                 })
                 .catch(err => console(err))
             }))
         }
     })
 })

 //@routr GET /
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'registerHead',
    })
}) 

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
    })(req, res, next)
}) 

//Get Home Page
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        layout: "registerHead"
    })
}) 

router.post('/upload', async (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('dashboard', {
                msg: err
            }) 
        } else {
            var myFile = req.file.filename
            const newFile = { 
                img: myFile,
                title: req.body.title,
                description: req.body.description
            }
             //console.log(newFile)
            if(newFile){
                $gallary = new  Gallary({
                    imagename: myFile,
                    title:req.body.title,
                    description: req.body.description
                })
                 $gallary.save()
                 res.render('dashboard', {
                    msg: "You have Successfully Uploaded a file To Our Projects"
                 })
            }
            
        }
    })
}) 

//Get Success Page
router.get('/success', (req, res) => {
    res.render('success', {
        msg: "You have Successfully Uploaded a file",
        layout: "registerHead"
    })
}) 

//Get Project Page
router.get('/projects', async (req, res) => {
    try {
        const list = await Gallary.find().limit(8).lean()
        list.sort().reverse()
        if(!list){
            return res.render('users')
        } else {
            res.render('projects', { 
                layout: 'registerHead',
                list
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
}) 

//Get Previouse Project Page

router.get('/addpreviouse', (req, res) => {
    res.render('addpreviouse', {
        layouts: 'registerHead'
    })
})

router.post('/uploadPreviouse', async (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('dashboard', {
                msg: err
            }) 
        } else {
            var myFile = req.file.filename
            const newFile = { 
                img: myFile,
                title: req.body.title,
                description: req.body.description
            }
             //console.log(newFile)
            if(newFile){
                $previouse = new  PreviouseProject({
                    imagename: myFile,
                    title:req.body.title,
                    description: req.body.description
                })
                 $previouse.save()
                 res.render('addpreviouse', {
                    msg: "You have Successfully Uploaded a file To Previouse Project"
                 })
            }
            
        }
    })
}) 
//Get Previouse Page
router.get('/previous', async (req, res) => {
    try {
        const list = await PreviouseProject.find().limit(8).lean()
        list.sort().reverse()
        if(!list){
            return res.render('users')
        } else {
            res.render('projects', { 
                layout: 'registerHead',
                list
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

//Get Add Missions

router.get('/addmission', (req, res) => {
    res.render('addmission', {
        layouts: 'registerHead'
    })
})
router.post('/uploadmission', async (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('addmission', {
                msg: err
            }) 
        } else {
            var myFile = req.file.filename
            const newFile = { 
                img: myFile,
                title: req.body.title,
                description: req.body.description
            }
             //console.log(newFile)
            if(newFile){
                $mission = new  Mission({
                    imagename: myFile,
                    title:req.body.title,
                    description: req.body.description
                })
                 $mission.save()
                 res.render('success', {
                    msg: "You have Successfully Uploaded a file To Our Mission"
                 })
            }
            
        }
    })
})

//Get Previouse Page
router.get('/mission', async (req, res) => {
    try {
        const list = await Mission.find().limit(8).lean()
        list.sort().reverse()
        if(!list){
            return res.render('mission')
        } else {
            res.render('mission', { 
                layout: 'registerHead',
                list
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

//Get Our Fleets Page

router.get('/addfleets', (req, res) => {
    res.render('addfleets', {
        layouts: 'registerHead'
    })
})

router.post('/uploadfleets', async (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('addfleets', {
                msg: err
            }) 
        } else {
            var myFile = req.file.filename
            const newFile = { 
                img: myFile,
                title: req.body.title,
                description: req.body.description
            }
             //console.log(newFile)
            if(newFile){
                $fleets = new  Fleets({
                    imagename: myFile,
                    title:req.body.title,
                    description: req.body.description
                })
                 $fleets.save()
                 res.render('addfleets', {
                    msg: "You have Successfully Uploaded a file To Our Fleets"
                 })
            }
            
        }
    })
})

//Get Fleets Page
router.get('/fleets', async (req, res) => {
    try {
        const list = await Fleets.find().limit(8).lean()
        list.sort().reverse()
        if(!list){
            return res.render('fleets')
        } else {
            res.render('Fleets', { 
                layout: 'registerHead',
                list
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

router.get('/about', (req, res) => {
    res.render('about', {
        layout: 'registerHead',
    })
})

router.get('/policy', (req, res) => {
    res.render('policy', {
        layout: 'TpPolicy',
    })
})
router.get('/vision', (req, res) => {
    res.render('vision', {
        layout: 'TpVision',
    })
})
router.get('/mision', (req, res) => {
    res.render('mision', {
        layout: 'Tpmision',
    })
})

router.get('/services', (req, res) => {
    res.render('services', {
        layout: 'Tpservices',
    })
})
router.get('/special', (req, res) => {
    res.render('special', {
        layout: 'Tpspecial',
    })
})
router.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'Tpspecial',
    })
})
router.post('/contact', async (req, res) => {
   const contact = {
       name: req.body.name,
       email: req.body.email,
       subject: req.body.subject,
       message: req.body.message
   }
   try {
  
    if(!contact) {
        res.render("contact")
    } else {
        await Contact.create(contact)
       res.redirect("/")
    }
} catch (error) {
    console.log(error)
}
})

//Show Cleint That contacted Us
router.get('/contact_show', async (req, res) => {
    try {
        const list = await Contact.find().lean()
        list.sort().reverse()
        if(!list){
            return res.render('contact_show')
        } else {
            res.render('contact_show', { 
                layout: 'Tpspecial',
                list
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
}) 

router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/contact_show')
        } else {
            res.redirect('/contact_show')
        }
    })
})
module.exports = router