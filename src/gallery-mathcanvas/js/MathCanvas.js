/**********************************************************************
 * <p>Displays an arithmetical expression the way you would write it on
 * paper.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathCanvas
 * @constructor
 * @param config {Object} Widget configuration
 */

function MathCanvas(
	/* object */	config)
{
	MathCanvas.superclass.constructor.call(this, config);
}

MathCanvas.NAME = "MathCanvas";

MathCanvas.ATTRS =
{
	/**
	 * The function to display.
	 * 
	 * @config func
	 * @type {Y.MathFunction|String}
	 */
	func:
	{
		value: new Y.MathFunction.Value(0),
		setter: function(value)
		{
			return Y.Lang.isString(value) ?
				Y.MathCanvas.Parser.parse(value) : value;
		}
	},

	/**
	 * The font name to use.
	 * 
	 * @config fontname
	 * @type {String}
	 */
	fontname:
	{
		value:     'sans-serif',
		validator: Y.Lang.isString
	},

	/**
	 * The font size to use, in em's.
	 * 
	 * @config fontsize
	 * @type {Integer}
	 */
	fontsize:
	{
		value:     1,
		validator: Y.Lang.isNumber
	}
};

function setSize(
	/* event */			e,
	/* width/height */	type)
{
	if (e.newVal.toString().search(/px$/))
	{
		this.canvas.setAttribute(type, parseInt(e.newVal, 10));
	}
	else
	{
		e.preventDefault();
	}
}

Y.extend(MathCanvas, Y.Widget,
{
	initializer: function(config)
	{
		this.after('funcChange', this._renderExpression);
	},

	renderUI: function()
	{
		var container = this.get('contentBox');

		this.canvas = Y.Node.create('<canvas width="100" height="100" tabindex="0"></canvas>');
		container.appendChild(this.canvas);

		this.context = new Y.Canvas.Context2d(this.canvas);
		Y.mix(this.context, math_rendering);
		this.context.math_canvas = this;

		var w = this.get('width');
		if (w)
		{
			this.canvas.setAttribute('width', parseInt(w, 10));
		}
		this.on('widthChange', setSize, this, 'width');

		var h = this.get('height');
		if (h)
		{
			this.canvas.setAttribute('height', parseInt(h, 10));
		}
		this.on('heightChange', setSize, this, 'height');

		this._renderExpression();
	},

	destructor: function()
	{
		this.canvas  = null;
		this.context = null;
	},

	/**
	 * Renders the expression.
	 */
	_renderExpression: function()
	{
		this.context.clearRect(0,0,
			this.canvas.getAttribute('width'),
			this.canvas.getAttribute('height'));

		var f = this.get('func');
		if (!f)
		{
			return;
		}

		this.rect_list = new RectList();

		var top_left = { x:0, y:0 };
		f.prepareToRender(this.context, top_left, 100, this.rect_list);

		var bounds = this.rect_list.getBounds();

		this.context.save();
		this.context.translate(
			Math.floor((this.canvas.getAttribute('width') - (bounds.right - bounds.left)) / 2),
			Math.floor((this.canvas.getAttribute('height') - (bounds.bottom - bounds.top)) / 2));

		f.render(this.context, this.rect_list);

		this.context.restore();
	}
});

var paren_angle = Math.PI/6;	// 30 degrees

var math_rendering =
{
	drawString: function(
		/* int */			left,
		/* int */			midline,
		/* percentage */	font_size,
		/* string */		s)
	{
		var h = this.getLineHeight(font_size);
		this._setFont(font_size);
		this.set('textBaseline', 'top');
		this.fillText(s, left, Math.floor(midline - h/2));
	},

	getLineHeight: function(
		/* percentage */	font_size)
	{
		return (13 * this.math_canvas.get('fontsize') * font_size/100.0);
	},

	getStringWidth: function(
		/* percentage */	font_size,
		/* string */		text)
	{
		this.save();
		this._setFont(font_size);
		var w = this.measureText(text).width;
		this.restore();
		return w;
	},

	_setFont: function(
		/* percentage */	font_size)
	{
		this.set('font',
			(this.math_canvas.get('fontsize') * font_size/100.0) + 'em ' +
			 this.math_canvas.get('fontname'));
	},

	drawSquareBrackets: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		var w = this.getSquareBracketWidth(r)-2;

		this.moveTo(r.left-2, r.top);
		this.line(-w,0);
		this.line(0,h-1);
		this.line(w,0);
		this.stroke();

		this.moveTo(r.right+1, r.top);
		this.line(w,0);
		this.line(0,h-1);
		this.line(-w,0);
		this.stroke();
	},

	getSquareBracketWidth: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		return Math.round(3+((h-1)/10));
	},

	drawParentheses: function(
		/* rect */	r)
	{
		var h       = r.bottom - r.top;
		var radius  = h/(2.0*Math.sin(paren_angle));
		var radius1 = Math.round(radius);
		var yc      = RectList.ycenter(r);
		var pw      = this.getParenthesisWidth(r);

		this.beginPath();
		this.arc(r.left - pw + radius, yc, radius1, Math.PI-paren_angle, Math.PI+paren_angle, false);
		this.stroke();

		this.beginPath();
		this.arc(r.right + pw - radius, yc, radius1, paren_angle, -paren_angle, true);
		this.stroke();
	},

	getParenthesisWidth: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		return 2+Math.round(0.5 + (h * (1.0 - Math.cos(paren_angle)))/(2.0 * Math.sin(paren_angle)));
	}
};

MathParser.yy.MathFunction = Y.MathFunction;

Y.MathCanvas          = MathCanvas;
Y.MathCanvas.RectList = RectList;
Y.MathCanvas.Parser   = MathParser;