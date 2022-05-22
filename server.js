const dataset = require("./dataset.json");
const cors = require("cors");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 8080;

let returnArray = [];
app.use(cors());
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get("/contacts/", (req, res) => {
	returnArray = [];
	let favorite = req.query.favorite;
	if (favorite == "true") {
		for (let i = 0; i < dataset.length; i++) {
			for (const [key, value] of Object.entries(dataset[i])) {
				if (key == "favorite" && value == true)
					returnArray.push(dataset[i]);
			}
		}
		res.send(returnArray);
		return;
	}

	let perpage = req.query.perpage != "" ? parseInt(req.query.perpage) : 10;
	let page = req.query.page != "" ? parseInt(req.query.page) : 1;

	console.log(req.query);
	if (req.query.keyword != undefined && req.query.keyword != "") {
		for (let i = 0; i < dataset.length; i++) {
			for (const [key, value] of Object.entries(dataset[i])) {
				if (
					key == "name" &&
					req.query.keyword.toLowerCase() == value.toLowerCase()
				)
					returnArray.push(dataset[i]);
			}
		}
		res.send(returnArray);
		return;
	}

	let location = req.query.location !== undefined ? req.query.location : "";
	let tags = req.query.tags !== undefined ? req.query.tags : "";
	let status = req.query.status !== undefined ? req.query.status : "";

	for (let i = 0; i < dataset.length; i++) {
		for (const [key, value] of Object.entries(dataset[i])) {
			if (
				(key === "location" &&
					(location == "" || value === location)) ||
				(key === "status" && (status == "" || value === status))
			) {
				returnArray.push(dataset[i]);
				break;
			}
		}
	}
	res.send(returnArray);
	return returnArray;
});
