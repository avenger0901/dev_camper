const ErrorResponse = require('../utils/errorResponse')
const Bootcamp =require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')


//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async (req,res,next) => {

    const bootcamps = await Bootcamp.find();

    res.status(200).json({success:true, count:bootcamps.length,data:bootcamps})
  
})

exports.getBootcamp = asyncHandler(async (req,res,next) => {

   const bootcamp = await Bootcamp.findById(req.params.id);

   if(!bootcamp){
     return  next(
       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
   }
   res.status(200).json({success:true, data:bootcamp});

})

exports.createBootcamp = asyncHandler(async(req,res,next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success:true,
        data:bootcamp
    })
});
//put
exports.updateBootcamp = asyncHandler( async(req,res,next) => {
  
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
      runValidators:true
    });
    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
      );
    }
    res.status(200).json({success:true,data:bootcamp})
    
});

//delete 
exports.deleteBootcamp = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
      );
    }
    res.status(200).json({success:true, data: {} })
  
});
