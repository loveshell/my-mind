MM.Format.MMA = Object.create(MM.Format.FreeMind, {
	id: {value: "mma"},
	label: {value: "Mind Map Architect"},
	extension: {value: "mma"},
	mime: {value: "application/xml"}
});

MM.Format.MMA._parseAttributes = function(node, parent) {
	var json = {
		children: [],
		text: node.getAttribute("title") || "",
		shape: "box"
	};

	var direction = node.getAttribute("direction");
	if (direction == "0") { json.side = "left"; }
	if (direction == "1") { json.side = "right"; }

	var color = node.getAttribute("color");
	if (color) {
		var re = color.match(/^#(....)(....)(....)$/);
		if (re) {
			var r = parseInt(re[1], 16) >> 8;
			var g = parseInt(re[2], 16) >> 8;
			var b = parseInt(re[3], 16) >> 8;
			r = Math.round(r/17).toString(16);
			g = Math.round(g/17).toString(16);
			b = Math.round(b/17).toString(16);
		}
		json.color = "#" + [r,g,b].join("");
	}


	return json;
}

MM.Format.MMA._serializeAttributes = function(doc, json) {
	var elm = doc.createElement("node");
	elm.setAttribute("title", json.text);

	if (json.side) { elm.setAttribute("direction", json.side == "left" ? "0" : "1"); }
	if (json.color) {
		var parts = json.color.match(/^#(.)(.)(.)$/);
		var r = new Array(5).join(parts[1]);
		var g = new Array(5).join(parts[2]);
		var b = new Array(5).join(parts[3]);
		elm.setAttribute("color", "#" + [r,g,b].join(""));
	}

	return elm;
}
