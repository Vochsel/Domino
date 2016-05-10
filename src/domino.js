function GetScreenOffset(el)
{
	var x = 0;
	var y = 0;
	var node = el;
	while(node.nodeName != "BODY") {
		x += node.offsetLeft;
		y += node.offsetTop;

		node = node.offsetParent;
	}
	return {
		x: x,
		y: y
	};
}

var Domino = {
	Select: function(name) {
		var e = undefined;

		//Try all dom accessors
		if(e == undefined)
			e = document.getElementById(name);
		if(e == undefined)
			e = document.getElementById(name);
		if(e == undefined)
			e = document.getElementsByClassName(name);
		if(e == undefined)
			e = document.getElementsByName(name);
		if(e == undefined)
			e = document.getElementsByTagName(name);

		//return result, or undefined
		return e;
	},
	Interaction: {
		Draggable: {
			Selected: null,
			Offset: { x:0, y:0 },
			Create: function(dom) {
				dom.style.position = "absolute";
				dom.addEventListener("mousedown", function(e) {
					console.log(e);
					var p = GetScreenOffset(e.target);
					Domino.Interaction.Draggable.Offset.x = e.pageX - p.x;
					Domino.Interaction.Draggable.Offset.y = e.pageY - p.y;
					console.log(e.pageX + " : " + p.x);
					Domino.Interaction.Draggable.Selected = dom;
				});
				document.addEventListener("mouseup", function(e) {
					Domino.Interaction.Draggable.Selected = null;
				});
				document.addEventListener("mousemove", function(e) {
					var selected = Domino.Interaction.Draggable.Selected;
					
					if(selected == null)
						return;
					
					var mx = e.pageX;
					var my = e.pageY;

					selected.style.left = mx - Domino.Interaction.Draggable.Offset.x + "px";
					selected.style.top = my - Domino.Interaction.Draggable.Offset.y + "px";
				});
					
			}
		}
	}
};