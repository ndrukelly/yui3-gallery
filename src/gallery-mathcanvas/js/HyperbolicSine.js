/**********************************************************************
 * <p>Hyperbolic sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.HyperbolicSine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathHyperbolicSine(
	/* MathFunction */	f)
{
	MathHyperbolicSine.superclass.constructor.call(this, "sinh", f);
}

Y.extend(MathHyperbolicSine, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.sinh(this.args[0].evaluate(var_list));
	}
});

MathFunction.HyperbolicSine = MathHyperbolicSine;
