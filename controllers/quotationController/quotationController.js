const quotationSchema = require('../../models/quotationModel.js');


function generateSixDigitNumber() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}

async function addData(customerId, itemData) {
    try {
      const customer = await quotationSchema.findOneAndUpdate(
        { CustomerID: customerId },
        { $push: { items: itemData } },
        { new: true, upsert: true }
      );
      
  
      console.log('Data added successfully:', customer);
      
     
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }



const quotation = async (req, res) => {
    try {
        const customerName = req.body.customerName;
        const itemName = req.body.itemName;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const customerId = req.body.customerId;
        if (!customerName || !itemName || !quantity) {
            res.status(400).json("Please provide all fields");
        } else {

            const data =await  quotationSchema.find({CustomerID:customerId})
            if(data.length >0)
            {
                 let itemData= {
                    ItemName: itemName,
                    Quantity: quantity + " sq.fit",
                    Price: price,
                    
                 }
                addData(customerId, itemData);
              res.send({ message: "Data insert successfully!", statuscode: 200, status: true, errormessage: "", data:[] }); 

            }
            if(data.length <1)
            {
                let newQuotation = await quotationSchema.create({
                    CustomerID: generateSixDigitNumber(),
                    CustomerName: customerName,
                    // TotalAmount:"$"+price,
                    items: [
                        {
                            "ItemName": itemName,
                            "Quantity": quantity + " sq.fit",
                            "Price": price,
    
                        }
                    ]
                });
                newQuotation.save();
                console.log(newQuotation);
                res.status(201).json(newQuotation);

            }
            
        }

    }
    catch (err) {

        res.send(err)
        console.log(err)
    }
}

module.exports = quotation;



