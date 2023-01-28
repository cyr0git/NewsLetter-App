const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var request = require('request');
const { response } = require("express");
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailID = req.body.emailID;

    const data = {
        members: [
            {
                email_address: emailID,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/95a2874699";
    const options = {
        method: "POST",
        auth: "skm:b606cd8801d30d25b7cc61e923456b06-us14"
    }
    const request = https.request(url, options, (response) => {

        if(response.statusCode===200)
        {
            res.sendFile(__dirname +"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT ||3000, () => {
    console.log("working on 3000");
})

// API Key
// b606cd8801d30d25b7cc61e923456b06-us14

//Audience ID
// 95a2874699
