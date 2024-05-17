/**
 * This is for Contain function layer for contractor service.
 * @author Manthan Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../utilities/dbService");
const messages = require("../../utilities/messages");
const { decryptPassword } = require("../../utilities/pagination")

/*************************** addContractor ***************************/
const onLogin = async (req, res, next) => {
  const payload = req.body;
  console.log("payload==>", payload);
  let userData = await dbService.findOneRecord("contractorModel", {
    email: payload.email.toLowerCase(),
    isDeleted: false,
  });
  console.log("userData==>", userData);
  if (!userData) throw new Error("Email not exists");

  let match = await decryptPassword(payload.password, userData.password);
  if (!match) throw new Error("Password Invalid");
  if (userData.isMailVerified == false) throw new Error("Please verify email");

  if (userData?.loginToken) {
    if (userData?.loginToken?.length >= 5) {
      let rr = await dbService.findOneAndUpdateRecord(
        "contractorModel",
        { _id: userData._id },
        {
          $pop: { loginToken: -1 },
        },
        { new: true }
      );
    }
  }

  let token = await generateJwtTokenFn({ userId: userData._id });
  let updateData = {
    $push: {
      loginToken: {
        token: token,
      },
    },
    lastLoginDate: Date.now(),
  };

  let data = await dbService.findOneAndUpdateRecord(
    "contractorModel",
    { _id: userData._id },
    updateData,
    { new: true }
  );

  // res.setHeader("Access-Control-Expose-Headers", "token");
  // res.setHeader("token", data.loginToken[data.loginToken.length - 1].token);

  return {
    email: data.email,
    lastLogin: data.lastLoginDate,
    token: token,
  };
};


/*************************** addContractor ***************************/
const addContractor = async (req,) => {
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
  const currentDate = new Date();
  let Data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    surName: req.body.surName,
    instrumentName: req.body.instrumentName,
    phone: req.body.phone,
    hours: req.body.hours,
    price: req.body.price,
    totalPrice: countTotalprice,
    date: currentDate
  }

  if (Data) {
    let AddBill = await dbService.createOneRecord("customerModel", Data);

    return {
      messages: "Bill Add sucuessfuly.",
    }
  }

};


/*************************** getCustomer ***************************/
const getCustomer = async (req,) => {

  let where = {
    phone: req.body.phone,
    isDeleted: false
  }

  let GetcostomerData = await dbService.findRecordWithFilterFn("customerModel", where);

  if (GetcostomerData) {
    return {
      customerdata: GetcostomerData,
      message: "customer data sucessful"
    }
  } else {
    return {
      messages: "customer data not get"
    }
  }
}


/*************************** listtotalbill ***************************/
const listtotalbill = async (req,) => {

  let where = {
    phone: req.body.phone,
    isDeleted: false
  }

  let Gettotalbillreacod = await dbService.findRecordWithFilterFn("totalbillModel", where);

  if (Gettotalbillreacod) {
    return {
      totalBillData: Gettotalbillreacod,
      message: "totalbil data get sucessful"
    }
  } else {
    return {
      messages: "customer data not get"
    }
  }
}

/*************************** listtotalbill ***************************/
const RallbilLiat = async (req,) => {

  let where = {
    isDeleted: false
  }

  let Gettotalbillreacod = await dbService.findRecordWithFilterFn("customerModel", where);

  if (Gettotalbillreacod) {
    return {
      totalBillData: Gettotalbillreacod,
      message: "totalbil data get sucessful"
    }
  } else {
    return {
      messages: "customer data not get"
    }
  }
}


/*************************** listtotalbill ***************************/
const listAllBill = async (req,) => {

  let where = {
    phone: req.body.phone,
    isDeleted: false
  }

  let Gettotalbillreacod = await dbService.findRecordWithFilterFn("getbillModel", where);
  console.log("Gettotalbillreacod",Gettotalbillreacod);
  if (Gettotalbillreacod) {
    return {
      totalBillData: Gettotalbillreacod,
      message: "totalbil data get sucessful"
    }
  } else {
    return {
      messages: "customer data not get"
    }
  }
}

/*************************** dashbordList ***************************/
const dashbordList = async (req,) => {

  let where = {
    isDeleted: false
  }

  let TotalbillModelCollectionData = await dbService.findRecordWithFilterFn("totalbillModel", where);
  let CustomerCollectionData = await dbService.findRecordWithFilterFn("customerModel", where);

  let RemaindingTotalAbount = CustomerCollectionData.reduce((sum, payment) => sum + parseFloat(payment.totalPrice), 0);

  const arraviTotalAbount = TotalbillModelCollectionData.reduce((sum, record) => {
    return sum + parseFloat(record.billtotalamount);
  }, 0);

  if (arraviTotalAbount) {
    return {
      arraviTotalAbount: arraviTotalAbount,
      RemaindingTotalAbount: RemaindingTotalAbount,
      message: "data get sucessfuly!"
    }
  } else {
    return {
      messages: "data not get"
    }
  }
}




/*************************** addContractor ***************************/
const getbill = async (req, res) => {
  console.log("getbill", req.body);

  const { selectedCustomerDetails, totalSelectedPrice } = req.body;

  // Add current date to each selected customer detail
  const currentDate = new Date();
  const formattedDetails = selectedCustomerDetails.map(detail => ({
    firstName: detail.firstName,
    lastName: detail.lastName,
    surName: detail.surName,
    instrumentName: detail.instrumentName,
    billtotalamount: detail.billtotalamount,
    phone: detail.phone,
    hours: detail.hours,
    price: detail.price,
    date: currentDate,
  }));

  // Insert multiple records into getbillModel
  let getbilldata;
  try {
    getbilldata = await dbService.createManyRecords("getbillModel", formattedDetails);
  } catch (error) {
    console.error("Error inserting records into getbillModel:", error);
  }

  // Prepare and insert the total bill data into totalbillModel
  const totalBillData = {
    firstName: selectedCustomerDetails[0].firstName,
    lastName: selectedCustomerDetails[0].lastName,
    surName: selectedCustomerDetails[0].surName,
    phone: selectedCustomerDetails[0].phone,
    billtotalamount: req.body.totalSelectedPrice,
    date: currentDate,
  };

  let totalbilladd;
  try {
    totalbilladd = await dbService.createOneRecord("totalbillModel", totalBillData);
  } catch (error) {
    console.error("Error inserting record into totalbillModel:", error);
  }

  // Update isDeleted field for all selected customer records
  const customerIds = selectedCustomerDetails.map(detail => detail._id);
  let updatecustomer;
  try {
    updatecustomer = await dbService.updateManyRecords(
      "customerModel",
      { _id: { $in: customerIds } },
      { isDeleted: true }
    );

  } catch (error) {
    console.error("Error updating customer records:", error);
  }

  // Respond with success message
  return {
    message: "Records successfully added and updated",
    getbilldata,
    totalbilladd,
    updatecustomer,
  };
};





module.exports = {
  addContractor,
  getCustomer,
  getbill,
  listtotalbill,
  listAllBill,
  onLogin,
  RallbilLiat,
  dashbordList
};


