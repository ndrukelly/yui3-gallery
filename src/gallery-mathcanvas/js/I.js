/**********************************************************************
 * <p>i (square root of -1)</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.I
 * @extends Y.MathFunction
 * @constructor
 */

function MathI()
{
	MathI.superclass.constructor.call(this);
}

Y.extend(MathI, MathFunction,
{
	evaluate: function()
	{
		return Y.ComplexMath.I;
	},

	toString: function()
	{
		return 'i';
	}
});

MathFunction.I = MathI;
