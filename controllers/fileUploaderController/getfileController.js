const fileuploadSchema = require('../../models/fileuploadModel.js');
const getFileData = async(req,res)=>{


   
        try{
            const data = await fileuploadSchema.find({})
            if(data.length>0)
            {
                let jsonData=[]
                for(let i =0;i<data.length;i++)
                {
                    jsonData.push({
                        title:data[i].title,
                        description:data[i].description,
                        fileUrl:data[i].fileUrl
                     
                     })
                }
                res.send({ message: "file Data", statuscode: 200, status: true, errormessage: "", data: jsonData });  
            }
            if(data.length <1)
            {
                res.send({ message: "", statuscode: 404, status: false, errormessage: "Data Not Found! ", data: [] });
            }
        }
        catch(err)
        {
            res.send(err);
            console.log(err);
        }
    
}

module.exports = getFileData