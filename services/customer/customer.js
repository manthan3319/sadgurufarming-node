/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../utilities/dbService");
const messages = require("../../utilities/messages");

/*************************** addContractor ***************************/
const addContractor = async (req, mainUserId, createdBy) => {
  console.log(req.body);

  // Convert hours to string and then split
  let Hours = req.body.hours.toString();

  // Parse hours and minutes separately
  const [hoursPart, minutesPart] = Hours.split('.');
  const hours = parseInt(hoursPart, 10); // Hours
  const minutes = parseInt((minutesPart || '0').padEnd(2, '0').substring(0, 2), 10); // Minutes, default to 0 if not provided, padded to 2 digits, and taking only the first 2 digits

  // Calculate total hours as a decimal
  const totalHours = hours + (minutes / 60);

  // Convert price to float
  const priceHours = parseFloat(req.body.price);

  // Calculate total price
  let countTotalprice = totalHours * priceHours;
  let Data = {
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    surName   : req.body.surName,
    instrumentName : req.body.instrumentName,
    phone     : req.body.phone,
    hours     : req.body.hours,
    price     : req.body.price,
    totalPrice: countTotalprice
  }
  console.log("Data",Data);

  if(Data){
     let AddBill = await dbService.createOneRecord("customerModel", Data);

    return{
      messages:"Bill Add sucuessfuly.",
    }
  }

};



module.exports = {
  addContractor,
};
