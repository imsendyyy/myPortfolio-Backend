const Testimonial = require("../models/Testimonial");


// Get All Testimonials
const getTestimonials = async(req, res) => {
    try {
        const testimonial = await Testimonial.find();
        res.status(200).json(testimonial)
    } catch (error) {
        res.status(500).json({ error : "Server Error While Getting All Testimonials"})
    }
}


// Add New Testimonial
const addNewTestimonial = async(req, res) => {
    try {
        let imageUrl = null;
        if(req.file) {
            imageUrl = req.file.path;
        }
        const newTesti = new Testimonial({
            ...req.body,
            imageUrl : imageUrl,
        });
         await newTesti.save();
        res.status(200).json({ message : "New Testimonial Created Successfully", testimonial : newTesti});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : "Server Error While Adding New Testimonials"});
    } 
}


// Update Testimonial
const updateTestimonial = async(req, res) => {
    const { id } = req.params ;
    const { name, feedback, company, designation, rating} = req.body;

    try {
        let updatedFields =  {name, feedback, company, designation, rating}
        if(req.file){
            updatedFields.imageUrl = req.file.path;
        }
        const updateTesti = await Testimonial.findByIdAndUpdate(id, updatedFields, {new : true})

        if(!updateTesti){
            return res.status(404).json({ error : "Testimonial not Found"});
        }
        res.status(200).json({ message : "Testimonial Upadeted Successfully", testimonial : updateTesti})
    } catch (error) {
        res.status(500).json({ error : "Server Error While Updating Testimonial"})
    }
}


//Delete Testimonial
const deleteTestimonial = async( req, res) => {
    const { id } = req.params

    try {
        const deleteTesti = await Testimonial.findByIdAndDelete(id)
        if(!deleteTesti) {
            return res.stauts(404).json({ error : "Testimonial Not Found"})
        }
        res.status(200).json({ message : "Testimonial Deleted Successfully"})
    } catch (error) {
        res.status(500).json({ error : " Server Error While Deleting Testimonial"})
    }
}

module.exports = { getTestimonials, addNewTestimonial, updateTestimonial, deleteTestimonial}