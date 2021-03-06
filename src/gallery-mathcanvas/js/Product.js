/**********************************************************************
 * <p>Product of values.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Product
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 */

function MathProduct()
{
	MathMax.superclass.constructor.call(this, "*", new Y.Array(arguments));
}

Y.extend(MathProduct, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.multiply(this.evaluateArgs(var_list));
	},

	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var arg_top_left = Y.clone(top_left);

		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x
		};

		var total_midline = RectList.ycenter(total_rect);
		var orig_midline  = total_midline;

		var times_width = context.getStringWidth(font_size, '\u00b7');

		Y.Array.each(this.args, function(arg, index)
		{
			var arg_index  = arg.prepareToRender(context, arg_top_left, font_size, rect_list);
			var arg_info   = rect_list.get(arg_index);
			arg_top_left.x = arg_info.rect.right + times_width;

			if (arg.parenthesizeForRender(this))
			{
				var paren_width = context.getParenthesisWidth(arg_info.rect);
				rect_list.shift(arg_index, paren_width, 0);
				arg_top_left.x  += 2*paren_width;
				total_rect.right = arg_info.rect.right + paren_width;
			}

			total_rect    = RectList.cover(total_rect, arg_info.rect);
			total_midline = Math.max(total_midline, arg_info.midline);
		},
		this);

		// adjust the argument rectangles so all the midlines are the same
		// (ourMidline is guaranteed to stay constant)

		if (this.args.length > 1 && total_midline > orig_midline)
		{
			Y.Array.each(this.args, function(arg)
			{
				var index = rect_list.findIndex(arg);
				rect_list.setMidline(index, total_midline);
				total_rect = RectList.cover(total_rect, rect_list.get(index).rect);
			});
		}

		return rect_list.add(total_rect, total_midline, font_size, this);
	},

	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		var x    = info.rect.left;

		var times_width = context.getStringWidth(info.font_size, '\u00b7');

		Y.Array.each(this.args, function(arg, index)
		{
			if (index > 0)
			{
				context.drawString(x, info.midline, info.font_size, '\u00b7');
			}

			arg.render(context, rect_list);

			var arg_info = rect_list.find(arg);
			x            = arg_info.rect.right;

			if (arg.parenthesizeForRender(this))
			{
				context.drawParentheses(arg_info.rect);
				x += context.getParenthesisWidth(arg_info.rect);
			}
		},
		this);
	},

	toString: function()
	{
		var s = '';
		Y.Array.each(this.args, function(arg, index)
		{
			if (index > 0)
			{
				s += '*';
			}

			s += this._printArg(index);
		},
		this);

		return s;
	}
});

MathFunction.Product = MathProduct;
