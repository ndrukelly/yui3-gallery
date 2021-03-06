/**********************************************************************
 * <p>Inverse hyperbolic tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.InverseHyperbolicTangent
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathInverseHyperbolicTangent(
	/* MathFunction */	f)
{
	MathInverseHyperbolicTangent.superclass.constructor.call(this, "arctanh", f);
}

Y.extend(MathInverseHyperbolicTangent, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.atanh(this.args[0].evaluate(var_list));
	}
});

MathFunction.InverseHyperbolicTangent = MathInverseHyperbolicTangent;
