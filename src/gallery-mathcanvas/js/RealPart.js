/**********************************************************************
 * <p>Real part of a complex number.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.RealPart
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathRealPart(
	/* MathFunction */	f)
{
	MathRealPart.superclass.constructor.call(this, "re", f);
}

Y.extend(MathRealPart, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		var value = this.args[0].evaluate(var_list);
		return Y.ComplexMath.isComplexNumber(value) ? value.real() : value;
	}
});

MathFunction.RealPart = MathRealPart;
