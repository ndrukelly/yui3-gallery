/**********************************************************************
 * <p>Inverse hyperbolic sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.InverseHyperbolicSine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathInverseHyperbolicSine(
	/* MathFunction */	f)
{
	MathInverseHyperbolicSine.superclass.constructor.call(this, "arcsinh", f);
}

Y.extend(MathInverseHyperbolicSine, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.asinh(this.args[0].evaluate(var_list));
	}
});

MathFunction.InverseHyperbolicSine = MathInverseHyperbolicSine;
