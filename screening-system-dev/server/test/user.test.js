/* eslint-disable */
const User = require("../models/User");
const mongoose = require("mongoose");
const databaseName = "db";

beforeAll(async() => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

//test getUsers function
test("getUsers function: Valid case", async() => {
    let user = {
        _id: "5eb6e2be5dcecd753c4face2",
        Password: "39d968573eafac2628724a9d0918b9fb",
        EmailId: "123@123.com",
        FirstName: "Chainat",
        LastName: "Wontapan",

    }
    let json = {
        id: "5eb6e2be5dcecd753c4face2",
        email: "123@123.com",
        name: "Lakshay",
        lastName: "Anand",
    };
})