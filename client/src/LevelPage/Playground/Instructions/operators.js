export const comparisonOperators = {
    equal: "==",
    notEqual: "!=",
    moreThan: ">",
    lessThan: "<",
    moreOrEqualThan: ">=",
    lessOrEqualThan: "<="
};

export const assignmentOperators = {
    equal: "=",
    plusEqual: "+=",
    minusEqual: "-=",
    multiplyEqual: "*=",
    divideEqual: "/=",
    minusMinus: "--",
    plusPlus: "++"
};

export const logicalOperators = {
    and: "&&",
    or: "||",
    not: "!"
};

export const arithmeticOperators = {
    addition: "+",
    multiplication: "*",
    subtraction: "-",
    division: "/",
    modulo: "%",
};

export function isBinaryOperator(operator) {
    return operator === assignmentOperators.equal;
}

export function isIncrementOrDecrement(operator) {
    return operator === assignmentOperators.plusPlus || operator === assignmentOperators.minusMinus;
}